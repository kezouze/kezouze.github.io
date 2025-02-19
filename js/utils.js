// Importe les photos et gère l'affichage avec grid Masonry sur gallery.html
export async function loadGallery() {
    try {
        const response = await fetch('/src/photos.json');
        const data = await response.json();
        const grid = document.querySelector(".grid");
        const galleryImages = []; // tableau pour stocker les <img>

        data.photos.forEach((photo) => {
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("grid-item", "col-lg-4", "col-md-6", "col-sm-12", "p-3");

            imageContainer.innerHTML = `
        <img src="${photo.src}" alt="${photo.description}" class="img-fluid" loading="lazy" decoding="async">
        <span class="img-description text-nowrap d-none d-md-block">
            ${photo.description} / ${photo.place}
        </span>
    `;

            grid.appendChild(imageContainer);

            // Récupère l'image pour l'ajouter au tableau des images de la galerie
            const img = imageContainer.querySelector("img");
            galleryImages.push(img);
        });

        // Initialise Masonry
        const masonry = new Masonry(grid, {
            itemSelector: ".grid-item",
            columnWidth: ".grid-sizer",
            percentPosition: true
        });

        // Met à jour Masonry après chargement des images
        imagesLoaded(grid).on('progress' , function () {
            masonry.layout();
        });

        // Intègre le plein écran en passant le tableau des images
        setupModal(galleryImages);

    } catch (error) {
        console.error("Erreur lors du chargement des images :", error);
    }
}

// Gère l'affichage des images en plein écran avec Bootstrap Modal
export function setupModal(galleryImages) {
    let currentIndex = 0;
    const fullscreenImage = document.getElementById('fullscreenImage');
    const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));

    function showImage(index) {
        currentIndex = (index + galleryImages.length) % galleryImages.length;
        fullscreenImage.src = galleryImages[currentIndex].src;
    }

    galleryImages.forEach((image, index) => {
        image.addEventListener('click', () => {
            showImage(index);
            imageModal.show();
        });
    });

    document.getElementById('prevBtn').addEventListener('click', () => showImage(currentIndex - 1));
    document.getElementById('nextBtn').addEventListener('click', () => showImage(currentIndex + 1));
}

