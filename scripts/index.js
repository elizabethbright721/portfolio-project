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
    const wordsInput = keyWords.value;   
    if (wordsInput !== ""){
        const searchLi = document.createElement('li');
        searchLi.innerHTML = `<em>${wordsInput}</em>`;
        appendSearchWord.removeAttribute("hidden")
        appendSearchWord.append(searchLi) 
        searchArray.push(wordsInput);
        if (searchArray.length > 2) {
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
            <br> ~ <strong>${authorName}</strong><hr> `;
            motivationalDiv.append(quoteContent); 
    } 
    form.reset();
}

function createErrorMessage(error) {
    if (typeof (keyWords.value) !== "") {
    main.innerHTML = '<strong style="font-size: 18px;">Please enter a keyword or author.</strong>';
    }
}

// function sendEmail() {
//     Email.send({
//         Host : "smtp.gmail.com",
//         Username : "elizabethbright721@gmail.com",
//         Password : "password",
//         To : 'elizabethbright@gmail721.com',
//         From : document.getElementById("email").value,
//         Subject : "New Subscriber",
//         Body : "This is a new subscriber from Your Daily Motivation <br> + document.getElementbyId("name").value + <br> Email: ""
//     }).then(
//       message => alert(message)
//     );
// }


function randomImages() {
    //let images = [];
    const img = document.createElement("img")
    img.src = "/..images/"

    let imagesLength = images.length;
    let randomNumber = Math.random();
    randomNumber = randomNumber*imagesLength;
    randomNumber = Math.floor(randomNumber);
    let choosenImage = images[randomNumber];
    background.src = choosenImage;
}
