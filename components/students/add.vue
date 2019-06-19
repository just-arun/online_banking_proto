<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Student</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form @submit.prevent="submit()">
              <v-layout wrap>
              <v-flex xs12>
                <v-select
                  :items="['school-1','school-2','school-3']"
                  v-model="person.school"
                  label="school"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="name*" hint="student full name" required v-model="person.name" autocomplete="false"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  label="Age"
                  type="number"
                  v-model="person.age"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="[1,2,3,4,5,6,7,8,9,10]"
                  v-model="person.std"
                  label="std"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['a','b','c']"
                  v-model="person.sec"
                  label="sec"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Father Name"
                  v-model="person.fatherName"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="person.email" label="Email*" type="email" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  label="Phone Number"
                  v-model="person.number"
                  type="number"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['o+','b+','a+','ab+','o-','b-','a-','ab-']"
                  v-model="person.bloodgroup"
                  label="Blood Group"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 v-if="$store.state.authUser">
                  <span class="right">
                      <span class="caption">Creator:</span>
                    <span>{{$store.state.authUser.name}}</span>
                  </span>
              </v-flex>
            </v-layout>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="$emit('closeAddStudent');closeForm()">cancel</v-btn>
          <v-btn color="blue darken-1" flat :loading="processing"
            :disabled="processing" @click="processingf();">Save<v-icon right dark>save</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Axios from 'axios';
export default {
    props: ["dialog"],
    data() {
      return {
        person: {
          name:null,
          std:null,
          sec:null,
          school:null,
          number:null,
          fatherName:null,
          studentId:null,
          bloodgroup:null,
          fine:null,
          email:null,
        },
        processing: false,
        school: ["school-1","school-2","school-3"]
      }
    },
    methods: {
      async submit() {
        try {
          const data = Axios.post('/api/schools/students/add',{person:this.person})
          data.then(data=>{
            if (data.data == "OK") {
              this.$emit('studentAdded');
              this.processing = !this.processing;
              this.$emit('closeAddStudent');
              this.$emit('getAllStudent');
            }
          })
        } catch(err) {
          console.log(err);
        }
      },
      clearform() {
          this.person.name = null;
          this.person.std = null;
          this.person.sec = null;
          this.person.school = null;
          this.person.number = null;
          this.person.fatherName = null;
          this.person.studentId = null;
          this.person.bloodgroup = null;
          this.person.fine = null;
          this.person.email = null;
      },
      async processingf() {
        console.log(this.person);
        this.processing = !this.processing;
        this.submit();
      },
      closeForm() {
        this.clearform();
      }
    },

}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
