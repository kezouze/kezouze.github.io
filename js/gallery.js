import { handleImageLoading, setupModal } from "./utils.js";

async function loadGallery() {
    try {
        const response = await fetch('/src/photos.json');
        const data = await response.json();

        const imageContainer = document.querySelector(".row");
        const galleryImages = [];
        const fragment = document.createDocumentFragment();

        data.photos.forEach((photo, index) => {
            const div = document.createElement("div");
            div.className = "col-md-4 mb-4 grid-item align-self-center";
            div.dataset.id = photo.id || index + 1;

            const photoId = photo.id ? photo.id : `placeholder-${index + 1}`; // Sécurise l'ID pour éviter "undefined"

            div.innerHTML = `
                <div class="blurred-img" style="background-image: url('src/photos/bulkresize/${photoId}.jpg')">
                    <img src="${photo.src}" alt="${photo.description}" class="img-fluid zoom-effect" loading="lazy">
                </div>
                <p class="text-start mt-2">${photo.description} / ${photo.place}</p>
            `;

            fragment.appendChild(div);
            galleryImages.push(div.querySelector("img"));
        });

        imageContainer.appendChild(fragment);

        handleImageLoading();
        setupModal(galleryImages);
    } catch (error) {
        console.error("Erreur lors du chargement des images :", error);
    }
}
// Chargement de la galerie
loadGallery();
