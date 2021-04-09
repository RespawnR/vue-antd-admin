// 全局注册
// import with ES6
import Vue from 'vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import moment from 'moment'

import { mapState } from 'vuex'

import FooterToolBar from '@/components/tool/FooterToolBar'

// use
Vue.use(mavonEditor)


const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];


export default {
    name: 'write',
    components: {FooterToolBar},
    data() {
        return {
            desc: '',       //页面描述
            title: '',      //文章标题
            context: '',    //文章内容
            form: this.$form.createForm(this),
            visible: false,
            curTime: moment(),          //当前时间
            updatedAt: null,            //修改时间
            checkedList: defaultCheckedList,
            indeterminate: true,
            checkAll: false,
            plainOptions,
        }
    },
    computed: {
        ...mapState('setting', ['pageMinHeight']),
    },
    methods: {
        //展示设置抽屉
        showDrawer() {
            this.visible = true;
            this.updatedAt = this.curTime;
        },
        //关闭设置抽屉
        onClose() {
            this.visible = false;
        },
        //复选框变化
        onCheckedListChange(checkedList) {
            this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
            this.checkAll = checkedList.length === plainOptions.length;
        },
        handleChange(value) {
            console.log(`selected ${value}`);
        },
    }
}
