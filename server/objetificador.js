const fs = require("fs");

let nomesArquivos =[];

nomesArquivos = fs.readdirSync("./marxists_quotes", ((err, files) => {}));

let final = [];

nomesArquivos.forEach((file, i) => {
    const arquivo = JSON.parse(fs.readFileSync(`./marxists_quotes/${file}`, 'utf-8'));
    const nome = file.slice(0, -5);
    final.push({[nome.toLowerCase()]: {...arquivo}});
});

fs.writeFile('./marxists_quotes/all_quotes.json', JSON.stringify(final), err => {});