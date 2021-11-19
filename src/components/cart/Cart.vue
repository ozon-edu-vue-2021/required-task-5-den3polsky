<template>
    <div class="cart-wrapper">
        <h1>Корзина</h1>
        <div class="cart">
                <div class="product-list">
                    <div v-for="product in products" :key="product.uid" class="product">
                       
                        <div class="product-image-wrapper">
                            <img class="product-image" :src="product.image"/>
                        </div>

                        <div class="product-name">
                            {{product.dish}} 
                        </div>

                        <div class="actions">

                                <div class="product-price">
                                    {{priceFormat(product.price)}} 
                                </div>

                                <InputQuantity :product_id="product.id" :quantity="product.quantity" :disallowDelete="true"/>

                                <div class="product-price">
                                    {{priceFormat(product.price * product.quantity)}} 
                                </div>
                        </div>
                        <div @click="deleteProduct(product)" class="button delete-button" title="Удалить товар из коризны">✖</div>

                    </div>

                    <div v-if="products.length===0">
                          Ваша корзина пуста. Добавьте товары в корзину из списка товаров.
                    </div>

                </div>


                <div class="summary"  v-if="products.length > 0">
                  
                      <div>Товаров на сумму: {{totalPrice}}</div>
                      <div>Общий вес: {{totalWeight}} г</div>

                      <button id="processOrder" @click="processOrder"> Оформить заказ </button>

                </div>

        </div>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import priceFormat from '@/utils/format.js'
import InputQuantity from '@/components/common/InputQuantity'

export default {

      components: {
        InputQuantity
    },
    
    computed: {
            
            ...mapState({
                    products: state => state.cart.list
           }),

            ...mapGetters({              
                    totalPrice: 'cartTotalPriceFormat',                    
                    totalWeight: 'cartTotalWeigth'
            })
    },

    methods: {
        
        priceFormat,

        processOrder() {
            
            const cartInfo = this.products.map(product => {  
                
                return product.dish + ' - ' + priceFormat(product.price * product.quantity) + ' (' +   product.quantity +  ' шт.)'

             }).join(', ')
                                            
            alert(cartInfo)

        },

        deleteProduct(product) {

            this.$store.commit('deleteProductFromCard', product)
        }

    }

}
</script>

<style scoped>

.cart {
    display: flex;
    flex-direction: row;
}

.product-list {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;        
    row-gap: 24px;
    width: 100%;    
    margin-right: 24px;
    
}

.summary {
    padding: 12px 12px;
    min-width: 250px;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
}

#processOrder {
    margin-top: 30px;
}

.product {
  
    padding: 4px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  
}

.product-price {
   font-size: 14px;
   min-width: 60px;
}

.product-quantity-wrapper {
    display: flex;
    align-content: center;
    justify-content: center;

}
    

.product-name {
    width: 150px;
}

.product-description {
    font-size: 12px;
    margin-top: 10px;
}

.product-quantity {
    width: 30px;
    text-align: center;
}

.change-quantity-button {
    display: inline-block;
    cursor: pointer;
    margin: 4px;
    font-size: 20px;
}

.product-image {
    max-width: 100px;
}

.actions {
    
    align-items: center;    
    display: flex;
    min-width: 200px;
    justify-content: space-between;
    
}

.button {
    display: inline-block;
    cursor: pointer;
}

.product-button {
    display: inline-block;
}


</style>