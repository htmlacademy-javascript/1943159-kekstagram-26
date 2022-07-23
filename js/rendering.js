import {createPhotoDescriptions} from './data.js';
import {createFullSizePicture} from './full-size.js';

const pictureBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const publicationsArray = createPhotoDescriptions();

const publicationsFragment = document.createDocumentFragment();

publicationsArray.forEach(({url, likes, comments, description}) => {
  const publicationElement = pictureTemplate.cloneNode(true);
  publicationElement.querySelector('.picture__img').src = url;
  publicationElement.querySelector('.picture__likes').textContent = likes;
  publicationElement.querySelector('.picture__comments').textContent = comments.length;
  publicationsFragment.appendChild(publicationElement);
  publicationElement.addEventListener('click', () => {
    createFullSizePicture({url, likes, comments, description});
  });
});

pictureBlock.appendChild(publicationsFragment);
