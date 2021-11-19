import axios from "axios"

const api_url = 'https://random-data-api.com/api/food/random_food?size='
import { imagesId } from "@/assets/images"
const default_list_size = 30

const state = () => ({
    list: [],
    favorites: new Set()
  })
  

const getters = {

        getProducts: (state, getters, rootState) =>  {

            const  inCart = new Map(rootState.cart.list.map(product => [product.id, product.quantity])) 
            
            return state.list.map(product => ({

                ...product,

                inCart: inCart.has(product.id),
                quantity: inCart.has(product.id) ? inCart.get(product.id) : 0,
                isFavorite: state.favorites.has(product.id)
            }))            
        },

        getFavoritesProducts: (state, getters) => {

            return getters.getProducts.filter(product => product.isFavorite)
  
        },

      
}


const actions = {

    async loadProducts({commit }, size) {
        
        try {

            const response = await axios.get(api_url + (size ?? default_list_size))

            const products = response.data.map((product, index) => ({
                ...product,
                description: product.description.slice(0, 65) + '...',
                price: Math.floor(Math.random() * 1000) + 100,
                weigth: Math.floor(Math.random() * 1000) + 100,
                image: '/images/' + imagesId[index % (imagesId.length - 1)] + '.webp',
                quantity: 1
            }))

            commit('setProducts', products)

        } catch(e) {

            console.log('Ошибка загрузки данных: ', e)
        }
      
    }
}

const mutations = {
    
    setProducts(state, products) {
        state.list = products
    },

    toggleFavorite(state, product_id) {

    
        if (state.favorites.has(product_id)) {

            state.favorites.delete(product_id)
        } else {
            state.favorites.add(product_id)
        }

        state.favorites = new Set(state.favorites.values())  
    },
   
}


export default {
    
    state,
    actions,
    mutations,
    getters

  }