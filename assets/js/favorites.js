var gifs = JSON.parse(localStorage.getItem("favGifs")) || [];

function renderGifs() {
  document.getElementById("gifDisp").innerHTML = "";

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
                class="btn btn-danger gifRemove"
                data-index="${i}">
                Remove
              </button>
            </div>
           </div>
          `;
    document.getElementById("gifDisp").append(gifElem);
  }
}

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
  if (event.target.classList.contains("gifRemove")) {
    var index = event.target.dataset.index
    gifs.splice(index, 1)
    localStorage.setItem("favGifs", JSON.stringify(gifs));
    renderGifs();
  }
});

renderGifs();
