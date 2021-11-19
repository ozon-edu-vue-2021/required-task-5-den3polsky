import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart.js'
import products from './modules/products.js'

Vue.use(Vuex)

export default new Vuex.Store({

    common: () => {
        console.log('common')
    },

    modules: {
        cart, 
        products
    }
})