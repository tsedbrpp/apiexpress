/*
import firebase from 'firebase/app'
import 'firebase/auth'

import '../util/firebaseConfiguration'

export const googleSignin = async (setCredential) => {

    const provider = new firebase.auth.GoogleAuthProvider();
    let credential = null;
    await firebase.auth().signInWithPopup(provider)
        .then((result) => {
            console.log('successfull loged in ', result.user.displayName)
            setCredential(  result.user.uid);})

        .catch((error) => { console.error('there was an error signing in:', error)
            return null;})


};



export const googleSignout = () => {
    console.log("in signout");
    firebase.auth().signOut()
        .then( () => {
                console.log('logout successful');

            }
        )
        .catch( (error) => console.error("there was an error signin out"));

}
*/
