class RoboWidget {

  /**
   * 
   * Takes a UL element for adding widget information to
   * 
   * @param {*} widgetElement 
   */
  constructor(widgetElement, widgetType) {
    this.widgetElement = widgetElement;
    this.widgetElement.append(`<li class="list-group-item">List of ${widgetType} from the Robot</li>`)
  }


  widgetWeatherCallback(weather, icon) {
    this.widgetElement.append(`<li class="list-group-item">${weather.name} ${weather.main.temp} ${icon}</li>`)


  }
  widgetCallback(movie) {
    this.widgetElement.append(`<li class="list-group-item">${movie.Title}</li>`)

  }


}
