<template>
  <div class="items">
    <div
      class="item"
      v-for="item in items"
      :key="item"
      :style="{
        height: item.layout.height + 'px',
        width: item.layout.width + 'px',
        top: item.layout.top + 'px',
        left: item.layout.left + 'px',
      }"
    >
      <NuxtLink :to="`/view/${item.id}`">
        <NuxtImg
          provider="sanity"
          :src="item.imgId"
          alt=""
          loading="lazy"
          :style="{
            height: item.layout.height + 'px',
            width: item.layout.width + 'px',
            top: item.layout.top + 'px',
            left: item.layout.left + 'px',
          }"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import createJustifiedLayou from "justified-layout";

type LayoutBox = ReturnType<typeof createJustifiedLayou>["boxes"][number];

export default {
  name: "ItemsView",
  props: {
    items: [] as LayoutBox[],
  },
};
</script>

<style>
.items {
  position: relative;
}
.item {
  position: absolute;
}
.item img {
  border-radius: 10px;
}
</style>
