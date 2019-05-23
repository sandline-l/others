import axios from "axios";

//拦截器 , 请求拦截,用于将请求统一带上 token
axios.interceptors.request.use(function (config) {
    //在拦截器中, 先将config进行一些处理, 然后,再将他返回出去(别忘了)
    //基础url , 这样之后请求就可以只写一部分了
    // let baseurl = 'https://img3.doubanio.com';
    let baseurl = 'https://www.easy-mock.com/mock/5ce60c41e5ebdd09d8d21a85/axiosget';
    config.baseURL = baseurl
    // 在 localStorage 获取 token
    let token = localStorage.getItem("token");
    // 如果存在则设置请求头 , 把token放在请求头中,发送出去
    if (token) {
        console.log('发送了token')
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
}, function (error) {
    console.log('请求 发送失败')
    return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
    // console.log(response)
    // console.log(response.status)
    // console.log(response.config.url)
    console.log('请求成功');
    // console.log('响应配置', response)
    // console.log(response.data.data)
    //获取到响应的内容, 里面的token , 然后将他解析出来 , 
    //然后赋值给他自己(相当于提前在拦截器中处理了token ,这样之后就可以直接使用了),
    //这里的数据是使用的 假数据来模拟的, (easymock)
    var token = response.data.data.token;
    if (token) {
        let userString = window.atob(token.split('.')[1])
        var usermsg = JSON.parse(userString)
        response.data.data.token = usermsg
    }

    return response;

}, function (error) { //这里是返回状态码不为200时候的错误处理
    //集中对失败的请求进行处理
    //为啥我出错之后的 error 里面 没有状态码啊, 应该来说是有的, 然后可以更具不同的
    //状态码, 来说明不同的错误消息
    console.log('请求失败')
    console.log(error.response)
    console.log(error.response.status)
    if (error.response.status == 404) {
        console.log('Not Found')
    }
    //如果请求失败, 会走这个函数, 并且将promise 置为 reject 这样的话, 
    //之后的就会走catch 
    // return Promise.reject(error)
    //这里如果这样写的话,就会在出错时, 还是resolve , 执行成功的回调, 把错误消息弹出了
    return Promise.resolve(error)
})


let api = {
    getmsg(url) {
        axios.get(url).then(function (response) {

            console.log(response)
            //对成功的请求进行处理
            if (response) {
                console.log('yes')
                console.log(response.config)
                //如果请求成功,就将图片加载进来
                // var img = new Image();
                // img.url = response.config.url
                // img.onload = function () {
                //     this.url = img.url
                // }
                console.log(response.config.url)
            }
        })
        // .catch(function (error) {
        //     // console.log(error)
        // }
        // )
    }
}

export default axios;

