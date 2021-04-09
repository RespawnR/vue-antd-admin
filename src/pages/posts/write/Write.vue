<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <mavon-editor v-model="context" style="min-height: 600px" class="v-note-wrapper"/>
  </div>
</template>

<script src='./index.js'></script>
<style scoped lang="less" src="./index.less"></style>