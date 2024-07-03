function displayAllTrip(data){
    if (data.trips[0].name){
        document.querySelector('#bookingContainer').innerHTML=''
        document.querySelector('#enjoyContainer').style.display="flex"
    
    
        for (let i=0; i<data.trips.length ; i++){
            let currentTime = new Date()
            let departureTime = data.trips[i].trip.date
            let hours = (Date.parse(departureTime)-Date.parse(currentTime))/1000/60/60
            hours = Math.floor(hours)
            
            document.querySelector('#bookingContainer').innerHTML+=`<div           class="tripLine"> 
                    <span> ${data.trips[i].name}</span>
                    <span> ${data.trips[i].time}</span>
                    <span> ${data.trips[i].trip.price}€</span>
                    <span>Departure in ${hours} hours</span> 
                    `
        }
        
    }
        
}


fetch('https://tickethack-backend-mocha.vercel.app/bookings')
.then(response=>response.json())
.then(data => {
    displayAllTrip(data)
})