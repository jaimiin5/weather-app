let showTemp = () => {
    let userInput = document.getElementById('userInput').value;
    let city = userInput;

    navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;


        let apiUrl;
        if (!city) {
            apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=af9deb16fe2d241e4a5bdeaf5d6bcf6e`;

        } else {
            apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=af9deb16fe2d241e4a5bdeaf5d6bcf6e`;
        }

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {

                // name
                let city = document.getElementById('city');
                let name = data.name;
                city.textContent = name;

                //description
                let description = document.getElementById('description');
                let desc = data.weather[0].description;
                description.textContent = desc;

                // date
                let date = document.getElementById('date');
                let dt = new Date(data.dt * 1000);
                let hours = dt.getHours();
                let minute = dt.getMinutes();

                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                let monthindex = dt.getMonth()
                let month = monthNames[monthindex]

                let day = dt.getDate();

                date.textContent = 'Updated as of ' + hours + ':' + minute + '' + ' ' + month + ' ' + day;

                //temp
                let temp = data.main.temp
                tempCelsius = Math.round(temp - 273.15);
                let weather = document.getElementById('weather');
                weather.textContent = tempCelsius + '°';


                let iconId = data.weather[0].icon;
                let iconUrl = (`https://openweathermap.org/img/wn/${iconId}@2x.png`)
                let mainIcon = document.querySelector('.mainIcon');
                mainIcon.src = iconUrl;


                //feelslike
                let feelsLike = Math.round(data.main.feels_like - 273.15);
                let feelsLikeId = document.getElementById('feelsLikeId');
                feelsLikeId.textContent = 'feels like ' + feelsLike + '°';

                // pressure 
                let pressure = data.main.pressure
                let pressureId = document.getElementById('pressureId');
                pressureId.textContent = 'pressure  ' + pressure;

                // humidity
                let humidityId = document.getElementById('humidityId');
                let humidity = data.main.humidity;
                humidityId.textContent = 'humidity ' + humidity;

                // wind
                let windId = document.getElementById('windId');
                let wind = Math.round(data.wind.speed * 3.6)
                windId.textContent = 'wind ' + wind + ' Km/h';

                // visibility
                let visibilityId = document.getElementById('visibilityId');
                let visibility = (data.visibility / 1000);
                visibilityId.textContent = 'Visibility ' + visibility + ' Km/h';


            })
            .catch(err => console.error(err))

        let forecastApiUrl;
        if (!city) {
            forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=af9deb16fe2d241e4a5bdeaf5d6bcf6e`;
        } else {
            forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=af9deb16fe2d241e4a5bdeaf5d6bcf6e`;
        }

        fetch(forecastApiUrl)
            .then(response => response.json())
            .then(data => {

                const encounteredDates = {};       //object for storing dates here...
                let forecastIndex = 1; // Initialize forecast index
                let forecastIconIndex = 1;

                for (let i = 1; i < data.list.length; i++) {
                    let dateis = new Date(data.list[i].dt * 1000);
                    let datenow = dateis.getDate();
                    // console.log(datenow);   //this date is from api 

                    if (datenow !== new Date().getDate() && !encounteredDates[datenow]) {
                        encounteredDates[datenow] = true;   //so it will take date as never encountered before and store it
                        // console.log(encounteredDates);

                        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        let dayIndex = dateis.getDay();
                        let day1 = days[dayIndex];

                        // date and day
                        let forecastDayDate = document.querySelector(`.forecastDay${forecastIndex}-date`);
                        forecastDayDate.textContent = day1 + ' ' + datenow;

                        //forecasticon
                        let iconId = data.list[i].weather[0].icon;
                        let iconUrl = (`https://openweathermap.org/img/wn/${iconId}@2x.png`)
                        let forecastIcon = document.querySelector(`.forecastIcon${forecastIconIndex}`);
                        forecastIcon.src = iconUrl;


                        // temp
                        let temperature = document.querySelector(`.temperature${forecastIndex}`);
                        let tempData = Math.round(data.list[i].main.temp - 273);
                        temperature.textContent = tempData + '°';

                        //mintemp
                        let minTemp = document.querySelector(`.minTemp${forecastIndex}`);
                        let lowTemp = Math.round(data.list[i].main.temp_min - 273);
                        minTemp.textContent = lowTemp + '°';

                        // desc
                        let weatherDesc = document.querySelector(`.weather-desc${forecastIndex}`);
                        let wthrdesc = data.list[i].weather[0].description;
                        weatherDesc.textContent = wthrdesc;

                        forecastIndex++;
                        forecastIconIndex++;

                        if (forecastIndex && forecastIconIndex > 5) { // Break out if you've 
                            break;
                        }
                    }
                }




            })
            .catch(err => console.error(err))

    })


    // debugging.............................................................
    // for current weather
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=af9deb16fe2d241e4a5bdeaf5d6bcf6e`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // console.log('data', data.weather[0].icon);

            // name
            let city = document.getElementById('city');
            let name = data.name;
            city.textContent = name;

            //description
            let description = document.getElementById('description');
            let desc = data.weather[0].description;
            description.textContent = desc;

            // date
            let date = document.getElementById('date');
            let dt = new Date(data.dt * 1000);
            let hours = dt.getHours();
            let minute = dt.getMinutes();

            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            let monthindex = dt.getMonth()
            let month = monthNames[monthindex]

            let day = dt.getDate();

            date.textContent = 'Updated as of ' + hours + ':' + minute + '' + ' ' + month + ' ' + day;

            //temp
            let temp = data.main.temp
            tempCelsius = Math.round(temp - 273.15);
            let weather = document.getElementById('weather');
            weather.textContent = tempCelsius + '°';


            let iconId = data.weather[0].icon;
            let iconUrl = (`https://openweathermap.org/img/wn/${iconId}@2x.png`)
            let mainIcon = document.querySelector('.mainIcon');
            mainIcon.src = iconUrl;


            //feelslike
            let feelsLike = Math.round(data.main.feels_like - 273.15);
            let feelsLikeId = document.getElementById('feelsLikeId');
            feelsLikeId.textContent = 'feels like ' + feelsLike + '°';

            // pressure 
            let pressure = data.main.pressure
            let pressureId = document.getElementById('pressureId');
            pressureId.textContent = 'pressure  ' + pressure;

            // humidity
            let humidityId = document.getElementById('humidityId');
            let humidity = data.main.humidity;
            humidityId.textContent = 'humidity ' + humidity;

            // wind
            let windId = document.getElementById('windId');
            let wind = Math.round(data.wind.speed * 3.6)
            windId.textContent = 'wind ' + wind + ' Km/h';

            // visibility
            let visibilityId = document.getElementById('visibilityId');
            let visibility = (data.visibility / 1000);
            visibilityId.textContent = 'Visibility ' + visibility + ' Km/h';


        })
        .catch(err => console.error(err))



    // debugging for forecast weather.............................................

    forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=af9deb16fe2d241e4a5bdeaf5d6bcf6e`;
    fetch(forecastApiUrl)
        .then(response => response.json())
        .then(data => {

            const encounteredDates = {};       //object for storing dates here...
            let forecastIndex = 1;             // Initialize forecast index
            let forecastIconIndex = 1;

            for (let i = 1; i < data.list.length; i++) {
                let dateis = new Date(data.list[i].dt * 1000);
                let datenow = dateis.getDate();
                // console.log(datenow);   //this date is from api 

                if (datenow !== new Date().getDate() && !encounteredDates[datenow]) {
                    encounteredDates[datenow] = true;   //so it will take date as never encountered before and store it
                    // console.log(encounteredDates);

                    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    let dayIndex = dateis.getDay();
                    let day1 = days[dayIndex];

                    // date and day
                    let forecastDayDate = document.querySelector(`.forecastDay${forecastIndex}-date`);
                    forecastDayDate.textContent = day1 + ' ' + datenow;

                    //forecasticon
                    let iconId = data.list[i].weather[0].icon;
                    let iconUrl = (`https://openweathermap.org/img/wn/${iconId}@2x.png`)
                    let forecastIcon = document.querySelector(`.forecastIcon${forecastIconIndex}`);
                    forecastIcon.src = iconUrl;


                    // temp
                    let temperature = document.querySelector(`.temperature${forecastIndex}`);
                    let tempData = Math.round(data.list[i].main.temp - 273);
                    temperature.textContent = tempData + '°';

                    //mintemp
                    let minTemp = document.querySelector(`.minTemp${forecastIndex}`);
                    let lowTemp = Math.round(data.list[i].main.temp_min - 273);
                    minTemp.textContent = lowTemp + '°';

                    // desc
                    let weatherDesc = document.querySelector(`.weather-desc${forecastIndex}`);
                    let wthrdesc = data.list[i].weather[0].description;
                    weatherDesc.textContent = wthrdesc;

                    forecastIndex++;
                    forecastIconIndex++;

                    if (forecastIndex && forecastIconIndex > 5) { // Break out if you've 
                        break;
                    }
                }
            }




        })
        .catch(err => console.error(err))

}//showtemp func
window.onload = (event) => {
    showTemp();
};