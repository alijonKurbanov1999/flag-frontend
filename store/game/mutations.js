export default {
  participate (state, { fee, registrationBonus, usersAddress, userJoined }) {
    state.participationFee = fee
    // console.log('store fee: ', state.participationFee)
    state.registrationBonus = registrationBonus
    state.usersAddress = usersAddress
    state.userJoined = userJoined
  },
  leave (state, userJoined) {
    state.userJoined = userJoined
  },
  capture (state, { address, round, time }) {
    state.ownerAddress = address
    state.time = time
    state.round = round
  }
}
