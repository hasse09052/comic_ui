<template>
  <div class="app__container">
    <header class="header">
      <div class="header__container">
        <nav class="header__nav">
          <ul class="header__lists">
            <li class="header__list">
              <router-link to="/" class="header__link">作品一覧</router-link>
            </li>
            <li class="header__list">
              <router-link
                v-bind:to="{ name: 'about', params: { seriesId: comic.seriesId } }"
                class="header__link"
              >他の話</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <main class="view">
      <div class="view__container" v-bind:key="pageId">
        <div class="view__mainContainer">
          <button v-on:click="backPage()" class="view__btn view__btn--left">back</button>
          <img v-bind:src="viewUrl" v-bind:alt="comic.title" class="view__img" />
          <button v-on:click="nextPage()" class="view__btn view__btn--right">next</button>
        </div>
        <div class="view__pageController">
          <p class="view__pageNo">{{ pageNum | pageRetouching }}</p>
          <input
            type="range"
            v-model="pageNum"
            step="1"
            min="0"
            v-bind:max="comic.pageNum - 1"
            class="view__range"
          />
        </div>
        <h1 class="view__title">{{ comic.title }}</h1>
        <BookLinks v-bind:series-id="comic.seriesId" />
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import BookLinks from "@/components/BookLinks.vue";

export default {
  name: "about",
  data() {
    return {
      comic: [],
      viewUrl: "",
      pageNum: 0
    };
  },
  props: ["pageId"],
  components: {
    BookLinks
  },
  watch: {
    pageNum() {
      this.viewUrl = this.comic.imageData[this.pageNum].imageUrl;
    }
  },
  beforeRouteEnter(to, _from, next) {
    next(vm => {
      vm.fetchData(to.params.pageId);
    });
  },
  beforeRouteUpdate(to, _from, next) {
    scrollTo(0, 0);
    this.fetchData(to.params.pageId);
    next();
  },
  beforeDestroy() {
    window.removeEventListener("keydown", e => {
      if (e.keyCode == 37) {
        this.backPage();
      } else if (e.keyCode == 39) {
        this.nextPage();
      }
    });
  },
  methods: {
    backPage() {
      if (this.pageNum > 0) {
        this.pageNum--;
      } else {
        this.pageNum = this.comic.pageNum - 1;
      }
      this.viewUrl = this.comic.imageData[this.pageNum].imageUrl;
    },
    nextPage() {
      if (this.pageNum < this.comic.pageNum - 1) {
        this.pageNum++;
      } else {
        this.pageNum = 0;
      }
      this.viewUrl = this.comic.imageData[this.pageNum].imageUrl;
    },
    async fetchData(pageId) {
      await axios
        .get("https://wfc2-image-api-259809.appspot.com/api/books/" + pageId)
        .then(response => {
          this.comic = response.data;
          this.viewUrl = response.data.imageData[0].imageUrl;
        })
        .catch(reason => {
          alert("失敗:" + reason);
        });

      window.addEventListener("keydown", e => {
        if (e.keyCode == 37) {
          this.backPage();
        } else if (e.keyCode == 39) {
          this.nextPage();
        }
      });
    }
  },
  filters: {
    pageRetouching(value) {
      return Number(value) + 1;
    }
  }
};
</script>

<style lang="scss">
.view {
  &__container {
    padding: 0 0 20px;
    @media (prefers-color-scheme: dark) {
      min-height: calc(100vh - 50px);
      background: rgba(0, 0, 0, 0.7);
      color: white;
    }
  }

  &__mainContainer {
    display: flex;
    justify-content: center;
    padding: 10px 0;
    background: black;
    position: relative;

    @media screen and (max-width: 767px) {
      width: 100%;
      padding: 30px 10px;
    }
  }

  &__btn {
    position: absolute;
    width: 45%;
    height: 100%;
    opacity: 0;
    z-index: 10;

    &:hover {
      cursor: pointer;
    }

    &--left {
      top: 0;
      left: 0;
    }

    &--right {
      top: 0;
      right: 0;
    }
  }

  &__img {
    height: 90vh;

    @media screen and (max-width: 767px) {
      height: 70vh;
    }
  }

  &__pagControllere {
    margin: 20px auto;
  }

  &__pageNo {
    text-align: center;
  }

  &__range {
    display: block;
    width: 93%;
    margin: 0 auto;
  }

  &__title {
    margin: 15px 0;
    font-size: 18px;
    text-align: center;

    @media screen and (max-width: 767px) {
      font-size: 15px;
    }
  }
}
</style>
