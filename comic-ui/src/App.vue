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

.header {
  background: rgba($color: #000000, $alpha: 0.7);
  height: 50px;
  padding: 0 30px;

  &__container {
    display: flex;
    justify-content: space-between;
  }

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

  &__btn {
    border: none;
    background: #999999;
    font-size: 14px;
    color: white;
    transition: 0.3s;

    &:hover {
      opacity: 0.7;
    }

    &:focus {
      outline: 0;
    }

    &--active {
      background: #95bfe7;
    }
  }
}
</style>
