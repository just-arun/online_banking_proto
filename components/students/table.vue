<template>
  <div class="page">
    <v-card class="ma-1">
      <v-layout row wrap align-center>
        <v-btn flat hover v-if="!ifAnyOpened" @click="expandStudentsDetail()">Expand All</v-btn>
        <v-btn flat hover v-if="ifAnyOpened" @click="hideStudentsDetail()">Closs All</v-btn>
        <v-spacer></v-spacer>
        <div>
          <v-btn flat hover small fab @click="filterDialog = !filterDialog">
            <v-icon>filter_list</v-icon>
          </v-btn>
          <v-btn flat hover small fab @click="addStudent = !addStudent">
            <v-icon>add</v-icon>
          </v-btn>
          <v-btn flat hover small fab  @click="downloadREQ = true">
            <v-icon>file_download</v-icon>
          </v-btn>
        </div>
      </v-layout>
    </v-card>
    <v-layout row wrap class="sticky-top">
      <v-spacer></v-spacer>
      <v-flex xs12>
        <v-layout row>
          <v-flex>
            <v-text-field
              append-icon="search"
              solo
              class="ma-1"
              label="student name"
              @keyup="filteredList()"
              v-model="search"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex
        v-for="(item, i) in updatedStudent"
        style="transition:.5s;"
        :key="i"
        xs12
        sm6
        md4
        lg3
        :class="{'xs12 sm12 md12 lg3':item.show}"
      >
        <v-card hover class="ma-1">
          <v-layout
            align-center
            class="notpayed"
            :class="{'payed': item.fees[0] && item.fees[1] && item.fees[2] }"
            row
            wrap
            justify-space-between
          >
            <v-card-title>
              <span>{{item.name}}</span>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-switch color="primary" class="right shrink" v-model="item.show"></v-switch>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row v-if="item.show" :class="{'animatedOpen': item.show}">
            <v-progress-circular
              :rotate="360"
              :size="60"
              :width="15"
              :value="countFees(item.fees) * 33.33"
              color="light-green"
            >{{ countFees(item.fees) }}</v-progress-circular>
            <v-spacer></v-spacer>
            <v-btn v-if="!item.edit" flat fab small @click="item.edit = !item.edit">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn
              v-if="item.edit"
              flat
              fab
              small
              @click="item.edit = !item.edit;updateStudent(item)"
            >
              <v-icon>save</v-icon>
            </v-btn>
            <v-btn color="error" fab small flat @click="deleteStudent(item._id)">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-layout>
          <v-card-text v-if="item.show" :class="{'animatedOpen': item.show}">
            <v-layout row>
              <v-checkbox :disabled="!item.edit" v-model="item.fees[0]" :label="`term-1`"></v-checkbox>
              <v-checkbox :disabled="!item.edit" v-model="item.fees[1]" :label="`term-2`"></v-checkbox>
              <v-checkbox :disabled="!item.edit" v-model="item.fees[2]" :label="`term-3`"></v-checkbox>
            </v-layout>
            <v-layout row>
              <v-text-field :disabled="!item.edit" label="name" v-model="item.name"></v-text-field>
            </v-layout>
            <v-layout row>
              <v-text-field :disabled="!item.edit" label="std" v-model="item.std"></v-text-field>
            </v-layout>
            <v-layout row>
              <v-text-field :disabled="!item.edit" label="sec" v-model="item.sec"></v-text-field>
            </v-layout>
            <v-layout row>
              <v-text-field :disabled="!item.edit" label="school" v-model="item.school"></v-text-field>
            </v-layout>
            <v-layout row>
              <v-text-field :disabled="!item.edit" label="number" v-model="item.number"></v-text-field>
            </v-layout>
            <v-layout row>
              <v-text-field :disabled="!item.edit" label="father name" v-model="item.fatherName"></v-text-field>
            </v-layout>
            <v-layout row>
              <v-text-field disabled label="student ID" v-model="item.studentId"></v-text-field>
            </v-layout>
            <v-layout row>
              <v-text-field :disabled="!item.edit" label="bloodgroup" v-model="item.bloodgroup"></v-text-field>
            </v-layout>
            <v-layout row>
              <v-text-field :disabled="!item.edit" label="fine" type="number" v-model="item.fine"></v-text-field>
            </v-layout>
            <v-layout row>
              <v-text-field :disabled="!item.edit" label="email" v-model="item.email"></v-text-field>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs4 v-for="(item, i) in item.fees" :key="i">
                <v-card flat class="red ma-1" style="padding:1px" :class="{'green': item}"></v-card>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <!-- <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">WARNING!!!</v-card-title>
          <v-card-text>your are about to delete an student from your database due to security reasons please confirm that your are athorised to my entering your user name and password again.</v-card-text>
          <form @submit.prevent>
            <v-text-field name="name" label="your name" id="id" solo class="pa-2"></v-text-field>
            <v-text-field
              name="name"
              label="your password"
              id="id"
              type="password"
              solo
              class="pa-2"
            ></v-text-field>
            <v-btn color="error">delete</v-btn>
          </form>
        </v-card>
      </v-dialog>-->
      <!-- <v-dialog
        v-model="filterDialog"
        scrollable
        :overlay="false"
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card class="pa-4">
          <v-card-title>Filter</v-card-title>
          <v-layout row wrap>
            <v-flex xs12>
              <v-select :items="std" v-model="selestedSTD" label="standared"></v-select>
            </v-flex>
            <v-flex xs12>
              <v-select :items="section" v-model="selectedSEC" label="section"></v-select>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>-->
    </v-layout>
    <add
      v-bind:dialog="addStudent"
      v-on:getAllStudent="getAllStudent"
      v-on:studentAdded="snackbar = true"
      v-on:closeAddStudent="addStudent = false"
    />
    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      open-on-hover
      :transition="transition"
      fixed
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon>account_circle</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="orange">
        <v-icon>filter_list</v-icon>
      </v-btn>
      <v-btn fab dark small color="blue">
        <v-icon>sort</v-icon>
      </v-btn>
      <v-btn fab dark small color="light-green" @click="addStudent = !addStudent">
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn fab dark small color="light-green">
        <v-icon>file_download</v-icon>
      </v-btn>
    </v-speed-dial>
    <!-- toster -->

    <v-snackbar v-model="snackbar" color="success" top :timeout="2000">
      Student Added
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar v-model="deletedIndicator" color="success" top :timeout="2000">
      Student Deleted
      <v-btn dark flat @click="deletedIndicator = false">Close</v-btn>
    </v-snackbar>
    <Download
      v-bind:downloadREQ="downloadREQ"
      v-on:downloadREQOPEN="downloadREQ = true"
      v-on:downloadREQCLOSE="downloadREQ = false"
    />
    <v-btn
      color="primary"
      dark
     
    >
      Open Dialog
    </v-btn>
  </div>
