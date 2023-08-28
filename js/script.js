const fetchData = async (searchText,isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones,isShowAll);
};

const displayPhones = (phones,isShowAll) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerText = "";
  const showAllContainer = document.getElementById("show-container");
  if (phones.length > 9 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  console.log('is show all ',isShowAll);
  // display only 9 phones if not show all
  if(!isShowAll){
  phones = phones.slice(0, 9);

  }

  phones.forEach((phone) => {
    // console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card bg-base-100 shadow-xl mt-10";
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
  </div>
    `;
    phonesContainer.appendChild(phoneCard);
  });
  toggleLoading(false);
};

function handleSearch(isShowAll) {
  toggleLoading(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  fetchData(searchText,isShowAll);
}

// loader handler
const toggleLoading = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

const showAllBtn = () =>{
  handleSearch(true)
}

// fetchData()
