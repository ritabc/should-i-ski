import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles.css';
import { SkiService } from './ski-service.js'
import { Algorithm} from './algorithm.js'

$(document).ready(function() {
  $('#city-submit').click(function(e) {
    e.preventDefault();
    let city = $('#city').val();
    $('#city').val("");

    let skiService = new SkiService()
    let promise = skiService.getWeatherInfoByCity(city);

    promise.then(function(response){
      let body = JSON.parse(response);
      console.log(body);
      $('#output').text(`${body.data.nearest_area[0].areaName[0].value}`)
      $('#temperature').text(`${body.data.weather[0].bottom[0].maxtempC}c`)
      $('#chanceOfSnow').text(`${body.data.weather[0].chanceofsnow}%`)
      let calc = new Algorithm()
      if (calc.shouldWeSki(body) == true){
        $('#shouldWeSki').text("GET YOUR BOOTS ON!")
      } else {
          $('#shouldWeSki').text("Nope, TIME TO DRINK!")
      }

      for(let i = 0; i < 6; i++) {
        let dayOneLow = body.data.weather[i].mid[0].mintempC
        let dayOneHigh = body.data.weather[i].mid[0].maxtempC
        let windspeed = body.data.weather[i].hourly[0].mid[0].windspeedKmph
        let iconAM = body.data.weather[i].hourly[2].bottom["0"].weatherIconUrl["0"].value
        let iconPM = body.data.weather[i].hourly[7].bottom["0"].weatherIconUrl["0"].value
        let dayHtml =
          `<div class='day-one card'>
            <div class="card-title">Expected Snowfall</div>
            <div>
              <h4>${dayOneLow}C/${dayOneHigh}C</h4>
              <h4>${windspeed}kmph</h4>
            </div>
            <div>
              <img src=${iconAM} alt="amPic">
              <img src=${iconPM} alt="pmPic">
            </div>
          </div>`
        console.log(dayHtml);
        $('.card-deck').append(dayHtml);

      }
    })
  })
});
