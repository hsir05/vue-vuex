<template lang="html">
  <footer class="games-footer">
    <div class="games-footer-btn" id="games-select-right-btn" @click="">{{ getWordsIndexItem(currWordIndex).word }}</div>
    <div class="games-footer-btn" @click="">{{ getRandomWordItem(currWordIndex).word }}</div>
  </footer>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('common/wordsStore', ['getWordsIndexItem', 'getRandomWordItem']),
    ...mapState('games', ['currWordIndex']),
    ...mapGetters('games', {})
  },
  methods: {
    ...mapMutations('games', {}),
    ...mapActions('games', [
    ])
  }
}
</script>

<style lang="scss">
</style>
