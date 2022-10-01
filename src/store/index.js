import { createStore } from 'vuex'
import { createToaster } from "@meforma/vue-toaster";
import axios from "axios";

export default createStore({
  state: {
    adminUser: false,
    schedule: [],
    toaster: createToaster({position:"top"}),
  },
  getters: {
  },
  mutations: {
    changeAdminStatus(state){
      state.adminUser = !state.adminUser;
    },
    showToaster(state,message){
      state.toaster.show(message);
    },
    addNewScheduleToList(state,newSchedule){
      state.schedule.push(newSchedule);
    },
    changeList(state,newList){
      state.schedule = newList;
    }
  },
  actions: {
    getSchedule({state},id) {
      axios
        .get(`users/${id}/schedules`, { withCredentials: true })
        .then((response) => {
          state.schedule = response.data;
          for (let i = 0; i < state.schedule.length; i++) {
            let date = new Date(state.schedule[i].dma);
            const options = { hour: '2-digit', minute: '2-digit' }

            state.schedule[i].date = `${date.toLocaleDateString()} - ${date.toLocaleTimeString('pt-BR', options)}`;


            state.schedule[i].description = state.schedule[i].services.description;
            state.schedule[i].price = state.schedule[i].services.price/100;
          }
        });
    },
  },
  modules: {
  }
})
