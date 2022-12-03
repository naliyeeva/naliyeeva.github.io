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
        return kelvin - 273.15;
    },
    changeUserInput() {
        let userInputType = document.getElementById('userInput').value

        if(userInputType === 'geolocation') return false

        document.querySelectorAll('.input-block').forEach((block) => block.style.display = 'none')
        document.querySelector(`#${userInputType}-block`).style.display = 'block'
    },
    getWeatherFromApi() {
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
            let country = fetch('https://countriesnow.space/api/v0.1/countries/population/cities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ city: city }),
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        }

        fetch(url)
            .then(res => {
               console.log(res)         
            })
            .catch(err => {
               console.log(err)             
            })
    }
}

App.init();