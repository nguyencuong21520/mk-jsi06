let getData = async () => {
  let drawData = await fetch("https://vnexpress.net/microservice/home");
  let data1 = await drawData.json();
  let data = data1.data;

  let news = data["1001002"].data;
  console.log(news);
  renderData(news)
};

let renderData = (data) => {
  let htmlDom = document.querySelector(".container");

  for (let i = 0; i < data.length; i++) {
    let html = `
    <div class="card">
    <h1>${data[i].title}</h1>
    <img src="${data[i].thumbnail_url}" alt="">
    <p>${data[i].lead}</p>
    <a href="${data[i].share_url}">more</a>
</div>
        `;
    htmlDom.innerHTML += html;
  }
};
getData();
