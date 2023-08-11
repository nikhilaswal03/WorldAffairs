let currentQuery = "sports"
let currentPage = 1;
const fetchNews = async (page, q) => {
    console.log(`fetching news for ${q}, Page number ${page}...`);
    var url = 'https://newsapi.org/v2/everything?' +
        'q=' + q +
        '&from=2023-08-10&' +
        'pageSize=21&' +
        'Language=en&' +
        'page=' + page +
        '&sortBy=popularity&' +
        'apiKey=5bf713b588c248ec81183dfe1615caa7';

    var req = new Request(url);

    let a = await fetch(req)
    let response = await a.json()

    let str = ""
    resultCount.innerHTML = response.totalResults
    for (let item of response.articles) {
        str = str + `<div class="card my-4 mx-2" style="width: 18rem;">
                <img src="${item.urlToImage}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.title.slice(0, 50)}</h5>
                    <p class="card-text">${item.description.slice(0, 75)}</p>
                    <a href="${item.url}" target="_blank" class="btn btn-primary">Read more</a>
                </div>
            </div>`
    }
    document.querySelector(".content").innerHTML = str
}
fetchNews(1, currentQuery)
search.addEventListener("click", (e) => {
    e.preventDefault()
    let query = searchInput.value;
    currentQuery = query
    fetchNews(1, query)
})
previous.addEventListener("click", (e) => {
    e.preventDefault()
    if (currentPage > 1) {
        currentPage = currentPage - 1
        fetchNews(currentPage, currentQuery)
    }
})
next.addEventListener("click", (e) => {
    e.preventDefault()
    currentPage = currentPage + 1
    let query = searchInput.value;
    fetchNews(currentPage, currentQuery)
})