const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Loading spinner OFF
function removeLoadingSpinner(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

/*show New Quote Function for local APIs 

 function newQuote(){
     loading();
     //Pick a random quote from apiQuotes array
     const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
     //Check if author field is blank and replace it with "unknown"
     if (!quote.author){
         authorText.textContent = 'Unknown';
     } else {
         authorText.textContent = quote.author;
     }
     //Check the Quote length to determine styling
     if (quote.text.length > 120){
         quoteText.classList.add('long-quote');
     } else{
         quoteText.classList.remove('long-quote');
     }
     //Set Quote, Hide Loader
     quoteText.textContent = quote.text;
     complete();
 }*/

//Get quotes from API
async function getQuotes(){
    showLoadingSpinner();
    const proxyUrl = 'https://polar-everglades-12070.herokuapp.com/';
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If author is blank, add 'Unkown'
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown'
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        if (data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();
    } catch(error){
        getQuotes()

    }
}

//Tweet a Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuotes);
//On Load
getQuotes();
