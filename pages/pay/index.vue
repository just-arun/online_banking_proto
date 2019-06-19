<template>
    <div class="page">
        <v-container>
            <v-layout row wrap justify-center>
                <v-flex xs12 sm8 md6 lg5>
                    <no-ssr>
                        <Payment/>
                    </no-ssr>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import Tiles from './../../components/home/tiles'
import Payment from '../../components/payment/Payment'
import Table from './../../components/students/table'
export default {
    components: {
        Tiles,
        Payment,
        Table
    }
}
</script>

<style>

</style>
