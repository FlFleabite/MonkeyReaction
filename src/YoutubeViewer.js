import React from 'react';
import { Button, Input, Stack, Dropdown, DropdownItem, Icon } from "@nordhealth/react"

export function YoutubeViewer(props) {
  const youtubeId = props.youtubeId;
  const youtubeURL = youtubeId
  ? "https://www.youtube.com/embed/" + youtubeId + "?controls=0&autoplay=1&mute=1"
  : "https://www.youtube.com/embed/lsxYH2XQQCg?controls=0&autoplay=1&mute=1";

  return (
    <iframe className="youtube-embed" id="youtube-embed" width="100%" aspect-ratio="16 / 9" src={youtubeURL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
  );
}

export function YoutubeURLInput() {
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
   
    const dropdown = document.getElementById('template-dropdown');
    if (dropdown) {
      dropdown.hide()
    }
  }

  return (
    <Stack gap="s" direction="horizontal" justify-content="center" align-items="end" wrap>
      <div>URL</div>
      <Input id='youtube-url-input' placeholder='https://www.youtube.com/watch/?v=lsxYH2XQQCg'>
        <Dropdown id='template-dropdown' slot='end'>
          <Button slot='toggle'>
            <Icon name="arrow-down-small"></Icon>
          </Button>
          <DropdownItem onClick={() => insertURLText("https://www.youtube.com/watch/?v=lsxYH2XQQCg")}>
            Monkey
          </DropdownItem>
          <DropdownItem onClick={() => insertURLText("https://www.youtube.com/watch?v=HXp5x6llMo4")}>
            Bird
          </DropdownItem>
          <DropdownItem onClick={() => insertURLText("https://www.youtube.com/watch?v=3szkFHfr6sA")}>
            Panda
          </DropdownItem>
          <DropdownItem onClick={() => insertURLText("https://www.youtube.com/watch?v=s0IljzivoRY")}>
            Nyancat
          </DropdownItem>
          <DropdownItem onClick={() => insertURLText("https://www.youtube.com/watch?v=zxej04WQ9lI")}>
            Nyanko Kingdom
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
          <DropdownItem onClick={() => insertURLText("https://www.youtube.com/watch?v=P9C25Un7xaM")}>
            NASA
          </DropdownItem>
          <DropdownItem onClick={() => insertURLText("https://www.youtube.com/watch?v=7BGWIFgWMZg")}>
            Shin-Midosuji
          </DropdownItem>
          <DropdownItem onClick={() => insertURLText("https://www.youtube.com/watch?v=MLYAzkVCSps")}>
            Obento
          </DropdownItem>
          <DropdownItem onClick={() => insertURLText("https://www.youtube.com/watch?v=4GOt6b4kMjg")}>
            Otera
          </DropdownItem>
          <DropdownItem onClick={() => insertURLText("https://www.youtube.com/watch?v=9Bq76emgglg")}>
            ZAZA
          </DropdownItem>
        </Dropdown>
      </Input>
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

