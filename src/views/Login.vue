<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="login"
      :rules="[rules.required]"
      label="Identifiant"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required]"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="Mot de passe"
      @click:append="show1 = !show1"
    ></v-text-field>
    <v-alert v-if="error" type="error">{{ error }}</v-alert>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="connect">
      Se connecter
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    login: "",
    password: "",
    show1: false,
    error: "",
    rules: {
      required: (value) => !!value || "Required.",
    },
  }),

  methods: {
    async connect() {
      /* Forme validation */
      this.$refs.form.validate();

      const url = process.env.VUE_APP_API_URL_USERS;

      try {
        // this.axios défini dans le fichier main.js en global
        const getUser = await this.axios.get(url, {
          params: { user: this.login, password: this.password },
        });

        if (getUser.data.length) {
          console.log("Connexion OK");
          /* Ici, au lieu de {name: this.login}, il faudrait mettre un token de connexion */
          this.$store.dispatch("updateUser", { name: this.login });
          this.$router.push({ name: "Home" });
        } else {
          this.error = "Mauvais login ou mot de passe";
        }
      } catch (error) {
        console.log(error);
        alert("Une erreur s'est produite lors de l'appel au service users");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>