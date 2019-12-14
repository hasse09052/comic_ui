<template>
  <main class="home">
    <div class="home__container">
      <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
      <ul class="home__lists">
        <li
          v-for="item in comicList"
          v-bind:key="item.seriesId"
          class="home__list"
        >
          <router-link
            v-bind:to="{ name: 'about', params: { seriesId: item.seriesId } }"
            class="home__link"
          >
            <figure class="home__imgWrap">
              <img
                v-lazy="item.seriesImage"
                v-bind:alt="item.title"
                class="home__img"
              />
            </figure>
          </router-link>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  computed: {
    comicList() {
      return this.$store.getters.getComicList;
    }
  },
  components: {
    //HelloWorld
  }
};
</script>

<style lang="scss">
.home {
  &__container {
    padding: 0 3.5%;
  }

  &__link {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  &__lists {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__list {
    width: calc(100% / 4);
    padding: 1%;
    transition: 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }

  &__imgWrap {
  }
}
</style>
