<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm5 md5 lg5 xl4>


  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Login</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">verify OTP</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-5"
          min-height="200px"
          flat
        >
                <v-form @submit.prevent="loginf()">
          <!-- <v-layout row justify-center>
            <v-btn class="elevation-1" style="position:relative;top:40px;z-index:1;" large fab>
              <v-icon>person</v-icon>
            </v-btn>
          </v-layout> -->
          <v-card flat class="pt-2">
            <div class>
              <v-list class="text-xs-center">
                <v-list-tile
                  v-if="formError.name !== ''"
                  class="pink lighten-3 white--text"
                >{{formError.name}}</v-list-tile>
                <v-list-tile
                  v-if="formError.pwd !== ''"
                  class="pink lighten-3 white--text"
                >{{formError.pwd}}</v-list-tile>
                <v-list-tile
                  v-if="formError.err !== ''"
                  class="pink lighten-3 white--text"
                >{{formError.err}}</v-list-tile>
              </v-list>
            </div>
            <v-card-title primary-title>
              <div>
                <h3 class="headline ml-5 mr-5 text-xs-center">Please Login To Access The Content</h3>
                <!-- <div> {{ card_text }} </div> -->
                <v-text-field v-model="name" type="email" label="email address" required></v-text-field>
                <v-text-field v-model="pwd" label="password" required type="password"></v-text-field>
              </div>
            </v-card-title>
          </v-card>
        </v-form>
        </v-card>

        <v-btn
          color="primary"
          @click="loginf()"
        >
          Continue
        </v-btn>

        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          flat
          class="mb-5"
        >
        <v-card flat class="pa-2">
          <v-card-title>
            VERIFY OTP
          </v-card-title>
          <v-card-text v-if="this.counter > 0">
            we have send an OTP to your phone number it will be expired in {{counter}}s
          </v-card-text>
          <v-card-text v-if="this.counter == 0">
            your OTP expired please try signing again
          </v-card-text>
          <v-form>
          <v-text-field
            v-model="OTP"
            label="Enter your OTP"
            id="id"
          ></v-text-field>
        </v-form>
        </v-card>
        </v-card>

        <v-btn
          color="primary"
          @click="confirmOTP()"
        >
          verify otp
        </v-btn>

        <v-btn flat @click="e1 = 1">back</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>


        
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      e1: 0,
      name: "",
      pwd: "",
      OTP: "",
      counter: 120,
      formError: {
        name: "",
        pwd: "",
        err: ""
      },
      card_text:
        "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat."
    };
  },
  methods: {
    async loginf() {
      if (this.name == "" || this.name == null) {
        this.formError.name = "please fill in the user name";
      } else {
        this.formError.name = "";
        if (this.pwd == "" || this.pwd == null) {
          this.formError.pwd = "please fill in the password";
        } else {
          this.formError.pwd = "";
          try {
            // await this.$store.dispatch("login", {
            //   name: this.name,
            //   pwd: this.pwd
            // });
            // setTimeout(() => {
            //   location.pathname = "/";
            // }, 1000);
            // this.name = "";
            // this.pwd = "";
            await this.$store.dispatch("loginf", {
              name: this.name,
              pwd: this.pwd
            });
            this.e1 = 2;
            this.couterStart()
          } catch (e) {
            this.formError.err = e.message;
          }
        }
      }
    },
    couterStart(){
      setInterval(() => {
        if (this.counter > 0) {
          this.counter--;
        } else {
          this.counter=0;
        }
      }, 1000);
    },
    async confirmOTP() {
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
              pwd: this.pwd,
              otp: this.OTP
            });
            setTimeout(() => {
              location.pathname = "/";
            }, 1000);
            this.name = "";
            this.pwd = "";
          } catch (e) {
            this.formError.err = e.message;
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
</style>
