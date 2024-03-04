// <template id="picture">
//   <a href="#" className="picture">
//     <img className="picture__img" src="" width="182" height="182" alt="Случайная фотография">
//       <p className="picture__info">
//         <span className="picture__comments"></span>
//         <span className="picture__likes"></span>
//       </p>
//   </a>
// </template>

/**
 * @param { PhotoItem } photoItem
 *
 * @param photoItem.id
 * @param photoItem.url
 * @param photoItem.description
 * @param photoItem.likes
 * @param photoItem.comments
 *
 * @returns { DocumentFragment }
 */
const createTileImage = ({ id, url, description, likes, comments }) => {
  const template = document.querySelector('#picture').content;
  const pictureEL = template.cloneNode(true);

  const linkEl = pictureEL.querySelector('.picture');
  const imgEl = pictureEL.querySelector('.picture__img');
  const commentsEl = pictureEL.querySelector('.picture__comments');
  const likesEl = pictureEL.querySelector('.picture__likes');

  linkEl.dataset.id = id;
  likesEl.textContent = likes;
  imgEl.src = url;
  imgEl.alt = description;
  commentsEl.textContent = comments.length;

  return pictureEL;
};

export { createTileImage };
