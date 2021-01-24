<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>著者検索</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">著者検索</ion-title>
        </ion-toolbar>
      </ion-header>

      <form @submit.prevent="onSubmit">
        <ion-item>
          <ion-label position="stacked">著者</ion-label>
          <ion-input type="text" autocomplete="off" v-model="author"></ion-input>
        </ion-item>

        <div class="ion-padding">
          <ion-button expand="block" type="submit" class="ion-no-margin">検索</ion-button>
        </div>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { alertController } from "@ionic/vue"
import { useRouter } from "vue-router"

export default defineComponent({
  name: "Tab1",
  setup() {
    const router = useRouter()
    const author = ref("")
    const onSubmit = async () => {
      if (!author.value) {
        const alert = await alertController.create({
          header: "エラー",
          message: "著者を入力してください。",
          buttons: ["OK"],
        })
        alert.present()
        return
      }
      router.push(`/tabs/tab1/${author.value}`)
    }
    return { author, onSubmit }
  },
})
</script>
