import axios from 'axios'

const baseUrl = 'http://api.weatherstack.com/current'
// const baseExampleUrl = 'https://restcountries.eu/rest/v2/'
const apiKey = '0130c993c61dfb3fb071ee99bfcc735c'

const getWeatherByCapitalName = (capital) => {
  const promise = axios.get(`${baseUrl}?access_key=${apiKey}&query=${capital}`)
  // const data = {
  //   current: {
  //     temperature: 6,
  //     weather_icons: [
  //       'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png'
  //     ]
  //   }
  // }
  // const promise = axios.get(`${baseExampleUrl}name/vietnam`)
  return promise.then(response => response.data)
}

export default { getWeatherByCapitalName }
