const BASE_URL = "https://api.quotable.io/quotes?limit=150";

//const searchByAuthorAPI = 
const main = document.querySelector("main")
const keyWords = document.querySelector("#key-words")
const userSearch = document.querySelector("#user-search")
const motivationalDiv = document.querySelector(".motivational-card")
const note = document.querySelector('.note');
const appendSearchWord = document.querySelector('.append-search')
const arrayImagesElement = document.querySelector("arrayImages")
const searchArray = [];
const form = document.querySelector("form");
const imgArray = [
    '../images/1.jpg',
    '../images/2.jpg',
    '../images/3.jpg',
    '../images/4.jpg',
    '../images/5.jpg',
    '../images/6.jpg',
];

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
    authorList.forEach(author => {
        motivationalDiv.textContent = " ";
        imgArray.forEach(image => {       
        document.getElementById('wide').style.backgroundImage = `url(${image})`;
        }); 
        const authorContent = author.content;
        const authorName = author.author;
        randomMotivation.remove();
        note.remove()
        const quoteContent = document.createElement("p");
        quoteContent.innerHTML = `<em>${authorContent}</em> <br><br> ~ <strong>${authorName}</strong> `
       
        motivationalDiv.append(quoteContent);
        
    })
    form.reset();
}

function getSpecificWords(keyword) {
    const wordsInput = keyWords.value;   
    if (wordsInput !== ""){
        motivationalDiv.textContent = " ";
        const searchLi = document.createElement('li');
        searchLi.innerHTML = `<em>${wordsInput}</em>`;
        appendSearchWord.removeAttribute("hidden")
        appendSearchWord.append(searchLi) 
        searchArray.push(wordsInput);
        if (searchArray.length > 5) {
            searchLi.firstChild.remove();
            searchArray.unshift();
        }
       
    }
   
    const keywordList = keyword.results.filter((keyword) => keyword.content.includes(" " + wordsInput + " "))
        for (let j = 0; j < keywordList.length; j++) {
            const keywordContent = keywordList[j].content;
            const authorName = keywordList[j].author;
            randomMotivation.remove();
            note.remove();
            const quoteContent = document.createElement("p");
            quoteContent.innerHTML = `<em>${keywordContent}</em>
            <br><br> ~ <strong>${authorName}</strong><hr> `;
            motivationalDiv.append(quoteContent); 
    }  if (wordsInput === null) {
        const section = document.createElement("p");
        section.innerHTML = `That keyword doesn't exist.  Click clear and try another one.
    `;
        main.append(section)
        }
    form.reset();
}

function createErrorMessage(error) {
    const section = document.createElement("section");
    section.innerHTML = `
      <p class="message">${error}</p>
    `;
    main.append(section);
   }



// function randomImages() {
//     //let images = [];
//     const img = document.createElement("img")
//     img.src = "/..images/"

//     let imagesLength = images.length;
//     let randomNumber = Math.random();
//     randomNumber = randomNumber*imagesLength;
//     randomNumber = Math.floor(randomNumber);
//     let choosenImage = images[randomNumber];
//     background.src = choosenImage;
// }
