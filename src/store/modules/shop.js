import Axios from "axios";

export default {
    //	状态树，用一个对象包含所有状态
    state: {
        newsNum: 0
    },
    //	对state数据过滤,属于加强属性
    getters: {

    },
    //	action和mutation类似,但是action触发mutation,并不直接修改数据,而是触发mutation修改数据
    action: {
        // getNewnum(newsNum, state) {
        //     axios.get(this.$root.urlPath.MC + '/api.do?noteNoReadNum', {
        //             headers: {
        //                 'MC_UID': cookie.get('MC_UID')
        //             },
        //             params: {
        //                 userId: this.userId,
        //             }
        //         })
        //         .then(res => {}).catch(err => console.log('个人账户异常', err));
        // }
    },
    //	mutation写有修改数据的逻辑,只执行同步操作
    mutations: {

    }
}