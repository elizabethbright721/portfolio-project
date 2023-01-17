const RANDOM_URL = "https://api.quotable.io/random?maxLength=50";
const randomMotivation = document.querySelector("#random-motivation")


function getRandomQuote(url) {
    fetch(url) 
        .then((response) => response.json())
        
        .then((results) => {
            const quote = document.createElement('p')
            quote.innerHTML = `<em>"${results.content}"</em> ~ <strong>${results.author}</strong>`;
            randomMotivation.append(quote); 
        })
}

getRandomQuote(RANDOM_URL)