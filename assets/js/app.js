function getRandNum() {
  return Math.floor(Math.random() * 200);
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
        var gifs = data.data; // gifs[].images.original.url

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
              <a href="#" class="btn btn-primary">Favorite</a>
            </div>
           </div>
          `;
          document.getElementById("gifDisp").append(gifElem);
        }
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
