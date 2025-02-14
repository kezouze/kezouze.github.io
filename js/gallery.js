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

// Gère l'ajout de la classe "loaded" quand l'image est chargée
function handleImageLoading() {
    document.querySelectorAll(".blurred-img").forEach(blurredDiv => {
        const img = blurredDiv.querySelector("img");
        if (img.complete) {
            blurredDiv.classList.add("loaded");
        } else {
            img.addEventListener("load", () => blurredDiv.classList.add("loaded"));
        }
    });
}

// Gère l'affichage des images en plein écran avec Bootstrap Modal
function setupModal(galleryImages) {
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

// Chargement de la galerie
loadGallery();
