let currentIndex = 0; // Indice de l'image actuellement affichée

async function fetchPhotos() {
  const accessKey = 'vZAOS5cFLoBG7VcIiJLAvWM6WrF5t7kQsVETjXRGhSw';  
  const apiUrl = `https://api.unsplash.com/photos/?client_id=${accessKey}&per_page=5`;

  // Essayer d'effectuer une requête pour obtenir les photos
try {
  // Faire une requête à l'API en utilisant l'URL apiUrl
  const response = await fetch(apiUrl);
    
  // Vérifier si la réponse est OK (statut HTTP 200-299)
  if (!response.ok) {
    // Si la réponse n'est pas OK, lancer une erreur avec le statut HTTP
    throw new Error(`Erreur HTTP! Statut: ${response.status}`);
  }

  // Si la réponse est OK, extraire les données JSON de la réponse
  const photos = await response.json();

  // Retourner les photos récupérées
  return photos;
} catch (error) {
  // Si une erreur se produit pendant la requête, la capturer ici
  console.error("Erreur lors de la requête :", error);

  // En cas d'erreur, retourner un tableau vide
  return [];
}

}

function shuffleArray(array) {
  // Algorithme de mélange de Fisher-Yates
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function displayPhoto(index) {
  const photoGallery = document.getElementById('photoGallery');
  const photos = await fetchPhotos();

  if (index < 0 || index >= photos.length) {
    console.error("Indice d'image invalide");
    return;
  }

  const imgElement = document.createElement('img');
  imgElement.src = photos[index].urls.regular;
  imgElement.alt = photos[index].alt_description;

  // Effacer le contenu précédent
  photoGallery.innerHTML = '';
  photoGallery.appendChild(imgElement);
}

async function nextPhoto() {
  currentIndex++;
  const photos = await fetchPhotos();

  if (currentIndex >= photos.length) {
    currentIndex = 0; // Revenir à la première image si on atteint la fin
  }

  displayPhoto(currentIndex);
}

document.addEventListener('DOMContentLoaded', () => {
  // Afficher la première photo lors du chargement initial
  displayPhoto(currentIndex);

  // Ajouter un gestionnaire d'événement pour le bouton
  document.getElementById('nextButton').addEventListener('click', nextPhoto);
});
