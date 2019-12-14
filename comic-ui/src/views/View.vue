<template>
  <main class="about">
    <h1>{{ comic.title }}</h1>
    <div>
      <div>
        <button v-on:click="backPage()">
          back
        </button>
        <img v-bind:src="viewUrl" v-bind:alt="comic.title" />
        <button v-on:click="nextPage()">
          next
        </button>
      </div>
      <BookLinks />
    </div>
  </main>
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
  async created() {
    await axios
      .get("https://wfc2-image-api-259809.appspot.com/api/books/" + this.pageId)
      .then(response => {
        this.comic = response.data;
        this.viewUrl = response.data.imageData[0].imageUrl;
      })
      .catch(reason => {
        console.log("失敗:" + reason);
      });

    window.addEventListener("keydown", e => {
      if (e.keyCode == 37) {
        this.backPage();
      } else if (e.keyCode == 39) {
        this.nextPage();
      }
    });
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
    }
  }
};
</script>

<style lang="scss"></style>
