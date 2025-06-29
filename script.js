let page = 1;
let maxPage = 100;
let query = '';
const accessKey = 'h_H54M4XDWK7J5e7dXgVZDnYDARlDBDA-v3U_RcbTxU';

function nextPage() {
    if (page < maxPage) {
       page++;
       console.log(page);
       loadImages(query, page);
    };
};

function previousPage() {
    if (page > 1) {
        page--;
        loadImages(query, page);
    };
};

function loadBlank() {
    const container = document.querySelector('.images-container');

    container.innerHTML = '';

    let id = 0;
    for (let i = 0; i < 12; i++) {
        if (i === 5 || i === 6) {
            container.append(document.createElement('img'));
            continue;
        };
        const image = new Image();
        image.src = 'assets/loader.png';
        image.alt = 'loader';
        image.className = 'image';
        image.id = `image-${id}`
        image.style.aspectRatio = `${image.naturalWidth}/${image.naturalHeight}`;
        image.style.width = '90%';
        container.append(image);
        id++;
    };
};

async function loadImages(query, page=0) {
    const container = document.querySelector('.images-container');
    const images = await fetchData(query, page);

    loadBlank();

    let i = 0;
    for (let image of images.results) {
        const url = image.urls.small;
        const el = createImage(url, image.slug, i);
        i++;
    };
};

function createImage(url, alt, id) {
    const image = new Image();
    image.src = 'assets/loader.png';
    image.alt = alt;
    image.className = 'image';

    image.onload = (event) => {
        document.querySelector(`#image-${id}`).src = url;
    };

    return image;
};

async function fetchData(query='', page=0) {
    const baseUrl = 'https://api.unsplash.com/search/photos/?';
    const params = new URLSearchParams();
    
    params.append('client_id', accessKey);
    params.append('query', query);
    params.append('page', page);

    const request = await fetch(baseUrl.concat(params.toString()));
    return request.json();
};

// loadImages('cats');
loadBlank();

document.querySelector('.button-left').addEventListener('click', previousPage);
document.querySelector('.button-right').addEventListener('click', nextPage);

document.querySelector('.searchbar').addEventListener('keypress', async (event) => {
   if (event.key === 'Enter') {
        query = event.target.value
        const response = await loadImages(query);
   };
});

// setInterval(() => {console.log(page)}, 500)

// (async () => console.log(await fetchData()))();


console.log(document.getElementById('test'));
console.log(document.querySelectorAll('#test'));