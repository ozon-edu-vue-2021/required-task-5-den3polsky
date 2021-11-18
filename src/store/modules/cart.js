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
       
            commit('addProductToCard', {...product, quantity: 1 })
       } 
      },

      deleteProductFromCard({state, commit}, product) {

          const indexOfDelete = state.list.findIndex(item => product.id === item.id)

          if (indexOfDelete !== -1) {

              commit('deleteProductFromCard', indexOfDelete)
          }
      },

    setProductQuantity({state, commit}, payload) {

        const product = state.list.find(item => item.id === payload.product_id)

        if (product) {

            if (product.quantity === 1 && payload.operation == 'dec' || 
                payload.value === 0 ) {            
                        
                commit('deleteProductFromCard', product)

            } else  {

                commit('setProductQuantity', {product, ...payload})
            }

        }

    }
}

const mutations = {


  addProductToCard(state, product) {

        state.list = [...state.list, product]
  },

  deleteProductFromCard(state, product) {

        state.list = state.list.filter(item => item.id != product.id)
  },

  setProductQuantity(state, {product, operation, value}) {

        let quantity = product.quantity
        const index = state.list.findIndex(item => product.id === item.id)

        switch (operation) {

            case 'inc': 
                 quantity++
                break;

            case 'dec':
                quantity--
                break;

            case 'set':                
                 quantity = value                                
        }        

        state.list = Object.assign([], state.list, {[index]: {...product, quantity}})      

 },

}


export default {
  
  state,
  actions,
  mutations,
  getters

}