import App from "./build/App";
import Config from './build/Config'
import * as firebase from 'firebase'

const config = {
    apiKey: Config.FIREBASE_API_KEY,
    authDomain: Config.FIREBASE_AUTH_DOMAIN,
    databaseURL: Config.FIREBASE_DATABASE_URL,
    projectId: Config.FIREBASE_PROJECT_ID,
    storageBucket: Config.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: Config.FIREBASE_MESSAGE_SENDER_ID,
}
firebase.initializeApp(config)
export default App;
