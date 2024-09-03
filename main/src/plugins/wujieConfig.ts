import { App } from "vue";
import WujieVue from "wujie-vue3";

export function setWujieConfig(app: App<Element>) {
  app.use(WujieVue);
}
