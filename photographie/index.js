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

            const blurredDiv = clone.querySelector('.blurred-img');
            blurredDiv.style.backgroundImage = `url(${photo.src.replace(".webp", "lowres.webp")})`;

            fragment.appendChild(clone);
            galleryImages.push(img);
        });

        // Ajoute tous les éléments à la grille en une seule opération
        grid.appendChild(fragment);
        // Puis on appelle loadImages pour gérer l'affichage
        loadImages();

        // Initialise Masonry
        const masonry = new Masonry(grid, {
            itemSelector: ".grid-item",
            // percentPosition: true
        });

        // Met à jour Masonry au fur et à mesure que les images se chargent
        imagesLoaded(grid).on('progress' /* 'always' */, function () {
            // always : appel une fois que toutes les images sont chargées, progress : appel à chaque image
            masonry.layout();
        });

        // Intègre le plein écran en passant le tableau des images
        setupModal(galleryImages);
    } catch (error) {
        console.error("Erreur lors du chargement des images :", error);
    }
}

function loadImages() {
    const blurredImageDivs = document.querySelectorAll(".blurred-img");
    
    blurredImageDivs.forEach((blurredImageDiv) => {
        const img = blurredImageDiv.querySelector("img");
        
        function loaded() {
            blurredImageDiv.classList.add("loaded");
            setTimeout(() => { // Évite un effet trop rapide
                blurredImageDiv.style.filter = "none";
            }, 1400);
        }
        
        if (img) {
            //console.log("Image trouvée :", img.src, "Complete:", img.complete);
            
            if (img.complete) {
                loaded();
            }
            
            img.addEventListener("load", loaded, { once: true }); // S'assure que l'événement ne se déclenche qu'une seule fois
        } else {
            console.log("Aucune image trouvée dans :", blurredImageDiv);
        }
    });
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
