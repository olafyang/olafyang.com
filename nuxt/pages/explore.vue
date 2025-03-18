<template>
  <div ref="itemViewer" class="item-viewer">
    <div class="sub-nav">
      <BackButton />
      <h1>Explore</h1>
    </div>
    <ItemsView v-if="items" :items="items"></ItemsView>
  </div>
</template>

<script setup lang="ts">
const { sanityClient } = useSanity();
const router = useRouter();

type Item = {
  id: string;
  imgId: string;
  aspectRatio: number;
};

const { data } = useAsyncData<Item[]>(() =>
  sanityClient
    ?.fetch(
      `*[_type == "photo"][0...200]
        {
          objectID,
          "url": photo.asset->url,
          "aspectRatio": photo.asset->metadata.dimensions.aspectRatio,
          "photo": photo.asset
        }`
    )
    .then((res: any) => {
      if (res === null) {
        router.replace("/404");
        return;
      }
      return res.map(
        (item: any) =>
          ({
            id: item.objectID,
            imgId: item.photo._ref,
            aspectRatio: item.aspectRatio,
          } satisfies Item)
      );
    })
);

const itemViewer = useTemplateRef("itemViewer");

const containerWidth = ref(0);

const items = computed(() => {
  if (!itemViewer.value || !data.value) return [];
  return useItemsLayout(data.value, {
    targetRowHeight: 200,
    containerWidth: containerWidth.value,
  });
});

const handleResize = () => {
  containerWidth.value = itemViewer.value?.getBoundingClientRect().width ?? 0;
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
