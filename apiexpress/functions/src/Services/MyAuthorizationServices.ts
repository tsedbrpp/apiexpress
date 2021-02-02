import firebase from "firebase";

export default class MyAuthorizationServices {


    public getToken(user: any): any {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((data: any) => {
                return data.user.getIdToken();
            })
            .then((token: any) => {
                return token;
            })
            .catch((error: any) => {
                console.error(error);
                return "wrong credentials, please try again";
            });
    }
}
