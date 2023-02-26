<!--
 * @Author: yuanyxh 15766118362@139.com
 * @Date: 2023-02-26 15:24:56
 * @LastEditors: yuanyxh 15766118362@139.com
 * @LastEditTime: 2023-02-26 15:44:35
 * @FilePath: \h5-demo\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <camera-draw />
</template>

<script>
import cameraDraw from './components/camera-draw.vue'

export default {
  name: 'App',
  components: {
    cameraDraw
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
