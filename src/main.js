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

// Fonction displayPhoto (Affichage d'une photo) :
// Cette fonction prend un indice en argument et utilise la fonction fetchPhotos pour obtenir la liste des photos.
// Elle vérifie si l'indice est valide, puis crée un élément image (<img>) avec la source (src) de la photo à l'indice spécifié.
// Elle efface tout le contenu précédent de la galerie d'images (photoGallery) et ajoute le nouvel élément image.

async function displayPhoto(index) {
  const photoGallery = document.getElementById('photoGallery');
  const photos = await fetchPhotos();

  if (index < 0 || index >= photos.length) {
    console.error("Indice d'image invalide");
    return;
  }

  const imgElement = document.createElement('img');
  imgElement.classList.add('img-small'); // Ajoutez la classe pour les images
  imgElement.src = photos[index].urls.regular;
  imgElement.alt = photos[index].alt_description;

  photoGallery.innerHTML = ''; // Effacer le contenu précédent
  photoGallery.appendChild(imgElement);
}




// Fonction nextPhoto (Affichage de la photo suivante) :
// Cette fonction incrémente l'indice actuel et appelle la fonction displayPhoto pour afficher la photo suivante. 
// Si l'indice dépasse la longueur des photos, il revient à zéro pour afficher la première photo.

async function nextPhoto() {
  currentIndex++;
  const photos = await fetchPhotos();

  if (currentIndex >= photos.length) {
    currentIndex = 0; // Revenir à la première image si on atteint la fin
  }

  displayPhoto(currentIndex);
}


// Événement "DOMContentLoaded" :
// L'événement DOMContentLoaded est utilisé pour s'assurer que le script est exécuté après
// le chargement complet du DOM. Lors de cet événement, la première photo est affichée initialement, et
// un gestionnaire d'événement est ajouté au bouton ayant l'ID nextButton. Lorsque ce bouton est cliqué, 
// la fonction nextPhoto est appelée pour afficher la photo suivante.


document.addEventListener('DOMContentLoaded', () => {
  // Afficher la première photo lors du chargement initial
  displayPhoto(currentIndex);

  // Ajouter un gestionnaire d'événement pour le bouton
  document.getElementById('nextButton').addEventListener('click', nextPhoto);
});