const titleInput = document.getElementsByName('title')[0];
const authorInput = document.getElementsByName('author')[0];
const addBtn = document.getElementsByName('add')[0];

const savedBookData = localStorage.getItem('books-data');
let data = savedBookData ? JSON.parse(savedBookData) : [];

const updateLocalStorageBookData = (id) => {
  data = data.filter((e) => e.id !== id);
  console.log(data);
};

const saveBookForm = () => {
  localStorage.setItem('books-data', JSON.stringify(data));
};

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

const breakline = () => {
  const hr = document.createElement('hr');
  const br = document.createElement('br');
  booksContainer.appendChild(br);
  booksContainer.appendChild(hr);
};

const removeButton = (btn) => {
  btn.addEventListener('click', (event) => {
    updateLocalStorageBookData(Number(event.target.id));
    saveBookForm();
    const element = document.querySelector(`.item${event.target.id}`);
    element.remove();
  });
};

if (addBtn) {
  addBtn.addEventListener('click', () => {
    const bookDetials = {
      id: data.length + 1,
      title: titleInput.value,
      author: authorInput.value,
    };
    data.push(bookDetials);
    saveBookForm();
    const { bookItemDiv, btnRemove } = addBookToList(bookDetials);
    booksContainer.appendChild(bookItemDiv);
    removeButton(btnRemove);
    breakline();
  });
}

data.forEach((e) => {
  const { bookItemDiv } = addBookToList(e);
  console.log(addBookToList(e));
  booksContainer.appendChild(bookItemDiv);
  breakline();
});

const removeBtns = document.querySelectorAll('.btn-remove');
removeBtns.forEach((btn) => {
  removeButton(btn);
});
