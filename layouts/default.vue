<template>
  <nuxt />
</template>
<script>
// import Nes from '@hapi/nes/lib/client.js'
//
// const wsUrl = 'ws://176.209.225.53:3000/api'

// const wsEvents = { // socketEvents
//   user: 'user',
//   round: 'round',
//   flag: '/flagCaptures',
//   userBalance: '/balance/{user}'
// }
export default {
  // mounted () {
  //   const client = new Nes.Client(wsUrl)
  //
  //   const start = async () => {
  //     await client.connect()
  //     const res = await client.request('user')
  //     console.log('User', res)
  //   }
  //   start()
  //   // for (const event of Object.values(wsEvents)) {
  //   //   client.subscribe(event, (data) => {
  //   //     if (event === wsEvents.user) {
  //   //       // data.id = new Date().getTime()
  //   //       this.$store.dispatch('addLeader', data)
  //   //     }
  //   //     console.log('Event data, need to add some logic', event, data)
  //   //   })
  //   // }
  // }
}
</script>
