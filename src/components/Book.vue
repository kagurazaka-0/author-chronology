<template>
  <ion-card>
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
