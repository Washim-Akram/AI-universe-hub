const loadData = () => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    fetch(url)
    .then(res => res.json())
    .then(data => showData(data.data.tools))
}

const showData = (arrOfData) => {
    console.log(arrOfData);
    const cardContainer = document.getElementById("card-container");

    arrOfData.slice(0, 6).forEach(data => {
        console.log(data);
        const div = document.createElement("div");
        div.classList.add("col");
            div.innerHTML = `
                <div class="card h-100">
                    <img src="${data.image}" class="card-img-top" alt="${data.name}">

                    <div class="card-body">
                        <h5 class="card-title">Features</h5>
                        <p class="card-text">1.${data.features[0]}</p>
                        <p class="card-text">1.${data.features[1]}</p>
                        <p class="card-text">1.${data.features[2]}</p>
                    </div>

                    <div class="card-footer">
                        <h5 class="card-title">${data.name}</h5>
                        <small
                         class="text-muted">
                         ${data.published_in}
                         </small>
                    </div>

                </div>
            `;
            cardContainer.appendChild(div);
    })
}

loadData();