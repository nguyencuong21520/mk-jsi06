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
    console.log("hello");
  }
};

let setError = (query, content) => {
  document.getElementById(query).innerHTML = content;
};
