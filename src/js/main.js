import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles.css';
import { SkiService } from './ski-service.js'

$(document).ready(function() {
  $('#city-submit').click(function(e) {
    e.preventDefault();
    let city = $('#city').val();
    $('#city').val("");

    let skiService = new SkiService()
    let promise = skiService.getWeatherInfoByCity(city);

    promise.then(function(response){
      let body = JSON.parse(response);
      $('#output').text(`${body.data.nearest_area[0].areaName[0].value}`)
    })

  })
});
