<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title>「{{ author }}」の検索結果</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-list>
        <ion-item v-for="item in itemsRef">
          {{ item.title }}
        </ion-item>
      </ion-list>

      <ion-infinite-scroll @ionInfinite="loadData" threshold="100px" :disabled="!hasNextRef">
        <ion-infinite-scroll-content loading-spinner="circles" :loading-text="`読み込み中(${countTextRef})`">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { useRakutenBookApi } from "@/hooks/useRakutenBookApi"
import { loadingController } from "@ionic/vue"

export default defineComponent({
  name: "Chronology",
  setup() {
    const route = useRoute()
    const author = route.params.author as string
    const { itemsRef, hasNextRef, countTextRef, next } = useRakutenBookApi(author)
    const loadData = async (e: { target: HTMLIonInfiniteScrollElement }) => {
      await next()
      e.target.complete()
    }

    onMounted(async () => {
      const firstLoad$ = next()

      const loading = await loadingController.create({
        message: "読み込み中...",
        duration: 10000, // timeout
        spinner: "circles",
      })
      await loading.present()
      await firstLoad$
      loading.dismiss()
    })
    return { author, itemsRef, hasNextRef, countTextRef, loadData }
  },
})
</script>
