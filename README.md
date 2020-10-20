# vue-ts-firebase-example

## vue-cli 를 이용한 프로젝트 구성

```
$ npm install -g @vue/cli
$ vue create vue-ts-firebase-example

Vue CLI v4.5.8
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, TS, PWA, Router, Vuex, Linter
? Choose a version of Vue.js that you want to start the project with 2.x
? Use class-style component syntax? Yes
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? Yes
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a linter / formatter config: Standard
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No

...

$ cd vue-ts-firebase-example
$ vue add vuetify

? Choose a preset: Default (recommended)

$ yarn serve // or, $ npm run serve
```

<img src="./doc/images/vue-ts-firebase-example 2020-10-20 14-21-53.png">

http://localhost:8080/ 으로 접속해 확인합니다.

## 새 파이어베이스 프로젝트 만들기

1. https://console.firebase.google.com/?hl=ko 파이어베이스 콘솔에 접속, 프로젝트 추가

<img src="./doc/images/Firebase Console 2020-10-20 14-27-06.png">

2. 프로젝트 이름을 지정하고 계속

<img src="./doc/images/Firebase Console 2020-10-20 14-28-45.png">

3. 애널리틱스 설정은 사용하지 않고, 프로젝트 만들기 클릭 (사용시 추가적으로 간단한 설정을 하셔야합니다.)

<img src="./doc/images/Firebase Console 2020-10-20 14-29-55.png">

4. 새 프로젝트가 추가되었습니다.

<img src="./doc/images/vue-ts-firebase-example – vue-ts-firebase-example – Firebase Console 2020-10-20 14-31-55.png">

5. 프로젝트 설정에서 기본 GCP 리전을 asia-northeast1(tokyo) 로 설정 (firebase functions가 서울 리전을 지원하지 않으므로)

<img src="./doc/images/vue-ts-firebase-example – vue-ts-firebase-example – Firebase Console 2020-10-20 14-36-01.png">

<img src="./doc/images/vue-ts-firebase-example – 설정 – Firebase Console 2020-10-20 14-38-48.png">

6. cloud firestore 활성화

<img src="./doc/images/vue-ts-firebase-example – Firebase Console 2020-10-20 14-40-12.png">

<img src="./doc/images/vue-ts-firebase-example – Firebase Console 2020-10-20 14-41-09.png">

> 편의를 위해 테스트모드로 시작합니다. 누구나 데이터베이스를 읽고 쓸 수 있기 때문에, 연습용으로만 잠깐 사용하세요.

## vue 프로젝트에 firebase 추가

```
$ npm install -g firebase-tools
$ firebase init

/*
  로그인이 필요하면 로그인 후 진행하세요.
  대부분은 엔터만 치면 되지만, 특별히 다른 부분은 아래에서 알려드립니다.
*/

// remote config를 제외한 모든 features 를 선택했습니다.

? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices. Database: Deploy Firebase Realtime Database Rules, Firestore: Deploy rules and create in
dexes for Firestore, Functions: Configure and deploy Cloud Functions, Hosting: Configure and deploy Firebase Hosting sites, Storage: Deploy Cloud Storage security rules, Emulators: Set up local emulators for Firebase features

=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add, 
but for now we'll just set up a default project.

? Please select an option: Use an existing project
? Select a default Firebase project for this directory: vue-ts-firebase-example (vue-ts-firebase-example) // 위에서 만든 firebase project를 지정하세요.
i  Using project vue-ts-firebase-example (vue-ts-firebase-example)

=== Database Setup

Firebase Realtime Database Rules allow you to define how your data should be
structured and when your data can be read from and written to.

? What file should be used for Database Rules? database.rules.json
? File database.rules.json already exists. Do you want to overwrite it with the Database Rules for vue-ts-firebase-example from the Firebase Console? No
Skipping overwrite of Database Rules.
The rules defined in database.rules.json will be published when you do firebase deploy.

=== Firestore Setup

Firestore Security Rules allow you to define how and when to allow
requests. You can keep these rules in your project directory
and publish them with firebase deploy.

? What file should be used for Firestore Rules? firestore.rules

Firestore indexes allow you to perform complex queries while
maintaining performance that scales with the size of the result
set. You can keep index definitions in your project directory
and publish them with firebase deploy.

? What file should be used for Firestore indexes? firestore.indexes.json

=== Functions Setup

A functions directory will be created in your project with a Node.js
package pre-configured. Functions can be deployed with firebase deploy.

? What language would you like to use to write Cloud Functions? TypeScript // 타입스크립트 사용
? Do you want to use ESLint to catch probable bugs and enforce style? Yes
✔  Wrote functions/package.json
✔  Wrote functions/.eslintrc.js
✔  Wrote functions/tsconfig.json
✔  Wrote functions/src/index.ts
✔  Wrote functions/.gitignore
? Do you want to install dependencies with npm now? Yes

...

=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

? What do you want to use as your public directory? dist // public이 아니라 dist로 지정합니다.
? Configure as a single-page app (rewrite all urls to /index.html)? Yes // SPA를 만들것이므로 yes
✔  Wrote dist/index.html

=== Storage Setup

Firebase Storage Security Rules allow you to define how and when to allow
uploads and downloads. You can keep these rules in your project directory
and publish them with firebase deploy.

? What file should be used for Storage Rules? storage.rules

=== Emulators Setup
? Which Firebase emulators do you want to set up? Press Space to select emulators, then Enter to confirm your choices. Functions Emulator, Firestore Emulator, Database Emulator, Hosting Emulator
? Which port do you want to use for the functions emulator? 5001
? Which port do you want to use for the firestore emulator? 8081 // 8080이 vue serve 포트와 겹쳐서 8081로
? Which port do you want to use for the database emulator? 9000
? Which port do you want to use for the hosting emulator? 5000
? Would you like to enable the Emulator UI? Yes
? Which port do you want to use for the Emulator UI (leave empty to use any available port)? NaN
? Would you like to download the emulators now? No

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

✔  Firebase initialization complete!
```

