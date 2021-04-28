const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

//Função para fazer o arquivo JSON
function arquivoJSON(nome, objeto) {
    const arquivo = JSON.stringify(objeto);
    const dir = './marxists_quotes';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    ;
    fs.writeFile(`./${dir}/${nome}.json`, arquivo, (err) => {
    })
    console.log(`${nome}.json foi criado com sucesso`);
}

//Função para fazer scrape
async function scrape(url, nome) {
    //objeto para armazenar citações
    const obj = [];

    await request(url, (err, res, data) => {
        if (!res.statusCode === 200) return;
        if (err) return;

        //Parse HTML
        const $ = cheerio.load(data);

        //Reultados de busca pela tag <p>
        const results = $('blockquote > .border > p');
        const listaFiltrada = results.filter(function (i, event) {
            const quote = $(event).text();
            return (quote.trim() !== "")
        })
        // loop entre os resultados, coloca cada resultado dentro do objeto obj
        listaFiltrada.each(function (i, elemento) {
            const quote = $(elemento).text();
            obj.push(quote);
        })
        arquivoJSON(nome, obj);
    })
}

scrape('https://www.marxists.org/archive/marx/works/subject/quotes/index.htm', 'Marx');

scrape('https://www.marxists.org/reference/archive/mao/works/red-book/quotes.htm', 'Mao');

scrape('https://www.marxists.org/archive/trotsky/quotes.htm', 'Trotsky');

scrape('https://www.marxists.org/archive/lenin/quotes.htm', 'Lenin');