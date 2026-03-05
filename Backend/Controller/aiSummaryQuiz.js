const Summary = require("../models/summary");
const Quiz = require('../models/quiz')
const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Transcript = require("../models/transcript");

require('dotenv').config();


async function fetchTranscriptFromAPI(vid) {
    const options = {
        method: 'GET',
        url: 'https://youtube-transcripts.p.rapidapi.com/youtube/transcript',
        params: {
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            videoId: vid,
            chunkSize: '500',
            text: 'false',
        },
        headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY,
            'x-rapidapi-host': 'youtube-transcripts.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data.content;
    } catch (error) {
        console.error(error);
        return null;
    }
}


const gemini_api_key = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiModel = googleAI.getGenerativeModel({
    model: "gemini-2.5-flash",
});

const generate = async (prompt) => {
    try {
        const result = await geminiModel.generateContent(prompt);
        const response = result.response;
        //console.log(response.text());
        return response.text();
    } catch (error) {
        console.log("response error", error);
    }
};

module.exports.generateSummary = async (req, res) => {
    try {
        const { url, vid } = req.body;
        //console.log(url);

        const videoId = vid;
        let sumarized = await Summary.findOne({ url: url });
        //console.log(`${sumarized.summary}`);
        if (!sumarized) {

            let transcriptData = await Transcript.findOne({ url: url });
            if (!transcriptData) {
                transcriptData = await fetchTranscriptFromAPI(videoId);
                const newTranscriptData = new Transcript({
                    url: url,
                    transcript: transcriptData
                });

                await newTranscriptData.save();
            } else {
                transcriptData = transcriptData.transcript;
            }

            if (!transcriptData) {
                res.status(403).json({ message: "Transcript error" });
                return;
            }

            let transcript = "";
            transcriptData.map(function myfunc(x) {
                transcript += x.text;
                transcript += " ";
            });

            console.log(transcript);

            const prompt = `summarize this "${transcript}" in bullet points in 350 words or in smaller words if text size is small`;
            sumarized = await generate(prompt);

            if (!sumarized) {
                res.status(500).json({ message: "Too many request, exceed daily limit" });
                return;
            }
            const newSummary = new Summary({
                url: url,
                summary: sumarized
            });

            await newSummary.save();
        }
        else sumarized = sumarized.summary;

        // console.log(`transcript ${transcript}`);
        res.status(200).send(sumarized)
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "No AI Summary" });
    }
}

module.exports.generateQuiz = async (req, res) => {
    try {
        const { url, vid } = req.body;
        //console.log(url);

        const videoId = vid;
        let quizData = await Quiz.findOne({ url: url });
        //console.log(`${sumarized.summary}`);
        if (!quizData) {
            let transcriptData = await Transcript.findOne({ url: url });
            if (!transcriptData) {
                transcriptData = await fetchTranscriptFromAPI(videoId);
                const newTranscriptData = new Transcript({
                    url: url,
                    transcript: transcriptData
                });

                await newTranscriptData.save();
            } else {
                transcriptData = transcriptData.transcript;
            }

            if (!transcriptData || transcriptData.length == 0) {
                res.status(403).json({ message: "Transcript error" });
                return;
            }

            let transcript = "";
            transcriptData.map(function myfunc(x) {
                transcript += x.text;
                transcript += " ";
            });

            const prompt = `Generate a 5-quizData MCQ quiz in JSON format and in english or hindi from this transcript: ${transcript}. 
                Structure: { "quiz": [{ "number": 1, "question": "", "options": {A:"", B:"", C:"", D:""}, "answer": "" }] }`;

            quizData = await generate(prompt);

            if (quizData) {
                const newQuiz = new Quiz({
                    url: url,
                    quiz: quizData
                });
                await newQuiz.save();
            } else {
                res.status(429).json({ message: "Too many request, exceed daily limit" });
                return;
            }

        }
        else quizData = quizData.quiz;
        //console.log(`transcript ${transcript}`);

        let cleanQuizData = quizData.replace(/```json|```/g, "").trim();
        cleanQuizData = JSON.parse(cleanQuizData);
        //console.log(cleanQuizData)
        res.status(200).json(cleanQuizData);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "No AI Summary" });
    }
}