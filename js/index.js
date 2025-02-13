const galleryImages = document.querySelectorAll('#gallery .grid-item img');
const fullscreenImage = document.getElementById('fullscreenImage');
const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));

galleryImages.forEach(image => {
    image.addEventListener('click', function () {
        fullscreenImage.src = this.src;
        imageModal.show();
    });
});

const blurredImageDivs = document.querySelectorAll(".blurred-img");

blurredImageDivs.forEach((blurredImageDiv) => {
    const img = blurredImageDiv.querySelector("img")

    function loaded() {
        blurredImageDiv.classList.add("loaded")
    }

    if (img.complete) {
        loaded()
    } else {
        img.addEventListener("load", loaded)
    }
});