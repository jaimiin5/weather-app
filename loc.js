let showTemp = () => {
    // Function to update the UI with weather data
    function updateWeatherUI(data) {
        // Update the UI with weather data
        let city = document.getElementById('city');
        city.textContent = data.name;

        //description
        let description = document.getElementById('description');
        description.textContent = data.weather[0].description;

        // date
        let date = document.getElementById('date');
        let dt = new Date(data.dt * 1000);
        date.textContent = 'Updated as of ' + dt.toLocaleString();

        //temp
        let temp = Math.round(data.main.temp - 273.15);
        let weather = document.getElementById('weather');
        weather.textContent = temp + '°';

        let iconId = data.weather[0].icon;
        let iconUrl = `https://openweathermap.org/img/wn/${iconId}.png`;
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
    }

    function updateforeCastWeatherUI(data) {
        const encounteredDates = {};
        let forecastIndex = 1;
        let forecastIconIndex = 1;

        for (let i = 1; i < data.list.length; i++) {
            let dateis = new Date(data.list[i].dt * 1000);
            let datenow = dateis.getDate();

            if (datenow !== new Date().getDate() && !encounteredDates[datenow]) {
                encounteredDates[datenow] = true;

                const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                let dayIndex = dateis.getDay();
                let day1 = days[dayIndex];

                let forecastDayDate = document.querySelector(`.forecastDay${forecastIndex}-date`);
                forecastDayDate.textContent = day1 + ' ' + datenow;

                let iconId = data.list[i].weather[0].icon;
                let iconUrl = (`https://openweathermap.org/img/wn/${iconId}@2x.png`)
                let forecastIcon = document.querySelector(`.forecastIcon${forecastIconIndex}`);
                forecastIcon.src = iconUrl;

                let temperature = document.querySelector(`.temperature${forecastIndex}`);
                let tempData = Math.round(data.list[i].main.temp - 273);
                temperature.textContent = tempData + '°';

                let minTemp = document.querySelector(`.minTemp${forecastIndex}`);
                let lowTemp = Math.round(data.list[i].main.temp_min - 273);
                minTemp.textContent = lowTemp + '°';

                let weatherDesc = document.querySelector(`.weather-desc${forecastIndex}`);
                let wthrdesc = data.list[i].weather[0].description;
                weatherDesc.textContent = wthrdesc;

                forecastIndex++;
                forecastIconIndex++;

                if (forecastIndex && forecastIconIndex > 5) {
                    break;
                }
            }
        }
    }

    // Function to fetch weather data
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
                console.log("Weather Data:", data);
                if (data.cod !== 200) {
                    alert('city not found');
                    // document.querySelector('.weather-details').innerHTML = "City not found";
                    // document.querySelector('.forecast').innerHTML = '';
                } else {
                    // Call updateWeatherUI function to update the UI with weather data
                    document.getElementById('city').textContent = data.name;
                    document.getElementById('description').textContent = data.weather[0].description;
                    console.log("Weather Data (Inside else):", data);
                    updateWeatherUI(data);
                }
            })
            .catch(err => console.error(err));

        let forecastApiUrl;
        if (!city) {
            forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=af9deb16fe2d241e4a5bdeaf5d6bcf6e`;
        } else {
            forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=af9deb16fe2d241e4a5bdeaf5d6bcf6e`;
        }

        fetch(forecastApiUrl)
            .then(response => response.json())
            .then(data => {
                updateforeCastWeatherUI(data);
                // const encounteredDates = {};
                // let forecastIndex = 1;
                // let forecastIconIndex = 1;

                // for (let i = 1; i < data.list.length; i++) {
                //     let dateis = new Date(data.list[i].dt * 1000);
                //     let datenow = dateis.getDate();

                //     if (datenow !== new Date().getDate() && !encounteredDates[datenow]) {
                //         encounteredDates[datenow] = true;

                //         const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                //         let dayIndex = dateis.getDay();
                //         let day1 = days[dayIndex];

                //         let forecastDayDate = document.querySelector(`.forecastDay${forecastIndex}-date`);
                //         forecastDayDate.textContent = day1 + ' ' + datenow;

                //         let iconId = data.list[i].weather[0].icon;
                //         let iconUrl = (`https://openweathermap.org/img/wn/${iconId}@2x.png`)
                //         let forecastIcon = document.querySelector(`.forecastIcon${forecastIconIndex}`);
                //         forecastIcon.src = iconUrl;

                //         let temperature = document.querySelector(`.temperature${forecastIndex}`);
                //         let tempData = Math.round(data.list[i].main.temp - 273);
                //         temperature.textContent = tempData + '°';

                //         let minTemp = document.querySelector(`.minTemp${forecastIndex}`);
                //         let lowTemp = Math.round(data.list[i].main.temp_min - 273);
                //         minTemp.textContent = lowTemp + '°';

                //         let weatherDesc = document.querySelector(`.weather-desc${forecastIndex}`);
                //         let wthrdesc = data.list[i].weather[0].description;
                //         weatherDesc.textContent = wthrdesc;

                //         forecastIndex++;
                //         forecastIconIndex++;

                //         if (forecastIndex && forecastIconIndex > 5) {
                //             break;
                //         }
                //     }
                // }
            })
            .catch(err => console.error(err))
    });
    // debugging.............................................................
    // for current weather
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=af9deb16fe2d241e4a5bdeaf5d6bcf6e`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            updateWeatherUI(data);
        })
        .catch(err => console.error(err))


    // debugging for forecast weather.............................................

    forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=af9deb16fe2d241e4a5bdeaf5d6bcf6e`;
    fetch(forecastApiUrl)
        .then(response => response.json())
        .then(data => {
            updateforeCastWeatherUI(data);
        })
        .catch(err => console.error(err))

}
// Event listener for Enter key press
document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        showTemp();
    }
});

// Call showTemp function on page load
window.onload = (event) => {
    showTemp();
};
