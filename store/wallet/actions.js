import { connectWallet, registerUser } from '~/utils/web3'

export default {
  async connectWallet ({ commit }) {
    const address = await connectWallet()
    commit('connectWallet', address)
  },
  async register ({ commit }, userAddress) {
    const data = await registerUser(userAddress)
    commit('register', data)
  }
}
