<template>
  <div class="field is-half column is-offset-one-quarter">
    <p class="control has-icon has-icon-left">
      <input class="input is-large" type="search" :placeholder="placeholder" :name="name" v-model="searchTerm">
      <span class="icon is-left">
        <i class="fa fa-search"></i>
      </span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: ''
    },
    name: {
      default: ''
    },
    placeholder: {
      default: 'Search'
    }
  },
  data() {
    return {
      searchTerm: this.value
    }
  },
  watch: {
    value(val) {
      this.searchTerm = val
    },
    searchTerm(val) {
      this.$emit('input', val)
    }
  }
}
</script>
