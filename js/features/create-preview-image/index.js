// <template id="picture">
//   <a href="#" className="picture">
//     <img className="picture__img" src="" width="182" height="182" alt="Случайная фотография">
//       <p className="picture__info">
//         <span className="picture__comments"></span>
//         <span className="picture__likes"></span>
//       </p>
//   </a>
// </template>

const createPreviewImage = ({ url, description, likes, comments }) => {
  const template = document.querySelector('#picture').content;
  const pictureEL = template.cloneNode(true);

  // const linkEl = pictureEL.querySelector('.picture');
  const imgEl = pictureEL.querySelector('.picture__img');
  const commentsEl = pictureEL.querySelector('.picture__comments');
  const likesEl = pictureEL.querySelector('.picture__likes');

  likesEl.textContent = likes;
  imgEl.src = url;
  imgEl.alt = description;
  commentsEl.textContent = comments.length;

  return pictureEL;
};

export { createPreviewImage };
