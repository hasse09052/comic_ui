<template>
  <div id="app" class="app">
    <header class="header">
      <div class="header__container">
        <nav class="header__nav">
          <ul class="header__lists">
            <li class="header__list">
              <router-link to="/" class="header__link">作品一覧</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <router-view class="app__container" />
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
    //padding: 0 3.5%;
  }
}

.header {
  background: rgba($color: #000000, $alpha: 0.7);
  padding: 10px 30px;

  &__lists {
    margin: 0;
  }

  &__link {
    color: white;
    text-decoration: none;
    transition: 0.3s;

    &:hover {
      opacity: 0.7;
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
