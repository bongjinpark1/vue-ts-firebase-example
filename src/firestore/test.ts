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
