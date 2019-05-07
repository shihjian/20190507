<template>
    <div class="bgc">
            <div class="container text-center">
                <a class="btn btn-danger filterbtn" @click="filterProduct">點我快搜!</a>
            </div>

            <div class="container ml-auto">
                <h3 class="h3 text-center pt-5 mb-4">一起去探索旅行的意義吧！</h3>
                <AllproductCard></AllproductCard>
            </div>
    </div>
</template>

<script>
import $ from 'jquery';
import AllproductCard from '@/components/pages/AllproductsCard.vue';
    export default{
        components: {
            AllproductCard
        },

        methods: {
            filterProduct(place) {
                this.$router.push(`/categories`);
                console.log(place)
        },

        
        }
    }
</script>