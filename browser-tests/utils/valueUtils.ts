export const hasLength = (element: Element) => {
  if (!element.textContent) {
    return false;
  }

  const text = element.textContent.trim();
  return text.length > 0;
};
