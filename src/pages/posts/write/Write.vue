<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <a-input size="large" placeholder="请输入文章标题" v-model="title"/>
    <mavon-editor v-model="context" class="v-note-wrapper"/>
    <!-- fixed footer toolbar -->
    <footer-tool-bar>
      <a-button type="primary">提交</a-button>
    </footer-tool-bar>
  </div>
</template>

<script src='./index.js'></script>
<style scoped lang="less" src="./index.less"></style>