import "./Voice.css";
import React from "react";
import { useHistory } from "react-router-dom";
import { isAuth } from './../../helpers/auth';


export default function Main() {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    const History = useHistory();

    const rec = async () => {
        
        recognition.start();
        console.log("Activated");
        recognition.onresult = (e) => {
            let resultIndex = e.resultIndex;
            const transcript = e.results[resultIndex][0].transcript;
            console.log(transcript);
            const speech = new SpeechSynthesisUtterance();

            if(!isAuth()){
            if (transcript.includes("login")) {
                speech.text = "redirected to Sign in";
                window.speechSynthesis.speak(speech);
                History.push("/Login");
            }
        }else{ 

            speech.text = `${isAuth().name} is connected now`;
            window.speechSynthesis.speak(speech);
        }
           
            if (transcript.includes("about")) {
                speech.text = "redirected to Valean about";
                window.speechSynthesis.speak(speech);
                History.push("/about");
            }
         
        };
    };

    return (
        <div >
            <button id="mic" onClick={rec} style={{marginLeft:'-0%',zIndex:'99999', width:'70px',height:'60px'}}>
                <i className="flaticon-microphone fa-xs" />
            </button>
        </div>
    );
}