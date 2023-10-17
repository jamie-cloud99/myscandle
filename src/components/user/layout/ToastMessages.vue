<template><div></div></template>

<script>
import { mapActions, mapState } from 'pinia'
import toastStore from '@/stores/toastStore'
import { useToast } from 'vue-toastification'

export default {
  computed: {
    ...mapState(toastStore, ['message', 'count'])
  },
  methods: {
    ...mapActions(toastStore, ['pushMessage']),
    createToast() {
      if (this.message.style) {
        const toast = useToast()
        toast[this.message.style](this.message.content)
        return { toast }
      }
    }
  },
  watch: {
    count: {
      handler: 'createToast'
    }
  }
}
</script>
