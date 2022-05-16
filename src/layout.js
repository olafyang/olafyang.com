export function getItemsWithLayout(items, options) {
  let layout = require("justified-layout")(
    items.map((item) => item.aspectRatio),
    options
  );
  let itemsWithLayout = [];
  for (let i = 0; i < items.length; i++) {
    itemsWithLayout.push({
      ...items[i],
      layout: layout.boxes[i],
    });
  }
  return itemsWithLayout;
}
