import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    comicList: []
  },
  getters: {
    getComicList(state) {
      return state.comicList;
    }
  },
  mutations: {
    setComicList(state, payload) {
      state.comicList = payload;
    },
  },
  actions: {
    async loadComic({
      commit
    }) {
      let payload = [];
      await axios
        .get("https://wfc2-image-api-259809.appspot.com/api/series/")
        .then((response) => {
          return payload = response.data.data;
        })
        .catch((reason) => {
          console.log("失敗:" + reason);
        })
      commit("setComicList", payload);
    }
  },
  modules: {}
})