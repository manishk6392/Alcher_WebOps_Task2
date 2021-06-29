const img_url = "https://image.tmdb.org/t/p/w500";
const url = "https://api.themoviedb.org/3/search/movie?api_key=49ab39540ee2bf8f99b030931014e028&language=en-US";
const page_url = "https://www.themoviedb.org/search?query=avengers";
const api_key = "49ab39540ee2bf8f99b030931014e028";

const input_element= document.querySelector("#inputValue");
const buttonElement= document.querySelector("#search");

buttonElement.onclick = function(event){
    event.preventDefault();
    const value = input_element.value;
    
    const new_url = url+ "&query=" + value; 
    const new_page_url= page_url+ "&query=" +value;

fetch(new_url)
.then((res) => res.json())
.then((data) => {  
   let arr= document.querySelectorAll(".mov");
   let movie_title = document.getElementsByClassName("mov_title");
   let description = document.getElementsByClassName("descrip");

   //console.log(data);

for(var i=0;i<8;i++){
    //title
    let title = data.results[i].original_title;
    movie_title[i].innerHTML = title;

    //image
    let image_path = data.results[i].backdrop_path;
    if (image_path == null) {image_path = data.results[i].poster_path;} 
    let newImgUrl = img_url + image_path;
    arr[i].setAttribute("style","background: url(" + newImgUrl + ");background-size: 100% 100%; background-repeat: no-repeat;");
    //image fallback
    if (image_path == null) {
        image_path = "style/img/no_img.png";
        arr[i].setAttribute("style","background: url(" + image_path + ");background-size: 100% 100%;background-repeat: no-repeat;");
    }

    //description
    let description_txt = data.results[i].overview;
    description[i].innerHTML = description_txt.substr(0,60) + "...";
    //fallback
    if (description_txt == "") {
        description[i].innerHTML = "Sorry No Description Found :( ...";
    }
}

}).catch((error) =>{
    console.log(error);
})
console.log("search term = " + value);
}