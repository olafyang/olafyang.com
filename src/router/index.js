import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MediaView from "../views/MediaView.vue";
import TagView from "../views/TagView.vue";
import TagListView from "../views/TagsListView.vue";
import ErrorView from "../views/ErrorView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/view/:id",
    name: "mediaview",
    component: MediaView,
  },
  {
    path: "/tags",
    name: "taglistview",
    component: TagListView,
  },
  {
    path: "/tags/:id",
    name: "itemview",
    component: TagView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/error/:code",
    name: "error",
    component: ErrorView,
  },
  // Error redirects
  {
    path: "/:pathMatch(.*)*",
    redirect: "/error/404",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
