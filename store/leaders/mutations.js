export default {
  addLeader (state, item) {
    console.log('Leader item:', item)
    state.leaders.push(item)
  }
}
