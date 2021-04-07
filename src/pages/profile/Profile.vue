<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <h1>list页面</h1>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    name: 'list页面',
    data() {
      return {
        desc: '这是一个演示页面'
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