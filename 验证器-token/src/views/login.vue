<template>
  <div class="login">
    用户名
    <input type="text" v-model="user.username">
    密码
    <input type="text" v-model="user.password">
    <button @click="login">提交</button>
    <span>{{user.username}}</span>
  </div>
</template>

<script>

import axios from "@/axios.js"
export default {
    data() {
        return {
            user: {
                username: "",
                password: ""
            },
           
        }
    },
    methods: {
        login() {
            // 发送请求访问服务器的登录接口
            axios.post('/catimg', this.user).then(res => {
                // 将返回的 token 存入 localStorage，并跳转订单页
                let usermsg = res.data.data.token;
                localStorage.setItem("token", usermsg);
                //将数据写到页面上
                console.log(usermsg.name)
                this.user.username = usermsg.name;
                this.user.password = usermsg.sub;

                //将获取到的用户信息,存到state 里面,方便别的组件获取
                this.$store.commit('saveUser',{name:usermsg.name, psd:usermsg.sub})

                this.$router.push("/about");
            }).catch(err => {
                // 弹出错误
                alert(err.data);
            });
        }
    }
}



</script>

<style>
</style>
