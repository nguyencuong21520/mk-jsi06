// thay đổi dark mode (add class dark mode vào body)
document.querySelector("#sw_mode").addEventListener("click", function () {
  document.body.classList.toggle("dark_mode");
});

// check xem sự thay đổi của user đã được lưu trong firebase hay chưa
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;

    loadchat(user.email);
    // ...
  } else {
    alert("Bạn chưa đăng nhập");
    open("./signin/index.html", "_self");
  }
});

let signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

let loadchat = async (email) => {
  let result = await firebase
    .firestore()
    .collection("chat")
    .where("users", "array-contains", email)
    .get();

  let data = getDataFromDocs(result.docs);
  console.log(data);
  renderUserList(data)
  renderChat(data[0], email);
};

let getDataFromDoc = (doc) => {
  let data = doc.data();
  data.id = doc.id;
  return data;
};

let getDataFromDocs = (docs) => {
  let result = [];
  for (let doc of docs) {
    let data = getDataFromDoc(doc);
    result.push(data);
  }
  return result;
};

let renderChat = (data, ownerEmail) => {
  let chat = data.chat;
  let dom = document.querySelector(".chat");
  document.querySelector("#currentUserImg").src = data.avatar;
  document.querySelector("#currentUserName").innerHTML = data.name;
  dom.innerHTML = "";

  for (let i = 0; i < chat.length; i++) {
    let html = `<div class="mess  ${
      chat[i].email == ownerEmail ? "owner" : ""
    }">
    <div class="mess-avatar">
      <img src="${chat[i].img}" alt="" />
    </div>
    <div class="mess-content">
      <p>${chat[i].email}</p>
      <p>
       ${chat[i].content}
      </p>
      <p>${chat[i].time}</p>
    </div>
  </div>`;
    dom.innerHTML += html;
  }
};

let renderUserList = (data) => {
  let dom = document.querySelector(".card-body");
  dom.innerHTML = ""

  for (let i = 0; i < data.length; i++) {
    let html = `<div class="item d-flex align-items-center">
    <div class="image">
      <img
        src="${data[i].avatar}"
        alt="..."
        class="img-fluid rounded-circle"
      />
    </div>
    <div class="text">
      <a href="#"> <h3 class="h5">${data[i].name}</h3></a
      ><small>Time ${data[i].timeStart}</small>
    </div>
  </div>`;

    dom.innerHTML += html;
  }
};

// let loadConversation1 = async (email)=>{
//     var currentEmail = email.trim()
//     document.querySelector("#currentEmail").innerHTML = currentEmail
//     let result = await firebase.firestore()
//     .collection('chat')
//     .where('users','array-contains',currentEmail)
//     .get()

//     let Conversations = getDataFromDocs(result.docs)
//     console.log(Conversations)
//     renderChat(Conversations[0], currentEmail)
//     rederListFriends(Conversations, currentEmail)
// }
