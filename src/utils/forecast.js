const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=6a21521a066b0d4eac943157f99685a7&query=' +  latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
    if (error) {
        callback('Unable to connect to network service!', undefined)
    } else if (body.error) {
        callback('Unable to find location!', undefined)
    } else {
        callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress. It feels like ' + body.current.feelslike + ' degrees.')
    }
    })
}


module.exports = forecast