<template>
    <no-ssr  class="pa-0 ma-0">
      <!-- <v-layout class="pa-0 ma-0" row wrap justify-center>
        <v-flex xs11 sm11 md6 lg6>
          <v-layout row wrap>
            <v-flex pa-1 xs12>
              <v-card pa-1>
                <Chart/>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs11 sm11 md6 lg6>
          <v-layout row wrap>
            <v-flex pa-1 xs12>
              <v-card>
                <Linechart/>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout> -->
      <div>

        <v-layout row wrap>
          <v-card ripple class="cus-card ma-1">
            <v-icon style="font-size:8rem;" large>dashboard</v-icon>
            <p class="ma-0 pa-0">Track</p>
          </v-card>
          <v-card ripple class="cus-card ma-1">
            <v-icon style="font-size:8rem;" large>assignment</v-icon>
            <p class="ma-0 pa-0">controlls</p>
          </v-card>
            <v-card to="/dashboard/students" ripple class="cus-card ma-1">
              <v-icon style="font-size:8rem;" large>format_list_bulleted</v-icon>
              <p class="ma-0 pa-0">Students</p>
            </v-card>
        </v-layout>
      </div>
    </no-ssr>
</template>

<script>
import Chart from "~/components/Chart";
import Linechart from "~/components/Linechart";
import Table from '~/components/students/table'

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
  components: {
    Chart,
    Linechart,
    Table
  }
};
</script>

<style scope>
.cus-card{
  border-radius:20px;
  padding:2rem;
  user-select: none;
  cursor:pointer;
}

</style>
