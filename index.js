let search = document.getElementById('searchInput');
let searchResults = document.getElementById('searchResults');
let spinner = document.getElementById('spinner');

function createResult(result) {
    let {
        link,
        title,
        description
    } = result;
    let divContiner = document.createElement('div');
    divContiner.classList.add("result-item");

    let resultHeading = document.createElement('a');
    resultHeading.href = link;
    resultHeading.target = '_blank';
    resultHeading.textContent = title;
    resultHeading.classList.add('result-title');
    divContiner.appendChild(resultHeading);
    let lineBreak = document.createElement('br');
    divContiner.appendChild(lineBreak);

    let resultUrl = document.createElement('a');
    resultUrl.classList.add('result-url');
    resultUrl.href = link;
    resultUrl.target = '_blank';
    resultUrl.textContent = link;
    divContiner.appendChild(resultUrl);

    let linkBr1 = document.createElement('br');
    divContiner.appendChild(linkBr1);


    let resultDesc = document.createElement('p');
    resultDesc.classList.add('link-description');
    resultDesc.textContent = description;
    divContiner.appendChild(resultDesc);

    searchResults.appendChild(divContiner);
}

function display(searchOutput) {
    spinner.classList.add("d-none");
    for (let result of searchOutput) {
        createResult(result);
    }
}

function searchWiki(event) {
    if (event.key === 'Enter') {
        spinner.classList.remove('d-none');
        searchResults.textContent = "";

        let userInput = search.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + userInput;
        let option = {
            method: "Get"
        };
        fetch(url, option)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                console.log(jsonData);
                display(search_results);
            })

    }
}

search.addEventListener('keydown', searchWiki);