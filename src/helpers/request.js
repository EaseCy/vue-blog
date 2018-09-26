import axios from 'axios'
import {Message} from 'element-ui'

axios.defaults.baseURL = 'http://blog-server.hunger-valley.com';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true
/*
* 对axios的request进行封装，使用更加方便
* 传入三个参数:url,请求类型,请求的数据。
* 可以直接在控制台模拟请求
*
* */
export default function request(url, type = "GET", data = {}) {
    return new Promise((resolve, reject) => {
        let options = {
            url:url,
            method: type
        }
        if (type.toLowerCase() === "get") {
            options.params = data
        } else {
            options.data = data
        }

        axios(options).then(res => {
            console.log(res)
            if (res.data.status === 'ok') {
                resolve(res.data)
                Message.success(res.data.msg)
            } else {
                reject(res)
                Message.error(res.data.msg)
            }
        }).catch(e => {
            console.log(e)
            Message.error("网络异常")
            reject({msg: "网络异常"})
        })
    })
}