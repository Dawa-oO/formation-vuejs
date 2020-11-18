<template>
  <!-- <v-app-bar app color="blue accent-1"> Magasin de livres de dev </v-app-bar> -->
  <v-app-bar
    color="blue darken-3"
    elevate-on-scroll
    scroll-target="#scrolling-techniques-7"
  >
    <router-link class="nav-link" to="/">
      <v-toolbar-title class="custoTitle">BOOK STORE</v-toolbar-title>
    </router-link>

    <v-spacer></v-spacer>

    <v-btn icon color="white" @click="emitCartModal">
      <v-badge
        :content="getCart.length"
        :value="getCart.length"
        color="red"
        overlap
      >
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>

    <v-btn icon color="white" @click="emitWishModal">
      <v-badge
        :content="getWish.length"
        :value="getWish.length"
        color="red"
        overlap
      >
        <v-icon>mdi-heart</v-icon>
      </v-badge>
    </v-btn>

    <!-- :to="{ name: 'About' } permet de surcharger router-link -->
    <v-btn icon color="white" :to="{ name: 'Admin' }">
      <v-icon>mdi-tools</v-icon>
    </v-btn>

    <v-btn icon color="white" :to="{ name: 'About' }">
      <v-icon>mdi-information-variant</v-icon>
    </v-btn>

    <v-btn v-if="isConnected" icon color="white" @click="disconnect">
      <v-icon>mdi-power</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import EventBus from "@/plugins/eventBus";

export default {
  computed: {
    getCart() {
      return this.$store.state.panier.cartList;
    },
    getWish() {
      return this.$store.state.souhait.wishList;
    },
    isConnected() {
      const user = this.$store.state.utilisateur.user;
      return user !== null ? true : false;
    },
  },
  methods: {
    emitWishModal() {
      EventBus.$emit("displayWishModal");
    },
    emitCartModal() {
      EventBus.$emit("displayCartModal");
    },
    disconnect() {
      this.$store.dispatch("updateUser", null);
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style lang="scss" scoped>
.custoTitle {
  color: white;
  font-weight: bold;
}
</style>