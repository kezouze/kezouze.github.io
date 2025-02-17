// import { handleImageLoading, setupModal } from "./utils.js";

// async function loadGallery() {
//     document.addEventListener("DOMContentLoaded", async function () {
//         try {
//             const response = await fetch('/src/photos.json');
//             const data = await response.json();
    
//             const grid = document.querySelector(".grid");
    
//             data.photos.forEach((photo) => {
//                 const imageContainer = document.createElement("div");
//                 imageContainer.classList.add("grid-item", "col-md-4"); // Ajoute Bootstrap
    
//                 imageContainer.innerHTML = `
//                     <img src="${photo.src}" alt="${photo.description}" class="img-fluid" loading="lazy">
//                     <span class="img-description text-nowrap d-none d-md-block">${photo.description} / ${photo.place}</span>
//                 `;
    
//                 grid.appendChild(imageContainer);
//             });
    
//             // Initialise ou met à jour Masonry après ajout des images
//             const masonry = new Masonry(grid, {
//                 itemSelector: ".grid-item",
//                 columnWidth: ".grid-sizer",
//                 percentPosition: true
//             });
    
//             // Relance Masonry après le chargement des images
//             imagesLoaded(grid, function () {
//                 masonry.layout();
//             });
    
//         } catch (error) {
//             console.error("Erreur lors du chargement des images :", error);
//         }
//     });
    
// }
// // Chargement de la galerie
// loadGallery();
