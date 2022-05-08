const user = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;

    console.log(user);
    // ...
  } else {
    // User is signed out
    // ...
  }
});

console.log(user);

let update = () => {
  //   const user = await firebase.auth().currentUser;
  //   user.updateProfile({
  //     displayName: "Jane Q. User",
  //     photoURL: "https://example.com/jane-q-user/profile.jpg",
  //   });

  //   console.log(user);

  const ref = firebase.storage().ref();
  let file = document.getElementById("photo").files[0];

  const metadata = {
    contentType: file.type,
  };
  const name = file.name;

  const Upload = ref.child(name).put(file, metadata);
  Upload.then((snapshot) => snapshot.ref.getDownloadURL()).then((url) =>
    console.log(url)
  );
};
