<template>
  <a-card>
      <a-form layout="horizontal">
        <div class="fold">
          <a-row >
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="关键词"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 15, offset: 1}"
            >
              <a-input />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="文章状态"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 15, offset: 1}"
            >
              <a-select placeholder="请选择文章状态">
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
              <a-select placeholder="请选择分类">
                <a-select-option value="1">默认分类</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
          
        </div>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary">查询</a-button>
          <a-button style="margin-left: 8px">重置</a-button>
        </span>
      </a-form>

    <div>
      <a-space class="operator">
        <a-button @click="addNew" type="primary"><a-icon type="file-add" />新建文章</a-button>
      </a-space>

      <standard-table
        :columns="columns"
        :dataSource="dataSource"
        :selectedRows.sync="selectedRows"
        @clear="onClear"
        @change="onChange"
        @selectedRowChange="onSelectChange"
      >
        <div slot="description" slot-scope="{text}">
          {{text}}
        </div>
        <div slot="action" slot-scope="{record}">
          <a style="margin-right: 8px">
            <a-icon type="edit"/>编辑
          </a>
          <a-popconfirm
            v-if="dataSource.length"
            :title="`你确定要将【` + record.title + `】文章移到回收站？`"
            @confirm="() => deleteRecord(record.key)"
          >
            <a style="margin-right: 8px" href="javascript:;">
              <a-icon type="delete" />回收站
            </a>
          </a-popconfirm>
          <a>
            <a-icon type="setting" />设置
          </a>
        </div>
        <template slot="statusTitle">
          <a-icon @click.native="onStatusTitleClick" type="info-circle" />
        </template>
      </standard-table>
    </div>
  </a-card>
</template>

<script>
import StandardTable from '@/components/table/StandardTable'
const columns = [
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '状态',
    dataIndex: 'status'
  },
  {
    title: '分类',
    dataIndex: 'category'
  },
  {
    title: '标签',
    dataIndex: 'tags',
    needTotal: true
  },
  {
    title: '评论',
    dataIndex: 'commentCount',
    sorter: true
  },
  {
    title: '访问',
    dataIndex: 'visitCount',
    sorter: true
  },
  {
    title: '发布时间',
    dataIndex: 'updatedAt',
    sorter: true
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' }
  }
]
const dataSource = []
for (let i = 0; i < 20; i++) {
  dataSource.push({
    key: i,
    title: '标题-' + i,
    status: '已发布',
    category: '默认分类',
    tags: Math.floor(Math.random() * 10) % 4,
    commentCount: Math.floor(Math.random() * 1000),
    visitCount: Math.floor(Math.random() * 1000),
    updatedAt: '2018-07-06',
  })
}
export default {
  name: 'QueryList',
  components: {StandardTable},
  data () {
    return {
      advanced: true,
      columns: columns,
      dataSource: dataSource,
      selectedRows: []
    }
  },
  methods: {
    deleteRecord(key) {
      this.dataSource = this.dataSource.filter(item => item.key !== key)
      this.selectedRows = this.selectedRows.filter(item => item.key !== key)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    remove () {
      this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.key === item.key) === -1)
      this.selectedRows = []
    },
    onClear() {
      this.$message.info('您清空了勾选的所有行')
    },
    onStatusTitleClick() {
      this.$message.info('你点击了状态栏表头')
    },
    onChange() {
      this.$message.info('表格状态改变了')
    },
    onSelectChange() {
      this.$message.info('选中行改变了')
    },
    addNew () {
      this.dataSource.unshift({
        key: this.dataSource.length,
        title: '标题-' + this.dataSource.length,
        status: '已发布',
        category: '默认分类',
        tags: Math.floor(Math.random() * 10) % 4,
        commentCount: Math.floor(Math.random() * 1000),
        visitCount: Math.floor(Math.random() * 1000),
        updatedAt: '2018-07-06',
      })
    },
    handleMenuClick (e) {
      if (e.key === 'delete') {
        this.remove()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .search{
    margin-bottom: 54px;
  }
  .fold{
    width: calc(100% - 216px);
    display: inline-block
  }
  .operator{
    margin-bottom: 18px;
  }
  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }
</style>