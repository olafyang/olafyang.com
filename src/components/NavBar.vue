<template>
  <div v-if="navbarStyle === 'gallery'"></div>
  <div v-else>
    <span>Simple Style</span>
  </div>
</template>

<script>
export default {
    name: 'NavBar',
    props: {
      navbarStyle: String
    }
}
</script>

<style>

</style>