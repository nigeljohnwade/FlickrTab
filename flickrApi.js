const flickrApiKey = 'b009296e4c384cf4b61f181620125e3d';
const flickrUserId = '19471305@N00';
const today = new Date();
const searchCallbacks = {
    done: function (data, counter) {
        data.photos.photo.forEach(function (element, index, array) {
            const photoPageUrl = `https://www.flickr.com/photos/${flickrUserId}/${element.id}`;
            const im = document.createElement('img');
            const a = document.createElement('a');
            const dw = document.createElement('div');
            a.href = photoPageUrl;
            im.src = `https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}_m.jpg`;
            im.alt = element.title;
            im.setAttribute('data-flickrid', element.id);
            im.onload = loadImageInfo(element.id);
            a.appendChild(im);
            dw.setAttribute('data-flickrid', element.id);
            dw.appendChild(a);
            document.querySelector('.flickr' + counter).appendChild(dw);
        });
    }
}
    
const infoCallbacks = {
    done: function(photoData){
        const parentDiv = document.querySelector('div[data-flickrid="' + photoData.photo.id + '"]');
        const photoPageUrl = `https://www.flickr.com/photos/${flickrUserId}/${photoData.photo.id}`;
        parentDiv.innerHTML += `<a href="${photoPageUrl}"><h3>${photoData.photo.title._content}</h3><p>Taken: ${photoData.photo.dates.taken}</p></a>`;
    }
}

function loadImageInfo(photoid){
    const flickrPhotoInfoUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${flickrApiKey}&photo_id=${photoid}&format=json&nojsoncallback=1`;
    fetch(encodeURI(flickrPhotoInfoUrl))
        .then(response => response.json())
        .then(data => infoCallbacks.done(data));
}

for(let i = 1; i < 10; i++){
    const iterator = i;
    const dateQueryFrom = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear() - i}`;
    const dateQueryTo = `${today.getMonth() + 1}/${today.getDate() + 1}/${today.getFullYear() - i}`;
    const flickrSearchUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrApiKey}&user_id=${flickrUserId}&min_taken_date=${dateQueryFrom}&max_taken_date=${dateQueryTo}&format=json&nojsoncallback=1`;
    fetch(encodeURI(flickrSearchUrl))
        .then(response => response.json())
        .then(data => searchCallbacks.done(data, iterator));
}
