<template>
  <v-app>
    <v-main>
      <v-form ref="form" @submit.prevent="submit">
        <v-btn type="submit">submit</v-btn>
      </v-form>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import { Component, Prop, Ref } from 'vue-property-decorator'

@Component<App>({
  name: 'App',

  components: {
    HelloWorld
  },

  created () {
    console.log(this.str)
    console.log(this.computedStr)
    console.log(this.propStr)
    console.log(this.form)
  }
})
export default class App extends Vue {
  // prop
  @Prop({
    type: String,
    required: false,
    default: () => 'default'
  })
  propStr!: string

  // ref
  @Ref('form') form!: HTMLElement & { validate(): boolean }

  // data
  str = 'string'

  // computed
  get computedStr () {
    return this.str
  }

  set computedStr (value: string) {
    this.str = value
  }

  // methods
  submit () {
    console.log(this.form.validate())
  }
}
</script>
