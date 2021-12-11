import VueRouter from "vue-router";
import Home from "./components/home";
import Form from "./components/form";
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
      path: "/form",
      component: Form,
    },
  ],
});

export default router;
