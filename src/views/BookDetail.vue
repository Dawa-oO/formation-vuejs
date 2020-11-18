<template>
  <div>
    <!------------------------->
    <!------- Modal Wish ------>
    <!------------------------->
    <ModalWish />
    <!------------------------->
    <!------- Modal Cart ------>
    <!------------------------->
    <ModalCart />
    <div v-if="loading" class="text-center">
      <Loader />
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12" sm="4">
          <v-img
            :src="book.image"
            :alt="'couverture du livre : ' + book.title"
          ></v-img>
        </v-col>
        <v-col cols="12" sm="8">
          <h1>{{ book.title }}</h1>
          <p>{{ book.author }}</p>
          <v-rating
            readonly="readonly"
            v-model="book.rating"
            color="accent"
          ></v-rating>
          <p>{{ book.description }}</p>
          <p>
            <v-btn v-if="book.quantity > 0" icon @click="addToCartList">
              <v-icon>mdi-cart</v-icon>
            </v-btn>
            <v-btn v-else color="red" text> Indisponible </v-btn>
            <v-btn icon @click="emitWishList">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </p>
        </v-col>
        <div class="book__content">
          {{ book.content }}
        </div>
      </v-row>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import EventBus from "@/plugins/eventBus";
import ModalCart from "@/components/ModalCart";
import ModalWish from "@/components/ModalWish";

export default {
  components: {
    Loader,
    ModalCart,
    ModalWish,
  },
  data: () => ({
    book: null,
    loading: false,
  }),
  async created() {
    const url =
      process.env.VUE_APP_API_URL_BOOKS + "/" + this.$route.params.bookID;
    this.loading = true;
    try {
      // this.axios défini dans le fichier main.js en global
      const getBook = await this.axios.get(url);
      this.book = getBook.data;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
      alert("Une erreur s'est produite lors de l'appel au service books");
    }
  },
  methods: {
    emitWishList() {
      this.$store.dispatch("addToWish", this.book);
      EventBus.$emit("displaySnakbarWish", this.book);
    },
    addToCartList() {
      this.$store.dispatch("addToCart", this.book);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>