</template>

<script>
import axios from "axios";
import add from "./add";
import Download from "./download";
export default {
  components: { add, Download },
  data() {
    return {
      search: "",
      updatedStudent: [],
      feesVal: 90,
      filterDialog: false,
      addStudent: false,
      fab: false,
      snackbar: false,
      deletedIndicator: false,
      downloadREQ: false,
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Calories", value: "calories" },
        { text: "age (g)", value: "age" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" }
      ],
      selestedSTD: null,
      selectedSEC: null,
      std: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      section: ["a", "b", "c"],
      students: [],
      direction: "top",
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: "slide-y-reverse-transition"
    };
  },
  methods: {
    thisStudent: function(s) {
      console.log(s);
    },
    async getAllStudent() {
      try {
        let data = await axios.get("/api/schools/students/all");
        this.students = data.data;
        this.updatedStudent = this.students;
      } catch (err) {
        console.log(err);
      }
    },
    updateStudent: function(std) {
      let student = std;
      axios
        .put(`/api/schools/students/update/${std._id}`, student)
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    },

    filteredList() {
      this.updatedStudent = this.students.filter(post => {
        return post.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    async deleteStudent(id) {
      if (confirm("do you realy want to delete this student")) {
        this.dialog = !this.dialog;
        try {
          const data = axios.delete(`/api/schools/students/delete/${id}`);
          data.then(data => {
            console.log(data);
            this.getAllStudent();
          });
        } catch (err) {
          console.log(err);
        }
      }
    },
    countFees(arr) {
      return arr.reduce((a, b) => (b ? ++a : a), 0);
    },
    async expandStudentsDetail() {
      await this.students.forEach(item => {
        item.show = true;
      });
    },
    async hideStudentsDetail() {
      await this.students.forEach(item => {
        item.show = false;
      });
    },
    studentAdded() {}
  },
  created() {
    this.getAllStudent();
  },
  computed: {
    // filteredList() {
    //   return this.students.filter(post => {
    //     return post.name.toLowerCase().includes(this.search.toLowerCase())
    //   })
    // },
    ifAnyOpened() {
      return this.students.reduce((a, b) => (b.show ? ++a : a), 0);
    }
  }
};
</script>

<style>
.notpayed {
  border-left: 5px solid rgb(255, 69, 62);
  position: relative;
}
.payed {
  border-left: 5px solid rgb(153, 255, 0);
  position: relative;
}
.v-progress-circular {
  margin: 1rem;
}
.sticky-top {
  position: sticky;
  top: 60px;
  z-index: 2;
}
</style>
