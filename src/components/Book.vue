<template>
  <ion-card>
    <div class="MyIonCard-top__container">
      <img ref="image" class="MyIonCard-top__image" :src="item.mediumImageUrl" />
    </div>
    <ion-card-header>
      <ion-card-title>{{ item.title }}</ion-card-title>
      <ion-card-subtitle>{{
        `${item.salesDateTime.getFullYear()}/${item.salesDateTime.getMonth() + 1}`
      }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <div class="MyIonCard-content">
        {{ item.itemCaption }}
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue"
import Vibrant from "node-vibrant"

import { ResponseItemWithDateTime } from "@/api"

function asyncLoadImage(image: HTMLImageElement): Promise<void> {
  if (image.complete) return Promise.resolve()

  return new Promise(resolve => {
    image.addEventListener("load", function callback() {
      resolve()
      image.removeEventListener("load", callback)
    })
  })
}

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<ResponseItemWithDateTime>,
      reqired: true,
    },
  },
  setup() {
    const image = ref<HTMLImageElement>()
    onMounted(async () => {
      asyncLoadImage(image.value!)
      const v = new Vibrant(image.value!)
      console.log(v)
    })
    return { image }
  },
})
</script>

<style lang="scss" scoped>
.MyIonCard {
  &-top {
    &__container {
      width: 100%;
      height: 12rem;

      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(236, 209, 209);
    }
    &__image {
      height: 8rem;
      filter: drop-shadow(0 5px 8px #111); // TODO: 色やbackgroundを調整
    }
  }
  &-content {
    // from https://www.nxworld.net/css-text-truncate.html
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}
</style>