import { captureFlag, leavingGame, participate, StartGame } from '~/utils/web3'

export default {
  async participate ({ commit }, userAddress) {
    const participationFee = await participate(userAddress)
    commit('participate', participationFee)
  },
  async leave ({ commit }, userAddress) {
    const left = await leavingGame(userAddress)
    commit('leave', left)
  },
  async capture ({ commit }) {
    const capture = await captureFlag()
    commit('capture', capture)
  },
  async starting ({ commit }) {
    const start = await StartGame()
    commit('startGame', start)
  }

}
