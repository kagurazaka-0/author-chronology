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
      <!-- HACK: itemsGroupByYearMapはMap型だが、Iterable<[K, V]>を返す[Symbol.iterator]()を実装しているため、こう書ける -->
      <ion-list v-for="[year, items] in itemsGroupByYearMap">
        <ion-list-header>
          <ion-label>
            <ion-label>{{ year }}年</ion-label>
          </ion-label>
        </ion-list-header>
        <!--
          <ion-item v-for="item in items">
          <ion-avatar slot="start">
            <img :src="item.smallImageUrl" />
          </ion-avatar>
          <ion-label>
            <h2>{{ item.title }}</h2>
            <p>{{ item.itemCaption }}</p>
          </ion-label>
        </ion-item>
           -->
        <ion-card v-for="item in items">
          <div class="MyIonCard-top__container">
            <img :src="item.smallImageUrl" />
          </div>
          <ion-card-header>
            <ion-card-title>{{ item.title }}</ion-card-title>
            <ion-card-subtitle>{{
              `${item.salesDateTime.getFullYear()}/${item.salesDateTime.getMonth() + 1}`
            }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            {{ item.itemCaption }}
          </ion-card-content>
        </ion-card>
      </ion-list>

      <ion-infinite-scroll @ionInfinite="loadData" threshold="100px" :disabled="!hasNextRef">
        <ion-infinite-scroll-content loading-spinner="circles" :loading-text="`読み込み中(${countTextRef})`">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue"
import { useRoute } from "vue-router"
import { useRakutenBookApi } from "@/hooks/useRakutenBookApi"
import { loadingController } from "@ionic/vue"
import { groupBy } from "@/utils/groupBy"

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

    const itemsGroupByYearMap = computed(() => groupBy(itemsRef.value, item => item.salesDateTime.getFullYear()))

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
    return { author, itemsRef, hasNextRef, countTextRef, loadData, itemsGroupByYearMap }
  },
})
</script>
