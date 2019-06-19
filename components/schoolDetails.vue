
    <template >
  <v-layout>
    <v-flex v-for="(item, i) in items" :key="i" xs12 sm6 >
      <v-card>
        <v-img class="image black--text" height="200px" :src="img">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline font-weight-black">{{item.name}}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <div>
            <span class="grey--text">{{item.name}}</span>
            <br>
            <span>{{item.started}}-present</span>
            <br>
            <span>no:10, 2nd str, {{item.address}}, chennai</span>
          </div>
        </v-card-title>
        <v-card-title >
            <v-layout row>
                <v-flex xs12>
                    <v-list class="text-sm-center">
                        <v-list-tile avatar>
                            school pricing structure
                        </v-list-tile>
                    </v-list>
            <v-list>
                <v-list-tile  v-for="(cla, i) in item.classes" :key="i" avatar>
                    <v-layout row>
                        <span>class  {{cla.std}}</span>
                        <v-spacer></v-spacer>
                        <span> {{cla.fees[0]}} </span>
                    </v-layout>
                </v-list-tile>
                <v-divider></v-divider>
            </v-list>
                </v-flex>
            </v-layout>
            <!-- <table>
                <thead>
                    <th>Class</th>
                    <th>Fees/per term</th>
                </thead>
                <tbody>
                    <tr v-for="(cla, i) in item.classes" :key="i">
                        <td>class {{cla.std}}</td>
                        <td> {{cla.fees[0]}} </td>
                    </tr>
                </tbody>
            </table> -->
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import img from "./../assets/img/high-school.jpg";
import axios from "axios";
export default {
  data() {
    return {
      img: img,
      items: []
    };
  },
  methods: {
    getData: function() {
      axios
        .get("/api/schools/all")
        .then(data => {
          this.items = data.data;
          console.log(this.items);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scope>
.image {
  position: relative;
  opacity: 0.7;
  filter: brightness(.6);
}
</style>
