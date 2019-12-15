<template>
  <main class="about">
    <div class="about__container">
      <h1 class="about__title">{{ comic.title }}</h1>
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
    </div>
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
        alert("失敗:" + reason);
      });
  }
};
</script>

<style lang="scss">
.about {
  &__container {
    padding: 0 3.5%;
  }

  &__title {
    text-align: center;
  }

  &__lists {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
  }

  &__list {
    width: calc(100% / 4);
    padding: 1%;
    list-style: none;
    transition: 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }

  &__bookTitle {
    font-size: 1rem;
  }
}
</style>
