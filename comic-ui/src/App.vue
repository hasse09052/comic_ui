<template>
  <div id="app">
    <header>
      <nav id="nav">
        <router-link to="/">Home</router-link>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    this.$store.dispatch("loadComic");
  }
};
</script>
<style lang="scss">
@import "./assets/css/sanitize.css";
@import "./assets/css/my_reset.css";

/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */
</style>
