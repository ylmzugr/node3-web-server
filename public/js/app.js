console.log("Burası çalıştı")



////// çslıştırsn stript sayfa sonuna eklenir 
const weatherForm = document.querySelector('form')  // istenen sayfanın form elementini alır 
const search = document.querySelector('input')

const messagehtmlTag =  document.querySelector('p')  // doğrudan tag ismi html markupda ilk p nesnesini getiri
const messageClass =  document.querySelector('.ClassNEma') // . ile başlar ise ilk class neme nesneyi getirir
const messageOne =  document.querySelector('#message-1') //# ile başlar ise ID ye göre arar
const messageTwo =  document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()  /// bu satırla refresh engellenir
    
     const location = search.value
     const url = 'http://localhost:3000/weather?address=' + location

     fetch(url).then((response)=>{
        response.json().then((data)=>{
            if (data.error) {
                messageOne.textContent  = data.error
                messageTwo.textContent = ''
                
            } else {

    
            messageOne.textContent =  data.location
            messageTwo.textContent = data.temperature
               
            }
        })
    
    })
    
})