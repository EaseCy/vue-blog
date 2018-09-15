import axios from 'axios'
import {Message} from 'element-ui'

axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/*
* 对axios的request进行封装，使用更加方便
* 传入三个参数:url,请求类型,请求的数据。
* 可以直接在控制台模拟请求
*
* */
export default function request(url, type = "get", data = {}) {
    return new Promise((resolve, reject) => {
        let option = {
            url,
            type
        }
        if (type.toLowerCase() === "get") {
            option.params = data
        } else {
            option.data = data
        }
        axios(option).then(res => {
            if (res.data === 'ok') {
                resolve(res.data)
            } else {
                Message.error(res.data)
                reject(res.data)
            }
        }).catch(err => {
            Message.error("网络异常")
            reject({msg: "网络异常"})
        })
    })
}