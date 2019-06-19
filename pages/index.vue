<template>
  <div class="blue">
    <v-img :src="bgi" class="blue">
    <v-container>
      <v-layout row wrap justify-start>
        <v-flex xs12 md10 lg8 lg12>
          <v-card flat style="background:transparent;" translate min-height="500px">
            <v-card-title>
              <h2 class="white--text display-1 ml-3 mt-5 font-weight-black">
              Regester, <br> 
              Pay and Manage, <br>
              Your expence Online
              </h2>
            </v-card-title>
            <v-card-actions class=" ml-3 pa-2">
              <v-layout row wrap justify-space-around>
                <v-flex xs12 sm4 v-for="(item, i) in buttons" :key="i">
                  <v-btn :to="item.to" large round :color="item.color">{{item.text}} <v-icon right >{{item.ico}}</v-icon> </v-btn>
                </v-flex>
                <!-- <v-flex xs12 sm4>
                  <v-btn large round color="light-blue lighten-2 white--text ma-1">Join now <v-icon right>account_circle</v-icon> </v-btn>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-btn large round color="light-blue lighten-2 white--text ma-1">Learn More<v-icon right>info_outline</v-icon></v-btn>
                </v-flex> -->
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    <v-layout row justify-center align-center>
      <v-flex xs12 sm10 lg8 xl7>
        <v-card style="border-radius: 10px;">
          <v-layout row wrap pt-5>
            <v-flex pa-3 xs12 md4>
              <h2 class="grey--text">
                Make fast and easy workflow for your busness
                </h2>
                <p class="grey--text">
                  We provide prowerfull tools for you to manage your work flow and 
                  fast and make it easy for your to manage your busniss online.
                </p>
            </v-flex>
            <v-flex pa-3 xs12 md4>
              <h2 class="grey--text">
                Store your Record online and access it any where
                </h2>
                <p class="grey--text">
                  we provide an fast and powerfull server and abstract all the work which 
                  inturn make your life easyer.
                </p>
            </v-flex>
            <v-flex pa-3 xs12 md4>
              <h2 class="grey--text">
                Make Payment quicker within seconds
                </h2>
                <p class="grey--text">
                  Online payment made easyer and secured with our payment plantform which 
                  privide a clearn and easy user interface for even biginers to pickup quickly.
                </p>
            </v-flex>
          </v-layout>
          <v-card-actions  class="pl-5 grey lighten-3 h80px">
            for more detail contact:  343-343-343
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row justify-center align-center>
      <v-flex xs12 sm10 lg8 xl7>
        <tiles/>
      </v-flex>
    </v-layout>
    </v-container>
    
    </v-img>
    
  </div>
</template>

<script>
import Carousel from "./../components/Carousel";
import axios from "axios";
import schoolDetails from "~/components/schoolDetails"
import bgi from './../assets/img/bgi.jpeg'
import tiles from "./../components/home/tiles";
import tables from '../components/students/table';
import dashboard from './dashboard/index';
export default {
  data() {
    return {
      name: "",
      pwd: "",
      err: true,
      bgi:bgi,
      formError: {
        name: "",
        pwd: "",
        err: ""
      },
      buttons:[
        { text: 'pay', to: '/pay/', ico: 'fa fa-inr', color: 'white blue--text ma-1' },
        { text: 'join now', to: '/contact/', ico: 'account_circle', color: 'light-blue lighten-2 white--text ma-1' },
        { text: 'learn more', to: '/info/', ico: 'info_outline', color: 'light-blue lighten-2 white--text ma-1t' }
      ],
      card_text:
        "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat."
    };
  },
  components: {
    Carousel,
    schoolDetails,
    tiles,
    tables,
    dashboard
  },
  methods: {
    async login() {
      if (this.name == "" || this.name == null) {
        this.formError.name = "please fill in the user name";
      } else {
        this.formError.name = "";
        if (this.pwd == "" || this.pwd == null) {
          this.formError.pwd = "please fill in the password";
        } else {
          this.formError.pwd = "";
          try {
            await this.$store.dispatch("login", {
              name: this.name,
              pwd: this.pwd
            });
            this.name = "";
            this.pwd = "";
            this.formError = null;
          } catch (e) {
            this.formError.err = e.message;
            this.err = true;
          }
        }
      }
    },
    async logout() {
      try {
        await this.$store.dispatch("logout");
      } catch (e) {
        this.formError.err = e.message;
      }
    }
    // async removeErr(i) {
    //   await this.formError.splice(i,1);
    // }
  }
};
</script>
<style>
  .rounded-card{
    border-radius:20px;
    /* filter: grayscale(.6); */
    filter: saturate(2) brightness(150%);
    overflow: hidden;
  }
  .rounded-card::after{
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    filter: saturate(2) brightness(150%);
    content: '';
    background: linear-gradient(to top left, rgb(95, 92, 92), rgba(0, 0, 0, 0.116));
  }
  .h80px{
    height: 80px;
  }
</style>