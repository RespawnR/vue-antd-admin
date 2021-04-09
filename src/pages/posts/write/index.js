// 全局注册
// import with ES6
import Vue from 'vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { mapState } from 'vuex'

import FooterToolBar from '@/components/tool/FooterToolBar'

// use
Vue.use(mavonEditor)

export default {
    name: 'write',
    components: {FooterToolBar},
    data() {
        return {
            title: '',      //文章标题
            context: '',    //文章内容
            desc: ''
        }
    },
    computed: {
        ...mapState('setting', ['pageMinHeight']),
    }
}
