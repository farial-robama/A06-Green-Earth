const loadTreeCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayCategories(json.categories))
    .catch((err) => console.error("Error loading categories:", err));
};

const loadAllPlants =() => {
    fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then((json) => {
        const plantsArray = Array.isArray(json.plants) ? json.plants : [json.plants];
        displayPlants(plantsArray)
    })
    .catch((err) => console.error("Error loading category:", err));
}

const loadPlantsByCategory = (categoryId) => {
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((res) => res.json())
    .then((json) => {
        const plantsArray = Array.isArray(json.plants) ? json.plants : [json.plants];
        displayPlants(plantsArray)
    })
    .catch((err) => console.error("Error loading category:", err));
}

const displayCategories = (categories) => {
    const treeCategories = document.getElementById("treeCategories");
    treeCategories.innerHTML = "";

    const allBtnDiv = document.createElement("div");
        allBtnDiv.innerHTML = `
        <button id="plants-btn-all" class="text-left w-full">All Trees</button>
        `;
        treeCategories.appendChild(allBtnDiv);

        const allButton = allBtnDiv.querySelector("button");

        allButton.addEventListener("click", () => {
            document.querySelectorAll("#treeCategories button").forEach((b) => {
                b.classList.remove("btn-active-category");
            })
            allButton.classList.add("btn-active-category");

        loadAllPlants()
        });

    for (const category of categories) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="plants-btn-${category.id}" class="text-left w-full">${category.category_name}</button>
        `;
        treeCategories.appendChild(btnDiv);

        const button = btnDiv.querySelector("button");

        button.addEventListener("click", () => {
            document.querySelectorAll("#treeCategories button").forEach((b) => {
                b.classList.remove("btn-active-category");
            })
            button.classList.add("btn-active-category");

        loadPlantsByCategory(category.id)
        });
        
    };
    loadAllPlants()
};


const displayPlants = (plants) => {
    const plantsContainer = document.getElementById("plantsContainer");
    plantsContainer.innerHTML = "";

    for (const plant of plants) {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="card bg-base-100 shadow-sm h-[400px]">
              <figure class="px-4 pt-4 overflow-hidden ">
                <img class="rounded-md object-cover h-full w-full"
                  src="${plant.image}"
                  alt="${plant.name}"
                />
              </figure>
              <div class="card-body flex flex-col justify-between flex-1">
                <h2 class="card- font-bold text-base">${plant.name}</h2>
                <p class="text-xs font-light line-clamp-5">
                  ${plant.description}
                </p>
                <div class="card-actions justify-between">
                  <div class="badge badge-outline bg-[#DCFCE7] text-[#15803D] border-none">
                    ${plant.category}
                  </div>
                  <div class="price">৳${plant.price}</div>
                </div>
                <button class="btn btn-primary bg-[#15803D] text-[#FFFFFF] border-none">
                  Add to Cart
                </button>
              </div>
            </div>
        `;
        plantsContainer.appendChild(card);
    };
};

loadTreeCategories()