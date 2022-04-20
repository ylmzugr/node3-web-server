const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
console.log(__dirname)
console.log(path.join(__dirname,'../public'))

// efine paths
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Set up Handle bar engine and views location
app.set('view engine','hbs') // handle bar'ı register etmek için gerekli
app.set('views' , viewsPath) // eğer handlebar views lar için klasör adı tempates yerine views olsaydı bu satra gerek yoktu
hbs.registerPartials(partialsPath)

// setup static directoru to serve
app.use(express.static(publicDirectoryPath))

// app.com
//app.com/help
//app.com(about)
// req:request , res:response
// app.get('/',(req,res)=>{
//     res.send('<Hello Express>')

// })

// app.get('/help',(req,res)=>{
//     res.send({
//         name:'<h1>About</h1>',
//         age:27    
//     })

// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>'   
//     )

// })


app.get('',(req,res)=>{
    res.render('index', {
        title:'Weather App',
        name:'Ugur Yılmaz'
    })
})


app.get('/help',(req,res)=>{
    res.render('help', {
        title:'help Page',
        message:'Size Nasıl yardımcı olabilirim'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title:'About me',
        name:'Ugur Yılmaz'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address)
    {
        return res.send('Adres Girilmesi Zorunludu')

    }

    geocode(req.query.address,(error, {latitude,longitude,location}={})=>{
        if(error){
            return res.send({'error':error})
        }  
        forecast(latitude , longitude, (error, {feelslike,temperature})=>{
            if(error){
                return res.send({'error':error})
            }
            res.send({
                title:'weather',
                feelslike,
                temperature,
                location
                    
            })
        })
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404', {
        title:'404',
        name:'Ugur Yılmaz',
        errorMessage:'Yardım Detayı bulınamadı '
    })
})

app.get('*',(req,res)=>{
    res.render('404', {
        title:'404',
        name:'Ugur Yılmaz',
        errorMessage:'404 Sayfa Bulunamadı '
    })
})




app.listen(3000, ()=>{
    console.log('server ise up on port 3000')
})



