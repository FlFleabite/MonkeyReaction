import React, { Component, createElement } from "react";
import { Helmet } from 'react-helmet';

export class WeatherForcast extends Component {
  constructor(props) {
    console.log(props.location )
    super(props);
    this.state = {
      url: "https://sitecreation.co.jp/wp-content/themes/emanon-premium-child/tpl/weather.js",
      location: props.location ? props.location : "静岡県浜松市中区"
    };
  }

  componentDidMount() {
    /* 30分毎の自動更新をフックする */
    setInterval(() => {
      const urlObj = new URL(this.state.url)
      const params = urlObj.searchParams
      params.set("t", new Date().getTime()) /* キャッシュ回避のために意味のない時刻情報をクエリに入れておく */
      this.setState({ url: urlObj.toString() })
      console.log("update weatherforcast")
    }, 1.8e+6)
  }

  render() {
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
  `;

    const scriptElement = createElement("script", { type: "text/javascript" },
      `weather_value = 7;
      lat = 34.710808;
      lon = 137.726303;
      inputText1 = '##LOCATION##';
      search_add = inputText1;
      `.replace('##LOCATION##', this.state.location))

    return (
      <div>
        <style>{css}</style>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.12/css/weather-icons.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.12/css/weather-icons-wind.css" />
        <Helmet>
          <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet" />
          <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
          {scriptElement}
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
}

export class Lader extends Component {
  constructor(props) {
    super(props);

    let currentUrl = new URL(window.location.href);
    const prefIdParam = currentUrl.searchParams.get('pref')
    const prefId = prefIdParam ? prefIdParam : 25
    this.state = {
      url: "https://static.tenki.jp/static-images/radar/recent/pref-" + prefId + "-large.jpg"
    };
  }
  
  componentDidMount() {
    /* 5分毎に再取得 */
    setInterval(() => {
      const urlObj = new URL(this.state.url)
      const params = urlObj.searchParams
      params.set("t", new Date().getTime()) /* キャッシュ回避のために意味のない時刻情報をクエリに入れておく */
      this.setState({ url: urlObj.toString() })
    }, 300000)
  }

  render() {
    return (
      <div>
        <a href="https://tenki.jp/radar/5/25/">
          <img id="rader-image" width="400" height="auto" src={this.state.url} alt="" />
        </a>
      </div>
    );
  }
}

