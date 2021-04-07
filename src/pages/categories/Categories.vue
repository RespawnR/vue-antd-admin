<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <h1>分类页面</h1>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    name: '',
    data() {
      return {
        desc: ''
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