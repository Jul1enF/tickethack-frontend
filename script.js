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
                document.querySelector('#resultContainer').innerHTML +=  `<div class="tripLine"> 
                <span> ${data.trips[i].departure} >  ${data.trips[i].arrival}</span>
                <span> ${data.trips[i].date} </span>
                <span> ${data.trips[i].price}</span> 
                <span class="book">Book</span>
                </div>`;
            }
        }
        else { // something went wrong  most probably missing or empty fields
            console.warn(data);
        }
    });
});
