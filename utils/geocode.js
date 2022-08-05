import request from 'postman-request'
export const location=(address,callback)=>{
    var geocodeURL= "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoidWpqYXdhbDI5MDQiLCJhIjoiY2w2MHJueGNtMDI0ZzNmbXJlNHczbnJkbCJ9.lDcB4ltw1vGWacNK7_KXnQ"
  request({url:geocodeURL,json:true},(error, response, body) =>{
    if(error){
      callback('Unable to Connect to Geo Code API',undefined)
    }
    else if(body.features.length==0){
      callback('Unable to find location. Try another search.',undefined) 
    }
    else{
    
    const latitude=body.features[0].geometry.coordinates[1]
    const longitude=body.features[0].geometry.coordinates[0]
    const location_name=body.features[0].place_name
    callback (undefined,{latitude,longitude,place_name:location_name})
   
    }
  })
  }