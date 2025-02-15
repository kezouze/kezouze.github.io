import { handleImageLoading, setupModal } from "./utils.js";
handleImageLoading();

const galleryImages = document.querySelectorAll('#gallery .grid-item img');
setupModal(galleryImages);

