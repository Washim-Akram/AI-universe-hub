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
                <div class="card h-100 p-4">
                    <img src="${data.image}" class="card-img-top" alt="${data.name}">

                    <div class="card-body">
                        <h4 class="card-title">Features</h4>
                        <p class="card-text mb-1 text-secondary-emphasis
                        ">1. ${data.features[0]}</p>
                        <p class="card-text mb-1 text-secondary-emphasis">2. ${data.features[1]}</p>
                        <p class="card-text mb-2 text-secondary-emphasis">3. ${data.features[2]}</p>
                    </div>

                    <div class="card-footer d-flex align-items-center justify-content-between bg-white pt-4">
                        <div>
                            <h4 class="card-title">${data.name}</h4>
                            <small class="text-muted fs-5 fw-medium me-2"><i class="far fa-calendar-alt"></i></small>
                            <small class="text-muted fs-5 fw-medium">${data.published_in}</small>
                        </div>
                        <button
                            type="button"
                            class="arrow-right"
                            >
                            <i class="fas fa-arrow-right"></i>
                        </button>

                    </div>

                </div>
            `;
            cardContainer.appendChild(div);
    })
}

loadData();