const request = require('request')


const forecast = (latitude,longitude,callback)=>{
    const location = latitude + ',' + longitude
    const url ='http://api.weatherstack.com/current?access_key=9a55f94f8881c22f0f40a685f5208ee0&query=' + location +'&units=m'
    
    ///response yerine  body kullanıldı ve kodda response.body yerine e body kullanılacak 
    request({url, json:true },(error,{body})=>{

        if (error) {

            callback('Low Level Error, pass string for error' , undefined)
        } 
        else if (body.success===false){
            callback(body.error, undefined)
        }
        else if ( body.current.length===0){
            callback('Coordinate error, pass string for error',undefined)
        }
        else {

            callback( undefined, {
                temperature: body.current.temperature ,
                feelslike: body.current.feelslike,
                pressure: body.current.pressure 
                
            }) 
        }

   })


}

module.exports = forecast
