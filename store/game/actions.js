import { leavingGame, participate } from '~/utils/web3'

export default {
  async participate ({ commit }, userAddress) {
    const participationFee = await participate(userAddress)
    commit('participate', participationFee)
  },
  async leave ({ commit }, userAddress) {
    const left = await leavingGame(userAddress)
    commit('leave', left)
  }
}
