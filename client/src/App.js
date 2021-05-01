import "./css/app.css"
import axios from "axios";
import {useState, useEffect} from "react";

function App() {
    const [quote, setQuote] = useState("");

    useEffect(() => {
        randomQuote();
    }, [])

    const randomQuote = () => {
        axios.get("/api/search").then(
            (response) => {
                setQuote(response.data);
            }
        ).catch(err => {
            console.error(err);
        })
    };

    const randomAuthorQuote = autor => {
        axios.get(`/api/search/${autor}`).then(
            (response) => {
                setQuote(response.data);
            }
        ).catch(err => {
            console.error(err);
        });
    };

    return (
        <div className="container">
            <h1>The Best Quotes of All Time</h1>
            <p id="quote">{quote}</p>
            <div className="btns">
                <button onClick={randomQuote} className="btn">Random quote</button>
                <button onClick={() => randomAuthorQuote("marx")} className="btn">Marx/Engels quote</button>
                <button onClick={() => randomAuthorQuote("lenin")} className="btn">Lenin quote</button>
                <button onClick={() => randomAuthorQuote("trotsky")} className="btn">Trotsky quote</button>
                <button onClick={() => randomAuthorQuote("mao")} className="btn">Mao quote</button>
            </div>
        </div>
    );
};

export default App;
