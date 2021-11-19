<template>
    <div class="quantity-wrapper">

        <div @click="setQuantity($event, product_id, 'dec')" class="change-quantity-button">-</div>

        <input @input="setQuantity($event, product_id, 'set')"  
               @keypress="validateNumber"                 
               @click="clickInputHandler"
               @blur="blurInputHandler"               
               :value="quantity"
               :oldValue="oldValue" 
               class="product-quantity"
               type="text"
               ref="quantity-input"
               >
        <div @click="setQuantity($event, product_id, 'inc')" class="change-quantity-button">+</div>

    </div>
</template>

<script>

export default {
    props: {
        product_id: {
            type: Number
        },
        quantity: {
            type: Number,
            default: 1
        },
        disallowDelete: {
            type: Boolean,
            default: false
        }     
    },

    data() {
        return {
            oldValue: -1,         
        }
    },

    methods: {

        clickInputHandler() {

            this.$refs['quantity-input'].select()
        },

        blurInputHandler() {

            if (this.oldValue > 0) {

                this.oldValue = -1                    
            }
        },

        validateNumber(event) {
         

            if (! /\d{1}/.test(event.key)) {

                event.preventDefault()
            }                
        },

        setQuantity(event, product_id, operation) {

            const value = Number(event.target.value)
          
            //Обработаем запрет удаления через декримент (например для корзины)
            if (operation === 'dec' && this.disallowDelete && this.quantity === 1) {
                return
            }

            // Если в поле ввода пустая строка или 0
            if (operation === 'set' && value === 0) {

                this.oldValue = this.quantity
                return
            }

            this.$store.dispatch('setProductQuantity', {value, product_id, operation})
        },

    }
}

</script>

<style scoped>

.quantity-wrapper {
    display: flex;
    height: 22px;
    align-items: center;
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

</style>