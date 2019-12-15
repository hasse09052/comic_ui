<template>
  <div class="bookLinks">
    <div class="bookLinks__btnWrap">
      <button v-on:click="getList" v-if="showBtn" class="bookLinks__btn">{{ btnText }}</button>
    </div>
    <nav class="bookLinks__nav">
      <ul class="bookLinks__lists">
        <li v-for="item in comicNav.books" v-bind:key="item.id" class="bookLinks__list">
          <router-link
            v-bind:to="{ name: 'view', params: { pageId: item.id } }"
            class="bookLinks__link"
          >
            <img v-lazy="item.image" alt="item.title" class="bookLinks__img" />
            <h2 class="bookLinks__title">{{ item.title }}</h2>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "BookLinks",
  data() {
    return {
      comicNav: [],
      showBtn: true,
      btnText: "他の話も表示する"
    };
  },
  watch: {
    comicNav() {
      return this.comicNav;
    }
  },
  props: ["seriesId"],
  methods: {
    async getList() {
      this.btnText = "読み込み中です";
      await axios
        .get(
          "https://wfc2-image-api-259809.appspot.com/api/series/" +
            this.seriesId
        )
        .then(response => {
          this.comicNav = response.data;
        })
        .catch(reason => {
          alert("失敗:" + reason);
        });
      this.showBtn = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bookLinks {
  &__btnWrap {
    display: flex;
    justify-content: center;
  }

  &__btn {
    width: 500px;
    height: 50px;
    margin: 0 auto;
    box-shadow: 3px 3px #c0c0c0;
    background: #ff6600;
    color: white;
    font-size: 20px;
    transition: 0.3s;

    &:focus {
      outline: 0;
    }

    &:active {
      box-shadow: none;
      transform: translate(3px, 3px);
    }
  }

  &__lists {
    display: flex;
    flex-wrap: wrap;
  }

  &__list {
    flex: 0 1 50%;
    padding: 0 3.5%;
    margin: 10px 0;
  }

  &__link {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-decoration: none;
    transition: 0.3s;

    &:hover {
      opacity: 0.7;
      text-decoration: underline;
    }
  }

  &__img {
    height: 70px;
  }

  &__title {
    margin: 0;
    font-size: 14px;
    color: black;
  }
}
</style>
