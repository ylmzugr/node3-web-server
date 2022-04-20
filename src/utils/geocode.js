const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURI(address) +'.json?access_token=pk.eyJ1IjoieWlsbWF6dWdyIiwiYSI6ImNsMXdtZXg2ZjM4b3czam8yNGswZTVkNjAifQ.ZaVbDrubgmWMwBdIb8WBIw'
    request({url, json:true },(error,{body})=>{
        if (error) {
          callback(' Location Servisine ulaşılamadı ' , undefined)
        } else if (body.features.length===0) {
          callback(' Lokasyon bulunamadı, bir başkasını deneyin ' , undefined)
        }
        else {
          console.log( '****' + encodeURI(address))
          console.log('****'+body.features[0].place_name)
          callback( undefined , {
              latitude:body.features[0].center[0],
              longitude:body.features[0].center[1],
              location:body.features[0].place_name
          })


        }
     
    })
  
  }



  module.exports  = geocode
