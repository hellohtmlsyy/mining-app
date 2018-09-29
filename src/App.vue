<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import '@/assets/commonjs/util.js';
export default {
  name: 'App'
}
</script>

<style>
@import 'static/css/common.css';
@import 'static/icon/iconfont.css';

	body{
		font-size:12px;
	}
</style>
