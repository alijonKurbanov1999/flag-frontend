<template>
  <div class="container__section-bottom">
    <h3 class="section-bottom-title">
      Leaderboard
    </h3>
    <div class="section-bottom-round">
      <h4>Round:</h4>
      <span class="chevron chevron-left" />
      <button class="button section-bottom-btn">
        1
      </button>
      <span class="chevron chevron-right" />
    </div>
    <ul v-for="leader in leaders" :key="leader.id" class="section-leaders">
      <li class="leader-id">
        <span class="leader-title">#</span>
        <span>{{ leader.id }}</span>
      </li>
      <li class="leader-address">
        <span class="leader-title">Address</span>
        <span>{{ leader.address.slice(0, 7) }}</span>
      </li>
      <li class="leader-time">
        <span class="leader-title">Time</span>
        <span>{{ leader.time }} sec</span>
      </li>
      <li class="leader-reward">
        <span class="leader-title">Reward</span>
        <span>{{ leader.reward }} $</span>
      </li>
      <li>
        <button
          v-if="claimId"
          class="button btn-ocean"
          @click="openClaim"
        >
          Claim
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'leader-board',
  emits: ['open-claim'],
  mounted () {
    const users = this.userAddress
    console.log('My own users: ', users)
    return users
  },
  computed: {
    ...mapGetters({
      leaders: 'leaders/leaders',
      userAddress: 'wallet/userAddress'
    }),
    claimId () {
      return this.leaders.map(x => x.address === this.userAddress)
    }
  },
  methods: {
    openClaim () {
      this.$emit('open-claim')
    }
  }
}
</script>

<style scoped>
.container__section-bottom {
  background: #3C3C3C;
  border: 1px solid #585858;
  box-sizing: border-box;
  border-radius: 14px;
  padding: 30px;
}
.section-bottom-title {
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 27px;
  color: #FFFFFF;
  margin: 0;
}
.section-bottom-round {
  display: flex;
  align-items: center;
  width: 200px;
}

.section-bottom-round img {
  width: 24px;
  height: 24px;
  color: #585858;
  cursor: pointer;
}
.chevron {
  width: 24px;
  height: 24px;
  color: #585858;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
}
.chevron-left {
  background-image: url("../assets/img/chevron_left.png");
}
.chevron-right {
  background-image: url("../assets/img/chevron_right.png");
}
.section-bottom-btn {
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  margin: auto 5px;
  background: linear-gradient(253.94deg, #09F2C3 8.37%, #15DCE4 69.71%);
}
.section-leaders {
  position: relative;
  background: #585858;
  border-radius: 14px;
  padding: 24px;
  margin: 20px auto;
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 3fr 3fr;
  align-items: center;
}
.section-leaders li {
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  height: 50px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
}
.leader-title {
  line-height: 17px;
  color: #ABABAB;
}
</style>
