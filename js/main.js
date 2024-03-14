import { getData } from '/js/shared/api';
import { showExpiredToast } from '/js/shared/toast-message';

import { initModalHandlers } from '/js/shared/modal-handlers';
import { initUploadHandlers } from '/js/features/image-upload';
import { initScaleHandlers } from '/js/features/scale-control';
import { initEffectHandlers } from '/js/features/effect-control';
import { renderPreviewPictures, savePicturesInStore } from '/js/features/render-preview-pictures';
import { showFilters } from './features/previews-filter';


initModalHandlers();
initUploadHandlers();
initScaleHandlers();
initEffectHandlers();

getData()
  .then((data) => {
    renderPreviewPictures(data);
    savePicturesInStore(data);
  })
  .then(() => showFilters())
  .catch(() => showExpiredToast('data-error'));
