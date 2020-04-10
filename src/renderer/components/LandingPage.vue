<template>
  <div id="wrapper">
    <sider></sider>
    <my-content></my-content>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import sider from './sider/Index'
  import MyContent from './content/Index'

  export default {
    name: 'landing-page',
    components: { SystemInformation, sider, MyContent },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
 #wrapper{
   display: flex;
   flex: 1;
   height: 100vh;
   overflow: hidden;
 }
</style>
