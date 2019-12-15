<template>
  <div id="app" class="app">
    <transition name="view">
      <router-view />
    </transition>
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

.app {
  &__container {
    //min-height: 100vh;
  }
}

/* .view-enter-active,
.view-leav-active {
  transition: 3s;
}

.view-leav-active {
  position: absolute;
}

.view-enter,
.view-leave-to {
  opacity: 0;
} */

.header {
  background: rgba($color: #000000, $alpha: 0.7);
  height: 50px;
  padding: 0 30px;

  &__lists {
    display: flex;
    margin: 0;
  }

  &__list {
    color: white;
    margin-right: 20px;
  }

  &__link {
    display: block;
    width: 100%;
    height: 100%;
    color: white;
    text-decoration: none;
    line-height: 50px;
    transition: 0.3s;

    &:hover {
      opacity: 0.7;
      text-decoration: underline;
    }
  }
}

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
