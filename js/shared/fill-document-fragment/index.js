const fillDocumentFragment = (htmlElements) => {
  const fragment = document.createDocumentFragment();
  htmlElements.forEach((htmlElement) => fragment.append(htmlElement));
  return fragment;
};

export { fillDocumentFragment };
