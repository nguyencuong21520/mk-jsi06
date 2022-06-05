let form_update = document.querySelector("#form_update");
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

form_update.onsubmit = (e) => {
  e.preventDefault();

  let username = form_update.username.value;

  let phoneNumber = form_update.phone.value;

  let photo = form_update.photo.files[0];

  const ref = firebase.storage().ref();
  const metadata = {
    contentType: photo.type,
  };
  const name = photo.name;

  const Upload = ref.child(name).put(photo, metadata);
  Upload.then((snapshot) => snapshot.ref.getDownloadURL()).then((url) =>
    updateAccout(username, phoneNumber, url)
  );

  console.log(username, phoneNumber, photo);

  //   updateAccout(username, phoneNumber, photo);
};

let updateAccout = async (username, phoneNumber, photo) => {
  const user = await firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: username,
      photoURL: photo,
      phoneNumber: Number(phoneNumber),
    })
    .then(() => {
      // Update successful
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
};


