<template>
  <div class="nav">
    <nav class="simple">
      <div class="branding">
        <NuxtLink to="/"><h1>Olaf Yang</h1></NuxtLink>
        <NuxtLink to="/"><h3>Photography</h3></NuxtLink>
        <hr />
      </div>
      <ul>
        <li><NuxtLink to="/explore">Explore</NuxtLink></li>
        <li><NuxtLink to="/tags">Tags</NuxtLink></li>
        <li><NuxtLink to="/about">About</NuxtLink></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
nav.simple {
  background-color: #08204a;
  color: white;
  padding: 1em;
  text-align: center;
}
nav.simple .branding h3 {
  margin: 0.3em;
}
nav.simple hr {
  border-radius: 5px;
  border: 2px white solid;
}

@media only screen and (max-width: 1360px) {
  nav.simple h1 {
    font-size: 2.7em;
  }
  nav.simple h3 {
    font-size: 1.25em;
  }
  nav.simple ul {
    display: flex;
    justify-content: space-around;
    margin-top: 1em;
  }
  nav.simple li {
    font-size: 1.3em;
  }
  nav.simple hr {
    margin: 0 0.5em;
  }
}

@media only screen and (min-width: 1360px) {
  .nav {
    position: fixed;
    width: 17%;
    display: flex;
    height: 100%;
  }

  nav.simple {
    width: 100%;
  }
  nav.simple ul {
    margin-top: 2em;
  }
  nav.simple li {
    font-size: 1.5em;
    margin: 0.75em 0;
  }
  li a {
    color: white;
  }
  .branding a {
    color: white;
  }
}
</style>
