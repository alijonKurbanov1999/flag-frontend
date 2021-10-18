<template>
  <div>
    <div class="modal-backdrop" @click="close" />
    <div class="modal__claim">
      <div class="claim-title">
        <h4>Claim</h4> <span @click="close"><img src="~/assets/img/close_small.png"></span>
      </div>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      <div class="claim-amount">
        <p>Total amount:</p> <span>20 $</span>
      </div>
      <div class="claim-buttons">
        <button class="button btn-default" @click="close">
          Cancel
        </button>
        <button class="button btn-ocean" @click="openClaim">
          Claim
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  emits: ['close', 'show-claim'],
  methods: {
    close () {
      this.$emit('close')
    },
    openClaim () {
      this.$emit('show-claim')
    }
  }
}
</script>

<style scoped>
.modal__claim {
  position: fixed;
  width: 530px;
  padding: 30px;
  top: 30%;
  left: 50%;
  background: #3C3C3C;
  z-index: 1000;
  border-radius: 14px;
  transform: translateX(-50%);
}
.modal__claim img {
  cursor: pointer;
}
.claim-title {
  max-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.claim-amount {
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  height: 35px;
  color: #6f6f6f;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.claim-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  justify-content: space-between;
  align-items: center;
  background: #3C3C3C;
  color: #FFFFFF;
}
</style>
