<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <a-input size="large" placeholder="请输入文章标题" v-model="title"/>
    <mavon-editor v-model="context" class="v-note-wrapper"/>
    <!-- fixed footer toolbar -->
    <footer-tool-bar>
      <a-space >
        <a-button type="danger">保存草稿</a-button>
        <a-button type="default">预览</a-button>
        <a-button type="primary"  @click="showDrawer()">发布</a-button>
      </a-space>
    </footer-tool-bar>

    <a-drawer
      title="文章设置"
      :width="480"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form :form="form" layout="vertical" hide-required-mark>
        <h3>基本设置</h3>
        <a-space direction="vertical" style="width:100%">
          <a-row>
            <a-col :span="24">
              <a-form-item label="文章别名：">
                <a-input placeholder="" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item label="发表时间">
                <a-date-picker show-time v-model="updatedAt" style="width:100%"></a-date-picker>
              </a-form-item>
            </a-col>
          </a-row>
        </a-space>
        <a-divider style="background: #E8E8E8; height: 2px" />
        <h3>分类目录</h3>
        <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onCheckedListChange" />
        <a-divider style="background: #E8E8E8;" />
        <h3>标签</h3>
        <a-select mode="tags" style="width: 100%" placeholder="Tags Mode" @change="handleChange" :allowClear="true">
          <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
            {{ (i + 9).toString(36) + i }}
          </a-select-option>
        </a-select>
        <a-divider style="background: #E8E8E8;" />
        <h3>摘要</h3>
        
      </a-form>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          取消
        </a-button>
        <a-button :style="{ marginRight: '8px' }" type="danger">
          保存草稿
        </a-button>
        <a-button type="primary" @click="onClose">
          确认发布
        </a-button>
      </div>
    </a-drawer>
    
  </div>
</template>

<script src='./index.js'></script>
<style scoped lang="less" src="./index.less"></style>