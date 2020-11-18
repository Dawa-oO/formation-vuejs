<template>
  <v-dialog v-model="displayCartModal" width="800">
    <v-card>
      <v-card-title>Mon panier</v-card-title>

      <v-card-text>
        Les livres suivant sont dans votre panier :
        <ul>
          <li v-for="(book, index) in cartList" :key="index" class="noBullet">
            <v-btn text @click="removeFromCartList(book)" color="red">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            {{ book.title }} - {{ book.prix }}€
          </li>
        </ul>
        <p v-if="cartList.length > 0"><b>Total :</b> {{ getTotalCart }}€</p>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="primary" text @click="displayCartModal = false">
          Fermer
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="cartList.length > 0"
          color="green"
          text
          @click="payerAction"
        >
          Acheter
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import EventBus from "@/plugins/eventBus";

export default {
  name: "ModalCart",
  data() {
    return {
      displayCartModal: false,
    };
  },
  computed: {
    cartList() {
      return this.$store.state.panier.cartList;
    },
    getTotalCart() {
      return this.$store.state.panier.cartList.reduce(function (prev, cur) {
        return prev + cur.prix;
      }, 0);
    },
  },
  mounted() {
    EventBus.$on("displayCartModal", () => {
      this.displayCartModal = true;
    });
  },
  methods: {
    removeFromCartList(book) {
      this.$store.dispatch("removeToCart", book);
    },
    payerAction() {
      const commande = { total: this.getTotalCart, items: this.cartList };

      const url = process.env.VUE_APP_API_URL_COMMANDES;
      try {
        // this.axios défini dans le fichier main.js en global
        this.axios.post(url, commande);
        this.$store.dispatch("updateCart", []);
      } catch (error) {
        console.log(error);
        alert("Une erreur s'est produite lors de l'appel au service commande");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.noBullet {
  list-style-type: none;
}
</style>