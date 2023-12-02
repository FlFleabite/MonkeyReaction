import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'

function App() {
  let currentUrl = new URL(window.location.href);
  const videoId = currentUrl.searchParams.get('v')
  return <div>
    <Header />
    <Body youtubeId={videoId} />
  </div>
    ;
}

function Header() {
  return <header>
    <h1>Monkey Reaction</h1>
  </header>;
}

function Body(props) {
  return <body><div>
      <YoutubeViewer youtubeId={props.youtubeId} />
      <YoutubeURLInput />
    </div></body>;
}

function YoutubeViewer(props) {
  const youtubeId = props.youtubeId
  const youtubeURL = youtubeId
                      ? "https://www.youtube.com/embed/" + youtubeId + "?controls=0&autoplay=1&mute=1"
                      : "https://www.youtube.com/embed/lsxYH2XQQCg?controls=0&autoplay=1&mute=1"
  return <iframe id="youtube-embed" width="600" height="340" src={youtubeURL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>;
}

function YoutubeURLInput() {
  return <div>
    <YoutubeURLTextInput />
    <YoutubeURLButton />
  </div>;
}

function YoutubeURLTextInput(props) {
  return <input value="" id="youtube-url-input" name="youtube-url-input" type="url" maxLength="512"/>;
}

function YoutubeURLButton() {
  function onYoutubeGoButtonClicked() {
    const urlElement = document.getElementById("youtube-url-input")
    const urlString = urlElement.value

    if (urlString) {
      redirectWithYoutubeQuery(urlString)
    }
  }

  return <input neme="youtube-url-go-button" type="button" value="GO" onClick={onYoutubeGoButtonClicked} />
}

function redirectWithYoutubeQuery(youtubeUrl) {
  var url = new URL(youtubeUrl)
  const videoId = url.searchParams.get("v")

  let currentUrl = new URL(window.location.href);

  currentUrl.searchParams.set("v", videoId)

  console.log("redirect to:", currentUrl.toString())
  /* rediect */
  window.location.href = currentUrl.toString()
}

export default App;
