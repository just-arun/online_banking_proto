<template>
  <v-carousel class=" pa-1" hide-controls hide-delimiters>
    <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
  </v-carousel>
</template>
<script>
import school from '~/assets/img/high-school.jpg'
import college from '~/assets/img/college-2.jpg'
import gym from '~/assets/img/gym.jpg'
import matrimonio from '~/assets/img/matrimonio.jpg'

export default {
  data() {
    return {
      items: [
        {
          src: school
        },
        {
          src: college
        },
        {
          src: gym
        },
        {
          src: matrimonio
        }
      ]
    };
  }
};
</script>