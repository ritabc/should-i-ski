import { SkiService } from './ski-service.js'


export class Algorithm {


shouldWeSki(city) {
  let skiService = new SkiService();
  let promise = skiService.getWeatherInfoByCity(city);

  promise.then(function(response) {
    let body = JSON.parse(response);
    let snowfall_cm = body.data.weather[0].hourly[0].snowfall_cm
      if (snowfall_cm >= 2){
        return true
      }
    })
  }
}
