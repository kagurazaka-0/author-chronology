import { createRouter, createWebHashHistory } from "@ionic/vue-router"
import { RouteRecordRaw } from "vue-router"
import Tabs from "@/views/Tabs/index.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/tab1",
  },
  {
    path: "/tabs/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "/tabs/tab1",
      },
      {
        path: "tab1",
        component: () => import("@/views/Tabs/Tab1/index.vue"),
        children: [{ path: ":author", component: () => import("@/views/Tabs/Tab1/_author.vue") }],
      },
      {
        path: "tab2",
        component: () => import("@/views/Tabs/Tab2/index.vue"),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
