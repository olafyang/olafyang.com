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
      <router-link :to="`/view/${item.id}`">
        <img
          :src="item.url"
          alt=""
          loading="lazy"
          :style="{
            height: item.layout.height + 'px',
            width: item.layout.width + 'px',
            top: item.layout.top + 'px',
            left: item.layout.left + 'px',
          }"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemsView",
  props: {
    items: Array,
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
  border-radius: 25px;
}
</style>
