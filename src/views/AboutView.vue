<template>
  <div class="fullpage-color-main">
    <router-link to="/" class="branding-simple">
      <div>
        <h1>Olaf Yang</h1>
        <hr />
      </div>
    </router-link>
    <div class="about">
      <div class="about-content">
        <div class="about-text">
          <h1>About</h1>
          <p>Hello, I'm Olaf.</p>
          <p>My photography journey started in 2015 in Tainan.</p>
          <p>
            I’m trying to document moments worth remembering little by little
            across two countries and continents.
          </p>
          <p>Here are some of them to share with you.</p>
        </div>

        <div class="about-text">
          <h1>Contact</h1>
          <a href="mailto:mail@olafyang.com">
            <p>- mail@olafyang.com</p>
          </a>
          <a href="https://www.instagram.com/olaf.yang/" target="_blank">
            <p>- Instagram</p>
          </a>
        </div>
      </div>
      <div class="about-photo">
        <router-link to="/view/P2016-06-19.I1">
          <img
            src="https://cdn.sanity.io/images/c747b643/production/c969e66dcde8363547f881d3508494a41ab4dd9b-2609x1732.jpg?w=1000"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.fullpage-color-main {
  height: 100%;
  width: 100%;
  background-color: #08204a;
}

.about {
  display: flex;
  justify-content: space-between;
  margin: 0 7em;
}

.about-text {
  margin-top: 2em;
  color: white;
}
.about-text h1 {
  margin-bottom: 0.7em;
}
.about-text p {
  margin: 1em 0;
  font-size: 1.4em;
  padding-right: 3em;
  color: white;
}
.about-text a {
  text-decoration: none;
}

.branding-simple {
  padding: 2em 0 1em 7em;
  display: flex;
}
.branding-simple h1,
h3,
hr {
  color: white;
}
.branding-simple hr {
  border-radius: 3px;
  border: 2px white solid;
}

.about-photo img {
  margin-top: 2em;
  border-radius: 30px;
}
</style>
