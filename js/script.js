const searchBtn = document.getElementById("searchBtn");
const filmes = document.getElementById("filmes");

document.addEventListener(
  "keypress",
  function (e) {
    if (e.key === 13 || e.key === "Enter") {
      getFilmes();
    }
  },
  false
);

searchBtn.addEventListener("click", getFilmes);

async function getFilmes() {
  let inputTxt = document.getElementById("searchTxt").value.trim();
  let API = await fetch(
    `https://www.omdbapi.com/?s=${inputTxt}&apikey=330a0772`
  );
  let data = await API.json();

  const filmesList = data.Search;
  let html = "";

  if (filmesList == undefined || filmesList == null) {
    html += `
      <div class="w-full text-center font-bold text-lg">
            Movie not found !
        </div>
      `;
    filmes.innerHTML = html;
  } else {
    filmesList.forEach(async (filme) => {
      let response = await fetch(
        `https://www.omdbapi.com/?i=${filme.imdbID}&apikey=330a0772`
      );
      let data = await response.json();
      let filmeData = data.imdbID;
      html += `
            <div id=${filmeData} class="w-full h-full flex flex-wrap items-center justify-between gap-4 rounded-md overflow-hidden shadow-lg border-t-2 p-1 border-black m-2">
                    <div class="h-full flex items-center justify-center lg:w-[18rem] md:w-[20rem] w-full">
                        <img src="${data.Poster}" alt="Photo of the ${data.Type} ${data.Title}" class="rounded-md w-full" />
                    </div>
                    <div class = "h-[25rem] lg:w-[40rem] md:w-[30rem] p-1 flex flex-col items-center justify-around gap-3">
                        <div class="w-full flex justify-between items-center">
                            <h3 class="text-2xl font-medium lg:w-[27rem] w-full">${data.Title}</h3>
                            <span class="font-medium text-center gap-2 flex items-center justify-center"><svg class ="w-5" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 
                            5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 
                            3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 
                            2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 
                            0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z" fill-rule="nonzero"/></svg>${data.imdbRating}</span>
                        </div>
                        
                        <div class="w-full  flex items-center gap-1 justify-between flex-wrap">
                            <span>${data.Runtime}</span>
                            <span>${data.Genre}</span>
                            <span>Score: ${data.Metascore}</span>
                            <p class="mt-10 text-gray-500 w-full">${data.Plot}</p>  
                        </div>            
                        <div class="w-full flex flex-col items-start justify-center gap-2">
                            <p class="text-gray-500">Launch : ${data.Released}</p>
                        </div>
                    </div>
            </div> 
        `;
      filmes.innerHTML = html;
    });
  }
}
