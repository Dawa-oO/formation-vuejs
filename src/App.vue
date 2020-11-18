<template>
  <v-app>
    <v-card class="overflow-hidden">
      <!------------------>
      <!------ Menu ------>
      <!------------------>
      <Menu />
      <!------------------>
      <!------ Body ------>
      <!------------------>
      <v-main>
        <v-container>
          <router-view transition="slide-x-transition" />
        </v-container>
      </v-main>
      <!-------------------------------->
      <!------ Snakbar (Toaster) ------->
      <!-------------------------------->
      <Notification />
    </v-card>
  </v-app>
</template>

<script>
import Menu from "@/components/Menu";
import Notification from "@/components/Notification";

export default {
  name: "App",
  components: { Menu, Notification },
};
</script>
