App = {
    getWeather: document.getElementById('getWeather'),
    userInput : document.getElementById('userInput'),
    init() {
        App.userInput.addEventListener('change', this.changeUserInput)
        App.getWeather.addEventListener('click', this.getWeatherFromApi)
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