import Book from './main.js';

const book = new Book();

const titleInput = document.getElementsByName('title')[0];
const authorInput = document.getElementsByName('author')[0];
const addBtn = document.getElementsByName('add')[0];

const erroMsg = document.querySelector('.error-msg');

const booksContainer = document.querySelector('.display-book');

const div = (tag, text) => {
  const titleDiv = document.createElement(tag);
  if (text) {
    const titleText = document.createTextNode(text);
    titleDiv.appendChild(titleText);
  }
  return titleDiv;
};

const createRemove = (id) => {
  const btnRemove = document.createElement('button');
  btnRemove.id = `${id}`;
  btnRemove.type = 'button';
  btnRemove.className = 'btn-remove';
  const btnText = document.createTextNode('Remove');
  btnRemove.appendChild(btnText);
  return btnRemove;
};
const addBookToList = (book) => {
  const bookItemDiv = div('div');
  bookItemDiv.className = `book-item item${book.id}`;
  const titleDiv = div('div', `"${book.title}" by ${book.author}`);
  bookItemDiv.appendChild(titleDiv);
  const btnRemove = createRemove(book.id);
  bookItemDiv.appendChild(btnRemove);
  return { bookItemDiv, btnRemove };
};


const removeContent = (text) => {
  const element = document.querySelector(text);
  element.remove();
};
const removeBook = (btn) => {
  btn.addEventListener('click', (event) => {
    book.removeBook(Number(event.target.id));
    removeContent(`.item${event.target.id}`);
  });
};

const emptyValue = (bookDetials) => {
  if (bookDetials.title === '' || bookDetials.author === '') return true;
  return false;
};
if (addBtn) {
  addBtn.addEventListener('click', () => {
    const bookDetials = {
      title: titleInput.value,
      author: authorInput.value,
    };
    if (emptyValue(bookDetials)) {
      const divError = div('li', 'title and author must be not be empty');
      erroMsg.innerHTML = divError.innerHTML;
      return false;
    }
    erroMsg.innerHTML = '';
    book.addBook(bookDetials);
    const { bookItemDiv, btnRemove } = addBookToList(bookDetials);
    booksContainer.appendChild(bookItemDiv);
    removeBook(btnRemove);
  
    titleInput.value = '';
    authorInput.value = '';
    return true;
  });
}

const dataOfBooks = book.getLocalStorage();
dataOfBooks.forEach((book) => {
  const { bookItemDiv } = addBookToList(book);
  booksContainer.appendChild(bookItemDiv);

});

const removeBtns = document.querySelectorAll('.btn-remove');
removeBtns.forEach((btn) => {
  removeBook(btn);
});
