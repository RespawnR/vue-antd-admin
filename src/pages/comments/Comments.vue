<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <h1>评论页面</h1>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    name: '',
    data() {
      return {
        desc: '这是一个评论页面'
      }
    },
    computed: {
      ...mapState('setting', ['pageMinHeight']),
    }
  }
</script>
<style scoped lang="less">
@import "index.less";
</style>