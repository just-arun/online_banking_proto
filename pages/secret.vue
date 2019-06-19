<template>
<div class="page">
<v-container>
    <tables/>
</v-container>
</div>
</template>

<script>
import tables from './../components/students/table'
export default {
    fetch ({ store, redirect }) {
        if (!store.state.authUser) {
        return redirect('/login');
        }
    },
    components: {
        tables
    }
}
</script>

<style>

</style>
