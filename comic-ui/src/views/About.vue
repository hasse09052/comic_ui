<template>
  <div class="app__container">
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
    <main class="about">
      <div class="about__container">
        <h1 class="about__title">{{ comic.title }}</h1>
        <p class="about__text">{{comic.description}}</p>
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
  </div>
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
    padding: 10px 3.5%;

    @media (prefers-color-scheme: dark) {
      min-height: calc(100vh - 50px);
      background: #000000;
    }
  }

  &__title {
    margin: 0;
    text-align: center;

    @media screen and (max-width: 767px) {
      font-size: 16px;
    }

    @media (prefers-color-scheme: dark) {
      color: white;
    }
  }

  &__text {
    @media (prefers-color-scheme: dark) {
      color: white;
    }

    @media screen and (max-width: 767px) {
      font-size: 12px;
    }
  }

  &__lists {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
  }

  &__list {
    width: calc(100% / 4);
    padding: 1%;
    margin: 10px 0;
    list-style: none;

    @media screen and (max-width: 767px) {
      width: calc(100% / 3);
    }
  }

  &__link {
    text-decoration: none;
    transition: 0.3s;

    &:hover {
      text-decoration: underline;
      opacity: 0.7;
    }
  }

  &__bookTitle {
    font-size: 14px;
    text-align: center;

    @media (prefers-color-scheme: dark) {
      color: white;
    }

    @media screen and (max-width: 767px) {
      font-size: 10px;
    }
  }
}
</style>
