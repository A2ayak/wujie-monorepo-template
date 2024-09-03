import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// new Vue({
//   router,
//   store,
//   render: (h) => h(App)
// }).$mount('#app')

function setup() {
  return new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
}

console.log("window", window);
if (window.__POWERED_BY_WUJIE__) {
  let instance;
  window.__WUJIE_MOUNT = () => {
    instance = setup();
    // const { setUser } = useUserStore()
    // window.$wujie.bus.$on('changeUser', (e) => {
    //   setUser(e.user)
    // })
  };
  window.__WUJIE_UNMOUNT = () => {
    instance?.$destroy();
  };
} else {
  setup();
}
