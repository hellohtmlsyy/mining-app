<template>
    <div class="main">
        <div @click="openMask">打开弹窗</div>
        <dialog-bar v-model="sendVal" type="danger" title="我是标题" content="我是内容" v-on:cancel="clickCancel()" @danger="clickDanger()" @confirm="clickConfirm()" dangerText="Delete"></dialog-bar>
    </div>
</template>
<script>
import dialogBar from './test.vue'
export default {
   components:{
        'dialog-bar': dialogBar,
    },
    data(){
        return{
            sendVal: false,
        }
    },
    methods:{
        openMask(index){
            this.sendVal = true;
        },
        clickCancel(){            
        },
        clickDanger(){            
        },
        clickConfirm(){            
        }
    }
}
</script>
<style lang="less" scoped>
</style>