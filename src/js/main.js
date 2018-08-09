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

      let dayOneLow = body.data.weather[0].mid[0].mintempC
      let dayOneHigh = body.data.weather[0].mid[0].maxtempC
      $('#day-one-temps').text(`${dayOneLow}C/${dayOneHigh}C`)

      let windspeed = body.data.weather[0].hourly[0].mid[0].windspeedKmph
      $('#day-one-days').text(`${windspeed}kmph`);

      let iconAM = body.data.weather["0"].hourly[2].bottom["0"].weatherIconUrl["0"].value
      $('#day-one-pic').html(`<img src=${iconAM} alt="amPic">`)

      let iconPM = body.data.weather["0"].hourly[7].bottom["0"].weatherIconUrl["0"].value
      $('#night-one-pic').html(`<img src=${iconPM} alt="pmPic">`)


    })
  })
});
