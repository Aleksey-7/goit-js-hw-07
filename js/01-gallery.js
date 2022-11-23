import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const cardsMarkup = createGalleryCardsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('afterbegin', cardsMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick);

function createGalleryCardsMarkup(_items) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">   
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>
    `;
    })
    .join('');
}

function onGalleryContainerClick(e) {
  e.preventDefault();
  const isGalleryImageEl = e.target.classList.contains('gallery__image');

  if (!isGalleryImageEl) {
    return;
  }

  const modal = basicLightbox.create(
    `
      <img src="${e.target.dataset.source}" width="800" height="600">
  `,
    {
      onShow: modal => document.addEventListener('keydown', onEscKeyPress),
      onClose: modal => document.removeEventListener('keydown', onEscKeyPress),
    }
  );
  modal.show();

  function onEscKeyPress(e) {
    if (e.code === 'Escape') {
      console.log(e);
      modal.close();
    }
  }
}
