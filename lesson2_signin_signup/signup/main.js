const config = {
  url: "http://127.0.0.1:5501/lesson2_signin_signup/signup/index.html",
  handleCodeInApp: true,
};
let form_ = document.getElementById("signup");

form_.onsubmit = (e) => {
  e.preventDefault();

  setError("email_err", "");
  setError("password_err", "");
  setError("username_err", "");
  setError("cfpassword_err", "");

  let username = form_.username.value;
  let email = form_.email.value;
  let password = form_.password.value;
  let cfpassword = form_.cfpassword.value;

  let check = true;

  if (!username) {
    setError("username_err", "Username is required");
    check = false;
  }
  if (!email) {
    setError("email_err", "Email is required");
    check = false;
  }
  if (!password) {
    setError("password_err", "Password is required");
    check = false;
  } else {
    if (password.length < 6) {
      setError("password_err", "Password must be at least 6 characters");
      check = false;
    }
  }
  if (!cfpassword) {
    setError("cfpassword_err", "Confirm password is required");
    check = false;
  } else {
    if (password !== cfpassword) {
      setError("cfpassword_err", "Confirm password is not match");
      check = false;
    }
  }

  if (check) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        user.updateProfile({
          displayName: username,
        });
        firebase.auth().currentUser.sendEmailVerification();
        // sweetAlert("success", "Please check your email to verify your account");
        localStorage.setItem("currentUser", user.email);

        open("../confirmEmail.html")
        open("../signin/index.html", "_self")
      })
      .catch((error) => {
        var errorMessage = error.message;
        sweetAlert("error", errorMessage);
      });
  }
};

let setError = (query, content) => {
  document.getElementById(query).innerHTML = content;
};

let sweetAlert = (icon, content) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icon,
    title: content,
  });
};
