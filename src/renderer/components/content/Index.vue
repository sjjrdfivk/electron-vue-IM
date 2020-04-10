<template>
  <div class="content">
    <chat-list :chatData="presentInfo" ref="chatList"></chat-list>
    <send-text></send-text>
  </div>
</template>

<script>
import ChatList from './ChatList'
import SendText from './SendText'
export default {
  name: 'my-content',
  data () {
    return {
      chatData: []
    }
  },
  components: { ChatList, SendText },
  computed: {
    presentInfo () {
      return this.$store.state.user.presentInfo && this.$store.state.user.presentInfo.record
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
  .content{
      background: rgba(240, 240, 240, .5);
      width: calc(100% - 305px);
      position: relative;
  }
</style>
