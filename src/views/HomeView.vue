<template>
  <UserInfo :user="user" />
  <SchedulingForm :user="user"/>
  <TableSchedule/>
</template>

<script>
import UserInfo from "@/components/userInfo";
import SchedulingForm from "@/components/scheduling";
import TableSchedule from "@/components/tableSchedule";
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      user: {
        id: "",
        name: "",
        phone: "",
      },
     };
  },
  components: {
    UserInfo,
    SchedulingForm,
    TableSchedule,
  },
  methods: {
    redirectToPage(name) {
      this.$router.push({ name: name });
    },
    async getUserData() {
      try {
        await axios.get("user", { withCredentials: true }).then((user) => {
          this.user.id = user.data.id;
          this.user.name = user.data.name;
          this.user.phone = user.data.phone;

          this.$store.dispatch('getSchedule',user.data.id);
        });
      } catch (e) {
        this.redirectToPage("signIn");
      }
    },
  },
  mounted() {
    this.getUserData();
  },
};
</script>
