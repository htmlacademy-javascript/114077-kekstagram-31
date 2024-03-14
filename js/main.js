import { getData } from '/js/shared/api';
import { showExpiredToast } from '/js/shared/toast-message';

import { initModalHandlers } from '/js/shared/modal-handlers';
import { initUploadHandlers } from '/js/features/image-upload';
import { initScaleHandlers } from '/js/features/scale-control';
import { initEffectHandlers } from '/js/features/effect-control';
import { renderPreviewImages } from '/js/features/render-preview-images';


initModalHandlers();
initUploadHandlers();
initScaleHandlers();
initEffectHandlers();

getData()
  .then((data) => renderPreviewImages(data))
  .catch(() => showExpiredToast('data-error'));
