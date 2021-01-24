import { createRouter, createWebHashHistory } from "@ionic/vue-router"
import { RouteRecordRaw } from "vue-router"
import Tabs from "@/views/Tabs/index.vue"

import Tab1 from "@/views/Tabs/Tab1/index.vue"
import Tab2 from "@/views/Tabs/Tab2/index.vue"
import Chronology from "@/views/Tabs/Tab1/_author.vue"

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
        component: Tab1,
        children: [{ path: ":author", component: Chronology }],
      },
      {
        path: "tab2",
        component: Tab2,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
