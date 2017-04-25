<template lang="html">
  <div :class="['modal', data.show ? 'show' : '']">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="cancel">&times;</button>
          <h4 class="modal-title">Confirm Action</h4>
        </div>
        <div class="modal-body">
          <p>{{ data.text }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" @click.prevent="cancel">Cancel</button>
          <button type="button" class="btn btn-primary" @click.prevent="confirm">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    cancel() {
      this.$emit('closeModal', {confirm: false, expenseId: this.data.expenseId || ''})
    },
    confirm() {
      this.$emit('closeModal', {
        confirm: true,
        expenseId: this.data.expenseId || ''
      })
    }
  }
}
</script>

<style lang="css">
</style>
