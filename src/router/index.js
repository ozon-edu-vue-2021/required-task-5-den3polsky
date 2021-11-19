import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import ProductListPage from "@/components/pages/ProductList.vue"
import FavoritesProduct from "@/components/pages/FavoritesProduct.vue";
import Cart from "@/components/cart/Cart.vue";

const routes = [
    {
      path: "/",
      component: ProductListPage,
    },

    {
      path: "/favorites",
      component: FavoritesProduct,
    },

    {
        path: "/cart",
        component: Cart,
    }
]


const router = new VueRouter({ 
  routes,
});

export default router;
