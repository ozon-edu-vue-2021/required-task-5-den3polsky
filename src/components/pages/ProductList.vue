<template>
        <div class="page-wrapper">
            <h1>Список продуктов</h1>

            <div class="product-list-sizes">
                <div class="product-list-sizes-label">
                    Количество товаров на странице
                </div>
                <div v-for="size in [10, 20, 50, 100]" :key="size" class="list-size" @click="changeListSize(size)">
                    {{size}}
                </div>
            </div>    
            <ProductList :products="products">
                <template v-slot:empty>          
                    <LoaderIcon/>
                </template>
            </ProductList>
        </div>
</template>

<script>
import {mapGetters} from 'vuex'
import ProductList from '@/components/product/ProductList.vue'
import LoaderIcon from '@/assets/icons/LoaderIcon.vue'


export default {

    name: 'ProductListPage',
    components: {
        ProductList,
        LoaderIcon
    },

    created() {
    
             this.$store.dispatch('loadProducts')  
    },

    methods: {
            
        changeListSize(size) {

            this.$store.dispatch('loadProducts', size)

        },
    },
    computed: {
                       
        ...mapGetters({              
            products: 'getProducts'
        })
    },
}
</script>

<style scoped>


.product-list-sizes {
    display: flex;
    flex-direction: row;
    column-gap: 8px;
    margin-bottom: 8px;
    align-items: center;
}
.product-list-sizes-label {
    font-size: 14px;
    font-weight: bold;
}

.list-size {
    border: 1px solid #2e86ffe8;    
    padding: 2px 4px;
    border-radius: 6px;  
    cursor: pointer;    
    font-size: 12px;
}


</style>