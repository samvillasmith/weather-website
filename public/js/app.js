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
    messageOne.textContent = ''
    messageTwo.textContent = ''


    const location = search.value

    fetch("/weather?address=" + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
                messageOne.textContent = data.error
            } else {
                console.log(data)
                messageOne.textContent = data.forecast
                messageTwo.textContent = data.location
        }
        })
    })
})

