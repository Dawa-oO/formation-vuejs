<template>
  <v-dialog v-model="displayWishModal" width="500">
    <v-card>
      <v-card-title>Ma Wish List</v-card-title>

      <v-card-text>
        Les livres suivant sont dans vos favoris :
        <ul>
          <li v-for="(book, index) in wishList" :key="index" class="noBullet">
            <v-btn text @click="removeFromWishList(book)" color="red">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            {{ book.title }}
          </li>
        </ul>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="displayWishModal = false">
          Fermer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import EventBus from "@/plugins/eventBus";

export default {
  name: "ModalWish",
  data() {
    return {
      displayWishModal: false,
    };
  },
  computed: {
    wishList() {
      return this.$store.state.souhait.wishList;
    },
  },
  mounted() {
    EventBus.$on("displayWishModal", () => {
      this.displayWishModal = true;
    });
  },
  methods: {
    removeFromWishList(book) {
      this.$store.dispatch("removeToWish", book);
    },
  },
};
</script>

<style lang="scss" scoped>
.noBullet {
  list-style-type: none;
}
</style>