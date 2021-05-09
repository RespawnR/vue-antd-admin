<template>
  <a-card class="new-page">
    <a-form layout="horizontal">
      <div class="fold">
        <a-row >
        <a-col :md="8" :sm="24" >
          <a-form-item
            label="关键词"
            :labelCol="{span: 5}"
            :wrapperCol="{span: 15, offset: 1}"
          >
            <a-input v-model="queryParam.keywords" placeholder=""/>
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24" >
          <a-form-item
            label="文章状态"
            :labelCol="{span: 5}"
            :wrapperCol="{span: 15, offset: 1}"
          >
            <a-select placeholder="请选择文章状态" v-model="queryParam.status" defaultValue="0">
              <a-select-option value="0">全部</a-select-option>
              <a-select-option value="1">已发布</a-select-option>
              <a-select-option value="2">草稿</a-select-option>
              <a-select-option value="3">回收站</a-select-option>
              <a-select-option value="4">私密</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24" >
          <a-form-item
            label="分类目录"
            :labelCol="{span: 5}"
            :wrapperCol="{span: 15, offset: 1}"
          >
            <a-select placeholder="请选择分类" v-model="queryParam.category" defaultValue="0">
              <a-select-option value="0">全部</a-select-option>
              <a-select-option value="1">默认分类</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
        
      </div>
      <span style="float: right; margin-top: 3px; margin-right: 60px">
        <a-button type="primary">查询</a-button>
        <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
      </span>
    </a-form>

    <div>
      <a-space class="operator">
        <a-button @click="addNew" type="primary"><a-icon type="file-add" />新建文章</a-button>
      </a-space>

      <standard-table
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :selectedRows.sync="selectedRows"
        @clear="onClear"
        @change="onChange"
        @selectedRowChange="onSelectChange"
      >
        <!-- 状态 -->
        <div slot="status" slot-scope="{text}" >
          <a-badge dot color="green"></a-badge>
          {{ text }}
        </div>
        <!-- 分类 -->
        <div slot="categories" slot-scope="{text}">
          <a-tag
            v-for="category in text"
            :key="category.id"
            color="blue"
          >
            {{ category.name }}
          </a-tag>
        </div>
        <!-- 标签 -->
        <div slot="tags" slot-scope="{text}">
          <a-tag
            v-for="tag in text"
            :key="tag.id"
            color="green"
          >
            {{ tag.name }}
          </a-tag>
        </div>
        <!-- 评论数 -->
        <div slot="commentedCount" slot-scope="{text}">
          <a-badge :count=text :overflow-count="999" :showZero="true" :number-style="{ backgroundColor: '#ffa39e' }" />
        </div>
        <!-- 访问数 -->
        <div slot="visitedCount" slot-scope="{text}">
          <a-badge :count=text :overflow-count="999" :showZero="true" :number-style="{ backgroundColor: '#36cfc9' }" />
        </div>

        <!-- 编辑时间 -->
        <div slot="updatedAt" slot-scope="{text}">
          {{ formatTime(text) }}
        </div>

        <div slot="action" slot-scope="{record}">
          <a style="margin-right: 8px">
            <a-icon type="edit"/>编辑
          </a>
          <a-popconfirm
            v-if="dataSource.length"
            :title="`你确定要将【` + record.title + `】文章移到回收站？`"
            @confirm="() => deleteRecord(record.id)"
          >
            <a style="margin-right: 8px" href="javascript:;">
              <a-icon type="delete" />回收站
            </a>
          </a-popconfirm>
          <a @click="showDrawer()">
            <a-icon type="setting" />设置
          </a>
        </div>
      </standard-table>

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
          </a-space>
          <a-divider style="background: #E8E8E8; height: 2px" />
          <h3>分类目录</h3>
          <a-divider style="background: #E8E8E8;" />
          <h3>标签</h3>
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
  </a-card>
</template>

<script src="./index.js" ></script>
<style lang="less" scoped src="./index.less"></style>