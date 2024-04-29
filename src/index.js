import ImageCloud from './components/ImageCloud.vue';

export {
  ImageCloud,
};

export default {
  install (app, options) {
    app.component('ImageCloud', ImageCloud);
  }
};