<template>
  <div>
    <h1>T'AS REUSSI MA GUEULE, EH OUAIS !!</h1>
    <p>{{ nom }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nom: this.$store.state.utilisateur.user.name,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>