const formAddBook = document.querySelector("#formAddBook");
const cardBookParent = document.querySelector("#card-book-parent");

const arrOfBooks = [];

formAddBook.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(formAddBook);
  const newBookObj = Object.fromEntries(data);

  checkIfBookAlreadyExists(newBookObj);
});

function createBook(book) {
  arrOfBooks.push(book);
  saveArrToLocalStorage(arrOfBooks);

  const li = document.createElement("li");
  cardBookParent.appendChild(li).classList.add("book-card");

  li.innerHTML = `
    <a href='#'>
      <p>${book.name}</p>
      <p>${book.author}</p> 
      <p>${book.pages}</p>
      <p>${book.read}</p>
    </a>
  `;
}

function saveArrToLocalStorage(arrOfBooks) {
  localStorage.setItem("arrOfBooks", JSON.stringify(arrOfBooks));
}

function getArrFromLocalStorage() {
  const storageBooksArr = JSON.parse(localStorage.getItem("arrOfBooks"));

  if (storageBooksArr) {
    console.log("local storage have objects");

    storageBooksArr.forEach(book => {
      checkIfBookAlreadyExists(book);
    });
  } else {
    console.log("local storage is empty");
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

    if ((checkName && !checkAuthor) || (!checkName && checkAuthor)) {
      createBook(book);
    }
  } else {
    createBook(book);
  }
}

getArrFromLocalStorage();
