//配置请求


import axios from 'axios'
import {cookie} from 'vux'



axios.defaults.baseURL = 'http://www.miningcircle.com';   //接口地址
axios.defaults.headers.get['Content-Type']='application/x-www-form-urlencoded;text/html;charset=UTF-8';   //配置请求头
axios.defaults.headers['MC_UID'] = cookie.get("MC_UID")





/**
 * Created by Z97 on 2017/6/15.
 */
var ENV = 'test' // 控制开关,dev 开发环境，release,master环境时改为prod
export default {
  pathUrl: function () {
    var URLS = {
      dev: {
        MJK: '/apis', // 测试2.0地址
        UPLOAD: '/upload', // 测试图片上传地址
        MC: '/mc1', // 测试1.0地址
        WEB_URL: {
          WEB_MIAO: 'http://shw.miningcircle.com'
        }
      },
      prod: {
        MC: 'http://www.miningcircle.com',
        MCT:'http://memberapi.miningcircle.com',// 2.0地址,
        MCM:'http://m.miningcircle.com',
        MCL:'http://member.miningcircle.com/login?where=mcVue',  //登录地址
        UPLOAD: 'http://www.miningcircle.com',//本地上传
      },
      test: {
        MC: 'http://www.miningcircle.com',
        MCT:'http://memberapi.miningcircle.com:8090',// 2.0地址,
        MCM:'http://m.miningcircle.com:8082',
        MCL:'http://member.miningcircle.com:8080/login?where=mcVue',  //登录地址
        UPLOAD: 'http://www.miningcircle.com',//本地上传
        WEB_URL: {
          WEB_MIAO: ''
        }
      }
    }
    return URLS[ENV]
  }
}


