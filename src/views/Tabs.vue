<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="searchOutline" />
          <ion-label>著者検索</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="ellipsisHorizontalOutline" />
          <ion-label>その他</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { ellipsisHorizontalOutline, searchOutline } from "ionicons/icons"

export default {
  name: "Tabs",
  setup() {
    return {
      ellipsisHorizontalOutline,
      searchOutline,
    }
  },
}
</script>
