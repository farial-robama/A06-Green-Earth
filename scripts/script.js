const loadTreeCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayCategories(json.categories))
    .catch((err) => console.error("Error loading categories:", err));
};


const loadAllPlants = () => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);

      const plantsArray = json.plants || json.data?.plants || [];
      displayPlants(plantsArray);
    })
    .catch((err) => console.error("Error loading category:", err));
};


const loadPlantsByCategory = (categoryId) => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((res) => res.json())
    .then((json) => {
      const plantsArray = Array.isArray(json.plants)
        ? json.plants
        : [json.plants];
      displayPlants(plantsArray);
    })
    .catch((err) => console.error("Error loading category:", err));
};


const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("plantsContainer").classList.add("hidden");
    document.getElementById("cartContainer").classList.add("hidden");
  } else {
    document.getElementById("plantsContainer").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("cartContainer").classList.remove("hidden");
  }
};


const displayCategories = (categories) => {
  const treeCategories = document.getElementById("treeCategories");
  treeCategories.innerHTML = "";

  const allBtnDiv = document.createElement("div");
  allBtnDiv.innerHTML = `
        <button id="plants-btn-all" class="md:text-left w-full">All Trees</button>
        `;
  treeCategories.appendChild(allBtnDiv);

  const allButton = allBtnDiv.querySelector("button");

  allButton.addEventListener("click", () => {
    document.querySelectorAll("#treeCategories button").forEach((b) => {
      b.classList.remove("btn-active-category");
    });
    allButton.classList.add("btn-active-category");

    loadAllPlants();
  });

  for (const category of categories) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button id="plants-btn-${category.id}" class="md:text-left w-full">${category.category_name}</button>
        `;
    treeCategories.appendChild(btnDiv);

    const button = btnDiv.querySelector("button");

    button.addEventListener("click", () => {
      document.querySelectorAll("#treeCategories button").forEach((b) => {
        b.classList.remove("btn-active-category");
      });
      button.classList.add("btn-active-category");

      loadPlantsByCategory(category.id);
    });
  }
  loadAllPlants();
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
                <h2 class="card-title font-semibold text-base cursor-pointer">${plant.name}</h2>
                <p class="text-xs font-light line-clamp-5">
                  ${plant.description}
                </p>
                <div class="card-actions justify-between">
                  <div class="badge badge-outline bg-[#DCFCE7] text-[#15803D] border-none">
                    ${plant.category}
                  </div>
                  <div class="price font-semibold">৳${plant.price}</div>
                </div>
                <button class="btn btn-primary bg-[#15803D] text-[#FFFFFF] border-none">
                  Add to Cart
                </button>
              </div>
            </div>
        `;
    plantsContainer.appendChild(card);

    const treeName = card.querySelector("h2.card-title");
    treeName.addEventListener("click", () => openModal(plant));

    const addToCardBtn = card.querySelector("button.btn-primary");
    addToCardBtn.addEventListener("click", () => addToCart(plant));
  }
  manageSpinner(false);
};


const openModal = (plant) => {
  const modal = document.getElementById("treeModal");
  const content = document.getElementById("modalContent");

  content.innerHTML = `
  <div class="card-body flex flex-col justify-between flex-1 p-0">
                <h2 class="card-title font-bold text-base ">${plant.name}</h2>
                <p class="text-xs font-light">
                  ${plant.description}
                </p>
    <figure class="px-2 pt-2 overflow-hidden ">
                <img class="rounded-md object-cover w-full max-h-[60vh] "
                  src="${plant.image}"
                  alt="${plant.name}"
                />
              </figure>
              
                <div class="card-actions justify-between">
                  <div class="badge badge-outline bg-[#DCFCE7] text-[#15803D] border-none">
                    ${plant.category}
                  </div>
                  <div class="price font-semibold">৳${plant.price}</div>
                </div>       
              </div>
              `;
  modal.showModal();
};

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("treeModal").close();
});


let cartData = [];

// add plant to cart
function addToCart(plant) {
  let existingItem = cartData.find((item) => item.name === plant.name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartData.push({
      name: plant.name,
      price: plant.price,
      quantity: 1,
    });
  }

  renderCart();
}

// render cart items
function renderCart() {
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = "";

  if (cartData.length === 0) {
    cartList.innerHTML =`<div class="flex flex-row justify-between border-t border-[#EDEDED] mt-2 pt-1 text-[#1F2937]">
                <p class="font-semibold text-base">Total:</p>
                <p class="font-semibold text-base">৳0</p>
              </div>`;
              return;
  }

  let total = 0;

  cartData.forEach((item, index) => {
    total += item.price * item.quantity;
    const div = document.createElement("div");

    div.innerHTML = `
    <div class=" card flex flex-row gap-5 justify-between bg-[#F0FDF4] p-3 rounded-md">   
        <div class="flex flex-col gap-4">
          <p class="font-semibold text-[#1F2937]">${item.name}</p>
          <p class="text-[#8C8C8C] font-light">৳${item.price} x ${item.quantity} </p>
        </div>
        <button class="removeBtn" data-index="${index}"><svg class="text-[#8C8C8C]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"/></svg></button>
        </div>`;
    cartList.appendChild(div);
  });
  // show total
  const totalDiv = document.createElement("div");
  totalDiv.id = "cartTotal";
  totalDiv.innerHTML = `<div class="flex flex-row justify-between border-t border-[#EDEDED] mt-2 pt-1 text-[#1F2937]">
                <p class="font-semibold text-base">Total:</p>
                <p class="font-semibold text-base">৳${total}</p>
              </div>`;
  
  cartList.appendChild(totalDiv);

  // remove individual item
  document.querySelectorAll(".removeBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const i = btn.getAttribute("data-index");
      cartData.splice(i, 1);
      renderCart();
    });
  });
}

loadTreeCategories();
renderCart();
