<template>
  <div class="home">
    <!-------------------------->
    <!------- Modal Promo ------>
    <!-------------------------->
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>Promotions !</v-card-title>

        <v-card-text>
          Les livres suivant sont en promotion :
          <ul>
            <li v-for="promoBook in promoBooks" :key="promoBook.id">
              {{ promoBook.title }} : <b>{{ promoBook.promotion }}€</b> au lieu
              de {{ promoBook.prix }}€
            </li>
          </ul>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> Fermer </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!------------------------->
    <!------- Modal Wish ------>
    <!------------------------->
    <ModalWish />
    <!------------------------->
    <!------- Modal Cart ------>
    <!------------------------->
    <ModalCart />
    <!-------------------------->
    <!------ Search field ------>
    <!-------------------------->
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field v-model="searchQuery" label="Titre..." />
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="langueSelected"
          :items="itemLanguages"
          label="Langue"
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn elevation="3" @click="clear" color="primary"
          >Réinitialiser</v-btn
        >
      </v-col>
    </v-row>

    <!--------------------->
    <!------- Loader ------>
    <!--------------------->
    <div v-if="loading" class="text-center">
      <Loader />
    </div>
    <!-------------------------->
    <!------ Books cards ------->
    <!-------------------------->
    <div v-else>
      <!-- Affichage par défaut -->
      <div v-if="filteredList == null">
        <h1>Top livres</h1>
        <v-row>
          <v-col v-for="book in topBooks" :key="book.id" sm="4">
            <BookItem
              v-bind:book="book"
              v-on:wishClick="addToWishList($event)"
            />
          </v-col>
        </v-row>
        <h1>Tous les livres</h1>
        <v-row>
          <v-col v-for="book in otherBooks" :key="book.id" sm="4">
            <BookItem
              v-bind:book="book"
              v-on:wishClick="addToWishList($event)"
            />
          </v-col>
        </v-row>
      </div>
      <!-- Aucun résultat trouvé lors de la recherche -->
      <div v-else-if="filteredList.length == 0">
        <h2>Désolé</h2>
        <p>Aucun résultat trouvé..</p>
      </div>
      <!-- Des résultats ont été trouvés lors de la recherche -->
      <div v-else>
        <h1>
          {{ filteredList.length }} résultat<span v-if="filteredList.length > 1"
            >s</span
          >
        </h1>
        <v-row>
          <v-col v-for="book in filteredList" :key="book.id" sm="4">
            <BookItem
              v-bind:book="book"
              v-on:wishClick="addToWishList($event)"
            />
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BookItem from "@/components/BookItem";
import Loader from "@/components/Loader";
import ModalCart from "@/components/ModalCart";
import ModalWish from "@/components/ModalWish";

export default {
  name: "Home",
  components: {
    BookItem,
    Loader,
    ModalCart,
    ModalWish,
  },
  data: () => ({
    books: [],
    dialog: false,
    searchQuery: "",
    langueSelected: "",
    itemLanguages: [
      { text: "Tout", value: "" },
      { text: "Français", value: "fr" },
      { text: "Anglais", value: "en" },
    ],
    loading: false,
  }),
  computed: {
    topBooks() {
      return this.books.filter((book) => book.top);
    },
    otherBooks() {
      return this.books.filter((book) => !book.top);
    },
    promoBooks() {
      return this.books.filter((book) => book.promotion != null);
    },
    filteredList() {
      if (this.searchQuery || this.langueSelected) {
        return this.books
          .filter(
            (book) =>
              book.title
                .toUpperCase()
                .indexOf(this.searchQuery.toUpperCase()) !== -1
          )
          .filter(
            (book) =>
              this.langueSelected == "" || this.langueSelected == book.lang
          );
      } else {
        return null;
      }
    },
  },
  async created() {
    const url = process.env.VUE_APP_API_URL_BOOKS;
    this.loading = true;
    try {
      // this.axios défini dans le fichier main.js en global
      const getBooks = await this.axios.get(url);
      this.books = getBooks.data;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
      alert("Une erreur s'est produite lors de l'appel au service books");
    }
  },
  mounted() {
    this.showPromo();
  },
  methods: {
    showPromo() {
      this.dialog = this.promoBooks.length > 0;
    },
    clear() {
      this.langueSelected = "";
      this.searchQuery = "";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
