<template>
        <div class="page-wrapper">
            <h1>Избранные товары</h1>
            <ProductList :products="products">
                 <template v-slot:empty>          
                    <p>Ваш список избранных товаров пуст.</p>
                    <p>Добавьте понравившиеся товары, кликнув ♡.</p>
                </template>
            </ProductList>
            
        </div>
</template>

<script>
import {mapGetters} from 'vuex'
import ProductList from '@/components/product/ProductList.vue'

export default {

    components: {
        
        ProductList
    },

    computed: {
                       
        ...mapGetters({              
                products: 'getFavoritesProducts'
        })
    },
}
</script>
