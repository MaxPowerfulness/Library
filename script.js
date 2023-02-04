// Global varibales
let myLibrary = [];
let libraryIndexCounter = 0;
const bookContainer = document.querySelector('.book_container');
const form = document.querySelector('form');
// Event Listeners
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const book = createBook();
    addBookToLibrary(book);
    displayBook(myLibrary);
    console.log(myLibrary);
});

function createBook () {
    const formData = new FormData(form);
    const book = Object.fromEntries(formData);   // Takes the form data and creates a new object (book) using FormData API
    book.index = libraryIndexCounter;
    return book;
};


// Adds to books to the library array
function addBookToLibrary(book) {
    myLibrary.push(book);
};

// Displays the book onto the webpage
function displayBook(libraryArray) {
    // Adding book info
    let div = document.createElement('div');
    div.setAttribute("data-index", `${libraryIndexCounter}`) // Set data attribute to be able to remove book easily. 
    div.classList.add('book');
    let user = libraryArray[libraryArray.length - 1];
    for (let key in user) {
        if (key === 'index') {
            continue;
        };
        div.innerHTML += user[key] + '<br>';
    };
    const newBook = bookContainer.appendChild(div);
    // Adding remove button
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove_button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', (newBook) => {
        bookContainer.removeChild(newBook.target.parentElement);
    });
    div.appendChild(removeButton);
    libraryIndexCounter++;
};

// Displays form when the form button is clicked
function openForm() {
    document.querySelector('#bookForm').style.display = 'block';
};

// Closes form when the close button is clicked
function closeForm() {
    document.querySelector('#bookForm').style.display = 'none';
};