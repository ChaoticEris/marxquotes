import "./css/app.css"
import axios from "axios";
import {useState, useEffect} from "react";

function App() {
    const [quote, setQuote] = useState("");

    useEffect(() => {
        randomQuote();
    }, [])

    const randomQuote = (autor = null) => {
        let url = "/api/search";
        if (autor) {
            url = url + `/${autor}`;
        }
        axios.get(url).then(
            (response) => {
                setQuote(response.data);
            }
        ).catch(err => {
            console.error(err);
        })
    };

    return (
        <div className="container">
            <h1>The Best Quotes of All Time</h1>
            <p id="quote">{quote}</p>
            <div className="btns">
                <button onClick={() => randomQuote()} className="btn">Random quote</button>
                <button onClick={() => randomQuote("marx")} className="btn">Marx/Engels quote</button>
                <button onClick={() => randomQuote("lenin")} className="btn">Lenin quote</button>
                <button onClick={() => randomQuote("trotsky")} className="btn">Trotsky quote</button>
                <button onClick={() => randomQuote("mao")} className="btn">Mao quote</button>
            </div>
        </div>
    );
}

export default App;
