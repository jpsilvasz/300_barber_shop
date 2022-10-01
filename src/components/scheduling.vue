<template>
  <div>
    <form @submit.prevent="sendSchedule" method="POST">
      <h1 class="formTitle">Agendamento de Horários</h1>
      <div id="inputLabel">
        <label for="services">Serviço:</label>
        <select @change="changeValue($event)">
          <option
            v-for="service in services"
            :key="service.id"
            :value="service.description"
          >
            {{ service.description }}
          </option>
        </select>
      </div>
      <div id="inputLabel">
        <label for="date">Data</label>
        <input
          type="datetime-local"
          name="date"
          id="date"
          v-model="date"
          required
        />
      </div>
      <div id="inputLabel">
        <label for="price">Valor</label>
        <input type="text" name="price" id="price" v-model="price" readonly />
      </div>
      <button>Agendar</button>
    </form>
  </div>
</template>
  
  <script>
import axios from "axios";

export default {
  name: "SchedulingForm",
  props: {
    user: Object,
  },
  data() {
    return {
      services: [],
      currentIndex: 0,
      date: null,
      price: ``,
    };
  },
  methods: {
    getServices() {
      axios.get("services", { withCredentials: true }).then((response) => {
        this.services = response.data;
        let priceValue = response.data[0].price / 100;
        this.price = `R$ ${priceValue},00`;
      });
    },
    changeValue(event) {
      let newService = this.services.find(
        (element) => element.description == event.target.value
      );

      this.currentIndex = this.services.findIndex(
        (element) => element.description == event.target.value
      );

      let newPrice = newService.price / 100;
      this.price = `R$${newPrice},00`;
    },
    getParsedDate() {
      let dateNew = new Date(this.date);

      const dateParse = `${dateNew.getFullYear()}-${
        dateNew.getMonth() + 1
      }-${dateNew.getDate()}`;
      const timeParse = `${dateNew.getHours()}:${dateNew.getMinutes()}:${dateNew.getSeconds()}`;

      let fullParsedDate = `${dateParse} ${timeParse}`;

      return fullParsedDate;
    },
    async sendSchedule() {
      const parsedDate = this.getParsedDate();

      const data = {
        "user_id": this.user.id,
        "service_id": this.services[this.currentIndex].id,
        "dma": parsedDate,
      };

      const response = await axios.post(
        `users/${this.user.id}/schedules`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status == 201) {
        this.$store.commit('showToaster','Novo Horário agendado!');
        let date = new Date(response.data.dma);
        const options = { hour: '2-digit', minute: '2-digit' };

        const newSchedule = {
        "description": this.services[this.currentIndex].description,
        "price": this.services[this.currentIndex].price/100,
        "date": `${date.toLocaleDateString()} - ${date.toLocaleTimeString('pt-BR', options)}`,
        };

        this.$store.commit('addNewScheduleToList', newSchedule);
      }
    },
  
  },
  mounted() {
    this.getServices();
  },
};
</script>
  
  <style scoped>
form {
  background: rgba(31, 27, 27, 0.85);
  color: rgb(213, 101, 101);
  width: 80%;
  margin: 100px auto;
  border-radius: 8px;
  padding-bottom: 20px;
}
h1 {
  text-align: center;
  color: white;
}
#inputLabel {
  width: 20%;
  margin: 10px 60px;
  display: inline-block;
}
#inputLabel label {
  display: block;
  font-size: 18px;
}
#inputLabel input,
#inputLabel select {
  width: 100%;
  height: 30px;
  border-radius: 5px;
}
button {
  width: 25%;
  display: block;
  font-size: 18px;
  border-radius: 8px;
  margin: 25px auto;
  text-align: center;
}
button:hover {
  transform: scale(1.1);
  cursor: pointer;
  transition: ease 1s;
}
@media (max-width: 800px) {
  form {
    width: 90%;
    margin: 20px auto;
    border-radius: 8px;
    padding-bottom: 20px;
  }
  h1 {
    text-align: center;
    font-size: 25px;
    padding-top: 15px;
  }
  #inputLabel {
    width: 90%;
    margin: 10px auto;
    display: block;
  }
  #inputLabel label {
    display: block;
    font-size: 18px;
  }
  #inputLabel input,
  #inputLabel select {
    width: 100%;
    height: 30px;
    border-radius: 5px;
  }
  button {
    width: 35%;
    font-size: 15px;
  }
}
</style>