

// @ts-ignore
const {admin, db} = require("../util/admin");

module.exports =
    (request: { headers: { authorization: string; }; user: { uid: any; userName: any; imageUrl: any; }; }, response: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; }; }, next: () => any) => {
      let idToken;

      if (request.headers.authorization && request.headers.authorization.startsWith("Bearer ")) {
        idToken = request.headers.authorization.split("Bearer ")[1];
      } else {
        console.error("No token found");
        return response.status(403).json({error: "Unauthorized"});
      }
      // @ts-ignore
      // @ts-ignore
      admin
          .auth()
          .verifyIdToken(idToken)
          .then((decodedToken: { uid: any; username: any; imageUrl: any; }) => {
            // @ts-ignore
            request.user = decodedToken;
            // console.log("decoded " + decodedToken)
            // console.log(request.user.uid)
            // eslint-disable-next-line max-len
            return db.collection("user").where("uid", "==", request.user.uid).limit(1).get();
          })
          .then((data:any) => {
            // @ts-ignore
            //    console.log("data in auth..............................");
            // console.log(data); console.log(data.docs[0].data().userName);
            request.user.userName = data.docs[0].data().userName;
            request.user.imageUrl = data.docs[0].data().imageUrl;
            return next();
          })
          .catch((err: { error: string; }) => {
            console.error("Error while verifying token", err);
            return response.status(403).json(err);
          });
    };
