<template>
  <header>
    <nav class="navbar">
      <div class="navbar__logo">
        <img src="~/assets/img/logo.png">
      </div>
      <ul class="navbar__menu">
        <li class="navbar__menu-item">
          <button class="button btn-ocean" @click.prevent="register">
            Register
          </button>
        </li>
        <li class="navbar__menu-item">
          <button
            v-if="!isRegistered"
            type="button"
            class="button btn-ocean"
            @click.prevent="initWallet"
          >
            Connect Metamask
          </button>
          <div v-else class="item__balance">
            Balance
            <span style="color: white">
              {{ `${balance} ${symbol}` }}
            </span>
          </div>
        </li>
      </ul>
    </nav>
    <modal-register
      v-if="isRegistered && closing"
      title="You're registered"
      text="Lorem ipsum dolor sit amet, consectetur adipisicing."
      img="success"
      @close="closing = false"
    />
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import ModalRegister from '~/components/Modals/modalRegister'
export default {
  name: 'index',
  components: { ModalRegister },
  emits: ['openModal'],
  data () {
    return {
      closing: false
    }
  },
  computed: {
    ...mapGetters({
      balance: 'wallet/balance',
      symbol: 'wallet/symbol',
      isRegistered: 'wallet/isRegistered',
      userAddress: 'wallet/userAddress',
      hasAccount: 'wallet/hasAccount'
    })
  },
  methods: {
    async initWallet () {
      await this.$store.dispatch('wallet/connectWallet', this.userAddress)
      console.log('UserWallet was :', this.userAddress)
    },
    async register () {
      await this.$store.dispatch('wallet/register', this.userAddress)
      this.closing = true
      setTimeout(() => {
        this.closing = false
      }, 5000)
    }
  }
}
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 73px;
  z-index: 20;
  padding: 0;
  margin: 0;
  background-color:  #202020;
  border-bottom: 2px solid #6f6f6f;
}
.navbar {
  max-width: 80%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: auto;
  box-sizing: border-box;
}
.navbar__logo {
  position: relative;
  width: 46px;
  height: 46px;
  margin: auto 0;
  left: -7px;
}
.navbar__menu {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  align-items: center;
}
.navbar__menu li{
  margin-right: 10px;
}
.navbar__menu-item {
  padding: 0;
  list-style: none;
  align-items: center;
}
.item__balance {
  display: inline-block;
  padding: 5px 15px;
  white-space: nowrap;
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-size: 14px;
  border-radius: 10px;
  border: 1px solid #3C3C3C;
  background: #3C3C3C;
  color: #b6afaf;
  align-items: center;
  margin: 0;
}
</style>
