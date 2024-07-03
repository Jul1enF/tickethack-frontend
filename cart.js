
function displayAllTrip(data){
    if (data.trips[0].name){
        document.querySelector('#cartContainer').innerHTML=''
        document.querySelector('#totalContainer').style.display="flex"
    
        let add = 0
    
        for (let i=0; i<data.trips.length ; i++){
            document.querySelector('#cartContainer').innerHTML+=`<div           class="tripLine"> 
                    <span> ${data.trips[i].name}</span>
                    <span> ${data.trips[i].time}</span>
                    <span> ${data.trips[i].trip.price}€</span>
                    <span class="tripId">${data.trips[i].trip._id}</span> 
                    <span class="deleteButton">x</span>
                    </div>`
    
                    add+=data.trips[i].trip.price
        }
        document.querySelector('#resultSentence').innerHTML=`Total : ${add}€`
    }
        
}


fetch('http://localhost:3000/cart')
.then(response=>response.json())
.then(data => {
    displayAllTrip(data)
    
})