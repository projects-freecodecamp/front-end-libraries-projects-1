import React, {useEffect, useState} from 'react';
import quotesJson from './quotes.json'

let colors = [
  '#16a085', '#27ae60', '#2c3e50', '#f39c12',
  '#e74c3c', '#9b59b6', '#FB6964', '#342224',
  '#472E32', '#BDBB99', '#77B1A9', '#73A857'
];

let styleBg = {
  backgroundColor: colors[0]
}
let styleColor = {
  color: colors[0]
}

const App = () => {
  // state
  const [state, setState] = useState({
    text: '',
    author: '',
    quotes: [],
    ready: false,
  });

  // events
  const postTweet = (event) => {
    event.persist();
    event.stopPropagation();

    let { text, author } = state
    let URL = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' "${text}" ${author}`;
    event.target.setAttribute('href', URL)
  }
  const postTumblr = (event) => {
    event.persist();
    event.stopPropagation();

    let { text, author } = state
    let URL = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${author}&content=${text}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;
    event.target.setAttribute('href', URL)
  }

  const handleClick = () => {
    let { quotes } = state

    let numberRandomQuote = Math.floor(Math.random() * quotes.length);
    let numberRandomColor = Math.floor(Math.random() * colors.length);

    setState({
      ...state,
      text: quotes[numberRandomQuote].quote,
      author: quotes[numberRandomQuote].author,
    })

    styleBg = {
      backgroundColor: colors[numberRandomColor]
    }
    styleColor = {
      color: colors[numberRandomColor]
    }
  }

  useEffect(() =>{
    setState({
      ...state,
      quotes: quotesJson.quotes,
      text: quotesJson.quotes[0].quote,
      author: quotesJson.quotes[0].author,
    })

    let tweet = document.querySelector('#tweet-quote');
    let { text, author } = state
    let URL = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' "${text}" ${author}`;
    tweet.setAttribute('href', URL)
  },[])

  return (
    <div className="App" style={styleBg}>
      <div className="header">
        <h2 className="header-title">FreeCodeCamp</h2>
        <h1 className="header-title">Front End Libraries Projects - Random Quote Machine</h1>
      </div>
      <div id="wrapper">
        <div id="quote-box">
          <div className="quote-text">
            <i className="fa fa-quote-left" style={styleColor}> </i><span id="text" style={styleColor}>{state.text}</span>
          </div>
          <div className="quote-author">
            - <span id="author" style={styleColor}>{state.author}</span>
          </div>
          <div className="buttons">
            <a className="button" id="tweet-quote" title="Tweet this quote!" target="_blank" onClick={postTweet}>
              <i className="fa fa-twitter"></i>
            </a>
            <a className="button" id="tumblr-quote" title="Post this quote on tumblr!" target="_blank" onClick={postTumblr}>
              <i className="fa fa-tumblr"></i>
            </a>
            <button className="button" id="new-quote" onClick={handleClick}>New quote</button>
          </div>
        </div>
        <div className="footer"> by <a href="https://codepen.io/carllewis27/">Carl Lewis</a></div>
      </div>
    </div>
  );
}

export default App;
