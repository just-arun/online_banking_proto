<template>
      <v-layout row wrap justify-center>
        <v-flex xs12 sm5 md4 lg3 xl3 v-for="(item, i) in items" :key="i">
          <v-layout row wrap justify-center>
            <v-flex xs12 pa-2>
              <v-card flat :hover="true" class="rounded-card"  :to="item.link">
                <v-img :src="item.img" :aspect-ratio=".8" >
                </v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
</template>

<script>
import school from "~/assets/img/high-school.jpg";
import college from "~/assets/img/college-2.jpg";
import gym from "~/assets/img/gym.jpg";
import matrimonio from "~/assets/img/matrimonio.jpg";
export default {
    data() {
        return {
            items: [
                { link:'/school', title: "Schools", img: school },
                { link:'/college', title: "College", img: college },
                { link:'/gym', title: "Gym", img: gym },
                { link:'/matrimony', title: "Matrimony", img: matrimonio }
            ],
        }
    },
}
</script>

<style>

</style>
