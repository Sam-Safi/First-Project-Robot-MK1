class Robot {
    constructor() {
        //todo setup the robo webpage here
        this.roboElement = $('#roboMK1'); //store a refernce to the robo DOM element 
        this.homeCity = "I don't know where I live :(";
        this.favoriteMovie = "Maybe we like the same move... I forgot what mine is!";
        this.roboName = "I don't know my name ether :";
        this.homeCitySet = false; //set to true when home city is set via the DOM
        this.favMovieSet = false; //set to true when favorite move is set via the DOM
        this.roboNameSet = false;
      



        $('#setMK1City').click(() => this.showHomeCityForm());
        $('#setMK1Movie').click(() => this.showFavMovieForm());
        $('#setMK1Name').click(() => this.showRoboNameForm());
       
     

        //setup the weather event listeners and movie
        this.weatherEventListeners = [];
        this.movieEventListeners = [];



        this.updateMK1Status();
    }

    addWeatherListener(widgetCallbackFunction) {
        this.weatherEventListeners.push(widgetCallbackFunction);
    }

    notifyWeatherListeners(weather, icon) {
        for (let i = 0; i < this.weatherEventListeners.length; i++) {
            this.weatherEventListeners[i](weather, icon);
        }
    }


    addMovieListener(widgetCallbackFunction) {
        this.movieEventListeners.push(widgetCallbackFunction);
    }

    notifyMovieListeners(movie) {
        for (let i = 0; i < this.movieEventListeners.length; i++) {
            this.movieEventListeners[i](movie);
        }
    }


    updateMK1Status() {
        $('#MK1statusMovie').text(this.favoriteMovie);
        $('#MK1statusCity').text(this.homeCity);
        $('#MK1statusName').text(this.roboName);



        // $('MK1statusLocation').text(this.findWeather);

    }

    clearPreviousContainer() {
        $('.setting').remove();

    }

    /***
     *  returns the weather result for a given city
     *  cityToSearch is a string
     */
    async getWeather(cityToSearch) {
        const weatherPromise = await $.ajax({ url: `https://api.openweathermap.org/data/2.5/weather?q=${cityToSearch}&APPID=3fb093aca8e1c227bdf47b640034a3b1&units=metric` });

        this.notifyWeatherListeners(weatherPromise, this.getWeatherIconFromResult(weatherPromise));

        return weatherPromise;
    }

    getWeatherIconFromResult(weatherResult) {
        const url = `https://openweathermap.org/img/wn/${weatherResult.weather[0].icon}@2x.png`;

        return `<img height="" src="${url}">`;
    }



    async getMovie(movieToSearch) {
        const movie = await $.ajax({ url: `http://www.omdbapi.com/?t=${movieToSearch}&apikey=426840d6` });
        this.notifyMovieListeners(movie, this.getMovieIconFromResult(movie));
        return movie;
    }

    getMovieIconFromResult(movieResult) {
        console.log('getMovieIconFromResult:', movieResult);
        const url = movieResult.Poster;
        return `<img height="" src="${url}">`;
    }


    /***
     * adds the fav movie form to the dom
     */
    showFavMovieForm() {
        console.log("show movie form");

        this.clearPreviousContainer();


        //add the form to the DOM
        this.roboElement.append(`
        <div class="col-8 setting" id="mk1Settings">    
            <div class="jumbotron">
                <h1 class="display-4">Set my Favorite Movie!</h1>
                <hr class="my-4">
                <form id="mk1SettingsForm">
                    <div class="form-group">
                        <label for="mk1CityInput">MK1 Favorite Movie</label>
                        <input type="text" class="form-control" id="mk1MovieInput" placeholder="Enter Movie Name!">                    
                    </div>                
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>`);

        //handle the form
        $("#mk1SettingsForm").submit((event) => {
            event.preventDefault(); //standard practice see here: https://api.jquery.com/submit/

            //set the robots favorite movie
            this.favoriteMovie = $('#mk1MovieInput').val();
            this.favMovieSet = true;
            console.log("Robot favorite movie set to: " + this.favoriteMovie);

            this.clearPreviousContainer();


            this.roboSystemsCheck(); //see if all infomation has been collected

        });
    }




    /***
     * adds the home city form to the dom
     */
    showHomeCityForm() {
        console.log("show city form");

        this.clearPreviousContainer();

        //add the form to the DOM
        this.roboElement.append(`
        <div class="col-8 setting" id="mk1Settings">    
            <div class="jumbotron">
                <h1 class="display-4">Set my home City!</h1>
                <hr class="my-4">
                <form id="mk1SettingsForm">
                    <div class="form-group">
                        <label for="mk1CityInput">MK1 Home City</label>
                        <input type="text" class="form-control" id="mk1CityInput" placeholder="Enter City!">                    
                    </div>                
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>`);

        //handle the form
        $("#mk1SettingsForm").submit((event) => {
            event.preventDefault(); //standard practice see here: https://api.jquery.com/submit/

            //set the home city
            this.homeCity = $('#mk1CityInput').val();
            this.homeCitySet = true;
            console.log("Robot home city set to: " + this.homeCity);

            //remove the settings 
            this.clearPreviousContainer();


            this.roboSystemsCheck(); //see if all infomation has been collected
        });
    }



    showRoboNameForm() {
        console.log("show name form");

        this.clearPreviousContainer();


        //add the form to the DOM
        this.roboElement.append(`
        <div class="col-8 setting " id="mk1Settings">    
            <div class="jumbotron">
                <h1 class="display-4">Set my name!</h1>
                <hr class="my-4">
                <form id="mk1SettingsForm">
                    <div class="form-group">
                        <label for="mk1CityInput">MK1 Name</label>
                        <input type="text" class="form-control" id="mk1NameInput" placeholder="Enter Robot Name!">                    
                    </div>                
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>`);

        //handle the form
        $("#mk1SettingsForm").submit((event) => {
            event.preventDefault(); //standard practice see here: https://api.jquery.com/submit/

            //set the robots name
            this.roboName = $('#mk1NameInput').val();
            this.roboNameSet = true;
            console.log("Robot name set to: " + this.roboName);

            this.clearPreviousContainer();
            $('#robot-name').text(this.roboName);



            this.roboSystemsCheck(); //see if all infomation has been collected

        });
    }


    /**
     * Add/Update the Robots hometown weather
     */
    showHomeTownWeather() {
        //get the weather
        this.getWeather(this.homeCity)
            .then((weather) => {
                console.log(weather);
                const icon = this.getWeatherIconFromResult(weather);


                this.clearPreviousContainer();


                //show the weather on the DOM        
                this.roboElement.append(`
        <div class="col-8 setting" id="mk1StatusJumbo">    
            <div class="jumbotron">
                <h1 class="display-4">I know where I live!</h1>
                <hr class="my-4">
                <p>
                I live in ${weather.name} and the tempreture is ${weather.main.temp} It looks something like this outside: ${icon}
                </p>
                
            </div>
        </div>`);

            })
            .catch((err) => console.log(err));
    }


    showHomeTownMovie() {
        //get the weather
        this.getMovie(this.favoriteMovie)
            .then((movie) => {
                console.log(movie);
                const icon = this.getMovieIconFromResult(movie);


                this.clearPreviousContainer();


                //show the weather on the DOM        
                this.roboElement.append(`
        <div class="col-8 setting" id="mk1StatusJumbo">    
            <div class="jumbotron">
                <h1 class="display-4">I know my favorite movie!</h1>
                <hr class="my-4">
                <p>
                My favorite movie is ${movie.Title} the picture looks something like this:
                </p>
                <img src="${movie.Poster}" />
            </div>
        </div>`);

            })
            .catch((err) => console.log(err));
    }

    /**
     * Check if all settings have been added
     */

    roboSystemsCheck() {
        if (this.homeCitySet) {
            console.log("Move and City set, time to query the API");
            this.homeCitySet = false;
            this.showHomeTownWeather();

        }
        if (this.favMovieSet) {
            console.log("Movie set, time to query the API");
            this.favMovieSet = false;
            this.showHomeTownMovie();

        }
        this.updateMK1Status();
    }
}