var gifs = [];

function getRandNum() {
  return Math.floor(Math.random() * 200);
}

function renderGifs() {
  for (var i = 0; i < gifs.length; i++) {
    var animUrl = gifs[i].images.original.url;
    var stillUrl = gifs[i].images.original_still.url;
    var gifTitle = gifs[i].title;

    var gifElem = document.createElement("div");
    gifElem.className = "col-12 col-md-4";
    gifElem.innerHTML = `
           <div class="card">
            <img 
              src="${stillUrl}"
              data-anim="${animUrl}"
              data-still="${stillUrl}" 
              class="card-img-top gifImg" 
              alt="${gifTitle}">
            <div class="card-body">
              <h5 class="card-title">${gifTitle}</h5>
              <button 
                class="btn btn-primary gifFav"
                data-index="${i}">
                Favorite
              </button>
            </div>
           </div>
          `;
    document.getElementById("gifDisp").append(gifElem);
  }
}

document
  .getElementById("searchGIPHY")
  .addEventListener("click", function (event) {
    event.preventDefault();

    document.getElementById("gifDisp").innerHTML = "";

    var query = document.getElementById("query").value;
    var offset = getRandNum();
    var apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=DeB1RCOXzb4Ag21kPvOz42Gfsi3YWDzs&limit=18&rating=g&offset=${offset}&q=${query}`;

    fetch(apiUrl)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);
        gifs = data.data; // gifs[].images.original.url
        renderGifs();
      })
      .catch(function (err) {
        console.error(err);
      });
  });

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("gifImg")) {
    if (event.target.src === event.target.dataset.anim) {
      event.target.src = event.target.dataset.still;
    } else {
      event.target.src = event.target.dataset.anim;
    }
  }
});

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("gifFav")) {
    var index = parseInt(event.target.dataset.index);
    var favGifs = JSON.parse(localStorage.getItem("favGifs")) || [];
    favGifs.push(gifs[index]);
    localStorage.setItem("favGifs", JSON.stringify(favGifs));
    event.target.classList.remove("btn-primary");
    event.target.classList.add("btn-success");
    event.target.textContent = "Favorited!";
    event.target.disabled = true;
  }
});
