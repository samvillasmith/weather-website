const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')
const messageThree = document.querySelector('#message-three')
const messageFour = document.querySelector('#message-four')
const messageFive = document.querySelector('#message-five')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''


    const location = search.value
    console.log(location)
    fetch(`http://api.weatherstack.com/current?access_key=6774e154742736221235aac348bb0d4e&query=${location}&units=f`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            if(data.error.code===615){
                messageOne.textContent = "Invalid location"
            } else if (data.error.code===601){
                messageOne.textContent = "Please enter a search term"
            }
        } else {
            messageOne.textContent = data.location.name
            messageTwo.textContent = data.current.weather_descriptions[0]
            messageThree.textContent = data.current.temperature + ' degrees F'
            messageFour.textContent = 'Feels like ' + data.current.feelslike + ' degrees F'
            messageFive.textContent = data.current.precip + '% precipitation'
        }
    })
})
})

