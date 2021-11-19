<template>
  <div id="app">

      <div class="nav">
         
          <router-link to="/">Список продуктов</router-link>
          <router-link to="/favorites">♡ Избранное</router-link>
          <router-link to="/cart"> 🛒 Корзина</router-link>
      </div>

        <keep-alive include="ProductListPage">
                <router-view />
        </keep-alive>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {
      
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #fafafa;
  padding: 0px 24px;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
}

.nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: sticky;
    top: 0px;
    background:#2e86ff;
    z-index: 5;
    padding: 16px 10px;
}

.nav a {
  color: white;
  text-decoration: none;
}


.router-link-exact-active {
    border-bottom: 1px solid;
}


* {
  box-sizing: border-box;
}
</style>
