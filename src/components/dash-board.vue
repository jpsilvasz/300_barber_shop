<template>
  <div id="schedule-table" v-if="schedules">
    <div>
      <div id="schedule-table-heading">
        <div class="schedule-id">#:</div>
        <div>Cliente:</div>
        <div>Serviço:</div>
        <div>Data:</div>
        <div>Valor:</div>
      </div>
    </div>
    <div id="schedule-table-rows">
      <div
        class="schedule-table-row"
        v-for="schedule in schedules"
        :key="schedule.id"
      >
        <div class="schedule-data">{{ schedule.id }}</div>
        <div>{{ schedule.users.name }}</div>
        <div>{{ schedule.description }}</div>
        <div>{{ schedule.date }}</div>
        <div>R${{ schedule.price }},00</div>
        <button class="delete-btn" @click="cancelSchedule(schedule.id)">
          Cancelar
        </button>
      </div>
    </div>
    <br />
    <button
      v-if="skip <= lastPage"
      class="delete-btn"
      @click.prevent="getAdminSchedule"
    >
      Carregar Mais
    </button>
    <div v-else>
      <p>Fim da Lista</p>
      <button class="delete-btn" @click.prevent="resetQuery">Voltar</button>
    </div>
  </div>
  <div v-else>
    <h2>Não há agendamentos no momento!</h2>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DashboardView",
  data() {
    return {
      schedules: [],
      skip: 1,
      lastPage: 1,
    };
  },
  computed: {
    isAdmin: {
      get() {
        return this.$store.state.adminUser;
      },
      set(status) {
        this.$store.commit("changeAdminStatus", status);
      },
    },
  },
  methods: {
    redirectToPage(name) {
      this.$router.push({ name: name });
    },
    async verifyAdminStatus() {
      if (this.isAdmin == false) {
        this.redirectToPage("signIn");
      } else {
        await this.getAdminSchedule();
      }
    },
    async getAdminSchedule() {
      if (this.skip <= this.lastPage) {
        axios
          .get(`schedules?page=${this.skip}`, { withCredentials: true })
          .then((response) => {
            this.lastPage = response.data.last_page;
            this.schedules = response.data.data;

            this.skip += 1;

            for (let i = 0; i < this.schedules.length; i++) {
              let date = new Date(this.schedules[i].dma);
              const options = { hour: "2-digit", minute: "2-digit" };

              this.schedules[
                i
              ].date = `${date.toLocaleDateString()} - ${date.toLocaleTimeString(
                "pt-BR",
                options
              )}`;

              this.schedules[i].description =
                this.schedules[i].services.description;
              this.schedules[i].price = this.schedules[i].services.price / 100;
            }
          });
      }
    },
    async cancelSchedule(id) {
      axios.delete(`schedules/${id}`, { withCredentials: true });

      let filteredArray = this.schedules.filter(function (item) {
        return item.id != id;
      });

      this.schedules = filteredArray;
      this.$store.commit("showToaster", "Agendamento cancelado!");
    },
    async resetQuery() {
      this.skip = 1;
      this.lastPage = 1;
      this.schedules = [];
      await this.getAdminSchedule();
    },
  },
  mounted() {
    this.verifyAdminStatus();
  },
};
</script>
  
<style scoped>
#schedule-table {
  background-color: azure;
  border-radius: 12px;
  width: 80%;
  margin: auto;
  border-spacing: 0;
}

#schedule-table-heading,

.schedule-table-row {
  display: flex;
  flex-wrap: wrap;
}
#schedule-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #333;
}
.schedule-table-row {
  width: 95%;
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
#schedule-table-heading div,
.schedule-table-row div {
  width: 20%;
}
#schedule-table-heading .schedule-id,
.schedule-table-row .schedule-data {
  width: 10%;
}

@media (max-width: 1200px) {
  #schedule-table {
    width: 95%;
    margin: 20px auto;
    border-radius: 8px;
    padding-bottom: 20px;
  }
  #schedule-table-heading,
.schedule-table-row  {
  width: 100%;
    text-align: center;
    font-size: 16px;
    padding-top: 15px;
    padding: 6px;
    border-bottom: 1px solid rgb(88, 84, 84);
  }
  .delete-btn  {
    width: 30%;
    font-size: 15px;
  }
}

@media (max-width: 800px) {
  #schedule-table {
    width: 100%;
    margin: 2px auto;
    border-radius: 8px;
    padding-bottom: 10px;
  }
  #schedule-table-heading,
.schedule-table-row  {
    text-align: center;
    font-size: 10px;
    padding-top: 6px;
  }
.delete-btn  {
    width: 27%;
    padding: 0px;
    font-size: 6px;
  }
}

.delete-btn {
  background-color: #222;
  color: #f14f43;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.delete-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>