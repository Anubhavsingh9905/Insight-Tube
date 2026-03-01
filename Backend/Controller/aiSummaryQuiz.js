const Summary = require("../models/summary");
const Quiz = require('../models/quiz');
const { YoutubeTranscript } = require('@danielxceron/youtube-transcript');
const { GoogleGenerativeAI } = require("@google/generative-ai");

require('dotenv').config();

const gemini_api_key = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generate = async(prompt) => {
  try {
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    //console.log(response.text());
    return response.text();
  } catch (error) {
    //console.log("response error", error);
  }
};

module.exports.generateSummary = async(req, res) => {
    try {
        const { url , lang} = req.body;
        //console.log(url);
        
        let sumarized = await Summary.findOne({url: url});
        //console.log(`${sumarized.summary}`);
        if(!sumarized){
            const xx = await YoutubeTranscript.fetchTranscript(url);
            
            if(!xx){
                res.status(500).json({ message: "No transcript" });
                return;
            }

            let transcript = "";
            xx.map(function myfunc(x) {
                transcript += x.text;
                transcript += " ";
            });
            //console.log(transcript);

            const prompt = `summarize this "${transcript}" in bullet points in 350 words or in smaller words if text size is small`;
            sumarized = await generate(prompt);

            if(!sumarized){
                res.status(500).json({ message: "No summary" });
                return;
            }
            const newSummary = new Summary({
                url: url,
                summary: sumarized
            });

            newSummary.save();
        }
        else sumarized = sumarized.summary;
        //console.log(`transcript ${transcript}`);
        res.status(200).send(sumarized)
    }
    catch (error) {
        //console.log(error);
        res.status(500).json({ message: "some thing went wrong" });
    }
}

module.exports.generateQuiz = async(req, res) => {
    try {
        const {url} = req.body;
        //console.log(url);
        
        let quizData = await Quiz.findOne({url: url});
        //console.log(`${sumarized.summary}`);
        if(!quizData){
            const xx = await YoutubeTranscript.fetchTranscript(url);
    
            let transcript = "";
            xx.map(function myfunc(x) {
                transcript += x.text;
                transcript += " ";
            });

            const prompt = `Generate a 5-quizData MCQ quiz in JSON format and in english or hindi from this transcript: ${transcript}. 
                Structure: { "quiz": [{ "number": 1, "question": "", "options": {A:"", B:"", C:"", D:""}, "answer": "" }] }`;
            
            quizData = await generate(prompt);

            if(quizData){
                const newQuiz = new Quiz({
                    url: url,
                    quiz: quizData
                });
                newQuiz.save();
            }else{
                res.status(429).json({message: "Too many request, exceed daily limit"});
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
        //console.log(error);
        res.status(500).json({ message: "some thing went wrong" });
    }
}