import {createPhotoDescriptions} from './data.js';
import {createFullSizePicture} from './full-size.js';

const pictureBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const publicationsArray = createPhotoDescriptions();

const publicationsFragment = document.createDocumentFragment();

publicationsArray.forEach((photo) => {
  const publicationElement = pictureTemplate.cloneNode(true);
  publicationElement.querySelector('.picture__img').src = photo.url;
  publicationElement.querySelector('.picture__comments').textContent = photo.comments.length;
  publicationElement.querySelector('.picture__likes').textContent = photo.likes;
  publicationsFragment.appendChild(publicationElement);
  publicationElement.addEventListener('click', () => {
    createFullSizePicture(photo);
  });
});

pictureBlock.appendChild(publicationsFragment);
