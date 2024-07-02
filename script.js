/*
Page d'accueil
La page d’accueil permet de rechercher un trajet en fonction 
 du départ, :        departureInput
 de l’arrivée :      arrivalInput
 et de la date. :    dateInput

La recherche devra être envoyée au backend qui renverra tous les trajets trouvés selon les paramètres de recherche
fetch(http://localhost:3000/trips
Le résultat de la recherche sera affiché sur la partie droite de la page d'accueil avec la possibilité d’ajouter les trajets au panier.

                      resultContainer
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
fetch('http://localhost:3000/trips', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ departure, arrival, date }),
}).then(response => response.json())
    .then(data => {
        if (data.result) {
            for (let i = 0; i < data.trips.length; i++) {
                console.log("FE:<<<BE",data);
                document.querySelector('#resultContainer').innerHTML += `<div class=""> ${data.trips[i].departure} ${data.trips[i].arrival} ${data.trips[i].date} ${data.trips[i].price} </div>`;
            }
        }
        else {
            console.warn(data);
        }
    });
});
