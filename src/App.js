import './App.css';
import React from 'react'
import dayjs from 'dayjs'
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
  const day = function () {
    const dt = dayjs(new Date());
    const element = document.getElementById("time");
    element.innerHTML = `${dt.format('HH')}<span id="colon">:</span>${dt.format('mm')}<span id="colon">:</span>${dt.format('ss')}`;
  };
  setInterval(day, 1000)
  return (
    <div>
      <h1 className="time" id="time">Loading...</h1>
    </div>
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
