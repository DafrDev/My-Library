const formAddBook = document.querySelector("#formAddBook");
const cardBookParent = document.querySelector("#card-book-parent");

const arrOfBooks = [];

formAddBook.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(formAddBook);
  const newBookObj = Object.fromEntries(data);

  arrOfBooks.push(newBookObj);
  saveArrLocalStorage(arrOfBooks);
  createBook(newBookObj);
});

function createBook(book) {
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

function saveArrLocalStorage(arrOfBooks) {
  localStorage.setItem("arrOfBooks", JSON.stringify(arrOfBooks));
}

function getArrLocalStorage() {
  const storageBooksArr = JSON.parse(localStorage.getItem("arrOfBooks"));

  if (storageBooksArr) {
    storageBooksArr.forEach(book => {
      arrOfBooks.push(book);
      createBook(book);
    });
  } else {
    const h2 = document.createElement("h2");
    cardBookParent.appendChild(h2).classList.add("noBooks");

    h2.innerHTML = "<h2>No Books Added</h2>";
  }
}

getArrLocalStorage();
