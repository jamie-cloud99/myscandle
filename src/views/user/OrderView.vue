<template><div></div></template>


<script>
import { mapState, mapActions } from 'pinia'
import statusStore from '../../stores/statusStore'
import cartStore from '../../stores/cartStore'

export default {
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState(statusStore, ['paymentStep'])
  },
  methods: {
    ...mapActions(cartStore, ['openOrder'])
  },
  created() {
    this.openOrder()
  }
}
</script>