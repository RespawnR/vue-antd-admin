import StandardTable from '@/components/table/StandardTable'
import { getAllPosts } from '@/services/post'
import moment from 'moment'; 

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    width: 150,
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    width: 100,
  },
  {
    title: '分类',
    dataIndex: 'categories',
    scopedSlots: { customRender: 'categories' },
    width: 150,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' },
    width: 180,
  },
  {
    title: '评论',
    dataIndex: 'commentedCount',
    scopedSlots: { customRender: 'commentedCount' },
    sorter: (a, b) => a.commentCount - b.commentCount,
    width: 80,
  },
  {
    title: '访问',
    dataIndex: 'visitedCount',
    scopedSlots: { customRender: 'visitedCount' },
    sorter: (a, b) => a.visitCount - b.visitCount,
    width: 80,
  },
  {
    title: '编辑时间',
    dataIndex: 'updatedAt',
    scopedSlots: { customRender: 'updatedAt' },
    sorter: (a, b) => a.updatedAt - b.updatedAt,
    width: 100,
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' },
    width: 180,
  }
]

export default {
  name: 'PostList',
  components: {StandardTable},
  data () {
    return {
      columns: columns,
      // 查询参数
      queryParam: {},
      dataSource: [],
      selectedRows: [],
      form: this.$form.createForm(this),
      visible: false,
    }
  },
  created() {
    getAllPosts().then(this.initPostsList)
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    initPostsList(res) {
      this.dataSource = res.data.data;
    },
    formatTime(item) {
      return moment( +item ).format('YYYY-MM-DD HH:mm:ss')
    },
    deleteRecord(key) {
      this.dataSource = this.dataSource.filter(item => item.id !== key)
      this.selectedRows = this.selectedRows.filter(item => item.id !== key)
    },
    remove () {
      this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.id === item.id) === -1)
      this.selectedRows = []
    },
    onClear() {
      this.$message.info('您清空了勾选的所有行')
    },
    onChange() {
      this.$message.info('表格状态改变了')
    },
    onSelectChange() {
      this.$message.info('选中行改变了')
    },
    addNew () {
      this.$router.push('/posts/write')
    }
  }
}