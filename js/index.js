const titleInput = document.getElementsByName('title')[0];
const authorInput = document.getElementsByName('author')[0];
const addBtn = document.getElementsByName('add')[0];

const savedBookData = localStorage.getItem('books-data');
const data = savedBookData ? JSON.parse(savedBookData) : [];



const saveBookForm = () => {
  localStorage.setItem('books-data', JSON.stringify(data));
};

addBtn.addEventListener('click', () => {
  data.push({
    id: data.length + 1,
    title: titleInput.value,
    author: authorInput.value,
  });
  saveBookForm();
  addBookToList();
});
const booksContainer = document.querySelector('.display-book');

function addBookToList() {
  data.forEach(e => {
  
    booksContainer.innerHTML += `
      <div class="book-item">
        <p>${e.title}</p>
        <p>${e.author}</p>
        <button id="item${e.id}"type="button" class="btn-remove">Remove</button>
      </div>
      <hr>`
    console.log(e)
  });
}

addBookToList()
