import React from 'react';
import { Button, Input, Stack, Dropdown, DropdownItem } from "@nordhealth/react"

export function YoutubeViewer(props) {
  const youtubeId = props.youtubeId;
  const youtubeURL = youtubeId
    ? "https://www.youtube.com/embed/" + youtubeId + "?controls=0&autoplay=1&mute=1"
    : "https://www.youtube.com/embed/lsxYH2XQQCg?controls=0&autoplay=1&mute=1";
  return (
    <iframe id="youtube-embed" width="600" height="338" src={youtubeURL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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

