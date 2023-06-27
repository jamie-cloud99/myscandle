<template><div></div></template>

<script>
import { useToast } from 'vue-toastification'

export default {
  inject: ['emitter'],

  methods: {
    createToast(message) {
      const toast = useToast()
        toast[message.style](message.content)
        return { toast }
      
    }
  },
  mounted() {
    this.emitter.on('push-message', (res) => this.createToast(res))
  },
  beforeUnmount() {
    this.emitter.off('push-message', (res) => this.createToast(res))
  }
}
</script>