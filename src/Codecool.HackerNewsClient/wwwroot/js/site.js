async function init() {
    let main = document.querySelector("main");

    let tnbtn = document.querySelector("#top");
    let nnbtn = document.querySelector("#newest");
    let jbbtn = document.querySelector("#jobs");

    tnbtn.addEventListener("click", async () => {
        document.title = "Top News";
        let link = "/API/Top";
        let id = 1;
        pagination(main, link, id);
    });

    nnbtn.addEventListener("click", async () => {
        document.title = "Newest Articles";
        let link = "/API/Newest";
        let id = 1;
        pagination(main, link, id);
    });

    jbbtn.addEventListener("click", async () => {
        document.title = "Best Jobs";
        let link = "/API/Jobs";
        let id = 1;
        pagination(main, link, id);
    });
}

async function pagination(result, link, id) {
    let response = await getData(link, id);
    loadData(response, result, link, id);
}

async function getData(link, id) {
    let response = await fetch(`${link}/${id}`);
    return await response.json();
}

function loadData(response, result, link, id) {
    result.innerHTML = "";
    
    result.insertAdjacentHTML("beforeend", '<div class="jumbotron"><div id="main" class="row"></div></div>');

    document.querySelector(".jumbotron").insertAdjacentHTML("afterbegin",
        `<h1>${document.title}</h1>
        <div>
        <a href="#" id="prev">Previous</a> |
        <a href="#" id="next">Next</a>
    </div>`);

    for (let news of response) {
        let user = news.user != null ? news.user : "No Author";
        let author = document.title != "Best Jobs" ? `Author: <em>${user}</em>` : "";

        let content = `<div class="col-md-4">
            <a href=${news.url} target="_blank"><h2>${news.title}</h2></a>
            ${author}
            <p>${news.time_ago}</p>
            </div>`;

        document.querySelector("#main").insertAdjacentHTML("beforeend", content);
    }

    let nextbtn = document.querySelector("#next");
    let prevbtn = document.querySelector("#prev");

    nextbtn.addEventListener("click", async () => {
        id = id < 10 && document.title != "Best Jobs" ? id + 1 : id;
        pagination(result, link, id);
    });

    prevbtn.addEventListener("click", async () => {
        id = id > 1 && document.title != "Best Jobs" ? id - 1 : id;
        pagination(result, link, id);
    });
}

init();