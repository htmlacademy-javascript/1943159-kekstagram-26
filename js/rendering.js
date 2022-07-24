import {createFullSizePicture} from './full-size.js';

const pictureBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const publicationsFragment = document.createDocumentFragment();
const imageFilterContainer = document.querySelector('.img-filters');

const createPublicationsArray = (publicationElements) => {
  publicationElements.forEach(({url, likes, comments, description}) => {
    const publicationElement = pictureTemplate.cloneNode(true);
    publicationElement.querySelector('.picture__img').src = url;
    publicationElement.querySelector('.picture__likes').textContent = likes;
    publicationElement.querySelector('.picture__comments').textContent = comments.length;
    publicationsFragment.appendChild(publicationElement);
    publicationElement.addEventListener('click', () => {
      createFullSizePicture({url, likes, comments, description});
    });
  });
  pictureBlock.querySelectorAll('.picture').forEach((element) => {element.remove();});
  pictureBlock.appendChild(publicationsFragment);
  imageFilterContainer.classList.remove('img-filters--inactive');
};

export {createPublicationsArray};
