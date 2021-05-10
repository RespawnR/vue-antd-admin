import { getAllTags, updateTag, deleteTag, createTag } from '@/services/tag'

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '别名',
    dataIndex: 'slug',
    width: 100,
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

export default {
  name: 'CategoryList',
  data() {
    return {
      columns: columns,
      desc: '',
      dataSource: [],
      afterDateSource: [],
      selectedRows: [],
      form: this.$form.createForm(this),
      isEdit: false,
      editTag: {},
      slug: '',
      editLogging: false,
    }
  },
  computed: {

  },
  created() {
    getAllTags().then(this.initTagsList)
  },
  methods: {
    initTagsList(res) {
      this.dataSource = res.data.data
    },
    insertTag() {
      var name = this.form.getFieldValue('name')
      if (name) {
        var newTag = {
          name: name,
          slug: this.slug
        }
        createTag(newTag).then((res) => {
          const createRes = res.data
          if (createRes.code == "0000") {
            getAllTags().then(this.initTagsList)
            this.$message.success(createRes.msg, 2)
            this.cancelEdit()
          } else {
            this.$message.error(createRes.msg, 2)
          }
        })
      }
    },
    beforeEdit(tag) {
      this.isEdit = true
      this.editTag = tag
      this.slug = tag.slug
      this.form.setFieldsValue({ 'name': this.editTag.name })
    },
    cancelEdit() {
      this.isEdit = false
      this.form.resetFields(['name'])
      this.editTag = ''
      this.slug = ''
      getAllTags().then(this.initTagsList)
    },
    updateEdit() {
      var name = this.form.getFieldValue('name')
      if (name != "") {
        this.editTag.name = name
        this.editTag.slug = this.slug
        this.editLogging = true
        updateTag(this.editTag).then(this.afterUpdate)
      }
    },
    afterUpdate(res) {
      const updateRes = res.data
      if (updateRes.code == "0000") {
        this.editLogging = false
        this.$message.success(updateRes.msg, 2)
        this.cancelEdit()
      } else {
        this.$message.error(updateRes.msg, 2)
      }
    },
    deleteEditTag() {
      deleteTag(this.editTag.id).then((res) => {
        const deleteRes = res.data
        if (deleteRes.code == "0000") {
          getAllTags().then(this.initTagsList)
          this.$message.success(deleteRes.msg, 2)
          this.cancelEdit()
        } else {
          this.$message.error(deleteRes.msg, 2)
        }
      })
    }
  }
}