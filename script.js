// Global varibales
let myLibrary = [];
let libraryIndexCounter = 0;
const bookContainer = document.querySelector('.bookContainer');
const form = document.querySelector('form');
const overlay = document.querySelector('#overlayDiv');
const author = document.getElementById('author');
const title = document.getElementById('title');
const numPages = document.getElementById('number_of_pages');
const read = document.getElementById('Read');
const notRead = document.getElementById('Not Read');
const formItems = [author, title, numPages, read, notRead];

// Global Event Listeners
numPages.addEventListener('input', function(event) {
    bookPageChecker();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (radioBtnValidation() || authorChecker() || titleChecker() || bookPageChecker()) {
        return
    } else {
        const book = createBook();
        clearForm();
        if ((Object.values(book)[0] === '') & (Object.values(book)[1] === '') & (Object.values(book)[2] === '')) {
            return;
        } else {
            addBookToLibrary(book);
            displayBook(myLibrary);
            closeForm();
        };
    }
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
    let buttonDiv = document.createElement('div')
    buttonDiv.classList.add('buttonContainer')
    div.setAttribute("data-index", `${libraryIndexCounter}`) // Set data attribute to be able to remove book easily. 
    div.classList.add('book');
    let user = libraryArray[libraryArray.length - 1];
    for (let key in user) {
        if ((key === 'index') | (key === 'status')) {
            continue;
        };
        div.innerHTML += '<div>' + user[key] + '</div>';
    };
    bookContainer.appendChild(div);
    div.appendChild(buttonDiv);
    // Adding read status button
    toggleReadStatus(user, buttonDiv);
    // Adding remove button
    const removeButton = document.createElement('button');
    removeButton.classList.add('removeButton');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        bookContainer.removeChild(div); // Removes the entire card from the DOM when clicked
        delete libraryArray[user.index]; // Removes the book from the libraryArray list. 
    });
    buttonDiv.appendChild(removeButton);
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
            readButton.className = 'bookNotRead readButton';
            user.status = 'Not Read';
        } else {
            readButton.textContent = 'Read';
            readButton.className = 'bookRead removeButton';
            user.status = 'Read';
        };
    });
    div.appendChild(readButton);
};


// Form validation

// Checks if a radio button is selected before submission. Otherwise returns error message
function radioBtnValidation() {
    const radioBtns = document.getElementsByName('status');
    for (let i = 0; i < radioBtns.length; i++) {
        if (radioBtns[i].checked) {
            return false;
        };
    };
    document.getElementById('errorMessage').textContent = "Please choose an option";
    return true;
};

// Checks if the page number is entered before submission. Otherwise returns error message
function bookPageChecker() {
    if (numPages.validity.rangeUnderflow) {
        numPages.setCustomValidity("Enter a value greater than 0");
        numPages.reportValidity();
    } else  if (numPages.validity.valueMissing){
        numPages.setCustomValidity("Enter page count");
        numPages.reportValidity();
        return true;
    } else {
        numPages.setCustomValidity("");
    }
};

// Checks if the author is entered before submission. Otherwise returns error message
function authorChecker() {
    if (author.value == '') {
        author.setCustomValidity('Please enter an author');
        author.reportValidity();
        return true;
    } else {
        author.setCustomValidity('');
        return false;
    };
};

// Checks if the title is entered before submission. Otherwise returns error message
function titleChecker() {
    if (title.value == '') {
        title.setCustomValidity('Please enter a Title');
        title.reportValidity();
        return true;
    } else {
        title.setCustomValidity('');
        return false;
    };
};

// Clears the form inputs
function clearForm() {
    formItems.forEach(item => {
        if (item.type === 'radio') {
            item.checked = false;
        } else {
            item.value = '';
        };
    });
    document.getElementById('errorMessage').textContent = '';
};

function openForm() {
    document.getElementById("popUpForm").style.display = "block";
    overlay.classList.toggle('overlay')
  };
function closeForm() {
    document.getElementById("popUpForm").style.display = "none";
    overlay.classList.toggle('overlay');
  };  