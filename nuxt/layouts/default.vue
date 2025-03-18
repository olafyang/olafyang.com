<script lang="ts">
import "~/assets/reset.css";
import "~/assets/default.css";

import NavBar from "~/components/Navbar.vue";
export default {
  data() {
    return {
      mode: process.env.NODE_ENV === "development" ? "Development" : null,
    };
  },
  components: { NavBar },
};
</script>

<template>
  <div id="app">
    <NavBar />
    <div class="view-container">
      <slot />
    </div>
  </div>
</template>
