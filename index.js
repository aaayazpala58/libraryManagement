
let books = JSON.parse(localStorage.getItem('books')) || [];

document.addEventListener('DOMContentLoaded', function () {
  displayBooks();
});

function addBook() {
  const bookName = document.getElementById('bookName').value;
  const authorName = document.getElementById('authorName').value;
  const isbn = document.getElementById('isbn').value;
  const rackNumber = document.getElementById('rackNumber').value;

  if (bookName === '' || authorName === '' || isbn === '' || rackNumber === '') {
    alert('Please fill in all fields.');
    return;
  }

  const book = { bookName, authorName, isbn, rackNumber };
  books.push(book);
  saveBooks();
  displayBooks();
  clearForm();
}

function displayBooks() {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';

  books.forEach((book, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.bookName}</td>
      <td>${book.authorName}</td>
      <td>${book.isbn}</td>
      <td>${book.rackNumber}</td>
      <td><button class="delete" data-index="${index}">Delete</button></td>
    `;

    bookList.appendChild(row);
  });

  document.querySelectorAll('.delete').forEach(button => {
    button.addEventListener('click', function () {
      const index = this.getAttribute('data-index');
      deleteBook(index);
    });
  });
}

function deleteBook(index) {
  books.splice(index, 1);
  saveBooks();
  displayBooks();
}

function clearForm() {
  document.getElementById('bookName').value = '';
  document.getElementById('authorName').value = '';
  document.getElementById('isbn').value = '';
  document.getElementById('rackNumber').value = '';
}

function searchBook() {
  const searchBookName = document.getElementById('searchBookName').value.toLowerCase();
  const searchAuthor = document.getElementById('searchAuthor').value.toLowerCase();
  const searchISBN = document.getElementById('searchISBN').value.toLowerCase();

  const filteredBooks = books.filter(book =>
    book.bookName.toLowerCase().includes(searchBookName) &&
    book.authorName.toLowerCase().includes(searchAuthor) &&
    book.isbn.toLowerCase().includes(searchISBN)
  );

  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';

  filteredBooks.forEach((book, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.bookName}</td>
      <td>${book.authorName}</td>
      <td>${book.isbn}</td>
      <td>${book.rackNumber}</td>
      <td><button class="delete" data-index="${index}">Delete</button></td>
    `;

    bookList.appendChild(row);
  });

  document.querySelectorAll('.delete').forEach(button => {
    button.addEventListener('click', function () {
      const index = this.getAttribute('data-index');
      deleteBook(index);
    });
  });
}

function saveBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}
