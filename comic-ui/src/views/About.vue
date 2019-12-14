<template>
  <main class="about">
    <h1>{{ comic.title }}</h1>
    <ul class="about__lists">
      <li v-for="item in comic.books" v-bind:key="item.id" class="about__list">
        <router-link
          v-bind:to="{ name: 'view', params: { pageId: item.id } }"
          class="about__link"
        >
          <img v-lazy="item.image" alt="item.title" class="about__img" />
          <h2 class="about__bookTitle">{{ item.title }}</h2>
        </router-link>
      </li>
    </ul>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "about",
  data() {
    return {
      comic: []
    };
  },
  props: ["seriesId"],
  created() {
    axios
      .get(
        "https://wfc2-image-api-259809.appspot.com/api/series/" + this.seriesId
      )
      .then(response => {
        this.comic = response.data;
      })
      .catch(reason => {
        console.log("失敗:" + reason);
      });
  }
};
</script>

<style lang="scss">
.about {
  &__lists {
    display: flex;
    flex-wrap: wrap;
  }

  &__list {
    width: calc(100% / 5);
  }
}
</style>
