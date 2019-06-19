<template>
    <div class="page">
        <v-container>
            <v-layout row wrap>
                <v-flex xs12 md6 lg5>
                    <no-ssr>
                        <Payment/>
                    </no-ssr>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import Payment from '../../components/payment/Payment'
export default {
    components: {
        Payment
    }
}
</script>

<style>

</style>
