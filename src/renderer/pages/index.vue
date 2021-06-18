<template lang="pug">
  h1 门禁管理
</template>

<script>
import { remote } from 'electron'

export default {
  data () {
    return {
      externalContent: ''
    }
  },
  methods: {
    openURL (url) {
      remote.shell.openExternal(url)
    }
  }
}
</script>
