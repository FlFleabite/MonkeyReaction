import './App.css';
import React, { useRef, useState } from 'react'
import dayjs from 'dayjs'
import "@nordhealth/css"
import "@nordhealth/themes/lib/nord-dark.css"
import { Button, Drawer, Input, Layout, Stack, Icon, Header, Tooltip, Dropdown, DropdownItem, Divider } from "@nordhealth/react"

import { WeatherForcast, Lader } from './WeatherForcast';
import { YoutubeViewer, YoutubeURLInput } from './YoutubeViewer';

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

const SettingDrawer = (props) => {
  const closeDrawer = () => {
    props.closeButtonHandler()
  }

  return (
    <Drawer slot="drawer">
      <Header slot="header">
        <h3 class="n-typescale-l n-truncate">Settings</h3>
        <Button slot="end" variant="plain" aria-describedby="close-sidebar" size="s" onClick={closeDrawer}>
          <Icon name="interface-close" size="s"></Icon>
        </Button>
        <Tooltip id="close-sidebar">Close</Tooltip>
      </Header>

      <Stack direction='vertical'>
        <Stack direction='vertical' gap="none">
          <p>Weather Forecast Location (Experimental)
            <Icon name="interface-help" class="n-margin-is-s" size='s' aria-describedby="tooltip-not-implemeted" />
          </p>
          <Input placeholder='静岡県浜松市中区' expand>
          </Input>
          <Tooltip id="tooltip-not-implemeted" >まだ実装してないよ</Tooltip>
        </Stack>

        <Divider></Divider>

        <Stack direction='vertical'>
          <p>
            Lader Location (Experimental)
            <Icon name="interface-help" class="n-margin-is-s" size='s' aria-describedby="tooltip-not-implemeted" />
          </p>
          <Dropdown size='s'>
            <Button slot='toggle' />
            <DropdownItem>
              静岡県
            </DropdownItem>
            <DropdownItem>
              愛知県
            </DropdownItem>
          </Dropdown>
        </Stack>
      </Stack>

      <Stack slot='footer' direction="horizontal" justify-content="end" gap="s">
        <Button onClick={closeDrawer}>Cancel</Button>
        <Button variant="primary" aria-describedby="tooltip-no-action">Apply</Button>
        <Tooltip id="tooltip-no-action" >なにもおきないよ</Tooltip>
      </Stack>
    </Drawer>
  )
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
  return (
    <Stack direction="horizontal" class="stack" justify-content="center" align-items="center">
      <WeatherForcast location="静岡県浜松市中区" />
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
