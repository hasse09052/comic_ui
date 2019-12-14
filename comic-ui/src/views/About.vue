<template>
  <main class="about">
    <h1>{{ comic.title }}</h1>
    <ul>
      <li v-for="item in comic.books" v-bind:key="item.id">
        <img v-bind:src="item.image" alt="item.title" />
        <h2>{{ item.title }}</h2>
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
  props: ["id"],
  created() {
    axios
      .get("https://wfc2-image-api-259809.appspot.com/api/series/" + this.id)
      .then(response => {
        this.comic = response.data;
      })
      .catch(reason => {
        console.log("失敗:" + reason);
      });
  }
};
</script>

<style lang="scss"></style>
