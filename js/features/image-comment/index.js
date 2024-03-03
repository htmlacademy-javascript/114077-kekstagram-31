// <li className="social__comment">
//   <img
//     className="social__picture"
//     src="{{аватар}}"
//     alt="{{имя комментатора}}"
//     width="35" height="35">
//     <p className="social__text">{{текст комментария}}</p>
// </li>

const createBaseElement = () => {
  const li = document.createElement('li');
  li.classList.add('social__comment');

  return li;
};

const createAvatarElement = (url, name) => {
  const img = document.createElement('img');

  img.classList.add('social__picture');
  img.src = url;
  img.alt = name;

  return img;
};

const createMessageElement = (message) => {
  const p = document.createElement('p');

  p.classList.add('social__text');
  p.textContent = message;

  return p;
};

/**
 * @param { CommentItem } commentItem
 *
 * @param commentItem.name
 * @param commentItem.avatar
 * @param commentItem.message
 *
 * @return { HTMLLIElement }
 */
const createCommentElement = ({ name, avatar, message }) => {
  const li = createBaseElement();
  const img = createAvatarElement(avatar, name);
  const p = createMessageElement(message);

  li.appendChild(img);
  li.appendChild(p);

  return li;
};


export { createCommentElement };
