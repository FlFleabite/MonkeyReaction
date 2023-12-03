import './App.css';
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet';
import "@nordhealth/css"
import "@nordhealth/themes/lib/nord-dark.css"
import { Button, Input, Stack, Dropdown, DropdownItem } from "@nordhealth/react"

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

function WeatherForcast() {
  const css = `
  .max_temp{ 
    display:inline-block !important
  }
  .min_temp{
    display:inline-block !important
  }
  .temp{
    display:block !important
  }
  .rain_s{
    display:block !important
  }
  .pop-rain{undefined}
  .speed-wind{
    display:block !important
  }
  .deg-wind{undefined}
  .w_snow{undefined}
  .w_bg{
    background: rgb(46, 52, 64)
  }
  .w_title{
    color: rgb(216, 222, 233);
  }
  `

  return (
    <div>
      <style>{css}</style>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.12/css/weather-icons.min.css" />
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.12/css/weather-icons-wind.css" />
      <Helmet>
        <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet" />
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script type="text/javascript">
          weather_value = 7;
          lat = 34.710808;
          lon = 137.726303;
          inputText1 = "静岡県浜松市中区";
          search_add = "静岡県浜松市中区";
        </script>
        <script src="https://sitecreation.co.jp/wp-content/themes/emanon-premium-child/tpl/weather.js"></script>
        <link id="PageStyleSheet" rel="stylesheet" href="https://sitecreation.co.jp/wp-content/themes/emanon-premium-child/tpl/style.css" />
      </Helmet>
      <div id="weather-wrapper">
        <div id="weather1"></div>
        <div id="weather2"></div>
      </div>
    </div>
  );
}

function Lader() {
  return (
    <div>
      <a href="https://tenki.jp/radar/5/25/">
        <img width="400" height="auto" src="https://static.tenki.jp/static-images/radar/recent/pref-25-large.jpg" alt="" />
      </a>
    </div>
  );
}

function YoutubeViewer(props) {
  const youtubeId = props.youtubeId
  const youtubeURL = youtubeId
    ? "https://www.youtube.com/embed/" + youtubeId + "?controls=0&autoplay=1&mute=1"
    : "https://www.youtube.com/embed/lsxYH2XQQCg?controls=0&autoplay=1&mute=1"
  return (
    <iframe id="youtube-embed" width="600" height="338" src={youtubeURL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
  );
}

function YoutubeURLInput() {
  function onYoutubeGoButtonClicked() {
    const urlElement = document.getElementById("youtube-url-input")
    const urlString = urlElement.value

    if (urlString) {
      redirectWithYoutubeQuery(urlString)
    }
  }

  function insertURLText(text) {
    const urlElement = document.getElementById("youtube-url-input")
    if (urlElement) { urlElement.value = text }
    redirectWithYoutubeQuery(text)
  }

  return (
    <Stack gap="s" direction="horizontal" justify-content="center" align-items="end" wrap>
      <div>URL</div>
      <Dropdown>
        <Input id='youtube-url-input' slot="toggle"></Input>
        <DropdownItem onClick={() => insertURLText("https://www.youtube.com/watch/?v=lsxYH2XQQCg")}>
          Monkey
        </DropdownItem>
        <DropdownItem onClick={() => insertURLText("https://www.youtube.com/watch?v=xJ13WFvc6Do")}>
          AQUAPLANET JEJU
        </DropdownItem>
        <DropdownItem onClick={() => insertURLText("https://www.youtube.com/watch?v=gFRtAAmiFbE")}>
          Kabukicho
        </DropdownItem>
        <DropdownItem onClick={() => insertURLText("https://www.youtube.com/watch?v=x_fHq3B_UP4")}>
          "T2" HANEDA,Tokyo International Airport
        </DropdownItem>

      </Dropdown>
      <Button onClick={() => { onYoutubeGoButtonClicked() }}>
        <nord-icon name="arrow-refresh"></nord-icon>
      </Button>
    </Stack>
  )
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
