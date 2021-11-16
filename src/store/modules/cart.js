import priceFormat from '@/utils/format'

const state = () => ({
    list: []
  })
  
const getters = {

    cartTotalPrice: state => state.list.reduce((total, product) => total + product.price * product.quantity, 0),

    cartTotalPriceFormat: (state, getters) => priceFormat(getters.cartTotalPrice),

    cartTotalWeigth: state => state.list.reduce((total, product) => total + product.weigth * product.quantity, 0),    
      
}


const actions = {

     addProductToCard({state, commit}, product) {

       const productIndex = state.list.findIndex(item => product.id === item.id)

       if (productIndex === -1) {
       
            commit('addProductToCard', product)
       } else {

            commit('updateQuantityProductInCart', {productIndex, product})
       }

      },

      deleteProductFromCard({state, commit}, product) {

          const indexOfDelete = state.list.findIndex(item => product.id === item.id)

          if (indexOfDelete !== -1) {

              commit('deleteProductFromCard', indexOfDelete)
          }
      }
}

const mutations = {


  updateQuantityProductInCart(state, {productIndex, product}) {

      state.list.splice(productIndex, 1, {...state.list[productIndex], quantity: state.list[productIndex].quantity + product.quantity} )
  },

  addProductToCard(state, product) {

      state.list.push(product)
  },

  deleteProductFromCard(state, index) {

      state.list.splice(index, 1)
  }

}


export default {
  
  state,
  actions,
  mutations,
  getters

}