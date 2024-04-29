import WordCloud from './components/WordCloud.vue';

export {
  WordCloud,
};

export default {
  install (app, options) {
    app.component('WordCloud', WordCloud);
  }
};