import { claimMethod } from '~/utils/web3'

export default {
  addLeader ({ commit }, item) {
    commit('addLeader', item)
  },
  async claim () {
    await claimMethod()
  }
}
