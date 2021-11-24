<template>
  <div class="container__section-top">
    <div class="card">
      <h3 class="card__title">
        The round lasts 100 seconds.
      </h3>
      <div class="card__flag">
        <img :src="require(`~/assets/img/flags/${$store.state.flagColour}.png`)">
      </div>
      <div class="card__text-field">
        <div v-if="field" class="text__field-participation">
          <p>Participation fee</p><span>{{ $store.state.participationFee }} {{ $store.state.symbol }}</span>
        </div>
        <div v-if="!field" class="text__field-capture">
          <p>Owner address </p><span style="color: #00CC21">90das8u</span>
          <p>Time left </p> <span>50 sec</span>
          <p>Round pool </p><span>50 $</span>
        </div>
      </div>
      <button
        class="button card__button"
        :class="{ 'btn-dark': flag}"
        @click="participate"
      >
        Participate
      </button>
      <div v-if="flag" class="card__colour">
        <p>Your flag colour</p>
        <span
          class="style-colour"
          :style="{color: $store.state.flagColour}"
        >
          {{ $store.state.flagColour }}
        </span>
      </div>
    </div>
    <modal-waiting
      v-if="flag"
      @close="flag = false"
    />
    <div v-if="flag" class="card history">
      <h3 class="card__title">
        Players list
      </h3>
      <ul v-for="user in $store.getters.usersAddress" :key="user.id" class="card__lists">
        <li>{{ user.slice(0, 8) }} waiting the game</li>
      </ul>
      <div class="shadow" />
    </div>
  </div>
</template>

<script>
import ModalWaiting from '~/components/Modals/modalWaiting'
export default {
  name: 'card',
  components: { ModalWaiting },
  data () {
    return {
      flag: false,
      field: true,
      fee: 10,
      symbol: '$'
    }
  },
  // async mounted () {
  //   const socket = new WebSocket('ws://localhost:8081')
  //   socket.onmessage = (event) => {
  //     console.log('Socket event', event.data)
  //   }
  // },
  methods: {
    async participate () {
      await this.$store.dispatch('participate', this.$store.state.userAddress)
      this.flag = true
    }
  }
}
</script>

<style scoped>
.container__section-top {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(292px, 447px));
  justify-content: center;
  align-content: center;
  grid-gap: 30px 30px;
  margin: 30px auto;
}
.card {
  padding: 30px;
  max-width: 447px;
  background: #3C3C3C;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: start;
}
.card p {
  color: rgba(227, 227, 227, 0.7);
  margin: 0;
}
.card span {
  justify-self: right;
}
.history {
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  width: 292px;
  margin: auto;
  align-items: start;
}
.card__lists {
  text-align: center;
  margin: 0;
  padding: 0;
  color: #b6afaf;
}
.card__title {
  font-family: Montserrat, sans-serif;
  margin-top: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 27px;
  text-align: center;
  color: #FFFFFF;
}
.card__flag {
  background-color: #585858;
  width: 211px;
  height: 210px;
  border-radius: 10px;
  padding: 40px 45px;
  margin: 30px auto;
}
.card__text-field {
  padding: 25px 20px;
  position: static;
  width: 387px;
  background: #585858;
  border: 1px solid #585858;
  box-sizing: border-box;
  border-radius: 14px;
}
.text__field-participation,
.text__field-capture {
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  align-items: center;
}
.card__button {
  font-size: 18px;
  margin-top: 25px;
  width: 387px;
  height: 50px;
}
.card__colour {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  font-size: 16px;
  color: green;
  margin-top: 25px;
}
.style-colour {
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: green;
}
</style>
