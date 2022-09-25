import axios from "axios";

export const getWeatherForACity = async(city) => {
    try{
        let weather=await axios.get('https://api.weatherapi.com/v1/current.json?key=575728534cb84f3abca53909220806&q='+city+'&aqi=no')
    }catch(e){

    }
    return weather.data.current.temp_c
}