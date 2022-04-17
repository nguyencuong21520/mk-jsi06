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
    console.log("hello");
  }
};

let setError = (query, content) => {
  document.getElementById(query).innerHTML = content;
};
