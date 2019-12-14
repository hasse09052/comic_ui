<template>
  <div class="bookLinks">
    <button v-on:click="getList">他の話も表示する</button>
    <nav>
      <ul>
        <li v-for="item in comicNav.books" v-bind:key="item.id">
          <router-link
            v-bind:to="{ name: 'view', params: { pageId: item.id } }"
            class="about__link"
          >
            {{ item.title }}
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
      comicNav: []
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
      await axios
        .get(
          "https://wfc2-image-api-259809.appspot.com/api/series/" +
            this.seriesId
        )
        .then(response => {
          this.comicNav = response.data;
        })
        .catch(reason => {
          console.log("失敗:" + reason);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bookLinks {
}
</style>
