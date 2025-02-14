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

// Gère l'ajout de la classe "loaded" quand l'image est chargée
export function handleImageLoading() {
    document.querySelectorAll(".blurred-img").forEach(blurredDiv => {
        const img = blurredDiv.querySelector("img");
        if (img.complete) {
            blurredDiv.classList.add("loaded");
        } else {
            img.addEventListener("load", () => blurredDiv.classList.add("loaded"));
        }
    });
}
