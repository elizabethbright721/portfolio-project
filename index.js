const BASE_URL = "https://api.quotable.io/quotes?limit=150";
const RANDOM_URL = "https://api.quotable.io/random?maxLength=50";
//const searchByAuthorAPI = 
const main = document.querySelector("main")
const randomMotivation = document.querySelector("#random-motivation")
const keyWords = document.querySelector("#key-words")
const userSearch = document.querySelector("#user-search")
const motivationalDiv = document.querySelector(".motivational-card")
const note = document.querySelector('.note');
const appendSearchWord = document.querySelector('.append-search')


const form = document.querySelector("form");
form.addEventListener("submit", quoteData)

function quoteData(event) {
    event.preventDefault();
   
    fetch(BASE_URL) 
        .then((response) => response.json())
        
        .then((result) => {
            createMotivationalCard(result)
            
        })
        .catch((error) => {
            createErrorMessage(error)
        })
}

function createMotivationalCard(quoteData) {
   
    
    if (userSearch.value) {
        getAuthor(quoteData);
    }else {
        getSpecificWords(quoteData)
    }
    form.reset()
   
}

function getAuthor(author) {
    const userInput = userSearch.value;;
    const formattedUserInput = userInput[0].toUpperCase() + userInput.slice(1).toLowerCase()
    const authorList = author.results.filter((result) => result.author.includes(formattedUserInput)) 
    
    for (let i = 0; i < authorList.length; i++) {
        const authorContent = authorList[i].content;
        const authorName = authorList[i].author;
        randomMotivation.remove();
        note.remove()
        const quoteContent = document.createElement("p");
        quoteContent.innerHTML = `<em>${authorContent}</em> <br><br> ~ <strong>${authorName}</strong><hr></hr> `

        motivationalDiv.append(quoteContent);
       
        
    }
    form.reset();
    
}

function getSpecificWords(keyword) {
    // const arrayKeywords = [];
    const wordsInput = keyWords.value;   
    if (wordsInput !== "") {
//     arrayKeywords.push(wordsInput);
//     console.log(arrayKeywords)
        const searchLi = document.createElement('li');
        searchLi.innerHTML = `<em>${wordsInput}</em>`;
        appendSearchWord.removeAttribute("hidden")
        appendSearchWord.append(searchLi)   
    }   
    const keywordList = keyword.results.filter((keyword) => keyword.content.includes(" " + wordsInput + " "))
        for (let j = 0; j < keywordList.length; j++) {
            const keywordContent = keywordList[j].content;
            const authorName = keywordList[j].author;
            randomMotivation.remove();
            note.remove();
            const quoteContent = document.createElement("p");
            quoteContent.innerHTML = `<em>${keywordContent}</em>
            <br> ~ <strong>${authorName}</strong><hr> `;
              
            motivationalDiv.append(quoteContent); 
           
   
} 
    // if (arrayKeywords.length > 5){
    //     searchLi.firstChild.remove();
    //     searchArray.shift();
    //     }

    form.reset();
}

function createErrorMessage(error) {
    if (userSearch === ""){
    main.innerHTML = `<strong style="font-size: 20px;">You have entered an invalid entry. Please try again.</strong>`
    }
}

// function clearSearch(){
//     clearButton.addEventListener('click', event => {
//     const target = event.target;
//     target.reload();
//     }
// }