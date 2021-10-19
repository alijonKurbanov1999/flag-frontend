<template>
  <div>
    <div class="modal-backdrop" @click="close" />
    <div class="modals__window">
      <h3>You’re registered</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <span class="close-small" @click="close"><img src="~/assets/img/close_small.png"></span>
      <span class="round"><img src="~/assets/img/Union.png"><img src="~/assets/img/success.png"></span>
      <span class="bubbles"><img src="~/assets/img/bubbles.png"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  emits: ['close'],
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modals__window {
  position: fixed;
  top: 30%;
  left: 50%;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #FFFFFF;
  width: 522px;
  height: 162px;
  background: #6f6f6f;
  border-radius: 14px;
  padding: 30px 30px 30px 150px;
  z-index: 1000;
  transform: translateX(-50%);
}
.modals__window  h3 {
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  letter-spacing: 1px;
  color: #FFFFFF;
  margin-bottom: 15px;
}
.modals__window  p {
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 15px;
  letter-spacing: 2px;
  color: #FFFFFF;
  margin: 0;
  padding: 0;
}
.modals__window  .close-small {
  position: fixed;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.round img:first-child{
  position: fixed;
  top: -43px;
  left: 25px;
  z-index: 1;
}
.round img:last-child{
  position: fixed;
  top: -25px;
  left: 45px;
  z-index: 2;
  width: 28px;
  height: 28px;
}

.bubbles img{
  position: fixed;
  left: 0;
  top: 44px;
  border-bottom-left-radius: 14px;
}
</style>
