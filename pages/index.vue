<template>
  <div class="container">
    <card />
    <modal-claim v-if="flag" @close="flag=false" @show-claim="ShowClaim" />
    <modal-register
      v-if="registered"
      @close="registered = false"
    />
    <leader-board @open-claim="openClaim" />
  </div>
</template>

<script>
import ModalClaim from '~/components/Modals/modalClaim'
import ModalRegister from '~/components/Modals/modalRegister'
import LeaderBoard from '~/components/leaderBoard'
import Card from '~/components/card'
export default {
  name: 'main',
  components: { ModalClaim, ModalRegister, Card, LeaderBoard },
  data () {
    return {
      flag: false,
      registered: false
    }
  },
  methods: {
    openClaim () {
      console.log('Need to claim method!')
      this.flag = true
    },
    ShowClaim () {
      console.log('Showed the claim')
      this.$store.dispatch('claim', this.$store.state.userAddress)
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
  width: 80vw;
  margin: 73px auto 222px auto;
  padding: 30px 0;
}
</style>
