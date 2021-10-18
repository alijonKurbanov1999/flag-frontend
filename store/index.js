import { connectWallet, participate, registerUser, claimMethod } from '~/utils/web3'

export const state = () => ({
  balance: null,
  userAddress: null,
  isRegistered: false,
  hasAccount: false,
  symbol: '$',
  registrationBonus: null,
  participationFee: 10,
  flagColour: 'red',
  userJoined: null,
  usersAddress: [],
  leaders: [
    { id: 1, address: '90das8u', time: 10, reward: 4 },
    { id: 2, address: '8903fd0', time: 7, reward: 7 },
    { id: 3, address: '003189s', time: 12, reward: 2 },
    { id: 4, address: '09d90f0', time: 3, reward: 5 },
    { id: 5, address: 'i43d090', time: 8, reward: 9 }
  ]
})
export const mutations = {
  connectWallet (state, address) {
    state.userAddress = address
  },
  register (state, { balance, symbol }) {
    console.log('Balance: ', balance)
    state.balance = balance
    state.symbol = symbol
  },
  participate (state, { fee, registrationBonus, usersAddress }) {
    state.participationFee = fee
    console.log('store fee: ', state.participationFee)
    state.registrationBonus = registrationBonus
    state.usersAddress = usersAddress
    console.log('Users address store: ', state.usersAddress)
  },
  addLeader (state, item) {
    console.log('Leader item:', item)
    state.leaders.push(item)
  }
}

export const actions = {
  async connectWallet ({ commit }) {
    const address = await connectWallet()
    commit('connectWallet', address)
  },
  async register ({ commit }, userAddress) {
    const data = await registerUser(userAddress)
    commit('register', data)
  },
  async participate ({ commit }, userAddress) {
    const participationFee = await participate(userAddress)
    commit('participate', participationFee)
  },
  addLeader ({ commit }, item) {
    commit('addLeader', item)
  },
  async claim () {
    await claimMethod()
  }
}
export const getters = {
  balance (state) {
    return state.balance
  },
  symbol (state) {
    return state.symbol
  },
  participationFee (state) {
    return state.participationFee
  },
  usersAddress (state) {
    return state.usersAddress
  }
}
