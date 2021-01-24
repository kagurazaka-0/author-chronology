<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 2</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- ionicのdocのお試し -->
      <template v-if="true">
        <ion-grid>
          <ion-row class="ion-justify-content-start">
            <ion-col size="3">
              <div>1 of 2</div>
            </ion-col>
            <ion-col size="3">
              <div>2 of 2</div>
            </ion-col>
          </ion-row>

          <ion-row class="ion-justify-content-center">
            <ion-col size="3">
              <div>1 of 2</div>
            </ion-col>
            <ion-col size="3">
              <div>2 of 2</div>
            </ion-col>
          </ion-row>

          <ion-row class="ion-justify-content-end">
            <ion-col size="3">
              <div>1 of 2</div>
            </ion-col>
            <ion-col size="3">
              <div>2 of 2</div>
            </ion-col>
          </ion-row>

          <ion-row class="ion-justify-content-around">
            <ion-col size="3">
              <div>1 of 2</div>
            </ion-col>
            <ion-col size="3">
              <div>2 of 2</div>
            </ion-col>
          </ion-row>

          <ion-row class="ion-justify-content-between">
            <ion-col size="3">
              <div>1 of 2</div>
            </ion-col>
            <ion-col size="3">
              <div>2 of 2</div>
            </ion-col>
          </ion-row>

          <ion-row class="ion-justify-content-evenly">
            <ion-col size="3">
              <div>1 of 2</div>
            </ion-col>
            <ion-col size="3">
              <div>2 of 2</div>
            </ion-col>
          </ion-row>
        </ion-grid>

        <ion-grid>
          <ion-row class="ion-align-items-start">
            <ion-col>
              <div>1 of 4</div>
            </ion-col>
            <ion-col>
              <div>2 of 4</div>
            </ion-col>
            <ion-col>
              <div>3 of 4</div>
            </ion-col>
            <ion-col>
              <div>
                4 of 4 <br />
                # <br />
                # <br />
                #
              </div>
            </ion-col>
          </ion-row>

          <ion-row class="ion-align-items-end">
            <ion-col>
              <div>1 of 4</div>
            </ion-col>
            <ion-col>
              <div>2 of 4</div>
            </ion-col>
            <ion-col>
              <div>3 of 4</div>
            </ion-col>
            <ion-col>
              <div>
                4 of 4 <br />
                # <br />
                # <br />
                #
              </div>
            </ion-col>
          </ion-row>

          <ion-row class="ion-align-items-center">
            <ion-col>
              <div>1 of 4</div>
            </ion-col>
            <ion-col>
              <div>2 of 4</div>
            </ion-col>
            <ion-col>
              <div>3 of 4</div>
            </ion-col>
            <ion-col>
              <div>
                4 of 4 <br />
                # <br />
                # <br />
                #
              </div>
            </ion-col>
          </ion-row>

          <ion-row class="ion-align-items-baseline">
            <ion-col>
              <div>1 of 4</div>
            </ion-col>
            <ion-col>
              <div>2 of 4</div>
            </ion-col>
            <ion-col>
              <div>3 of 4</div>
            </ion-col>
            <ion-col>
              <div>
                4 of 4 <br />
                # <br />
                # <br />
                #
              </div>
            </ion-col>
          </ion-row>

          <ion-row class="ion-align-items-stretch">
            <ion-col>
              <div>1 of 4</div>
            </ion-col>
            <ion-col>
              <div>2 of 4</div>
            </ion-col>
            <ion-col>
              <div>3 of 4</div>
            </ion-col>
            <ion-col>
              <div>
                4 of 4 <br />
                # <br />
                # <br />
                #
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </template>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
export default {
  name: "Tab2",
}
</script>
