import React from "react";
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";

function ProgressBar({ Progress }) {
    return (
        <div className="w-full">
            <div className="w-[60px] h-[65px] max-md:hidden">
                <CircularProgressbar value={Progress} text={`${Progress | 0}%`}
                    styles={buildStyles({
                        textColor: "black",
                        textSize: "1.5rem",
                        pathColor: "#34C759",
                    })}
                    strokeWidth={12} 
                />
            </div>
            <div className="bg-gray-200 rounded-full h-3 md:hidden">
                <div className="bg-green-500 rounded-full h-3 transition-all"
                    style={{ width: `${Progress}%` }}>

                </div>
                <p className="max-md:hidden">
                    {Progress | 0}%
                </p>
            </div>
        </div>
    )
}

export default ProgressBar