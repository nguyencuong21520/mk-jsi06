let form_ = document.getElementById("signin");

form_.onsubmit = (e) => {
  e.preventDefault();

  setError("email_err", "");
  setError("password_err", "");

  let email = form_.email.value;
  let password = form_.password.value;

  let check = true;

  if (!email) {
    setError("email_err", "Email is required");
    check = false;
  }
  if (!password) {
    setError("password_err", "Password is required");
    check = false;
  }

  if (check) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        if (user.emailVerified) {
          sweetAlert("success", "Welcome back");

          open("../updateAccount.html", "_self");
        } else {
          sweetAlert("error", "Please verify your email");
        }
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
