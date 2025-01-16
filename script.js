
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];
// show loader
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
// hide loader
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
    
}


// show new quotes
function newQuote(){
loading();
//Pick a random quote from api array
const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
if(!quote.author) {
 authorText.textContent = " Unknown";
}
else
{
authorText.textContent = "Author : " + quote.author;
}
if(quote.text.length > 70 ){
    quoteText.classList.add('long-quote');
}else{
    quoteText.classList.remove('long-quote');
}
// Set quote 
quoteText.textContent = quote.text;
complete();
}

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
   
    try{
        
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch (error) {

    }
    
}
//tweet

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

//Event Lister

newQuoteBtn.addEventListener('click' , newQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On Load
getQuotes();
