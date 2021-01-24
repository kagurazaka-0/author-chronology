<template>
  <ion-card class="MyIonCard">
    <div class="MyIonCard-top__container">
      <img class="MyIonCard-top__image" :src="item.mediumImageUrl" />
    </div>
    <ion-card-header>
      <ion-card-title class="MyIonCard-title">{{ item.title }}</ion-card-title>
      <ion-card-subtitle>{{ dateText }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <div class="MyIonCard-content">
        {{ item.itemCaption }}
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue"
import { ResponseItemWithDateTime } from "@/api"

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<ResponseItemWithDateTime>,
      required: true,
    },
  },
  setup(props) {
    const dateText = computed(() => {
      const year = props.item.salesDateTime.getFullYear()
      const month = props.item.salesDateTime.getMonth() + 1
      return `${year}/${month}`
    })
    return { dateText }
  },
})
</script>

<style lang="scss" scoped>
@mixin text-truncate($line) {
  // from https://www.nxworld.net/css-text-truncate.html
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: $line;
  overflow: hidden;
}

.MyIonCard {
  width: 340px;

  &-top {
    &__container {
      width: 100%;
      height: 12rem;

      display: flex;
      justify-content: center;
      align-items: center;
      background-color: azure;
    }
    &__image {
      height: 8rem;
      filter: drop-shadow(0 5px 8px rgb(112, 111, 111)); // TODO: 色やbackgroundを調整
    }
  }
  &-title {
    @include text-truncate(1);
  }
  &-content {
    // 日本語で3行
    height: 66px;
    @include text-truncate(3);
  }
}
</style>