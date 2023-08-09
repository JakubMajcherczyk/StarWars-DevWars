const BASE_URL = "https://swapi.dev/api/";

//globalne zmienne do strony
let page = 1;
let currentPage = 1;

// pobranie linków ze swapi
async function getLinks() {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
}
// sięgamy głębiej do API
const getData = async (category, page) => {
  const response = await fetch(`${BASE_URL}/${category}/?page=${page}`);
  const data = await response.json();

  return data;
};

//pobranie danych do przycisków i ich utworzenie
let dataObj = {};

const makeButtons = async () => {
  const buttons = document.getElementById("buttons");
  console.log("Loading categories..."); //LOGS
  const data = await getLinks();
  console.log("Data Loaded!"); //LOGS
  const buttonsName = Object.keys(data);

  buttonsName.forEach((name, index) => {
    const button = document.createElement("button");
    button.textContent = name;
    //działania po wciśnieciu buttona
    button.addEventListener("click", async () => {
      console.log(`Loading ${name} category...`); //LOGS
      const fetchedData = await getData(name, page);
      console.log("Data Loaded!"); //LOGS
      //obiekt do paginacji
      dataObj = {
        ...dataObj,
        collection: createCollection(name, fetchedData.results),
        name: name,
        currentPage: 1,
        pageCount: fetchedData.count,
        totalPages: Math.ceil(fetchedData.count / 10),
        goToValidation(value) {
          return new RegExp(`^[1-${this.totalPages}]$`).test(value);
        },
      };
      //wygenerować tablice
      generateTable(name, dataObj.collection);
      pagination.style.display = "block";
      updatePagination();
    });

    buttons.appendChild(button);
  });
};

//generowanie tablicy
const generateTable = (name, collection) => {
  const tableContainer = document.getElementById("tableContainer");
  tableContainer.innerHTML = "";

  const table = document.createElement("table");
  const headerRow = document.createElement("tr");
  // Nagłówek ID
  const idHeaderCell = document.createElement("th");
  idHeaderCell.textContent = "ID";
  headerRow.appendChild(idHeaderCell);

  // Nagłówki tabeli
  obj[name].headers.forEach((header) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = header.replace(/_/g, " ").toUpperCase();
    headerRow.appendChild(headerCell);
  });
  table.appendChild(headerRow);

  // Nagłówek dla przycisków
  const buttonsHeaderCell = document.createElement("th");
  buttonsHeaderCell.textContent = "Actions";
  headerRow.appendChild(buttonsHeaderCell);
  table.appendChild(headerRow);

  // Komórki tabeli
  collection.forEach((item, index) => {
    const row = document.createElement("tr");

    // Komórka ID
    const idCell = document.createElement("td");
    idCell.textContent = index + 1;
    row.appendChild(idCell);

    // dalsze komórki
    obj[name].headers.forEach((header) => {
      const cell = document.createElement("td");
      if (header === "created") {
        cell.textContent = formatDate(item[header]);
      } else {
        cell.textContent = item[header];
      }
      row.appendChild(cell);
    });

    // Komórka z przyciskami
    const buttonsCell = document.createElement("td");
    // Przycisk Delete
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      showDeleteConfirmation(item, collection, name);
    });
    buttonsCell.appendChild(deleteButton);
    // Przycisk Details
    const detailsButton = document.createElement("button");
    detailsButton.textContent = "Details";
    detailsButton.id = "detailsModal";
    detailsButton.addEventListener("click", () => {
      createDetailsModal(item.detailsData);
    });
    buttonsCell.appendChild(detailsButton);
    row.appendChild(buttonsCell);

    table.appendChild(row);
  });

  tableContainer.appendChild(table);
};

makeButtons();

const createCollection = (name, data) =>
  data.map((item) => obj[name].init(item));

class categoryClass {
  constructor(data, headers) {
    this.detailsData = data;
    headers.forEach((headers) => {
      this[headers] = data[headers];
    });
  }
}

const obj = {
  people: {
    headers: ["name", "gender", "birth_year", "height", "created"],
    init: function (data) {
      return new categoryClass(data, this.headers);
    },
  },
  planets: {
    headers: ["name", "climate", "population", "terrain", "created"],
    init: function (data) {
      return new categoryClass(data, this.headers);
    },
  },
  films: {
    headers: ["title", "director", "producer", "release_date", "created"],
    init: function (data) {
      return new categoryClass(data, this.headers);
    },
  },
  species: {
    headers: ["name", "classification", "average_height", "language", "created"], //prettier-ignore
    init: function (data) {
      return new categoryClass(data, this.headers);
    },
  },
  vehicles: {
    headers: ["name", "model", "length", "cargo_capacity", "created"],
    init: function (data) {
      return new categoryClass(data, this.headers);
    },
  },
  starships: {
    headers: ["name", "model", "crew", "starship_class", "created"],
    init: function (data) {
      return new categoryClass(data, this.headers);
    },
  },
};

