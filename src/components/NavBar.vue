<template>
  <nav v-if="navbarStyle === 'simple'" class="simple">
    <div class="branding">
      <h1>Olaf Yang</h1>
      <h3>Photography</h3>
      <hr />
    </div>
    <ul>
      <li>New</li>
      <li>Collections</li>
      <li>Tags</li>
      <li>All</li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    navbarStyle: String,
  },
};
</script>

<style>
nav.simple {
  width: 15%;
  text-align: center;
  background-color: #08204a;
  color: white;
  height: 100%;
  padding-left: 1em;
  padding-right: 1em;
}
nav.simple .branding {
  margin: 1em 0;
}
nav.simple .branding h3 {
  margin: 0.3em;
}
nav.simple hr {
  border-radius: 5px;
  border: 2px white solid;
  margin: 0.5em 0.1em;
  padding: 0, 1em;
}
nav.simple ul {
  margin-top: 2em;
}
nav.simple li {
  font-size: 1.5em;
  margin: 0.5em 0;
}
</style>