## vue project에 firebase 추가

1. 프로젝트 설정에서 웹 앱 추가하기

<img src="./doc/images/vue-ts-firebase-example – vue-ts-firebase-example – Firebase Console 2020-10-20 14-36-01.png">

<img src="./doc/images/vue-ts-firebase-example – 설정 – Firebase Console 2020-10-20 14-56-23.png">

<img src="./doc/images/vue-ts-firebase-example – 설정 – Firebase Console 2020-10-20 14-57-07.png">

> 2, 3, 4 는 계속 다음 버튼을 눌러 진행합니다.

2. config snippet 을 복사해둡니다.

<img src="./doc/images/vue-ts-firebase-example – 설정 – Firebase Console 2020-10-20 14-58-54.png">

3. vue project 에서 파이어베이스를 이용하기위한 플러그인 작성


~/src/plugins/firebase.ts
```typescript
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
```

> firebase 에 대해서 type declaration 을 찾을 수 없다는 오류가 뜰 경우, ```$ yarn add --dev @types/firebase``` 명령어로 설치하세요.

~/src/main.ts

```typescript
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/firebase' // 이 라인을 추가해 플러그인 설치

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

```

이제 vue component 에서 ```this.$firebase``` 를 이용해 firebase에 접근할 수 있습니다.

~/src/App.vue
```vue
<script lang="ts">
import Vue from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default Vue.extend({
  name: 'App',

  components: {
    HelloWorld
  },

  data: () => ({

  }),

  created () {
    const firestore = this.$firebase.firestore() // 이런식으로
  }
})
</script>
```

## 클래스 스타일 컴포넌트 사용

App.vue 는 vue.extend 형식으로 작성되어있습니다. vue-property-decorator를 사용해 class style component로 변경하겠습니다.

~/src/App.vue
```vue
// before

<script lang="ts">
import Vue from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default Vue.extend({
  name: 'App',

  components: {
    HelloWorld
  },

  data: () => ({

  }),

  created () {
    const firestore = this.$firebase.firestore()
  }
})
</script>

// after
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
import { Component, Prop, Ref } from 'vue-property-decorator' // 기본으로 설치되어있습니다.

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
  // props
  @Prop({
    type: String,
    required: false,
    default: () => 'default'
  })
  propStr!: string

  // refs
  @Ref('form') form!: HTMLElement & { validate(): boolean }

  // data
  str = 'string'

  // computed getters
  get computedStr () {
    return this.str
  }

  // computed setters
  set computedStr (value: string) {
    this.str = value
  }

  // methods
  submit () {
    console.log(this.form.validate())
  }
}
</script>
```

