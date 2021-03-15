<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/todos">Todos</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  background: linear-gradient(to bottom, rgb(36, 111, 197), rgb(43, 96, 165));
  color: #efeaea;

  min-height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 100%;
  height: 75px;
  
  margin: 0;
  padding: 0;
  
  background: #efeaea;

  a {
    margin: 0 .5rem;
    padding: 0;
    
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
