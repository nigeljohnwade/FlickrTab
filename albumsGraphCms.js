var query = JSON.stringify({
    "query": "query {allArtists {id name records{id albumtitle releaseDate cover{url}} pictures{url}}}"
});
const rootElement = document.querySelector('.albums');
var xhr = new XMLHttpRequest();
xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        let data = JSON.parse(this.responseText);
        //{"data":{"allArtists":[{"id":"cj6eww4l09a7s0185r16dmaqc","name":"Rush","records":[{"id":"cj6ey177ys8fn01752rsl8nes","albumtitle":"Rush"}]}]}}
        const artists = data.data.allArtists;
        artists.map(function(element, index, array){
            let h1 = `<h1>${element.name}</h1>`;
            rootElement.innerHTML += h1;
            element.records.map(function(element, index, array){
                let d = `<div><h2>${element.albumtitle}</h2><p>${element.releaseDate}</p><img src="${element.cover[0].url}"</div>`;
                rootElement.innerHTML += d;
            });
        });
    }
});
xhr.open("POST", "https://api.graphcms.com/simple/v1/cj5tetbih8my30160q67di8va");
xhr.setRequestHeader("content-type", "application/json");
xhr.send(query);