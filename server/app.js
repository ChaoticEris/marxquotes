const express = require("express");
const app = express();
const allquotes = require("./static/marxists_quotes/all_quotes.json");

const mapaAutor = {
    0: "marx",
    1: "lenin",
    2: "trotsky",
    3: "mao"
};

const autorAleatorio = todos => {
    const numAleatorio = Math.floor(Math.random()*Object.keys(todos).length);
    return todos[mapaAutor[numAleatorio]];
}

const quoteAleatorio = autor => {
    const numero = Math.floor(Math.random()*Object.keys(autor).length);
    return autor[numero];
}

app.get('/api/search', async (req, res) => {
    const autor = autorAleatorio(allquotes);
    const quote = quoteAleatorio(autor);
    await res.status(200).json(quote);
});

app.get("/api/search/:autor", async (req, res) => {
    const autor = req.params["autor"];
    const quotes = allquotes[autor];
    if(!quotes) await res.status(404).send("Não encontrado");
    else await res.json(quoteAleatorio(quotes));
});

app.listen(3030, () => {
    console.log("servidor está rodando na port 3030");
});