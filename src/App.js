import './App.css';
import React from 'react'
import dayjs from 'dayjs'
import "@nordhealth/css"
import "@nordhealth/themes/lib/nord-dark.css"
import { Stack } from "@nordhealth/react"

import { WeatherForcast, Lader } from './WeatherForcast';
import { YoutubeViewer, YoutubeURLInput } from './YoutubeViewer';

function App() {
  let currentUrl = new URL(window.location.href);
  const videoId = currentUrl.searchParams.get('v')
  return (
    <>
      <Header />
      <Body youtubeId={videoId} />
    </>
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
    <h1 className="time" id="time">Loading...</h1>
  );
}

function Body(props) {
  return (
    <div>
      <WeatherComponens />
      <YoutubeComponents youtubeId={props.youtubeId}/>
    </div>
  );
}

function WeatherComponens() {
  return (
    <Stack direction="horizontal" class="stack" justify-content="center" align-items="center">
      <WeatherForcast location="静岡県浜松市中区" />
      <Lader />
    </Stack>
  )
}

function YoutubeComponents(props) {
  return (
    <div class="n-padding-be-m">
      <YoutubeViewer youtubeId={props.youtubeId} />
      <YoutubeURLInput />
    </div>
  )
}


export default App;
