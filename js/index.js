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
  const titleDiv = div('div', book.title);
  bookItemDiv.appendChild(titleDiv);
  const authorDiv = div('div', book.author);
  bookItemDiv.appendChild(authorDiv);
  const btnRemove = createRemove(book.id);
  bookItemDiv.appendChild(btnRemove);
  return { bookItemDiv, btnRemove };
};

const breakline = (id) => {
  const hr = document.createElement('hr');
  hr.className = `hr${id}`;
  const br = document.createElement('br');
  br.className = `br${id}`;

  booksContainer.appendChild(br);
  booksContainer.appendChild(hr);
};
const removeContent = (text) => {
  const element = document.querySelector(text);
  element.remove();
};
const removeBook = (btn) => {
  btn.addEventListener('click', (event) => {
    book.removeBook(Number(event.target.id));
    removeContent(`.item${event.target.id}`);
    removeContent(`.hr${event.target.id}`);
    removeContent(`.br${event.target.id}`);
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
    breakline(bookDetials.id);
    titleInput.value = '';
    authorInput.value = '';
    return true;
  });
}
const dataOfBooks = book.getLocalStorage();
dataOfBooks.forEach((e) => {
  const { bookItemDiv } = addBookToList(e);
  booksContainer.appendChild(bookItemDiv);
  breakline(e.id);
});

const removeBtns = document.querySelectorAll('.btn-remove');
removeBtns.forEach((btn) => {
  removeBook(btn);
});
