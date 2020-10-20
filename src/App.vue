<template>
  <v-app>
    <v-main>
      <v-form ref="form" @submit.prevent="submit">
        <v-btn type="submit">submit</v-btn>
      </v-form>
      <v-list>
        <v-list-item v-for="item in items" :key="item.id">
          <v-list-item-content>
            <v-list-item-title>{{ item.id }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.value }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import { Component, Ref } from 'vue-property-decorator'
import { testCollection, TestData } from '@/firestore/test' // import

@Component<App>({
  name: 'App',

  components: {
    HelloWorld
  },

  created () {
    // testCollection 으로 변경
    this.unsubscribe = testCollection.onSnapshot((snapshot) => {
      this.snapshot = snapshot
    })
  },

  destroyed () {
    if (typeof this.unsubscribe === 'function') this.unsubscribe()
  }
})
export default class App extends Vue {
  // ref
  @Ref('form') form!: HTMLElement & { validate(): boolean }

  // data
  snapshot: firebase.firestore.QuerySnapshot<TestData> | null = null // null 로 초기화를 시켜주지 않으면 vue 의 반응형 엔진을 이용할 수 없습니다.
  unsubscribe!: firebase.Unsubscribe // 반응형 엔진을 활용하지 않아도 되는 variable 이므로 undefined 도 가능합니다.

  get items () {
    if (!this.snapshot) return []
    return this.snapshot.docs.map((snapshot) => {
      const data: TestData = snapshot.data()

      return {
        id: snapshot.id,
        value: data.value
      }
    })
  }

  // methods
  submit () {
    const docRef = testCollection.doc() // testCollection 으로 변경

    docRef.set({
      value: 1
    })
  }
}
</script>
