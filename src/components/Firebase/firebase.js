import app from 'firebase/app'
import firebase from 'firebase'


const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  }

console.log(config)



class Firebase {
    constructor() {
        app.initializeApp(config)
        this.auth = app.auth()
        this.db_func = firebase.firestore
        this.db = firebase.firestore()
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password)

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password)

    doSignOut = () => this.auth.signOut()

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email)
 
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password)

    doCreateNewInstanceBasedOnAuthUid = async uid => {
        try {
            const doc = this.db.collection('users').doc(uid)
            await doc.set({
                todos: []
            })
            console.log({message: 'Created a node between authUser and Clowd Firestore'})
        } catch(e) {
            console.log({message: 'Error creating node between authUser and Clowd Firestore', e})
            // нужно удалить аккаунт и заставить пользователья регистрироваться снова
        }
    }

    doAddTodo = (todo, uid) => {
        this.db.collection('users').doc(uid).update({
            todos: this.db_func.FieldValue.arrayUnion(todo)
        })
    }

    doGetTodos = async uid => {
        let doc = await this.db.collection('users').doc(uid).get()
        if(doc) return doc.data().todos
    }
}

export default Firebase