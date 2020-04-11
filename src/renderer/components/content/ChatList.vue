<template>
<div class="box">
    <div class="title">
        <h3>{{presentInfo.username}}</h3>
    </div>
    <div class="chat-list-box" ref="scroll">
        <div class="chat-list" v-for="(item,i) in chatData" :key="i">
            <ul v-if="item.type === 2">
                <li>
                    <div class="chat-list-portrait">
                        <mu-avatar color="teal">{{presentInfo.username[0]}}</mu-avatar>
                    </div>
                    <div class="chat-list-con">
                        <div class="record">{{item.value.message}}</div>
                    </div>
                </li>
            </ul>
            <div class="chat-list-user" v-if="item.type === 1">
                <div class="oneself">
                    {{item.value.message}}
                </div>
                <div>
                    <mu-avatar color="teal">{{userInfo.username[0]}}</mu-avatar>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
  export default {
    name: 'chat-list',
    props: ['chatData'],
    computed: {
      presentInfo () {
        return this.$store.state.user.presentInfo
      },
      userInfo () {
        return this.$store.state.user.userInfo
      }
    },
    updated () {
      // 滚动底部
      this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight
    }
  }
</script>

<style scoped>
.box{
    position: absolute;
    width: 100%;
    top: 0;
    height: calc(100% - 130px);
}
.title{
    height: 40px;
    border-bottom: 1px solid rgb(230, 230, 230);
}
.title h3{
    display: inline-block;
    line-height: 40px;
    padding-left: 20px;
}
.chat-list-box{
    overflow-y: scroll;
    height: calc(100% - 41px);
}
    .chat-list{
        font-size: 14px;
        padding: 20px;
        overflow: hidden;
    }
    .chat-list>ul{
       
    }
    .chat-list>ul>li{
        display: flex;
    }
    .chat-list .chat-list-portrait{
        padding-top: 6px;
    }
    .chat-list .chat-list-portrait>img{
        width: 30px;
        height: 30px;
        background: #333333;
        border-radius: 4px;
    }
    .chat-list .chat-list-con{
        padding-left: 10px;
    }
    .chat-list .chat-list-con .record{
        background: #ffffff;
        padding: 6px;
        border-radius: 2px;
        margin-top: 6px;
        border: 1px solid rgb(240, 240, 240);
    }
    .chat-list-user{
        float: right;
        display: flex;
    }
    .chat-list-user img{
        width: 30px;
        height: 30px;
        background: #333333;
        border-radius: 4px;
    }
    .chat-list-user .oneself{
        background: #75ea44;
        padding: 6px;
        margin-right: 10px;
        border-radius: 2px;
        display: flex;
        justify-items: center;
    }
</style>
