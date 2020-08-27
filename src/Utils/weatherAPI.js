/*
 * @Author: 代强
 * @Date: 2020-08-15 22:58:44
 * @LastEditTime: 2020-08-27 21:31:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ClothesManagerAPP/src/Utils/weatherAPI.js
 */
async function getWeatherObject(city){
    let result=await fetch('http://wthrcdn.etouch.cn/weather_mini?city='+city);
    let weatherObj=await result.json();
    return weatherObj;
}
export default getWeatherObject;
