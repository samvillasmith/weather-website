const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=6774e154742736221235aac348bb0d4e&query=" + latitude + "," + longitude + "&units=f"
    request({ url, json: true }, (error, { body })=>{
            if(error){
                callback('Unable to connect to weather service.', undefined)
            } else if (body.error) {
                callback('Unable to find location.', undefined)
            } else {
                callback(undefined, `${body.current.weather_descriptions[0]}. ${body.current.observation_time} It is currently ${body.current.temperature} degrees outside. It feels like ${body.current.feelslike} degrees, the chance of rain is ${body.current.precip}%. Wind is currently ${body.current.wind_dir} at ${body.current.wind_speed} mph`)
            }
        })
}

module.exports = forecast



