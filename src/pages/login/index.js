import CommonLayout from '@/layouts/CommonLayout'
import { login } from '@/services/user'
import { setAuthorization } from '@/utils/request'
import { loadRoutes } from '@/utils/routerUtil'
import { mapMutations } from 'vuex'

export default {
    name: 'Login',
    components: { CommonLayout },
    data() {
        return {
            logging: false,
            error: '',
            form: this.$form.createForm(this)
        }
    },
    computed: {
        systemName() {
            return this.$store.state.setting.systemName
        }
    },
    methods: {
        ...mapMutations('account', ['setUser']),
        onSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err) => {
                if (!err) {
                    this.logging = true
                    const name = this.form.getFieldValue('name')
                    const password = this.form.getFieldValue('password')
                    login(name, password).then(this.afterLogin)
                }
            })
        },
        afterLogin(res) {
            this.logging = false
            const loginRes = res.data
            if (loginRes.code == "0") {
                const user = loginRes.data
                this.setUser(user)
                setAuthorization({ token: loginRes.data.token, expireAt: new Date(Number(loginRes.data.expireAt)) })//后面这用毫秒数也能new出来？？
                // 获取默认路由配置
                loadRoutes()
                this.$router.push('/dashboard')
                this.$message.success(loginRes.msg, 3)
            } else {
                this.error = loginRes.msg
            }
        },
        onClose() {
            this.error = false
        }
    }
}
