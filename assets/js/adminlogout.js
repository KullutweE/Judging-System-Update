const logOut = document.querySelector(".logout");

logOut.addEventListener("click", () => {
  //signOut() is a built in firebase function responsible for signing a user out

  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.assign("../public/index.html");
    })
    .catch((error) => {
      console.error(error);
      alert(error);
    });
});
//active user to homepage
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var email = user.email;
    alert("Active user " + email);
  } else {
    alert("No Active user Found");
  }
});
