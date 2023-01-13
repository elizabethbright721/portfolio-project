const BASE_URL = "https://api.quotable.io/quotes?limit=150";
const RANDOM_URL = "https://api.quotable.io/random?maxLength=50";
//const searchByAuthorAPI = 
const main = document.querySelector("main")
const randomMotivation = document.querySelector("#random-motivation")
const keyWords = document.querySelector("#key-words")
const userSearch = document.querySelector("#user-search")
const motivationalDiv = document.querySelector(".motivational-card")
const note = document.querySelector('p');

const form = document.querySelector("form");
form.addEventListener("submit", quoteData)

//function getSearchAPI()

function quoteData(event) {
    event.preventDefault();
   
    fetch(BASE_URL) 
        .then((response) => response.json())
        
        .then((result) => {
            createMotivationalCard(result)
            console.log(result)
        })
        // .catch((error) => {
        //     createErrorMessage(error)
        // })
}

function getRandomQuote(url) {
    fetch(url) 
        .then((response) => response.json())
        
        .then((results) => {
            const p = document.createElement('p')
            p.innerHTML = `<em>"${results.content}"</em> ~ <strong>${results.author}</strong>`;
            randomMotivation.append(p); 
        })
}

getRandomQuote(RANDOM_URL)

function createMotivationalCard(quoteData) {
   if (userSearch.value) {
    getAuthor(quoteData);
   } else {
   getSpecificWords(quoteData)
   }
}


function getAuthor(result) {
    const userInput = userSearch.value;;
    const formattedUserInput = userInput[0].toUpperCase() + userInput.slice(1).toLowerCase()
    console.log(formattedUserInput)
    const authorList = result.results.filter((result) => result.author.includes(formattedUserInput)) 
    
    for (let i = 0; i < authorList.length; i++) {
        const authorContent = authorList[i].content;
        const authorName = authorList[i].author;
        randomMotivation.remove();
        note.remove();
        const quoteContent = document.createElement("p");
        quoteContent.innerHTML = `<em>${authorContent}</em> <br><br> ~ <strong>${authorName}</strong><hr></hr> `

        motivationalDiv.append(quoteContent);
        main.append(motivationalDiv);
        form.reset();
    }
    
    
}


function getSpecificWords(results) {
    const wordsInput = keyWords.value;
    const keywordList = results.results.filter(results => results.content.includes(wordsInput))
    for (let j = 0; j < keywordList.length; j++) {
        const keywordContent = keywordList[j].content;
        const authorName = keywordList[j].author;
        randomMotivation.remove();
        note.remove();
        const quoteContent = document.createElement("p");
        quoteContent.innerHTML = `<em>${keywordContent}</em> <br> ~ <strong>${authorName}</strong><hr></hr> `

        motivationalDiv.append(quoteContent);
        main.append(motivationalDiv);
        form.reset();
    }
}