<template>
<div id="app">

<Navbar />
<router-view></router-view>
</div>
</template>

script
<script>
  import Navbar from './components/Navbar';

  export default {
    name: 'app',
    components: {
      Navbar
    }
  }
</script>
<style>
  #app .navbar {
    position: fixed;
    width: 100%;
    z-index: 9999;
  }
</style>
