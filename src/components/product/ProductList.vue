<template>
    <div class="product-list-wrapper">
        <div v-if="products.length > 0" class="product-list" >
            <div v-for="product in products" :key="product.uid" class="product">

                <div class="favorite"                
                     :class="{'in-favorite': product.isFavorite}"                     
                     :title="product.isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'"
                     @click="toggleFavorite(product)" 
                >♡</div>

                <div class="product-image-wrapper">
                    <img class="product-image" :src="product.image"/>
                </div>

                <div class="product-name">
                    {{product.dish}} 
                </div>

                <div class="product-price">
                    {{priceFormat(product.price)}} 
                </div>

                <div class="product-description">
                    {{product.description}}
                </div>

                <div class="actions">

                         <div v-if="product.inCart" class="in-cart">
                            <router-link to="/cart">Товар в корзине</router-link>                    
                        </div>

                        <InputQuantity v-if="product.quantity > 0" :product_id="product.id" :quantity="product.quantity"/>

                        <div v-else @click="addProductToBasket(product)" class="button add-to-baket">
                            🛒
                        </div>
                </div>           
            </div>
        </div>

        <div v-else>
             <slot name="empty"></slot>            
        </div>

    </div>
</template>

<script>
import {mapActions} from 'vuex'
import priceFormat from '@/utils/format.js'
import InputQuantity from '@/components/common/InputQuantity'

export default {
    
    name: 'ProductList',

    components: {
        InputQuantity
    },

    props: {
        products: {
            type: Array,
            default: () => []
        }
    },

    methods: {

        priceFormat,
              
        addProductToBasket(product){

              this.$store.dispatch('addProductToCard', product)
                 
        },

        setQuantity(event, product_id, operation) {            

             this.$store.commit('setQuantity', {value: event.target.value, product_id, operation})
        },

        toggleFavorite(product) {

            this.$store.commit('toggleFavorite', product.id)            
            
        },

        ...mapActions('cart', ['addProductToCard']),

    }

}
</script>

<style scoped>

.product-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;    
    column-gap: 10px;
    row-gap: 24px;
}

.product {
    border: 1px solid  #cfcfcf;
    border-radius: 5px;
    padding: 4px;
    position: relative;
    max-width: 200px;
}

.product-price {
    font-weight: bold;
}

.product-name {
    margin-bottom: 10px;
}

.product-image {
    max-width: 100%;
}

.product-description {
    font-size: 12px;
    margin-top: 10px;
    height: 44px;
}

.favorite {
    font-size: 30px;
    position: absolute;
    top:0px;
    right: 10px;
    cursor: pointer; 
    color: black;
}

.in-favorite {
    color: red;;
}

.favorite:hover {
    color: red;
}

.actions {
    
    align-items: center;
    justify-content: flex-end;
    display: flex;
    
}

.add-to-baket {
    font-size: 20px;
    cursor: pointer;  
    padding: 2px 4px;
    display: inline-block;
}

.in-cart {    
    padding: 2px 4px;
    text-align: right;
    font-size: 12px;
    background-color: #ffffbb;
    display: inline-block;
    font-size: 10px;
}

</style>