<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
//importing components
import Navbar from '@/components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar
  },
}
</script>

<style>
</style>
