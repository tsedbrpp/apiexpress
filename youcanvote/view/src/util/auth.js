export const authMiddleWare = (history) => {
    const authToken = localStorage.getItem('AuthToken');
    if(authToken === null){
        history.push('/login')
    }
}
/*  "proxy": "https://us-central1-youcanvote-5be45.cloudfunctions.net/api",*/
