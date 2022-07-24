import './util.js';
import './data.js';
import './rendering.js';
import './full-size.js';
import './form.js';
import './image-editing.js';
import './upload-messages.js';
import {createPublicationsArray} from './rendering.js';
import {setUserFormSubmit} from './form.js';
import {overlayClose} from './form.js';
import {getData} from './api.js';


getData(createPublicationsArray);

setUserFormSubmit(overlayClose);
