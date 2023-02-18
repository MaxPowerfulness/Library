// Global varibales
let myLibrary = [];
let libraryIndexCounter = 0;
const bookContainer = document.querySelector('.bookContainer');
const form = document.querySelector('form');
const overlay = document.querySelector('#overlayDiv');
// Global Event Listeners
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let book = new Book();
    console.log(book);
    if ((Object.values(book)[0] === '') & (Object.values(book)[1] === '') & (Object.values(book)[2] === '')) {
        return;
    } else {
        book.addBookToLibrary(book);
        book.displayBook(myLibrary);
        closeForm();
    };
});

class Book {
    // Creates an object (book) from the information submitted in the form
    constructor(author, title, page_nums, status, index) {
        this.author = document.getElementById('author').value;
        this.title = document.getElementById('title').value;
        this.page_nums = document.getElementById('number_of_pages').value;
        this.status = document.querySelector('input[name = "status"]:checked').value;
        this.index = libraryIndexCounter;
    };

    // Adds a book to the library array
    addBookToLibrary(book) {
        myLibrary.push(book);
    };

    // Creates a card displaying the book information and appends it to the 'book_container' element
    displayBook(libraryArray) {
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
        this.toggleReadStatus(user, buttonDiv);
        
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
    toggleReadStatus(user, div,) {
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
};

function openForm() {
    document.getElementById("popUpForm").style.display = "block";
    overlay.classList.toggle('overlay')
  };
function closeForm() {
    document.getElementById("popUpForm").style.display = "none";
    overlay.classList.toggle('overlay');
  };  