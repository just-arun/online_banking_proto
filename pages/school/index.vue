<template>
  <div class="page">
    <!-- <login v-if="!$store.state.authUser"/>
    <v-container v-if="$store.state.authUser" grid-list-xs>
      <schoolDetails/>
    </v-container>-->
    <v-layout row wrap>
      <v-flex xs12 pa-2>
        <v-layout row wrap>
          <v-flex xs6>
            <v-card hover flat style="border-radius: 10px;" to="/pay/" class="ma-4">
            <v-img v-ripple :src="img">
            </v-img>
            </v-card>
          </v-flex>
          <v-flex xs6>
            <v-card to="/others/" class="ma-4">
              <v-card-title primary-title>OTHER</v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import login from "./../../components/login";
import schoolDetails from "./../../components/schoolDetails";
import img from './../../assets/img/payonline.png'
export default {
  data() {
    return {
      img
    }
  },
  components: {
    login,
    schoolDetails
  }
};
</script>

<style>
</style>
