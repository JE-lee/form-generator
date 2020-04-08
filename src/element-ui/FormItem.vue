<template>
  <div>
    <div class="form-item">
      <span class="label">{{label}}</span>
      <div>
        <slot></slot>
      </div>
    </div>
    <div class="err-mes">{{errorMessage}}</div>
  </div>
</template>

<script lang="tsx">
export default {
  props: {
    label: String,
    errorMessage: String
  }
}
</script>

<style scoped="scss">
</style>