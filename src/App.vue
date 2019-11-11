<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  }
  ,
    created() {
    axios.interceptors.request.use(config => {
      const token = JSON.parse(localStorage.getItem("token"));
      token ? (config.headers.Authorization = token) : null;
      return config;
    });
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods: {
    reload(){
      this.isRouterAlive=false
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    }
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 16px;
}
</style>
