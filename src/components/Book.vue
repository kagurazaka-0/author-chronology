<template>
  <ion-card>
    <div class="MyIonCard-top__container">
      <img class="MyIonCard-top__image" :src="item.mediumImageUrl" />
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
import { defineComponent, PropType } from "vue"
import { ResponseItemWithDateTime } from "@/api"

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<ResponseItemWithDateTime>,
      reqired: true,
    },
  },
  setup() {
    return {}
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
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}
</style>