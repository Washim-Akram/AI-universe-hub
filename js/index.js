const loadData = async(dataLimit) => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    showData(data.data.tools, dataLimit);
}

const showData = (arrOfData, dataLimit) => {
    // console.log(arrOfData);
    const cardContainer = document.getElementById("card-container");
    cardContainer.textContent = ""; // Clear the previous data.

    const seeMore = document.getElementById("see-more");
    if(dataLimit && arrOfData.length > 6) {
        arrOfData = arrOfData.slice(0, 6); // Display only 6 data.
        seeMore.classList.remove("d-none");
    } else{
        seeMore.classList.add("d-none");
    }

    arrOfData.forEach(data => {
        // console.log(data);
        const div = document.createElement("div");
        div.classList.add("col");
            div.innerHTML = `
                <div class="card h-100 p-4">
                    <img src="${data.image}" class="card-img-top" alt="${data.name}">

                    <div class="card-body">
                        <h4 class="card-title">Features</h4>
                        <ol id="${data.id}">
                            ${data.features.map(feature => `<li>${feature}</li>`).join("")}
                        </ol>
                    </div>

                    <div class="card-footer d-flex align-items-center justify-content-between bg-white pt-4">
                        <div>
                            <h4 class="card-title">${data.name}</h4>
                            <small class="text-muted fs-5 fw-medium me-2"><i class="far fa-calendar-alt"></i></small>
                            <small class="text-muted fs-5 fw-medium">${data.published_in}</small>
                        </div>
                        <button
                            onclick="loadDetails('${data.id}')"
                            type="button"
                            class="arrow-right"
                            data-bs-toggle="modal"
                            data-bs-target="#dataDetailsModal"
                            >
                            <i class="fas fa-arrow-right"></i>
                        </button>

                    </div>

                </div>
            `;
            cardContainer.appendChild(div);
    })
    toggleSpinner(false); // Stop Spinner
}

const toggleSpinner = (isLoading) => {
    const loader = document.getElementById("loader");
    if(isLoading) {
        loader.classList.remove("d-none");
    } else{
        loader.classList.add("d-none");
    }
}

const processSeeMore = () => {
    toggleSpinner(true); // Start Spinner
    loadData();
}

document.getElementById("btn-see-more").addEventListener("click", function(){
    processSeeMore();
});

const loadDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showDetails(data.data);
}

const showDetails = (data) => {
    console.log(data);
    const modalBody = document.getElementById("modal-body");
    modalBody.classList.add("p-5");
    modalBody.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-5">
        <div class="modal-left-div">
            <h5 class="mb-4">${data.description}</h5>
           <div class="d-flex flex-column flex-md-row align-items-center justify-content-around row-gap-3">
                <div class="modal-pricing-div text-success fw-bold">
                    <p class="mb-0">
                    ${data.pricing === null || data.pricing[0].price === 0 ? "Free Of Cost" : data.pricing[0].price}
                    </p>
                    <p>Basic</p>
                </div>
                <div class="modal-pricing-div text-warning fw-bold">
                    <p class="mb-0">
                    ${data.pricing === null || data.pricing[1].price === 0 ? "Free Of Cost" : data.pricing[1].price}
                    </p>
                    <p>Pro</p>
                </div>
                <div class="modal-pricing-div text-danger fw-bold">
                    <p class="mb-0">
                    ${data.pricing === null || data.pricing[2].price === 0 ? "Free Of Cost" : data.pricing[2].price}
                    </p>
                    <p>Enterprise</p>
                </div>
           </div>


           <div class="d-flex flex-column flex-md-row align-items-center justify-content-between my-4">

           <div>
                <h4 class="mb-3">Features</h4>
                <ul>
                    <li>${data.features[1].feature_name}</li>
                    <li>${data.features[2].feature_name}</li>
                    <li>${data.features[3].feature_name}</li>
                    <li>${data.features[4] ? data.features[4].feature_name : ""}</li>
                </ul>
           </div>

           <div>
                <h4 class="mb-3">Integrations</h4>

                <ul id="${data.id}">
                    ${data.integrations === null ? "No Data Found" : data.integrations.map(integration => `<li>${integration}</li>`).join("")}
                </ul>
           </div>

           </div>

        </div>


        <div>
            <div class="position-relative">
                <img src="${data.image_link[0]}" class="img-fluid" alt="" />

                <button id="b" type="button" class="btn btn-danger fw-medium rounded-3 mt-3 me-2 position-absolute top-0 end-0">
                ${data.accuracy.score === null ? 0 : data.accuracy.score * 100}% accuracy
                </button>
            </div>

            <div class="text-center mt-4">
                <h4>${data.input_output_examples === null ? "Can you give any example?" : data.input_output_examples[0].input}</h4>
                <p class="output">${data.input_output_examples === null ? "No! Not Yet! Take a break!!!": data.input_output_examples[0].output}</p>
            </div>
        </div>

    </div>
    `;
}

/* // Sort By Date
document.getElementById("btn-sort-by-date").addEventListener("click", function(){
    showData(fetchData);
    showData(fetchData[0].data.tools.sort((a, b) => a.published_in - b.published_in));
    // console.log();
    // fetchData[0].data.tools.forEach(a => console.log(a.published_in));

}) */

loadData(6);