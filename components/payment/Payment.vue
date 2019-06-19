<template>
  <div>
    <!-- <v-stepper v-model="e1">
    <v-stepper-header flat>
      <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">Name of step 3</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-5" flat min-height="200px">
          <v-card-title>Please select the catagory for which to pay your bill</v-card-title>
          <v-select :items="paymentfor" v-model="newPerson.paymentFor" label="Payment For"></v-select>
        </v-card>

        <v-layout row>
          <v-btn flat>Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="newPerson.paymentFor === null" @click="e1 = 2">next</v-btn>
        </v-layout>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-5" flat min-height="200px"></v-card>

        <v-layout wrap>
          <v-btn flat @click="e1 = 1">back</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="e1 = 3">next</v-btn>
        </v-layout>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-5" flat min-height="200px"></v-card>

        <v-btn color="primary" @click="e1 = 1">Continue</v-btn>

        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
    </v-stepper>-->
    <v-stepper v-model="e1" vertical>
      <v-list v-if="error !== null">
        <v-list-tile class="error white--text" @click="error = null" avatar>
          <v-list-tile-title>{{error}}</v-list-tile-title>
          <v-list-tile-content>please fill in the correct details and try again</v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-stepper-step :complete="e1 > 1" step="1">
        Online Payment
        <small>Choose your catagory</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card flat class="mb-5">
          <!-- <v-card-title>Please select the catagory for which to pay your bill</v-card-title> -->
          <v-select :items="paymentfor" v-model="newPerson.paymentFor" label="Payment For"></v-select>
          <v-select
            v-if="IfSchool"
            :items="school"
            v-model="newPerson.instituteName"
            label="Select Your School"
          ></v-select>
        </v-card>
        <v-layout row wrap>
          <v-btn @click="newPerson = Person" flat>cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="fieldOne" @click="e1 = 2">Continue</v-btn>
        </v-layout>
      </v-stepper-content>

      <v-stepper-step :complete="e1 > 2" step="2">Verify yourself</v-stepper-step>

      <v-stepper-content v-if="IfSchool" step="2">
        <v-card flat class="mb-5">
          <v-text-field label="Your Admision Number" v-model="newPerson.regesterNumber"></v-text-field>
        </v-card>
        <v-layout row>
          <v-btn flat @click="e1--">back</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="FindStudent()"
            :disabled="newPerson.regesterNumber == null"
          >verify</v-btn>
        </v-layout>
      </v-stepper-content>

      <v-stepper-step :complete="e1 > 3" step="3">Your Profile</v-stepper-step>

      <v-stepper-content step="3">
        <v-card v-if="tempPerson !== null" flat class="cus-table">
          <v-layout mt-1>
            <span class="span">name:</span>
            <span class="span">{{tempPerson.name}}</span>
          </v-layout>
          <v-layout mt-1>
            <span class="span">standerd:</span>
            <span class="span">{{ tempPerson.std }}</span>
          </v-layout>
          <v-layout mt-1>
            <span class="span">Section</span>
            <span class="span">{{ tempPerson.sec }}</span>
          </v-layout>
          <v-layout mt-1>
            <span class="span">school</span>
            <span class="span">{{ tempPerson.school }}</span>
          </v-layout>
          <v-layout mt-1>
            <span class="span">number</span>
            <span class="span">{{ tempPerson.number }}</span>
          </v-layout>
          <v-layout mt-1>
            <span class="span">city:</span>
            <span class="span">{{ tempPerson.city }}</span>
          </v-layout>
          <v-layout mt-1>
            <span class="span">father name</span>
            <span class="span">{{ tempPerson.fatherName }}</span>
          </v-layout>
          <v-layout mt-1>
            <span class="span">studentId</span>
            <span class="span pr-2">{{tempPerson.studentId}}</span>
          </v-layout>
          <v-layout row wrap align-center>
            <v-flex xs12>
              <h3>Fees Structure</h3>
            </v-flex>
            <v-flex class="pa-3">
              <v-progress-circular
                :rotate="360"
                :size="60"
                :width="15"
                :value="countFees(tempPerson.fees) * 33.33"
                color="light-green"
              >{{ countFees(tempPerson.fees) }}</v-progress-circular>
            </v-flex>
            <v-flex class="pa-3">
              <div class="checkbox" v-for="(item, i) in tempPerson.fees" :key="i">
                <span>
                  <v-icon v-if="item" color="green">check_circle</v-icon>
                  <v-icon v-if="!item" color="error">clear</v-icon>
                  term-{{i + 1}}:
                </span>
              </div>
            </v-flex>
          </v-layout>
        </v-card>
        <v-layout row>
          <v-btn flat @click="e1--">back</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="e1 = 4">Continue</v-btn>
        </v-layout>
      </v-stepper-content>

      <v-stepper-step :complete="e1 > 4" step="4">Select, Calculate &amp; get OTP</v-stepper-step>
      <v-stepper-content  v-if="tempPerson !== null" step="4">
        <v-card class="mb-5" flat>
          <v-layout row align-center>
            <v-checkbox
              label="term-1"
              v-model="TermPicker"
              value="term-1"
              :disabled="tempPerson.fees[0]"
            ></v-checkbox>
            <v-chip v-if="tempPerson.fees[0]" class="right" color="green" text-color="white">Payed</v-chip>
            <span v-if="!tempPerson.fees[0]">
              <v-icon>fa fa-inr</v-icon>
              {{schoolFeesInit}}
            </span>
          </v-layout>
          <v-layout row align-center>
            <v-checkbox
              label="term-2"
              v-model="TermPicker"
              value="term-2"
              :disabled="tempPerson.fees[1]"
            ></v-checkbox>
            <v-chip v-if="tempPerson.fees[1]" class="right" color="green" text-color="white">Payed</v-chip>

            <span v-if="!tempPerson.fees[1]">
              <v-icon>fa fa-inr</v-icon>
              {{schoolFeesInit}}
            </span>
          </v-layout>
          <v-layout row align-center>
            <v-checkbox
              label="term-3"
              v-model="TermPicker"
              value="term-3"
              :disabled="tempPerson.fees[2]"
            ></v-checkbox>
            <v-chip v-if="tempPerson.fees[2]" class="right" color="green" text-color="white">Payed</v-chip>

            <span v-if="!tempPerson.fees[2]">
              <v-icon>fa fa-inr</v-icon>
              {{schoolFeesInit}}
            </span>
          </v-layout>
          <v-layout pt-3 pb-4 row align-center>
            <span>Tax</span>
            <v-spacer></v-spacer>
            <span>
              <v-icon>fa fa-inr</v-icon>
              <span>{{taxcut}}</span>
            </span>
          </v-layout>
          <v-layout pt-3 pb-4 row align-center>
            <span>Others</span>
            <v-spacer></v-spacer>
            <span>
              <v-icon>fa fa-inr</v-icon>
              <span>{{cumision * TermPicker.length}}</span>
            </span>
          </v-layout>
          <v-layout pt-3 pb-4 row align-center>
            <span>Fine</span>
            <v-spacer></v-spacer>
            <span>
              <v-icon>fa fa-inr</v-icon>
              <span>{{tempPerson.fine}}</span>
            </span>
          </v-layout>
          <v-layout pt-3 pb-4 row align-center>
            <v-select solo :items="OTPmethod" v-model="OtpMethod" label="Select OTP method"></v-select>
          </v-layout>
          <v-layout row align-center pt-4 class="bt-1">
            <span>Total Cost:</span>
            <v-spacer></v-spacer>
            <v-icon>fa fa-inr</v-icon>
            <span>{{totalCost}}</span>
          </v-layout>
        </v-card>
        <v-layout row>
          <v-btn flat @click="e1--">back</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="OtpMethod === null" @click="getOTP()">Get OTP</v-btn>
        </v-layout>
      </v-stepper-content>
      <v-stepper-step :complete="e1 > 5" step="5">Verify OTP</v-stepper-step>
      <v-stepper-content step="5">
        <v-card>
          <v-list v-if="otpErr !== null">
            <v-list-tile class="error" @click="otpErr = null" avatar>
              {{ otpErr }}
            </v-list-tile>
          </v-list>
          <v-card-title>
            please confirm your OTP to finish your Payment
          </v-card-title>
          <v-container>
            <v-text-field
              label="Enter Your OTP"
              v-model="confirmOTP"
            ></v-text-field>
          </v-container>
          <v-layout row>
            <v-btn flat @click="e1--">back</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="confirmOTP === null" @click="ConfirmOtp()">Get OTP</v-btn>
          </v-layout>
        </v-card>
      </v-stepper-content>
      <v-stepper-step :complete="e1 > 6" step="6">Complite Payment</v-stepper-step>
      <v-stepper-content step="6">
        <v-card>
          <h1>verification has bein done successfuly and we can finish our payment</h1>
        </v-card>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      e1: 0,
      paymentfor: ["school", "college", "gym", "martimoni"],
      school: ["school-1", "school-2", "school-3", "school-4"],
      Sclass: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      section: ["a", "b", "c", "d"],
      error: null,
      otpErr: null,
      cumision: 10,
      OTPmethod: ["EMAIL", "SMS", "BOTH"],
      OtpMethod: null,
      newPerson: {
        paymentFor: null,
        instituteName: null,
        regesterNumber: null
      },
      confirmOTP: null,
      tempPerson: null,
      Person: {
        paymentFor: null,
        instituteName: null,
        regesterNumber: null,
        name: null,
        class: null,
        section: null
      },
      TermPicker: [],
      schoolFeesInit: null
    };
  },
  computed: {
    IfSchool() {
      return this.newPerson.paymentFor == "school";
    },
    fieldOne() {
      return (
        this.newPerson.paymentFor === null ||
        this.newPerson.instituteName === null
      );
    },
    tempPersonFees() {
      if (this.tempPerson !== null) {
        return this.tempPerson.fees.reduce((a, b) => (b ? ++a : a), 0);
      }
    },
    pretotalCost() {
      if (this.tempPerson !== null) {
        return this.schoolFeesInit * this.TermPicker.length;
      }
    },
    taxcut() {
      if (this.tempPerson !== null) {
        return (this.pretotalCost / 100) * 10;
      }
    },
    totalCost() {
      if (this.tempPerson !== null) {
        return (
          this.pretotalCost +
          this.taxcut +
          this.cumision * this.TermPicker.length
        );
      }
    }
    // schoolFees() {
    //   if (this.tempPerson !== null) {
    //     return this.schoolFeesInit.fees;
    //   }
    // },
    // peiceCalc() {
    //   if (this.tempPerson !== null) {
    //     return this.payment.reduce((a,b) => (b?++a:a),0);
    //   }
    // },
  },
  watch: {},
  methods: {
    async FindStudent() {
      let fields = {
        forWhich: this.newPerson.paymentFor,
        companyName: this.newPerson.instituteName,
        key: this.newPerson.regesterNumber
      };
      try {
        const data = await Axios.post("/api/payment", fields);
        this.tempPerson = data.data.data;
        console.log(this.TermPicker);

        this.schoolFeesInit = data.data.schoolFees[0].fees[0];
        console.log(data);
        this.e1 = 3;
      } catch (err) {
        console.log(err);
        this.error = "student not found";
      }
    },
    isSchool() {
      return this.newPerson.paymentFor == "school";
    },
    countFees(arr) {
      return arr.reduce((a, b) => (b ? ++a : a), 0);
    },
    async getOTP() {
      try {
        const key = this.tempPerson._id;
        const terms = this.TermPicker;
        const termCost = this.schoolFeesInit * this.TermPicker.length;
        const taxCut = (this.pretotalCost / 100) * 10;
        const cummision = this.cumision * this.TermPicker.length;
        const phone = this.tempPerson.number;
        const OtpMethod = this.OtpMethod;
        const email = this.tempPerson.email;
        const data = await Axios.post("/api/payment/attempt", {
          sID: this.tempPerson._id,
          OtpMethod,
          phone,
          key,
          terms,
          termCost,
          email,
          taxCut,
          cummision
        });
        console.log(data.data);
        if (data.data == "OK") {
          this.e1++;
        } else {
          this.otpErr = "OTP dosent match";
        }
      } catch (err) {
        console.log(err);
      }
    },
    async ConfirmOtp() {
      try{
        const OTP = this.confirmOTP;
        const data = await Axios.post('/api/payment/verifyOTP',{OTP,id:this.tempPerson._id})
        console.log(data.data);
        if (data.data == "OK") {
          this.e1++;
        } else {
          this.otpErr = "OTP dosent match";
        }
      } catch (err) {
        this.otpErr = "OTP dosent match";
        console.log(err);
      }
    }
    // initianCount() {
    //   return (3 - this.payment.reduce((a,b) => (b?++a:a),0));
    // }
  }
};
</script>

<style scope>
.checkbox {
  height: 40px;
  margin: 0px;
  padding: 0px;
}
.cus-table .layout {
  box-shadow: 0 0.2px 0 0 gray;
}
/* .cus-table .layout:nth-last-of-type(odd) {
  background: rgb(240, 240, 240);
} */

.cus-table .span {
  padding: 10px;
  min-width: 30%;
}
.cus-table .span:nth-child(odd) {
  /* text-align: right; */
  width: 110px;
}
.bt-1 {
  box-shadow: 0 -0.5px 0 0 grey;
}
</style>
