<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm5 md5 lg5 xl4>
        <v-form @submit.prevent="login()">
          <v-layout row justify-center>
            <v-btn class="elevation-1" style="position:relative;top:40px;z-index:1;" large fab>
              <v-icon>person</v-icon>
            </v-btn>
          </v-layout>
          <v-card class="pt-2">
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
                <h3 class="headline ml-5 mr-5">Please Login To Access The Content</h3>
                <!-- <div> {{ card_text }} </div> -->
                <v-text-field v-model="name" label="First name" required></v-text-field>
                <v-text-field v-model="pwd" label="password" required type="password"></v-text-field>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-layout row>
                <v-spacer></v-spacer>
                <v-btn type="submit">login</v-btn>
                <v-spacer></v-spacer>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import axios from "axios";
export default {
  fetch({ store, redirect }) {
    if (store.state.authUser) {
      return redirect("/dashboard");
    }
  },
  data() {
    return {
      name: "",
      pwd: "",
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
