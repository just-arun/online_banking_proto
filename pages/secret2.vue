<template>
  <div>
    <v-container>
      <v-layout justify-center row wrap>
        <v-card>
          <v-card-title primary-title>this has an higher level priority</v-card-title>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  fetch({ store, redirect }) {
    if (!store.state.authUser) {
      return redirect("/login");
    } else {
      if (store.state.authUser.level !== "two") {
        return redirect("/login");
      }
    }
  }
};
</script>

<style>
</style>
