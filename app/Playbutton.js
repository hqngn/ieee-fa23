/**
 * Resources Used:
 * https://stackoverflow.com/questions/74471642/nextjs-13-button-onclick-event-handlers-cannot-be-passed-to-client-componen
 */

"use client";

import { buttonPress } from "./scripts/scripts.js"

export default function Playbutton() {

    return (

        <button 

            type="button" 
            onClick={ buttonPress } 
            style={{width: "300px", height: "32px"}}
        
        >Submit</button>

    );

}