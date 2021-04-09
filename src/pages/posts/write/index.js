// 全局注册
// import with ES6
import Vue from 'vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { mapState } from 'vuex'

// use
Vue.use(mavonEditor)

export default {
    name: 'write',
    data() {
        return {
            context: '',
            desc: ''
        }
    },
    computed: {
        ...mapState('setting', ['pageMinHeight']),
    }
}
