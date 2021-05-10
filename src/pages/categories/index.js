import StandardTable from '@/components/table/StandardTable'

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '别名',
    dataIndex: 'slug',
    width: 80,
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 120,
  },
  {
    title: '文章数',
    dataIndex: 'articleCount',
    sorter: (a, b) => a.articleCount - b.articleCount,
    width: 80,
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' },
    width: 120,
  }
]

const dataSource = [];

for (let i = 0; i < 3; i++) {
  dataSource.push({
    id: i,
    name: "分类"+i,
    slug: "title"+i,
    description: "分类描述"+i,
    articleCount: 100+i*20,
  })
}

export default {
  name: 'CategoryList',
  components: {StandardTable},
  data() {
    return {
      columns: columns,
      desc: '',
      dataSource: dataSource,
      selectedRows: [],
      form: this.$form.createForm(this),
      isEdit: false,
      value: undefined,
      treeData: [
        { id: 1, pId: 0, value: '1', title: 'Expand to load' },
        { id: 2, pId: 0, value: '2', title: 'Expand to load' },
        { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true },
      ],
    }
  },
  computed: {

  },
  methods: {
    deleteRecord(key) {
      this.dataSource = this.dataSource.filter(item => item.id !== key)
      this.selectedRows = this.selectedRows.filter(item => item.id !== key)
    },
    remove () {
      this.dataSource = this.dataSource.filter(item => this.selectedRows.findIndex(row => row.id === item.id) === -1)
      this.selectedRows = []
    },
    onChange() {
      this.$message.info('表格状态改变了')
      console.log(this.dataSource)
    },
    addNew () {
      this.$router.push('/posts/write')
    },
    beforeEdit() {
      this.isEdit = true;
      
    },
    genTreeNode(parentId, isLeaf = false) {
      const random = Math.random()
        .toString(36)
        .substring(2, 6);
      return {
        id: random,
        pId: parentId,
        value: random,
        title: isLeaf ? 'Tree Node' : 'Expand to load',
        isLeaf,
      };
    },
    onLoadData(treeNode) {
      return new Promise(resolve => {
        const { id } = treeNode.dataRef;
        setTimeout(() => {
          this.treeData = this.treeData.concat([
            this.genTreeNode(id, false),
            this.genTreeNode(id, true),
          ]);
          resolve();
        }, 300);
      });
    },
  }
}