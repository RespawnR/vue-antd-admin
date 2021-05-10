<template>
  <a-row class="new-page">
    <a-col :span="10">
      <a-card title="新建分类" class="detail-card" :bordered="true">
        <a-form :form="form" layout="vertical">
          <a-space direction="vertical" style="width: 100%" :size="0">
            <a-row>
              <a-form-item label="名称：" extra="* 页面上所显示的名称">
                <a-input
                  v-decorator="[
                    'name',
                    {
                      rules: [{ required: true, message: '请输入分类名称！' }],
                    },
                  ]"
                  placeholder=""
                />
              </a-form-item>
            </a-row>
            <a-row>
              <a-form-item label="别名：" extra="* URL上的分类名称，一般为英文">
                <a-input placeholder="" />
              </a-form-item>
            </a-row>
            <a-row>
              <a-form-item label="上级目录：" extra="* 默认为根目录">
                <a-tree-select
                  v-model="value"
                  tree-data-simple-mode
                  style="width: 100%"
                  :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                  :tree-data="treeData"
                  defaultValue="root"
                  allow-clear
                  :load-data="onLoadData"
                />
              </a-form-item>
            </a-row>
            <a-row>
              <a-form-item label="描述：">
                <a-textarea
                  placeholder=""
                  :auto-size="{ minRows: 3, maxRows: 5 }"
                />
              </a-form-item>
            </a-row>
            <a-row v-if="!isEdit">
              <a-form-item>
                <a-button type="primary">保存</a-button>
              </a-form-item>
            </a-row>
            <a-row v-if="isEdit">
              <a-form-item>
                <a-button-group>
                  <a-button type="primary">更新</a-button>
                  <a-button type="dashed" @click="isEdit=false" >返回创建</a-button>
                </a-button-group>
              </a-form-item>
            </a-row>
          </a-space>
        </a-form>
      </a-card>
    </a-col>
    <a-col :span="14">
      <standard-table
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        @change="onChange"
        class="list"
      >
        <!-- 访问数 -->
        <div slot="articleCount" slot-scope="{ text }">
          <a-badge
            :count="text"
            :overflow-count="999"
            :showZero="true"
            :number-style="{ backgroundColor: '#36cfc9' }"
          />
        </div>

        <div slot="action" slot-scope="{ record }">
          <a style="margin-right: 8px" @click="beforeEdit()"> <a-icon type="edit" />编辑 </a>
          <a-popconfirm
            v-if="dataSource.length"
            :title="`你确定要删除【` + record.name + `】分类？`"
            @confirm="() => deleteRecord(record.id)"
          >
            <a style="margin-right: 8px" href="javascript:;">
              <a-icon type="delete" />删除
            </a>
          </a-popconfirm>
        </div>
      </standard-table>
    </a-col>
  </a-row>
</template>

<script src="./index.js"></script>
<style scoped lang="less" src="./index.less"></style>