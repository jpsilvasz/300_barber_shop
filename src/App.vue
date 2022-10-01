<template class ='app'>
  <router-view/>
</template>


<script>
  export default {
    name: 'app',
  };
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
#app {
  font-family: 'Poppins',Copperplate,Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgba(31, 27, 27, 0.85);
}

body,footer {
  background: rgba(31, 27, 27, 0.85);
}

button {
  width: 10%;
  margin-top: 25px;
  font-size: 18px;
  border-radius: 8px;
  margin-bottom: 25px;
}
button:hover {
  transform: scale(1.1);
  cursor: pointer;
  transition: ease 1s;
}
</style>
