// Importe les photos et gère l'affichage avec grid Masonry sur gallery.html
export async function loadGallery() {
    try {
        const response = await fetch('/src/photos.json');
        if (!response.ok) {
            throw new Error(`Erreur HTTP, status : ${response.status}`);
        }
        const data = await response.json();
        const grid = document.querySelector(".grid");
        const galleryImages = []; // tableau pour stocker les <img>
        const fragment = document.createDocumentFragment(); // pour éviter de multiples reflows
        const template = document.getElementById('photo-template');

        data.photos.forEach((photo) => {
            const clone = template.content.cloneNode(true);

            const img = clone.querySelector('img');
            img.src = photo.src;
            img.alt = photo.description;

            const span = clone.querySelector('.img-description');
            span.textContent = `${photo.description} / ${photo.place}`;

            fragment.appendChild(clone);
            galleryImages.push(img);
        });

        // Ajoute tous les éléments à la grille en une seule opération
        grid.appendChild(fragment);

        // Initialise Masonry
        const masonry = new Masonry(grid, {
            itemSelector: ".grid-item",
            // percentPosition: true
        });

        // Met à jour Masonry au fur et à mesure que les images se chargent
        imagesLoaded(grid).on('progress', function () {
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
