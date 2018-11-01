<template>
  <div id="app">
    <div class="tab-wrap">
      <span v-if="showNav" @click="showNav = false">切换至导航视频</span>
      <span v-else @click="showNav = true">切换至导航实现</span>
    </div>
    <Navigation v-if="showNav"/>
    <NaviVideo v-else/>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
import NaviVideo from './components/NaviVideo'

export default {
  name: 'App',
  data () {
    return {
      showNav: true
    }
  },
  components: {
    Navigation,
    NaviVideo
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Microsoft YaHei","Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB",Arial,sans-serif;
  font-size: 12px;
  background-color: #f1f1f1;
}
.tab-wrap {
  position: absolute;
  top: 20px;
  left: 60px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
}
</style>
