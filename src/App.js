import './App.css';
import React from 'react'
import "@nordhealth/css"
import "@nordhealth/themes/lib/nord-dark.css"

import { WeatherForcast, Lader } from './WeatherForcast';
import { YoutubeViewer, YoutubeURLInput } from './YoutubeViewer';

function App() {
  let currentUrl = new URL(window.location.href);
  const videoId = currentUrl.searchParams.get('v')
  return (
    <div>
      <Header />
      <Body youtubeId={videoId} />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>Monkey Reaction</h1>
    </header>
  );
}

function Body(props) {
  return (<div>
    <WeatherForcast />
    <Lader />
    <YoutubeViewer youtubeId={props.youtubeId} />
    <YoutubeURLInput />
  </div>
  );
}


export default App;
