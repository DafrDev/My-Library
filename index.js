const formAddBook = document.querySelector("#formAddBook");
const cardBookParent = document.querySelector("#card-book-parent");
const formHeader = document.querySelector("#formHeader");

let arrOfBooks = [];
let unRead = false;
let id = 0;
let targetId = 0;
formAddBook.addEventListener("submit", e => {
  e.preventDefault();

  const data = new FormData(formAddBook);
  const newBookObj = Object.fromEntries(data);
  console.log(newBookObj);
  newBookObj.id = `book${id++}`;

  console.log(newBookObj.id);
  if (newBookObj.read === "on") {
    newBookObj.read = true;
  } else {
    newBookObj.read = false;
  }

  checkIfBookAlreadyExists(newBookObj);
});

formHeader.addEventListener("click", e => {
  const selectedValue = e.target.value;
  const isReadChecked = e.target.checked;
  orderBy(selectedValue, isReadChecked);
});

document.addEventListener("click", e => {
  selectItemByClassList(e);
});

function createBook(book) {
  arrOfBooks.push(book);
  saveArrToLocalStorage(arrOfBooks);

  const li = document.createElement("li");
  cardBookParent.appendChild(li).classList.add("book-card");
  let changeStyleContainer;
  let changeStyleIcon;

  if (!book.read) {
    changeStyleContainer = "checked-container";
    changeStyleIcon = "checked-icon";
  } else {
    changeStyleContainer = "checked-container-read";
    changeStyleIcon = "checked-icon-read";
  }

  li.innerHTML = `
    <a href='#'>
      <img class="${book.id} delete" src="./icons/delete.svg" alt='icon delete' />
      <p>${book.name}</p>
      <p>${book.author}</p> 
      <p>${book.pages} pages</p>
    </a>
    <div class='${changeStyleContainer}' >
      <img class="${book.id} ${changeStyleIcon} "  src="./icons/check.svg" alt="read icon"/>
    </div>
  `;
}

function saveArrToLocalStorage(arrOfBooks) {
  localStorage.setItem("arrOfBooks", JSON.stringify(arrOfBooks));
}

function getArrFromLocalStorage() {
  const storageBooksArr = JSON.parse(localStorage.getItem("arrOfBooks"));

  if (storageBooksArr.length > 0) {
    storageBooksArr.forEach(book => {
      checkIfBookAlreadyExists(book);
    });
  }
}

function checkIfBookAlreadyExists(book) {
  let checkName = false;
  let checkAuthor = false;

  if (arrOfBooks.length > 0) {
    for (let i = 0; i < arrOfBooks.length; i++) {
      checkName = arrOfBooks[i].name === book.name;
      checkAuthor = arrOfBooks[i].author === book.author;
      if (checkName && checkAuthor) {
        console.log(
          "This Book of the same Author already exists in the Library !"
        );
        break;
      }
    }

    if (
      (checkName && !checkAuthor) ||
      (!checkName && checkAuthor) ||
      (!checkName && !checkAuthor)
    ) {
      createBook(book);
    }
  } else {
    createBook(book);
  }
}

function orderBy(selectedValue, isReadChecked) {
  if (selectedValue === "A-Z") {
    arrOfBooks.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedValue === "Author") {
    arrOfBooks.sort((a, b) => a.author.localeCompare(b.author));
  } else if (selectedValue === "Pages") {
    arrOfBooks.sort((a, b) => a.pages - b.pages);
  } else if (isReadChecked) {
    arrOfBooks.sort((a, b) => b.read - a.read);
  } else {
    arrOfBooks.sort((a, b) => a.read - b.read);
  }

  resetAndClear();
}

function clearParentCardList() {
  cardBookParent.innerHTML = "";
}

function selectItemByClassList(e) {
  firstClassName = e.target.classList[0];
  secondClassName = e.target.classList[1];

  changeReadBool(firstClassName, secondClassName);
  deleteObj(firstClassName, secondClassName);

  resetAndClear();
}

function changeReadBool(firstClassName, secondClassName) {
  for (let i = 0; i < arrOfBooks.length; i++) {
    if (arrOfBooks[i].id === firstClassName) {
      if (
        secondClassName === "checked-icon" ||
        secondClassName === "checked-icon-read"
      ) {
        if (arrOfBooks[i].read) {
          arrOfBooks[i].read = false;
        } else {
          arrOfBooks[i].read = true;
        }
      }
    }
  }
}

function deleteObj(firstClassName, secondClassName) {
  for (let i = 0; i < arrOfBooks.length; i++) {
    if (arrOfBooks[i].id === firstClassName && secondClassName === "delete") {
      const indexToDelete = arrOfBooks
        .map(obj => obj.id)
        .indexOf(arrOfBooks[i].id);

      arrOfBooks.splice(indexToDelete, 1);
    }

    resetAndClear();
  }
}

function resetAndClear() {
  saveArrToLocalStorage(arrOfBooks);
  arrOfBooks.splice(0, arrOfBooks.length);
  clearParentCardList();
  getArrFromLocalStorage();
}

getArrFromLocalStorage();
