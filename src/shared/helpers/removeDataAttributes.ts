function removeAllDataAttributes(element: HTMLElement) {
  // Get a list of all attributes on the element
  const attributes = element.attributes;

  // Loop through the attributes and remove data attributes
  for (let i = attributes.length - 1; i >= 0; i--) {
    const attribute = attributes[i];
    if (attribute.name.startsWith("data-")) {
      element.removeAttribute(attribute.name);
    }
  }
}

export {
    removeAllDataAttributes
}
