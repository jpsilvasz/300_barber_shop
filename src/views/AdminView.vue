<template>
  <div>
    <div class="main-container">
      <h1>Bem vindo Admin</h1>
      <button v-on:click="disconnectAdmin">Sair</button>
      <DashboardView />
    </div>
  </div>
</template>
  
  <script>
import DashboardView from "@/components/dash-board.vue";

export default {
  name: "AdminVue",
  components: {
    DashboardView,
  },
  methods: {
    redirectToPage(name) {
      this.$router.push({ name: name });
    },
    disconnectAdmin() {
      this.$store.commit("changeAdminStatus");
      this.redirectToPage("signIn");
    },
  },
};
</script>

<style>
.main-container {
  margin: 50px;
  min-height: 250px;
}
h1 {
  color: rgb(255, 255, 255);
}
.admin-header {
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}
@media (max-width: 800px) {
  button {
    width: 45%;
    font-size: 15px;
    border-radius: 8px;
  }
}
</style>