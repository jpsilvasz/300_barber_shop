<template>
  <div>
    <header>
      <img :src="require('@/assets/logo320.png')" alt="Logo" />
      <div id="introUser">
        <h1>Área do Cliente</h1>
        <h2>Olá {{ user.name }}!</h2>
        <p>Telefone: {{ user.phone }}</p>
      </div>
      <button v-on:click="logout">Sair</button>
    </header>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "UserInfo",
  props: {
    user: Object,
  },
  methods: {
    redirectToPage(name) {
      this.$router.push({ name: name });
    },
    async logout() {
      const response = await axios.post("auth/logout", {
        withCredentials: true,
      });

      if (response.status == 204) {
        axios.defaults.headers.common["Authorization"] = " ";

        this.redirectToPage("signIn");
      }
    },
  },
  
};
</script>

<style scoped>
div {
  background: rgba(31, 27, 27, 0.85);
  color: rgb(213, 101, 101);
}
header {
  text-align: start;
  border-bottom: solid 2px rgb(213, 101, 101);
  padding-bottom: 20px;
}
img {
  width: 200px;
  height: 200px;
  padding-right: 50px;
}
h2,
a,
p {
  color: white;
}
#introUser {
  display: inline-block;
  position: absolute;
  background: transparent;
}
a {
  position: absolute;
  right: 0;
  text-decoration: none;
  font-size: 14px;
  color: rgb(213, 101, 101);
  margin-right: 10px;
}
@media (max-width: 800px) {
  header {
    text-align: center;
    border-bottom: solid 2px rgb(213, 101, 101);
  }
  img {
    width: fit-content;
    height: fit-content;
    padding-right: 0%;
    display: block;
    margin: auto;
  }
  #introUser {
    display: block;
    position: inherit;
    padding-top: 5px;
  }
  #introUser h2 {
    font-size: 18px;
  }
  #introUser p {
    font-size: 15px;
  }
  a {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 15px;
  }
  button {
    width: 45%;
    font-size: 15px;
    border-radius: 8px;
  }
}
</style>