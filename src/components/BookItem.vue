<template>
  <v-card
    class="mx-auto card-outter"
    max-width="400"
    height="400px"
    :color="book.top ? 'yellow lighten-4' : null"
  >
    <router-link
      class="nav-link"
      :to="{ name: 'BookDetail', params: { bookID: book.id } }"
    >
      <v-img
        class="white--text align-end cardImage"
        height="200px"
        contain
        :src="book.image"
        :alt="'Couverture du livre : ' + book.title"
      />
    </router-link>
    <v-card-title>{{ book.title }}</v-card-title>

    <v-card-subtitle class="pb-0">
      {{ book.author }}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{ book.description }}</div>
    </v-card-text>

    <v-card-actions class="card-actions">
      <v-btn v-if="book.quantity > 0" icon @click="addToCartList">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <v-btn v-else color="red" text> Indisponible </v-btn>
      <v-btn icon @click="addToWishList">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-rating
        background-color="orange lighten-3"
        color="orange"
        dense
        half-increments
        length="5"
        readonly
        size="30"
        :value="book.rating"
      ></v-rating>
    </v-card-actions>
  </v-card>
</template>

<script>
import EventBus from "@/plugins/eventBus";
import buyMixin from "@/mixins/cartMixin";

export default {
  props: {
    book: {
      type: Object,
    },
  },
  methods: {
    addToWishList() {
      this.$store.dispatch("addToWish", this.book);
      EventBus.$emit("displaySnakbarWish", this.book);
    },
    addToCartList() {
      this.addToCartMixin(this.book);
    },
  },
  mixins: [buyMixin],
};
</script>

<style lang="scss" scoped>
.card-outter {
  position: relative;
  padding-bottom: 50px;
}
.card-actions {
  position: absolute;
  bottom: 0;
}
</style>