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
        console.log(city);
        $('#shouldWeSki').text("GET YOUR BOOTS ON!")
      } else {
          $('#shouldWeSki').text("Nope, TIME TO DRINK!")
      }

    })
  })
});
