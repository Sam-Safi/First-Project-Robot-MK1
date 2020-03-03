//run our function when the window is ready
//add the "async" keyword to flag our function as asynchronous
$().ready(async () => {
    const robo = new Robot(); //create a new robot - Mark One

    const roboWeatherWidgetOne = new RoboWidget($("#RoboWeatherResults1"), "robo weather");
    robo.addWeatherListener(roboWeatherWidgetOne.widgetWeatherCallback.bind(roboWeatherWidgetOne)); //use bind to preserve scope of the widget THIS, see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind


    const roboMovieWidgetTwo = new RoboWidget($("#RoboMovieResults2"), "robo movie");
    robo.addMovieListener(roboMovieWidgetTwo.widgetCallback.bind(roboMovieWidgetTwo));

})


