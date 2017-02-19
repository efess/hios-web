<template>
  <div>
    <sidenav />
    <router-view></router-view>
  </div>
</template>
<script>
export default {
    components: {
        sidenav: require('./sidenav.vue')
    }
}
</script>