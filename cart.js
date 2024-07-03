function displayAllTrip() {
    fetch('https://tickethack-backend-mocha.vercel.app/cart')
        .then(response => response.json())
        .then(data => {

            if (data.trips[0].name) {
                document.querySelector('#cartContainer').innerHTML = ''
                document.querySelector('#totalContainer').style.display = "flex"

                let total = 0
                for (let i = 0; i < data.trips.length; i++) {
                    document.querySelector('#cartContainer').innerHTML += `<div           class="tripLine"> 
                    <span class="name"> ${data.trips[i].name}</span>
                    <span class="time"> ${data.trips[i].time}</span>
                    <span> ${data.trips[i].trip.price}€</span>
                    <span class="tripId">${data.trips[i].trip._id}</span> 
                    <button class="deleteButton">x</button>
                    </div>`
                    total += data.trips[i].trip.price;

                }

                document.querySelector('#resultSentence').innerHTML = `Total : ${total}€`

            }
        })
        .then(data => {
            let cartContainer = document.querySelector('#cartContainer');
            let tripsInCart = document.querySelectorAll('.deleteButton');

            for (let i = 0; i < tripsInCart.length; i++) {
                tripsInCart[i].addEventListener('click', function () {
                     let tripid=this.previousElementSibling.textContent;
                     console.log(tripid);
                    fetch(`https://tickethack-backend-mocha.vercel.app/cart/${tripid}`, { method: 'DELETE'} )
                    .then(response => response.json())
                    .then(data => {
                        if (data.deletedCount) {
                            tripsInCart[i].parentNode.remove();
                        }
                        // else { 
                        //     console.warn(data.message);
                        // }
                    });
                });
            }
            
        })
        .then(document.querySelector('#purchaseButton').addEventListener('click', function () {
            //On enregistre tous les documents dans booking
            let names = document.querySelectorAll(".name")
            let times = document.querySelectorAll(".time")
            let trips = document.querySelectorAll(".tripId")
        
            for (let i=0 ; i<names.length ; i++) {
            fetch('https://tickethack-backend-mocha.vercel.app/bookings',{
                                method: 'POST',
                                headers: {'Content-Type':'application/json'},
                                body: JSON.stringify({name : names[i].textContent, time : times[i].textContent, trip : trips[i].textContent})
                            })
            .then(response => response.json())
            .then(data => {
                if (data.result){
                    window.location.assign("bookings.html")
                }
            })
            let idTrip = trips[i].textContent
            fetch(`https://tickethack-backend-mocha.vercel.app/cart/${idTrip}`, { method: 'DELETE'})
            .then(response=>response.json())
            .then(data=> {
                if (data.result){
                    document.querySelector("#cartContainer").innerHTML=`<div id="cartContainer">
                    <span class="cartLine">No tickets in your cart.</span>
                    <span class="cartLine">Why not plan a trip?</span>
                    </div>`
                }
                })
        
                }
            }))
        

        
}

displayAllTrip();

