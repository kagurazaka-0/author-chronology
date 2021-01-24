<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ headerTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ headerTitle }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- HACK: itemsGroupByYearMapはMap型だが、Iterable<[K, V]>を返す[Symbol.iterator]()を実装しているため、こう書ける -->
      <ion-list v-for="[year, items] in itemsGroupByYearMap">
        <ion-list-header>
          <ion-label>
            <ion-label>{{ year }}年</ion-label>
          </ion-label>
        </ion-list-header>

        <div class="BookList__container">
          <div class="BookList">
            <BookCard v-for="item in items" :item="item" />
          </div>
        </div>
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
import BookCard from "@/components/BookCard.vue"

export default defineComponent({
  name: "Chronology",
  components: { BookCard },
  setup() {
    const route = useRoute()
    const author = route.params.author as string
    const headerTitle = computed(() => `「${author}」の検索結果`)
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
    return { headerTitle, itemsRef, hasNextRef, countTextRef, loadData, itemsGroupByYearMap }
  },
})
</script>

<style lang="scss" scoped>
.BookList {
  &__container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 400px) {
    justify-content: flex-start;
  }
}
</style>