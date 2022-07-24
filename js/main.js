import './util.js';
import './data.js';
import './rendering.js';
import './full-size.js';
import './form.js';
import './image-editing.js';
import './upload-messages.js';
import './filters.js';
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
