import {createPublicationsArray} from './rendering.js';
import {setUserFormSubmit} from './form.js';
import {overlayClose} from './form.js';
import {getData} from './api.js';
import {setFilters} from './filters.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

getData(createPublicationsArray);

getData((publicationElements) => {
  createPublicationsArray(publicationElements);
  setFilters(publicationElements, debounce(createPublicationsArray, RERENDER_DELAY));
});

setUserFormSubmit(overlayClose);
