
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
      console.log(json);
      
        const plantsArray = json.plants || json.data?.plants || [];
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
                <h2 class="card-title font-bold text-base cursor-pointer">${plant.name}</h2>
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

        const treeName = card.querySelector("h2.card-title");
treeName.addEventListener("click",() => openModal(plant));

const addToCardBtn = card.querySelector("button.btn-primary")
addToCardBtn.addEventListener("click",() => addToCart(plant));


    };
};



const openModal = (plant) => {
    const modal = document.getElementById("treeModal")
    const content = document.getElementById("modalContent")

    content.innerHTML = `
    <figure class="px-2 pt-2 overflow-hidden ">
                <img class="rounded-md object-contain w-full max-h-[60vh] "
                  src="${plant.image}"
                  alt="${plant.name}"
                />
              </figure>
              <div class="card-body flex flex-col justify-between flex-1 p-0">
                <h2 class="card-title font-bold text-base ">${plant.name}</h2>
                <p class="text-xs font-light">
                  ${plant.description}
                </p>
                <div class="card-actions justify-between">
                  <div class="badge badge-outline bg-[#DCFCE7] text-[#15803D] border-none">
                    ${plant.category}
                  </div>
                  <div class="price">৳${plant.price}</div>
                </div>       
              </div>
              `;
              modal.showModal();

};

document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("treeModal").close();
   

})

let cartData = [];

  // add plant to cart
  function addToCart(plant) {
    let existingItem = cartData.find(item => item.name === plant.name);
    if (existingItem) {
      existingItem.quantity++;
    }else{
      cartData.push({
      name: plant.name,
      price: plant.price,
      quantity: 1
    })

    }
    
  renderCart();
  }

// render cart items
function renderCart() {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = "";

   let total = 0

   cartData.forEach((item, index) => {
    total += item.price * item.quantity;
    const div =  document.createElement("div");
    


    div.innerHTML = `
    <div class=" card flex flex-row gap-5 justify-between bg-[#F0FDF4] p-3 rounded-md">   
        <div class="flex flex-col">
          <p class="font-semibold text-[#1F2937]">${item.name}</p>
          <p class="text-[#8C8C8C] font-light">৳${item.price} x ${item.quantity} </p>
        </div>
        <button class="removeBtn" data-index="${index}"><i class="fa-solid fa-xmark text-[#8C8C8C] font-thin"></i></button>
        </div>`;
    cartList.appendChild(div)
   });

   //  show total
  let totalDiv = document.getElementById("cartTotal");
  if (!totalDiv) {
    totalDiv = document.createElement("div");
    totalDiv.id = "cartTotal";
    // totalDiv.className = "flex flex-row justify-between border-t-[#1F2937] border-t-1 text-[#1F2937]"
    cartList.parentElement.appendChild(totalDiv);
  }
  totalDiv.innerHTML = `
  <div class="flex flex-row justify-between  border-t border-[#EDEDED] mt-2 pt-1 text-[#1F2937]">
              <p class="font-semibold text-base">Total:</p>
              <p class="font-semibold text-base">৳${total}</p>
            </div>`;

  // remove individual item
  document.querySelectorAll(".removeBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = btn.getAttribute("data-index");
      cartData.splice(i , 1);
      renderCart();

  
    })
  });
  }


  
  


loadTreeCategories()