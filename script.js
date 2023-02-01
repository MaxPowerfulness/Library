// Global varibales
let myLibrary = [];
const bookContainer = document.querySelector('.book_container');
const form = document.querySelector('form');
// Event Listeners
form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(form);
    const book = Object.fromEntries(formData);   // Takes the form data and creates a new object (book) using FormData API
    addBookToLibrary(book);
    console.log(myLibrary);
})

// Adds to books to the library array
function addBookToLibrary(book) {
    myLibrary.push(book);
};

// Displays the book onto the webpage
function displayBook(libraryArray) {
    for (let i = 0; i < libraryArray.length; i++) {
        let div = document.createElement('div');
        div.classList.add('book');
        div.textContent = `${libraryArray[i]}`;
        bookContainer.appendChild(div);
    };
};

// Displays form when the form button is clicked
function openForm() {
    document.querySelector('#bookForm').style.display = 'block';
}

// Closes form when the close button is clicked
function closeForm() {
    document.querySelector('#bookForm').style.display = 'none';
}

displayBook(myLibrary);