라이프사이클훅이나 사용할 컴포넌트, 이름등의 컴포넌트 옵션은 Component decorator 에 선언해주시고, 

data, props, refs, computed getters, computed setters, watch 등은 class 에 작성합니다. 

Component decorator에 generic을 입력해주셔야, 라이프사이클훅에서 component data 의 타입 지정을 활용할 수 있습니다.

## cloud firestore 에 데이터 쓰기

바로 전 챕터에서 만든 버튼을 활용해 cloud firestore 에 데이터를 써보겠습니다. 조금전에 테스트용으로 만든 submit method 를 변경합니다.

~/src/App.vue
```typescript
// ...

submit () {
  const firestore = this.$firebase.firestore()

  const docRef = firestore.collection('test').doc()

  docRef.set({
    value: 1
  })
}
```

버튼을 눌러보면 test 컬렉션에 데이터가 추가된걸 확인할 수 있습니다.

<img src="./doc/images/vue-ts-firebase-example – Cloud Firestore – Firebase Console 2020-10-20 15-29-09.png">

## cloud firestore 에서 데이터 읽기

바로 전 챕터에서 추가한 데이터를 읽어보겠습니다.

~/src/App.vue
```vue
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

@Component<App>({
  name: 'App',

  components: {
    HelloWorld
  },

  created () {
    const firestore = this.$firebase.firestore()

    this.unsubscribe = firestore.collection('test').onSnapshot((snapshot) => {
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
  snapshot: firebase.firestore.QuerySnapshot | null = null // null 로 초기화를 시켜주지 않으면 vue 의 반응형 엔진을 이용할 수 없습니다.
  unsubscribe!: firebase.Unsubscribe // 반응형 엔진을 활용하지 않아도 되는 variable 이므로 undefined 도 가능합니다.

  get items () {
    if (!this.snapshot) return []
    return this.snapshot.docs.map((snapshot) => {
      const data = snapshot.data()

      return {
        id: snapshot.id,
        value: data.value
      }
    })
  }

  // methods
  submit () {
    const firestore = this.$firebase.firestore()

    const docRef = firestore.collection('test').doc()

    docRef.set({
      value: 1
    })
  }
}
</script>
```

<img src="./doc/images/vue-ts-firebase-example 2020-10-20 15-41-33.png">

> submit 버튼을 누를 때 마다, 아래 데이터가 갱신됨을 확인할 수 있습니다.

## snapshot data 에 대한 타입 지정 활용하기

현재 작성한 코드로는 ```snapshot.data()```를 호출했을때 내부에 어떤 데이터가 있는지 확인할 수 없습니다.

FirestoreDataConverter 를 활용해 타입 지정을 활용해보겠습니다.

~/src/firestore/test.ts
```typescript
import firebase from '@/plugins/firebase'

export class TestData {
  value: number

  constructor (value: number) {
    this.value = value
  }
}

export const testConverter: firebase.firestore.FirestoreDataConverter<TestData> = {
  toFirestore (model: TestData, setOptions?: firebase.firestore.SetOptions) {
    /*
      데이터가 firestore에 데이터를 쓸 때 호출
      setOptions 에 merge, mergeField 옵션을 체크해 병합을 핸들링 할 수 있습니다.
    */
    if (setOptions?.merge) {
      return {
        value: firebase.firestore.FieldValue.increment(model.value)
      }
    }

    return {
      value: model.value
    }
  },
  fromFirestore (snapshot, options) {
    /*
      firestore 에서 데이터를 읽을 때 호출
    */
    const data = snapshot.data()

    return new TestData(data.value)
  }
}

export const testCollection = firebase.firestore().collection('test').withConverter(testConverter)
```

이제 ```collection('collection_name').withConverter(converter)``` 를 활용하면 지정된 타입의 데이터만 입력할 수 있고, 읽을때도 지정된 데이터 타입으로 나오기때문에 타입을 유추할 수 있게됩니다.

~/src/App.vue
```vue
<template>
...
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
```

<img src="./doc/images/App.vue — vue-ts-firebase-example 2020-10-20 16-00-53.png">

> 이제 ```data```에는 ```value```라는 field가 있고, 타입은 ```number```임을 알 수 있습니다.

<img src="./doc/images/App.vue — vue-ts-firebase-example 2020-10-20 16-02-58.png">

> ```TestData``` 에는 ```name```이라는 field가 없으므로 type 지정 오류가 납니다.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
