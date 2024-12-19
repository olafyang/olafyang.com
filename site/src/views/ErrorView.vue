<template>
  <div class="fullpage-color-main">
    <div class="error">
      <div class="error-display">
        <h1>{{ code }}</h1>
        <h2>{{ msg }}</h2>
      </div>
      <div class="error-back">
        <img
          @click="this.$root.previousPage"
          src="/static/arrow_back_white.svg"
        />
        <h1 @click="this.$root.previousPage">Back</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: 404,
      msg: "Not Found",
    };
  },
  created() {
    const code = this.$route.params.code;
    switch (code) {
      case 404:
        this.code = code;
        this.msg = "Not Found";
        break;
      default:
        this.code = 404;
        this.msg = "Not Found";
        break;
    }
  },
};
</script>

<style>
.error {
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.error-display h1,
h2 {
  font-family: "silkalight", sans-serif;
  font-weight: 300;
  color: white;
  font-size: 3em;
}

.error-back img {
  margin-top: 4em;
  width: 3em;
  cursor: pointer;
}
.error-back h1 {
  color: white;
  font-family: "silkalight", sans-serif;
  cursor: pointer;
}
</style>
