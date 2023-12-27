import React, { useRef, useState } from 'react';
import { Button, Drawer, Input, Stack, Icon, Header, Tooltip, Divider, Dropdown, DropdownItem } from "@nordhealth/react";

export const SettingDrawer = (props) => {
  const closeDrawer = () => {
    props.closeButtonHandler();
  };

  const inputElement = useRef(null);

  const currentParams = new URL(window.location.href).searchParams;
  const paramLocationString =
    currentParams.has('location')
      ? decodeURI(currentParams.get('location'))
      : "";

  const [prefId, setPrefId] = useState(
    currentParams.has('pref')
      ? currentParams.get('pref')
      : 25)

  const applyHandler = () => {
    let currentUrl = new URL(window.location.href);

    const inputText = inputElement.current.value;
    if (inputText) {
      currentUrl.searchParams.set("location", inputText);
    }
    else {
      currentUrl.searchParams.delete("location");
    }

    if (prefId) {
      currentUrl.searchParams.set("pref", prefId)
    }

    console.log("redirect to:", currentUrl.toString());
    /* rediect */
    window.location.href = encodeURI(currentUrl.toString());
  };

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
            <Icon name="interface-help" class="n-margin-is-s" size='s' aria-describedby="tooltip-not-tested" />
          </p>
          <Input ref={inputElement} value={paramLocationString ? paramLocationString : ""} placeholder='静岡県浜松市中区' expand>
          </Input>

          <Tooltip id="tooltip-not-tested">バグるかも</Tooltip>
        </Stack>

        <Divider></Divider>

        <LaderLocationSelector prefId={prefId} setPrefId={setPrefId} />
      </Stack>

      <Stack slot='footer' direction="horizontal" justify-content="end" gap="s">
        <Button onClick={closeDrawer}>Cancel</Button>
        <Button onClick={applyHandler} variant="primary">Apply</Button>
      </Stack>
    </Drawer>
  );
};


const LaderLocationSelector = (props) => {
  const laderLocationData = [
    { title: "北海道 道北", prefId: 1 },
    { title: "北海道 道央", prefId: 2 },
    { title: "北海道 道東", prefId: 3 },
    { title: "北海道 道南", prefId: 4 },
    { title: "青森県", prefId: 5 },
    { title: "岩手県", prefId: 6 },
    { title: "宮城県", prefId: 7 },
    { title: "秋田県", prefId: 8 },
    { title: "山形県", prefId: 9 },
    { title: "福島県", prefId: 10 },
    { title: "茨城県", prefId: 11 },
    { title: "栃木県", prefId: 12 },
    { title: "群馬県", prefId: 13 },
    { title: "埼玉県", prefId: 14 },
    { title: "千葉県", prefId: 15 },
    { title: "東京都", prefId: 16 },
    { title: "神奈川県", prefId: 17 },
    { title: "新潟県", prefId: 18 },
    { title: "富山県", prefId: 19 },
    { title: "石川県", prefId: 20 },
    { title: "福井県", prefId: 21 },
    { title: "山梨県", prefId: 22 },
    { title: "長野県", prefId: 23 },
    { title: "岐阜県", prefId: 24 },
    { title: "静岡県", prefId: 25 },
    { title: "愛知県", prefId: 26 },
    { title: "三重県", prefId: 27 },
    { title: "滋賀県", prefId: 28 },
    { title: "京都府", prefId: 29 },
    { title: "大阪府", prefId: 30 },
    { title: "兵庫県", prefId: 31 },
    { title: "奈良県", prefId: 32 },
    { title: "和歌山県", prefId: 33 },
    { title: "鳥取県", prefId: 34 },
    { title: "島根県", prefId: 35 },
    { title: "岡山県", prefId: 36 },
    { title: "広島県", prefId: 37 },
    { title: "山口県", prefId: 38 },
    { title: "徳島県", prefId: 39 },
    { title: "香川県", prefId: 40 },
    { title: "愛媛県", prefId: 41 },
    { title: "高知県", prefId: 42 },
    { title: "福岡県", prefId: 43 },
    { title: "佐賀県", prefId: 44 },
    { title: "長崎県", prefId: 45 },
    { title: "熊本県", prefId: 46 },
    { title: "大分県", prefId: 47 },
    { title: "宮崎県", prefId: 48 },
    { title: "鹿児島県", prefId: 49 },
    { title: "沖縄県", prefId: 50 },
  ]

  const currentPrefId = parseInt(props.prefId)
  const currentData = laderLocationData.find((data) => { return data.prefId === currentPrefId })
  const currentTitle = currentData ? currentData.title : ""
  const currentId = laderLocationData.findIndex((data) => { return data.prefId === currentPrefId })

  const dropDown = useRef(null)

  return (
    <Stack direction='vertical'>
      <p>
        Lader Location (Experimental)
        <Icon name="interface-help" class="n-margin-is-s" size='s' aria-describedby="tooltip-not-implemeted" />
        <Tooltip id="tooltip-not-implemeted" >たぶん動く</Tooltip>
      </p>
      <Dropdown ref={dropDown} size='s'>
        <Button slot='toggle'>{currentTitle}</Button>
        {
          laderLocationData.map((data, index) => {
            return (
              <DropdownItem key={index} onClick={()=>{props.setPrefId(data.prefId); dropDown.current.hide()}}>
                {data.title}
                {(index === currentId) ? <Icon slot="end" name="interface-checked" /> : <></>}
              </DropdownItem>)
          })
        }
      </Dropdown>
    </Stack>
  )
}