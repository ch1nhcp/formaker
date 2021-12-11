import VueRouter from "vue-router";
import Home from "./components/home";
import FormConfig from "./components/form-config";
import ApiGenerator from "./components/tools/api-gen/views/index";

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/tools/api-gen",
      component: ApiGenerator,
    },
    {
      path: "/form-config",
      component: FormConfig,
    },
  ],
});

export default router;
