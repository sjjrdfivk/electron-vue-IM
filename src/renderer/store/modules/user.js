const state = {
  userInfo: {}, // 用户信息
  presentInfo: '', // 当前聊天信息
  chatListInfo: '' // 全部聊天信息
}

const mutations = {
  SET_USER_INFO (state, info) {
    state.userInfo = info
  },
  SET_PRESENT_INFO (state, info) {
    state.presentInfo = info
    state.presentInfo.read = 0
    if (info && state.chatListInfo) {
      const index = state.chatListInfo.findIndex(item => item.userid === info.userid)
      state.chatListInfo[index].read = 0
    }
  },
  CHAT_INFO_RECORD (state, info) {
    if (state.chatListInfo === '') {
      state.chatListInfo = info
    } else {
      console.log(info)
      const chatListInfo = info.filter(items => {
        return !state.chatListInfo.some(item => {
          return items.userid === item.userid
        })
      })
      state.chatListInfo = [...state.chatListInfo, ...chatListInfo]
    }
    console.log(state.chatListInfo)
  },
  SET_CHAT_LIST_INFO (state, info) {
    const infoData = info
    const userid = info.type === 2 ? infoData.value.sendId : infoData.value.receiveId
    const index = state.chatListInfo.findIndex(item => item.userid === userid)
    const chatListInfo = state.chatListInfo[index]
    chatListInfo.record.push(infoData) // 替换列表
    if (state.presentInfo.userid === userid) { // 替换当前聊天数据
      chatListInfo.read = 0
      state.presentInfo = chatListInfo
    } else {
      chatListInfo.read = !isNaN(chatListInfo.read) ? (chatListInfo.read + 1) : 1 // 未读消息
    }
  },
  DELETE_STATE_INFO (state) {
    state.userInfo = {}
    state.presentInfo = ''
    state.chatListInfo = ''
  }
}

const actions = {
  setUserInfo ({commit}, v) {
    commit('SET_USER_INFO', v)
  },
  chatInfo ({ commit }, v) {
    commit('CHAT_INFO_RECORD', v)
  },
  presentChatInfo ({commit}, v) { // 当前聊天数据
    commit('SET_PRESENT_INFO', v)
  },
  setChatListInfo ({commit}, v) {
    commit('SET_CHAT_LIST_INFO', v)
  },
  deleteStateInfo ({commit}) {
    commit('DELETE_STATE_INFO')
  }
}

export default {
  state,
  mutations,
  actions
}
