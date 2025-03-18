import createJustifiedLayout from "justified-layout";

type ItemType = Parameters<typeof createJustifiedLayout>[0][number];
type OptionsType = Parameters<typeof createJustifiedLayout>[1];

export default function useItemsLayout<T extends { aspectRatio: number }>(
  items: T[],
  options: OptionsType
) {
  let layout = createJustifiedLayout(
    items.map((item) => item.aspectRatio),
    options
  );
  let itemsWithLayout = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (typeof item === "number") continue;
    itemsWithLayout.push({
      ...item,
      layout: layout.boxes[i],
    });
  }
  return itemsWithLayout;
}

export type SanityImageItem = {
  id: string;
  imgId: string;
  aspectRatio: number;
  layout: ReturnType<typeof useItemsLayout>[number]["layout"];
};
