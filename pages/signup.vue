<template>
  <div>
    <v-container>
      <v-layout row wrap justify-center align-center>
        <v-flex xs12 sm8 md6 lg6>
          <v-card class="pa-3">
            <h1 class="text-xs-center">Signup</h1>
            <v-list v-if="servertErr !== null">
              <v-list-tile class="text-xs-center pink lighten-5 red--text">
                <span>{{servertErr}}</span>
                <v-spacer></v-spacer>
                <v-btn @click="servertErr = null" right flat small fab color="red">
                  <v-icon>close</v-icon>
                </v-btn>
              </v-list-tile>
            </v-list>

            <form @submit.prevent="submit()">
              <v-layout row wrap>
                
              <v-flex xs12 lg6>
                <v-text-field
                class="pa-1"
                v-model="fname"
                :error-messages="fnameErrors"
                :counter="10"
                label="First Name"
                required
                @input="$v.fname.$touch()"
                @blur="$v.fname.$touch()"
              ></v-text-field>
              </v-flex>
              <v-flex xs12 lg6>
                <v-text-field
                class="pa-1"
                v-model="lname"
                :error-messages="lnameErrors"
                :counter="10"
                label="Last Name"
                required
                @input="$v.lname.$touch()"
                @blur="$v.lname.$touch()"
              ></v-text-field>
              </v-flex>
              <v-flex xs12 lg6>
                <v-text-field
                class="pa-1"
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
              </v-flex>
              <v-flex xs12 lg6>
                <v-text-field
                class="pa-1"
                v-model="phone"
                :error-messages="phoneErrors"
                label="Phone Number"
                required
                type="number"
                @input="$v.phone.$touch()"
                @blur="$v.phone.$touch()"
              ></v-text-field>
              </v-flex>
              <v-flex xs12 lg6>
                <v-select
                v-model="level"
                :items="items"
                :error-messages="levelErrors"
                label="Level"
                required
                @change="$v.level.$touch()"
                @blur="$v.level.$touch()"
              ></v-select>
              </v-flex>
              <v-flex xs12 lg6
              v-if="level == 'one' ">
                <v-text-field
                class="pa-1"
                label="Age"
                required
                type="number"
              ></v-text-field>
              </v-flex>
              <v-flex xs12 lg6
              v-if="level == 'one' ">
                <v-text-field
                class="pa-1"
                label="experience"
                required
                type="number"
              ></v-text-field>
              </v-flex>
              <v-flex xs12 lg6
              v-if="level == 'one' ">
                <v-text-field
                class="pa-1"
                label="class"
                required
              ></v-text-field>
              </v-flex>
              <v-flex xs12 lg6
              v-if="level == 'one' ">
                <v-text-field
                class="pa-1"
                label="insName"
                required
              ></v-text-field>
              </v-flex>
              <v-flex xs12 lg6>
                <v-text-field
                class="pa-1"
                v-model="pwd"
                :error-messages="pwdErrors"
                label="Password"
                required
                :type="pwdtype1 ? 'text' : 'password'"
                :append-icon="pwdtype1 ? 'visibility' : 'visibility_off'"
                @input="$v.pwd.$touch()"
                @blur="$v.pwd.$touch()"
                @click:append="pwdtype1 = !pwdtype1"
              ></v-text-field>
              </v-flex>
              <v-flex xs12 lg6>
                <v-text-field
                class="pa-1"
                v-model="pwd2"
                :error-messages="pwd2Errors"
                label="confirm Password"
                required
                :error="pwd !== pwd2"
                :type="pwdtype2 ? 'text' : 'password'"
                :append-icon="pwdtype2 ? 'visibility' : 'visibility_off'"
                @input="$v.pwd2.$touch()"
                @blur="$v.pwd2.$touch()"
                @click:append="pwdtype2 = !pwdtype2"
              ></v-text-field>
              </v-flex>
              </v-layout>

              <v-layout row>
                <v-btn @click="submit">submit</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="clear">clear</v-btn>
              </v-layout>
            </form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email,
  minLength
} from "vuelidate/lib/validators";
import axios from "axios";

export default {
  // fetch({ store, redirect }) {
  //   if (!store.state.authUser) {
  //     return redirect("/login");
  //   } else {
  //     if (store.state.authUser.level !== "two") {
  //       return redirect("/login");
  //     }
  //   }
  // },
  mixins: [validationMixin],
  validations: {
    fname: { required, maxLength: maxLength(10) },
    lname: { required, maxLength: maxLength(10) },
    phone: { required },
    email: { required, email },
    level: { required },
    pwd: { required },
    pwd2: { required },
    checkbox: {
      checked(val) {
        return val;
      }
    }
  },
  data: () => ({
    fname: "",
    lname: "",
    email: "",
    phone: null,
    level: null,
    pwd: "",
    pwd2: "",
    items: ["one", "two"],
    pwdtype1: false,
    pwdtype2: false,
    servertErr: null
  }),
  computed: {
    fnameErrors() {
      const errors = [];
      if (!this.$v.fname.$dirty) return errors;
      !this.$v.fname.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.fname.required && errors.push("Name is required.");
      return errors;
    },
    lnameErrors() {
      const errors = [];
      if (!this.$v.lname.$dirty) return errors;
      !this.$v.lname.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.lname.required && errors.push("Name is required.");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.required && errors.push("Phone number is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    pwdErrors() {
      const errors = [];
      if (!this.$v.pwd.$dirty) return errors;
      !this.$v.pwd.required && errors.push("password is required.");
      return errors;
    },
    pwd2Errors() {
      const errors = [];
      if (!this.$v.pwd2.$dirty) return errors;
      !this.$v.pwd2.required && errors.push("Password dosent match");
      return errors;
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.fname.$error) {
        if (!this.$v.lname.$error) {
          if (!this.$v.email.$error) {
            if (!this.$v.phone.$error) {
              if (!this.$v.pwd.$error) {
                if (this.pwd === this.pwd2) {
                  axios
                    .post("/api/signup", {
                      fname: this.fname,
                      lname: this.lname,
                      email: this.email,
                      phone: this.phone,
                      pwd: this.pwd
                    })
                    .then(res => {
                      console.log(res);
                      console.log(res.msg);
                    })
                    .catch(err => {
                      if (err) {
                        this.servertErr = "User Exist";
                      }
                    });
                }
              }
            }
          }
        }
      }
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.phone = null;
      this.pwd = null;
      this.pwd2 = null;
    }
  }
};
</script>

<style>
.border-color-red {
  border-color: red;
}
</style>
