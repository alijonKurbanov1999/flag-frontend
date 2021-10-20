export default {
  connectWallet (state, address) {
    state.userAddress = address
  },
  register (state, { balance, symbol, isRegistered }) {
    console.log('Balance: ', balance)
    state.balance = balance
    state.symbol = symbol
    state.isRegistered = isRegistered
  }
}
