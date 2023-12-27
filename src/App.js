import './App.css';
import React, { useRef, useState } from 'react'
import dayjs from 'dayjs'
import "@nordhealth/css"
import "@nordhealth/themes/lib/nord-dark.css"
import { Button, Layout, Stack, Icon, Header } from "@nordhealth/react"

import { WeatherForcast, Lader } from './WeatherForcast';
import { YoutubeViewer, YoutubeURLInput } from './YoutubeViewer';
import { SettingDrawer } from './SettingDrawer';

const App = () => {
  let currentUrl = new URL(window.location.href);
  const videoId = currentUrl.searchParams.get('v')

  const closeDrawer = () => {
    setDrawerSlot(null)
  }

  const drawerElem = useRef(
    <SettingDrawer closeButtonHandler={closeDrawer}></SettingDrawer>
  )

  const [drawerSlot, setDrawerSlot] = useState(null)

  const handleToggleButton = () => {
    setDrawerSlot(drawerSlot ? null : drawerElem.current)
  }

  return (
    <main>
      <Layout id='layout'>

        <Header slot="header">
          <Clock class="n-margin-auto" />
          <Button slot='end' variant="plain" onClick={handleToggleButton} ><Icon name='navigation-settings' /></Button>
        </Header>

        {drawerSlot}

        <MainContents youtubeId={videoId} expand/>

      </Layout>
    </main>
  );
}

const Clock = () => {
  const day = function () {
    const dt = dayjs(new Date());
    const element = document.getElementById("time");
    element.innerHTML = `${dt.format('HH')}<span id="colon">:</span>${dt.format('mm')}<span id="colon">:</span>${dt.format('ss')}`;
  };
  setInterval(day, 1000)
  return (
    <Stack direction='vertical' justifyContent='center' alignItems='center'>
    <h1 className="time" id="time">Loading...</h1>
    </Stack>
  );
}

const MainContents = (props) => {
  return (
    <Stack direction='vertical' justifyContent='center' alignItems='center'>
      <WeatherComponens />
      <YoutubeComponents youtubeId={props.youtubeId}/>
    </Stack>
  );
}

const WeatherComponens = () => {
  let currentUrl = new URL(window.location.href);

  let paramLocationString
  if (currentUrl.searchParams.has('location')) {
    paramLocationString = decodeURI(currentUrl.searchParams.get('location'))
  }
  else {
    paramLocationString = "静岡県浜松市中区"
  }

  return (
    <Stack direction="horizontal" class="stack" justify-content="center" align-items="center">
      <WeatherForcast location={paramLocationString} />
      <Lader />
    </Stack>
  )
}

const YoutubeComponents = (props) => {
  return (
    <Stack direction='vertical' justify-content="center" align-items="center">
      <YoutubeViewer youtubeId={props.youtubeId} />
      <YoutubeURLInput />
    </Stack>
  )
}


export default App;
