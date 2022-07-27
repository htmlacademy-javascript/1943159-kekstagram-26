import {generatePhotos} from './gallery.js';
import {setUserFormSubmit} from './validate-form.js';
import {uploadPhotosModal} from './edit-form.js';
import {getDataServer} from './api.js';
import {initFilter} from'./filter-img.js';

setUserFormSubmit();

uploadPhotosModal();

getDataServer((photos) => {
  generatePhotos(photos);
  initFilter(photos);
});
