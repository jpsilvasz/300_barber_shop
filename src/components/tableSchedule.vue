<template>
  <div>
    <table>
      <th>Serviço</th>
      <th>Data</th>
      <th>Valor</th>

      <tbody>
        <tr v-for="(schedule, index) in scheduleList" :key="index">
          <td>{{ schedule.description }}</td>
          <td>{{ schedule.date}}</td>
          <td>R${{ schedule.price }},00</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>


export default {
  name: "TableSchedule",
  computed: {
    scheduleList: {
      get(){
        return this.$store.state.schedule;
      },
      set(newList){
        this.$store.commit('changeList', newList);
      },
    }
  }
};
</script>

<style scoped>
table {
  background: #1d2327;
  color: rgb(213, 101, 101);
  border: solid 2px rgb(213, 101, 101);
  border-radius: 12px;
  width: 80%;
  margin: auto;
  border-spacing: 0;
}
th {
  width: 33%;
  border-bottom: solid 2px rgb(213, 101, 101);
}
td {
  border-right: solid 1px rgb(213, 101, 101);
  text-align: center;
}
tr:nth-child(even) {
  background: #353839;
}
</style>