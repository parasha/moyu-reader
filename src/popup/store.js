import { createStore } from "vuex";

const store = createStore({
  state: {
    loading: false,
    searchBookList: [],
    currentBook: null,
  },
  mutations: {
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
    searchBook(state, bookList) {
      state.searchBookList = bookList;
    },
    selectBook(state, bookInfo) {
      state.currentBook = bookInfo;
    },
  },
  actions: {
    async searchBook(ctx, searchKey) {
      const { searchBook } = window.bg.api.book;
      if (!searchKey) {
        return;
      }
      const bookList = await searchBook(searchKey);
      ctx.commit("searchBook", bookList);
    },
    async selectBook(ctx, bookInfo) {
      const { getBookChapter } = window.bg.api.book;
      const { url } = bookInfo;
      const chapters = await getBookChapter(url);
      bookInfo.chapters = chapters;
      ctx.commit("selectBook", bookInfo);
    },
  },
});

export default store;
