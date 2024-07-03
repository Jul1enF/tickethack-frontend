/*
INSTRUCTIONS : elements #Ids/.ClassNames
"Page d'accueil
La page d’accueil permet de rechercher un trajet en fonction " 
 du départ, :        #departureInput
 de l’arrivée :      #arrivalInput
 et de la date. :    #dateInput

"La recherche devra être envoyée au backend qui renverra tous les trajets trouvés selon les paramètres de recherche"
--> fetch(http://localhost:3000/trips 
"Le résultat de la recherche sera affiché sur la partie droite de la page d'accueil avec la possibilité d’ajouter les trajets au panier." 
                      #resultContainer
*/



//Rechargement à chaque ouverture de la page de l'image et texte par défaut:
document.querySelector('#imageResult').src="./images/train.png";
document.querySelector('#phraseResult').textContent="It's time to book your futur trip.";



// Add eventListener for search button
document.querySelector('#search').addEventListener('click', function () {
    //// clean : let departure = { 
	//  departure : document.querySelector('#departureInput').value,
    //  arrival : document.querySelector('#arrivalInput').value,
    //  date : document.querySelector('#dateInput').value,
    // }
	const departure = document.querySelector('#departureInput').value;
    const arrival = document.querySelector('#arrivalInput').value;
    const date = document.querySelector('#dateInput').value;
    console.log(date)
// Search trips : method POST / pas de données sensibles nous aurions pu utiliser  GET+params
fetch('http://localhost:3000/trips', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ departure, arrival, date }),
}).then(response => response.json())
    .then(data => {
        
        if (data.result) {  // if successful search 
            // clear parent div resultContainer
            document.querySelector('#resultContainer').innerHTML="";
            // display result of search : "TripLines"
            for (let i = 0; i < data.trips.length; i++) {
                console.log("FE:<<<BE",data);

                let tripTime = new Date(data.trips[i].date).toLocaleTimeString().slice(0,5)

                document.querySelector('#resultContainer').innerHTML +=  `<div class="tripLine"> 
                <span> ${data.trips[i].departure} >  ${data.trips[i].arrival}</span>
                <span> ${tripTime} </span>
                <span> ${data.trips[i].price}€</span>
                <span class="tripId">${data.trips[i]._id}</span> 
                <button class="book">Book</button>
                </div>`;
            }

            const bookButtons = document.querySelectorAll('.book')
            for (let button of bookButtons){
                button.addEventListener('click', function (){
                    let name = this.parentNode.firstElementChild.textContent
                    let trip = this.previousElementSibling.textContent
                    let time=this.parentNode.firstElementChild.nextElementSibling.textContent

                    fetch('http://localhost:3000/cart',{
                        method: 'POST',
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify({name, time, trip})
                    })
                    .then(response=>response.json())
                    .then(data=> {if (data.result){
                        window.location.assign('./cart.html')}
                    })


                })
            }


        }
        else { // something went wrong  most probably missing or empty fields
            console.warn(data);
            document.querySelector('#imageResult').src="./images/notfound.png";
            document.querySelector('#phraseResult').textContent="No trip found.";
        }
    });
});
