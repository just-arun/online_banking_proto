<template>
    <div class="cus-container">
        <dashboard/>
    </div>
</template>

<script>
import dashboard from './dashboard/';
export default {
    components: {
        dashboard
    }
}
</script>

<style>
    .cus-container{
        max-width: 1000px;
        margin: 0px auto;
    }
    .sticky-top{
        top: 60px;
        z-index: 2;
        position: sticky;
    }
</style>
