fetch('/src/photos.json')
    .then(response => response.json())
    .then(data => {
        const imageContainer = document.querySelector(".row");
        let galleryImages = [];

        data.photos.forEach((photo, index) => {
            const div = document.createElement("div");
            div.classList.add("col-md-4", "mb-4", "grid-item", "align-self-center");
            div.dataset.id = photo.id || index + 1; // ajout d'un id si absent

            const blurredImageDiv = document.createElement("div");
            blurredImageDiv.classList.add("blurred-img");
            blurredImageDiv.style.backgroundImage = `url('src/photos/bulkresize/${photo.id}.jpg')`;

            const img = document.createElement("img");
            img.src = photo.src;
            img.alt = photo.description;
            img.classList.add("img-fluid", "zoom-effect");
            img.loading = "lazy";

            const caption = document.createElement("p");
            caption.classList.add("text-start", "mt-2");
            caption.textContent = `${photo.description} / ${photo.place}`;

            blurredImageDiv.appendChild(img);
            div.appendChild(blurredImageDiv);
            div.appendChild(caption);
            imageContainer.appendChild(div);

            galleryImages.push(img);
        });

        const blurredImageDivs = document.querySelectorAll(".blurred-img");

        blurredImageDivs.forEach((blurredImageDiv) => {
            const img = blurredImageDiv.querySelector("img")

            function loaded() {
                blurredImageDiv.classList.add("loaded")
            }

            if (img.complete) {
                loaded()
            }
            else {
                img.addEventListener("load", loaded)
            }
        });

        let currentIndex = 0;
        const fullscreenImage = document.getElementById('fullscreenImage');
        const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));

        function showImage(index) {
            if (index < 0) index = galleryImages.length - 1;
            if (index >= galleryImages.length) index = 0;
            fullscreenImage.src = galleryImages[index].src;
            currentIndex = index;
        }

        galleryImages.forEach((image, index) => {
            image.addEventListener('click', function () {
                showImage(index);
                imageModal.show();
            });
        });

        // Gestion des boutons précédent/suivant
        document.getElementById('prevBtn').addEventListener('click', () => showImage(currentIndex - 1));
        document.getElementById('nextBtn').addEventListener('click', () => showImage(currentIndex + 1));
    });