// Global varibales
let myLibrary = [];
let libraryIndexCounter = 0;
const bookContainer = document.querySelector('.bookContainer');
const form = document.querySelector('form');
// Event Listeners
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const book = createBook();
    addBookToLibrary(book);
    displayBook(myLibrary);
    console.log(myLibrary);
});

// Creates an object (book) from the information submitted in the form
function createBook () {
    const formData = new FormData(form);
    const book = Object.fromEntries(formData);   // Takes the form data and creates a new object (book) using FormData API
    book.index = libraryIndexCounter;
    return book;
};


// Adds a book to the library array
function addBookToLibrary(book) {
    myLibrary.push(book);
};

// Creates a card displaying the book information and appends it to the 'book_container' element
function displayBook(libraryArray) {
    // Displaying book info
    let div = document.createElement('div');
    div.setAttribute("data-index", `${libraryIndexCounter}`) // Set data attribute to be able to remove book easily. 
    div.classList.add('book');
    let user = libraryArray[libraryArray.length - 1];
    for (let key in user) {
        if ((key === 'index') | (key === 'status')) {
            continue;
        };
        div.innerHTML += user[key] + '<br>';
    };
    bookContainer.appendChild(div);
    // Adding read status button
    toggleReadStatus(user, div);
    // Adding remove button
    const removeButton = document.createElement('button');
    removeButton.classList.add('removeButton');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        bookContainer.removeChild(div); // Removes the entire card from the DOM when clicked
        delete libraryArray[user.index]; // Removes the book from the libraryArray list. 
    });
    div.appendChild(removeButton);
    libraryIndexCounter++;

};

// Adds a toggleable button that conveys whether or not a book has been read
function toggleReadStatus(user, div,) {
    let readButton = document.createElement('button');
    readButton.classList.add('readButton');
    if (user.status === 'Read') {
        readButton.textContent = 'Read';
        readButton.classList.add('bookRead');
    } else {
        readButton.textContent = 'Not Read';
        readButton.classList.add('bookNotRead');
    };
    readButton.addEventListener('click', () => {
        if (readButton.textContent === 'Read') {
            readButton.textContent = 'Not Read';
            readButton.className = 'bookNotRead';
            user.status = 'Not Read';
        } else {
            readButton.textContent = 'Read';
            readButton.className = 'bookRead';
            user.status = 'Read';
        };
    })
    div.appendChild(readButton);
}

// Displays form when the form button is clicked
function openForm() {
    document.querySelector('#bookForm').style.display = 'block';
};

// Closes form when the close button is clicked
function closeForm() {
    document.querySelector('#bookForm').style.display = 'none';
};