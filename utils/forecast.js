import request from 'postman-request'

export const forecast=(latitude,longitude,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=fddbba6538a75c804dc9ddbc333884d9&query='+latitude+','+longitude+'&units=f'
   
    request({url,json:true},(error, response, body) =>{
      if(error){
        //console.log('Unable to Connect to Geo Code API')
        callback(undefined,'Unable to connect to weather service!')
      }
      else if(body==undefined){
        //console.log('Check Latitude and Longitude')
        callback(undefined,'Unable to find location')
      }
      else{
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', body); // Print the HTML for the Google homepage.
      //const data=JSON.parse(body)
     // console.log(body.location)
   // console.log(body.current.precip)
     //console.log(data.location.country)
     callback(body.current.weather_descriptions[0] + " throughout the day. It is currently " + body.current.temperature + " degress out. There is a "+body.current.precip+"% chance of rain",undefined)

      }
    })
      
}

