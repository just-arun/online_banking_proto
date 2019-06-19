<template>
  <v-layout row justify-center>
    

    <no-ssr>
        <v-dialog
      v-model="downloadREQ"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Select Catagory To Download</v-card-title>

        <v-card-text>
          please select the appropriate catagory to download the file,Note the person who is downloading it may be taken in to record for security reasons.
        </v-card-text>
        <v-card-actions>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-select
                        :items="['student']"
                        v-model="DownloadFor"
                        label="Select Record"
                    ></v-select>
                </v-flex>

            <v-flex xs12 style="text-align:center;">
                <v-btn style="display:inline-block" @click="downloadFile()" color="primary ">Download as EXEL</v-btn>
                <v-btn
                :loading="loading4"
                :disabled="loading4"
                color="info"
                @click="loader = 'loading4'"
                >
                Icon Loader
                </v-btn>
            </v-flex>
            </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </no-ssr>
  </v-layout>
</template>

<script>
import Axios from 'axios';
export default {
    props: ['downloadREQ'],
    data() {
        return {
            DownloadFor: null,
            loading4: false,
            loader: null,
        }
    },
    methods: {
        async downloadFile() {
            console.log(this.DownloadFor);
            
            if (this.DownloadFor !== null) {
                try{
                    const data = Axios.post(`/api/schools/downloads/${this.DownloadFor}`);

                    data.then(res=>{
                        if (res.data == "OK") {
                            this.getDownloadable();
                        }
                    })
                } catch(err) {
                    console.log(err);
                }
            }
        },
        async getDownloadable() {
            Axios({
                url: `/api/schools/downloads/get/${this.DownloadFor}`,
                method: 'GET',
                responseType: 'blob', // important
            })
            .then((res) => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'students.xlsx');
                document.body.appendChild(link);
                link.click(); 
            });
        }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    }
}
</script>

<style>

</style>
