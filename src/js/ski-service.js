export class SkiService {

  
  getWeatherInfoByCity(city) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://api.worldweatheronline.com/premium/v1/ski.ashx?key=${process.env.API_KEY}&q=${city}&format=json&includeLocation=yes`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true)
      request.send();
    })
  }
}
