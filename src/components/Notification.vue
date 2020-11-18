<template>
  <v-snackbar v-model="displaySnackbar">
    {{ textToDisplaySnackbar }}
    <template v-slot:action="{ attrs }">
      <v-btn color="green" text v-bind="attrs" @click="displaySnackbar = false">
        Fermer
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import EventBus from "@/plugins/eventBus";

export default {
  data() {
    return {
      displaySnackbar: false,
      textToDisplaySnackbar: "",
    };
  },
  mounted() {
    EventBus.$on("displaySnakbarWish", (payload) => {
      this.textToDisplaySnackbar =
        "Le livre " + payload.title + " a été ajouté aux favoris !";
      this.displaySnackbar = true;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>