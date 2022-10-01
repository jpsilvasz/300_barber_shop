<template>
  <img alt="Vue logo" src="../assets/logo320.png" />

  <div data-aos="zoom-in-up">
    <form id="sign-up-form" @submit.prevent="register">
      <div id="inputLabel">
        <label for="nome">Nome</label>
        <input v-model="name"
          type="text"
          name="nome"
          id="nome"
          placeholder="Digite seu nome completo"
          required
        />
      </div>
      <div id="inputLabel">
        <label for="telefone">Telefone</label>
        <input v-model="phone"
          type="text"
          name="telefone"
          id="telefone"
          placeholder="Digite seu telefone"
          required
        />
      </div>
      <div id="inputLabel">
        <label for="senha">Senha</label>
        <input  v-model="password"
          type="password"
          name="senha"
          id="senha"
          placeholder="Digite sua senha"
          required
        />
      </div>
      <button>Cadastrar</button>
    </form>
    <button v-on:click="redirectToPage('signIn')">Voltar</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUp",
  data() {
    return {
        name: null,
        phone:  null,
        password:null,
    }
  },
  methods: {
    redirectToPage(name) {
      this.$router.push({ name: name });
    },
    async register() {
      const data = {
        name: this.name,
        phone: this.phone,
        password: this.password,
      };

      const response = await axios.post("auth/register", data, {
        withCredentials: true,
      });

      if (response.status == 200) {
        this.$store.commit('showToaster','Conta criada com sucesso!');
        this.redirectToPage("signIn");
      }
    },
  },
};
</script>

<style scoped>
form {
  background: rgba(31, 27, 27, 0.85);
  width: 60%;
  margin: 40px auto;
  border-radius: 15px;
  padding-bottom: 20px;
  padding-top: 20px;
}
form img,
form h1,
#inputLabel,
button,
a {
  text-align: center;
}
form img,
button,
a {
  margin: auto;
}
#inputLabel label,
button,
a {
  display: block;
}
#inputLabel {
  width: 50%;
  margin: auto;
  height: fit-content;
  display: block;
  margin-bottom: 20px;
}
#inputLabel label {
  text-align: center;
  font-size: 18px;
  color: azure;
}
#inputLabel input {
  height: 30px;
  width: 80%;
  border-radius: 8px;
  border: solid 2px black;
  font-size: 15px;
  text-align: center;
}
#inputLabel input:valid {
  border: solid 1px red;
}
button {
  width: 25%;
  margin-top: 25px;
  font-size: 18px;
  border-radius: 8px;
}
button:hover {
  transform: scale(1.1);
  cursor: pointer;
  transition: ease 1s;
}
@media (max-width: 800px) {
  form {
    text-align: center;
    background: rgba(31, 27, 27, 0.85);
    width: 90%;
  }
  #inputLabel {
    width: 90%;
    margin: auto;
    height: fit-content;
    display: block;
    margin-bottom: 20px;
  }
  #inputLabel label {
    text-align: center;
    font-size: 15px;
  }
  button {
    width: 45%;
    font-size: 15px;
    border-radius: 8px;
  }
}
</style>