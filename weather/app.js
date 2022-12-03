App = {
    getWeather: document.getElementById('getWeather'),
    userInput : document.getElementById('userInput'),
    init() {
        App.userInput.addEventListener('change', this.changeUserInput)
        App.getWeather.addEventListener('click', this.getWeatherFromApi)
    },
    degreeToDirection(degree){
        const deg =  Math.floor((degree / 45) + 0.5);
        const directions = ["N","NE","E", "SE","S","SW","W","NW"];
        return directions[(deg % 8)]
    },
    tempConversion(kelvin) {
        kelvin = parseFloat(kelvin);
        return Math.round(kelvin - 273.15);
    },
    changeUserInput() {
        let userInputType = document.getElementById('userInput').value

        if(userInputType === 'geolocation') return false

        document.querySelectorAll('.input-block').forEach((block) => block.style.display = 'none')
        document.querySelector(`#${userInputType}-block`).style.display = 'block'
    },
    getWeatherFromApi() {
        document.getElementById('weather').style.display = 'flex';
        let lat = document.getElementById('lat').value
        let lon = document.getElementById('long').value
        let city  = document.getElementById('city').value.trim()
        let userInputType = document.getElementById('userInput').value

        if (userInputType === 'geo' && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                lat = position.coords.latitude;
                long = position.coords.longitude;
            }, (position) => {
                alert('please confirm your location')
            });
        }

        let url = userInputType === 'latlong' || userInputType === 'geo'
            ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=14d29a796f48584f82e8287e911bc6a9`
            : `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=14d29a796f48584f82e8287e911bc6a9`


        if(userInputType === 'city') {
            fetch('https://countriesnow.space/api/v0.1/countries/population/cities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ city: city }),
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                document.getElementById('country-name').innerHTML = `<b>Country</b>: ${data.data.country}`;
            })
            .catch(err => {
                console.log(err)
            })
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {


                
                console.log(data)

               document.getElementById('city-name').innerHTML = `<b>City</b>: ${data.name}`;
               data.weather.map(item => {
                let oldRes = document.getElementById('condition').innerHTML
                let condition = oldRes + " " + item.main;
                document.getElementById('condition').innerHTML = `<b>Condition</b>: ${condition.toLowerCase()}`;

               })
               data.weather.map(item => {
                let oldRes = document.getElementById('description').innerHTML
                let description = oldRes + " " + item.description;
                document.getElementById('description').innerHTML = `<b>Description</b>: ${description.toLowerCase()}`
               })
               document.getElementById('temperature').innerHTML = `<b>Temperature</b>: ${App.tempConversion(data.main.temp)} ℃`
               document.getElementById('min-temp').innerHTML = `<b>Mininimum temperature</b>: ${App.tempConversion(data.main.temp_min)} ℃`
               document.getElementById('max-temp').innerHTML = `<b>Maximum temperature</b>: ${App.tempConversion(data.main.temp_max)} ℃`
               document.getElementById('real-feel').innerHTML = `<b>Real-feel</b>: ${App.tempConversion(data.main.feels_like)} ℃`
               document.getElementById('humidity').innerHTML = `<b>Humidity</b>: ${data.main.humidity} %`;
               document.getElementById('pressure').innerHTML = `<b>Pressure</b>: ${data.main.pressure} Pa`;
               document.getElementById('wind-speed').innerHTML = `<b>Wind-speed</b>: ${data.wind.speed} m/s`;
               document.getElementById('wind-direction').innerHTML = `<b>Wind-direction</b>: ${data.wind.deg}, ${App.degreeToDirection(data.wind.deg)}`;
               document.getElementById('date-of-response').innerHTML = `<b>Response</b>: ${new Date(data.dt).toDateString()}`


               console.log(data.dt)
               console.log(new Date(data.dt).toLocaleString())
            })
            .catch(err => {
               console.log(err)             
            })
    }
}

App.init();