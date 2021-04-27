const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

//Fazer um request pra pegar toda a página html com as citações
request('https://www.marxists.org/archive/lenin/quotes.htm', (err, res, data) =>{
	if(!res.statusCode === 200) return;
	if(err) return;

	//Parse HTML
	const $ = cheerio.load(data);

	//Reultados de busca pela tag <p>
	const results = $('blockquote > .border > p');

	//objeto pra armazenar as citações
	const obj = {}

	// loop entre os resultados, coloca cada resultado dentro do objeto obj
	results.each(function (i, elemento){
		const quote = $(elemento).text();
		obj[i] = quote;
	})

	//const arquivo = JSON.stringify(obj);
	//fs.writeFile('output.json', arquivo, (err) => {});

})


