<template>
  <a-row class="new-page">
    <a-col :span="10">
      <a-card title="新建标签" class="detail-card" :bordered="true">
        <a-form :form="form" layout="vertical" autoComplete="off">
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
                <a-input placeholder="" v-model="slug" />
              </a-form-item>
            </a-row>
            <a-row v-if="!isEdit">
              <a-form-item>
                <a-button type="primary" @click="insertTag()">保存</a-button>
              </a-form-item>
            </a-row>
            <a-row v-if="isEdit">
              <a-form-item>
                <a-button-group>
                  <a-button
                    type="primary"
                    @click="updateEdit()"
                    :loading="editLogging"
                    >更新</a-button
                  >
                  <a-button type="dashed" @click="cancelEdit()"
                    >返回创建</a-button
                  >
                </a-button-group>

                <a-popconfirm
                  :title="`你确定要删除【` + editTag.name + `】标签？`"
                  @confirm="() => deleteEditTag()"
                >
                  <a-button
                    type="danger"
                    style="float: right"
                    >删除</a-button
                  >
                </a-popconfirm>
              </a-form-item>
            </a-row>
          </a-space>
        </a-form>
      </a-card>
    </a-col>
    <a-col :span="14">
      <a-card title="所有标签" class="detail-card" :bordered="true">
        <a-row>
          <a-tooltip
            placement="topLeft"
            v-for="tag in dataSource"
            :key="tag.id"
          >
            <template slot="title">
              <span>{{ tag.articleCount + " 篇文章" }}</span>
            </template>
            <a-tag
              color="cyan"
              style="cursor: pointer"
              @click="beforeEdit(tag)"
            >
              {{ tag.name }}
            </a-tag>
          </a-tooltip>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>

<script src="./index.js"></script>
<style scoped lang="less" src="./index.less"></style>