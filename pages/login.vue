<template>
  <div>
    <login/>
  </div>
</template>


<script>
import login from './../components/login'
export default {
  fetch({ store, redirect }) {
    if (store.state.authUser) {
      return redirect("/dashboard");
    }
  },
  components: {
    login
  }
};
</script>


<style>
</style>