function formatDate(created) {
  const date = new Date(created);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  return `${day}-${month}-${year}`;
}

const createDetailsModal = (details) => {
  const modal = document.getElementById("myModal");
  const btn = document.getElementById("detailsModal");
  const { ...newData } = details;
  // Otwórz modal po kliknięciu przycisku
  modal.style.display = "block";

  // Utwórz element <ul>
  const ul = document.createElement("ul");

  // Utwórz <li> dla każdej wartości
  for (const [key, value] of Object.entries(details)) {
    const li = document.createElement("li");
    if (Array.isArray(value)) {
      // li.textContent = `${key.replace(/_/g, " ").toUpperCase()}:`;
      li.innerHTML = `<strong>${key.replace(/_/g, " ").toUpperCase()}</strong>:`; //prettier-ignore
      // utwórz subListę
      const subList = document.createElement("ul");
      value.forEach((item) => {
        const itemLi = document.createElement("li");
        itemLi.textContent = item;
        subList.appendChild(itemLi);
      });
      li.appendChild(subList);
    } else {
      li.innerHTML = `<strong>${key.replace(/_/g, " ").toUpperCase()}</strong>: ${value}`; //prettier-ignore
      // li.textContent = `${key.replace(/_/g, " ").toUpperCase()}: ${value}`;
    }

    ul.appendChild(li);
  }

  // Dodaj <ul> do modala
  const modalContent = modal.querySelector(".modal-content");
  modalContent.appendChild(ul);

  // Zamknij modal po kliknięciu przycisku zamykania (x)
  const span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    modal.style.display = "none";
    modalContent.removeChild(ul);
  };

  // Zamknij modal po kliknięciu poza nim
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      modalContent.removeChild(ul);
    }
  };
};

function showDeleteConfirmation(item, collection, name) {
  const modal = document.getElementById("deleteModal");
  modal.style.display = "block";

  const yesButton = document.getElementById("confirmDeleteYes");
  const noButton = document.getElementById("confirmDeleteNo");

  // Kliknięcie YES
  yesButton.onclick = function () {
    collection.splice(collection.indexOf(item), 1);
    generateTable(name, collection);
    modal.style.display = "none";
  };

  // Kliknięcie NO
  noButton.onclick = function () {
    modal.style.display = "none";
  };
}

// ##############################################################################
const pagination = document.getElementById("pagination");
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const currentPageElement = document.getElementById("currentPage");
const toPage = document.getElementById("toPage");
const goToPageButton = document.getElementById("goToPageButton");
const goToPageInput = document.getElementById("gotoPage");

//dostępność prev i next
const isDisabled = {
  prev: () => dataObj.currentPage == 1,
  next: () => dataObj.currentPage == dataObj.totalPages,
};

// GotoPage, prec i next buttons
goToPageButton.addEventListener("click", () => {
  if (dataObj.goToValidation(Number(goToPageInput.value))) {
    console.log("goToPageInput validation success"); //LOGS
    goToPage(Number(goToPageInput.value));
  } else {
    console.log("goToPageInput validation failure"); //LOGS
  }
});

prevPageButton.addEventListener("click", () =>
  goToPage(dataObj.currentPage - 1)
);
nextPageButton.addEventListener("click", () =>
  goToPage(dataObj.currentPage + 1)
);

async function goToPage(page) {
  {
    console.log(`Loading data for ${dataObj.name} page ${page}...`);
    const data = await getData(
      dataObj.name,
      Number(page || goToPageInput.value)
    );
    console.log("Data Loaded!"); //LOGS
    dataObj.collection = createCollection(dataObj.name, data.results);
    dataObj.currentPage = page;
    generateTable(dataObj.name, dataObj.collection);
    updatePagination();
  }
}

function updatePagination() {
  goToPageInput.value = dataObj.currentPage;
  currentPageElement.textContent = dataObj.currentPage;
  toPage.textContent = dataObj.totalPages;

  prevPageButton.disabled = isDisabled.prev();
  nextPageButton.disabled = isDisabled.next();

  console.log("you are on page " + dataObj.currentPage,"of " + dataObj.totalPages); //prettier-ignore
  console.log("prev button disabled ", isDisabled.prev()); //LOGS
  console.log("next button disabled ", isDisabled.next()); //LOGS
}
// #####################################################################################
