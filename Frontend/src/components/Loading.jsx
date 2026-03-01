import React from "react";
import { Mosaic } from "react-loading-indicators"

function Loading(){

    return(
        <Mosaic color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} size="large"/>
    )
}

export default Loading;