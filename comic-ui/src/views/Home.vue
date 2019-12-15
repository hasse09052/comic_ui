<template>
  <div class="app__container">
    <header class="header">
      <div class="header__container">
        <nav class="header__nav">
          <ul class="header__lists">
            <li class="header__list">
              <!-- <router-link to="/" class="header__link">作品一覧</router-link> -->
            </li>
          </ul>
        </nav>
        <button
          v-on:click="reverse = !reverse"
          class="header__btn"
          v-bind:class="{'header__btn--active' : !reverse}"
        >Reverse</button>
      </div>
    </header>
    <main class="home">
      <div class="home__container">
        <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
        <template v-if="reverse">
          <ul class="home__lists">
            <li v-for="item in comicList" v-bind:key="item.seriesId" class="home__list">
              <router-link
                v-bind:to="{ name: 'about', params: { seriesId: item.seriesId } }"
                class="home__link"
              >
                <figure class="home__imgWrap">
                  <img v-lazy="item.seriesImage" v-bind:alt="item.title" class="home__img" />
                </figure>
              </router-link>
            </li>
          </ul>
        </template>
        <template v-else>
          <ul class="home__lists">
            <li v-for="item in listReverse" v-bind:key="item.seriesId" class="home__list">
              <router-link
                v-bind:to="{ name: 'about', params: { seriesId: item.seriesId } }"
                class="home__link"
              >
                <figure class="home__imgWrap">
                  <img v-lazy="item.seriesImage" v-bind:alt="item.title" class="home__img" />
                </figure>
              </router-link>
            </li>
          </ul>
        </template>
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  data() {
    return {
      reverse: true
    };
  },
  computed: {
    comicList() {
      return this.$store.getters.getComicList;
    },
    listReverse() {
      return this.comicList.slice().reverse();
    }
  },
  methods: {
    showReverse() {
      this.comicList = [];
    }
  }
};
</script>

<style lang="scss">
.home {
  &__container {
    padding: 0 3.5%;

    @media (prefers-color-scheme: dark) {
      min-height: calc(100vh - 50px);
      background: #000000;
    }
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
    margin: 10px 0;
    transition: 0.3s;

    @media screen and (max-width: 767px) {
      width: calc(100% / 3);
    }

    &:hover {
      opacity: 0.7;
    }
  }

  &__imgWrap {
  }

  &__img {
    transition: 0.2s;

    &:active {
      transform: scale(0.9);
    }
  }
}
</style>
