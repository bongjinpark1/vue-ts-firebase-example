import Vue from 'vue'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCSzBzVSu4NdvXAYXL1Q-sQIEsL7UJHI6c',
  authDomain: 'vue-ts-firebase-example.firebaseapp.com',
  databaseURL: 'https://vue-ts-firebase-example.firebaseio.com',
  projectId: 'vue-ts-firebase-example',
  storageBucket: 'vue-ts-firebase-example.appspot.com',
  messagingSenderId: '888644794810',
  appId: '1:888644794810:web:0eeef2e8ae21a0fc898583'
}

firebase.initializeApp(firebaseConfig)

Vue.prototype.$firebase = firebase

export default firebase
