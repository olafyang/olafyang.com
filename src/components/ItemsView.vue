<template>
  <div class="items">
    <div class="item" v-for="item in items" :key="item">
      <img :src="item.url" alt="" />
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

<style></style>
