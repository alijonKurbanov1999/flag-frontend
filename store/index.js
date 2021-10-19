import { connectWallet, participate, registerUser, claimMethod, leavingGame } from '~/utils/web3'

export const state = () => ({
  balance: 10,
  userAddress: null,
  isRegistered: false,
  hasAccount: false,
  symbol: '$',
  registrationBonus: null,
  participationFee: 10,
  flagColour: 'red',
  userJoined: Boolean,
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
  register (state, { balance, symbol, isRegistered }) {
    console.log('Balance: ', balance)
    state.balance = balance
    state.symbol = symbol
    state.isRegistered = isRegistered
  },
  participate (state, { fee, registrationBonus, usersAddress, joined }) {
    state.participationFee = fee
    // console.log('store fee: ', state.participationFee)
    state.registrationBonus = registrationBonus
    state.usersAddress = usersAddress
    state.userJoined = joined
    // console.log('Users address store: ', state.usersAddress)
  },
  leaveGame (state, userJoined) {
    state.userJoined = userJoined
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
  async leave ({ commit }, userAddress) {
    const joined = await leavingGame(userAddress)
    commit('leaveGame', joined)
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
  },
  userJoined (state) {
    return state.userJoined
  }
}
