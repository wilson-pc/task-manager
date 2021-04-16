import firebase from "./firebase";

export default async function getCurrentUser() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        reject({ message: "not auth" });
      }
    });
  });
}
