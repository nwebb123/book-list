// Book Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Class- Handles UI tasks
class UI {
    static displayBooks() {
        //Hard-coded array of books; sample data before local storage is implemented
        const StoredBooks = [{
                title: 'Slaughterhouse Five',
                author: 'Kurt Vonnegut',
                isbn: '189459'
            },
            {
                title: 'To Kill A Mockingbird',
                author: 'Harper Lee',
                isbn: '214896'
            },

        ];

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const tableRow = document.createElement('tr');

        tableRow.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td class="text-center"><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(tableRow);
    }

    static deleteBook(X) {
        if (X.classList.contains('delete')) {
            X.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        //Create a custom div and insert it before the form.
        const alertDiv = document.createElement('div');

        alertDiv.className = `alert alert-${className}`;
        alertDiv.appendChild(document.createTextNode(message));
        
        const container = document.querySelector('.container');
        const form = document.querySelector('.form-row');
        //insertBefore is placing the newly created alertDiv directly above row containing the form. 
        container.insertBefore(alertDiv, form);
        // Alert vanishes after 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 2500);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

//Store Class: Handles storage


//Event to display books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

//Event to add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    //Prevent actual submit
    e.preventDefault();

    //Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;


    //Validate Form
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {

        //Instantiate book
        const book = new Book(title, author, isbn);

        //Add Book to UI
        UI.addBookToList(book);

        //Show Success Alert Message
        UI.showAlert('Book Added', 'success');


        UI.clearFields();
    }


})

//Event to remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
    // e.target is passed in to select the X for a particular book. Can't use id of X, but instead we can target the parent and add an event to pass in the particular book.
    UI.deleteBook(e.target);


    //Success Alert message
    UI.showAlert('Book removed', 'success');
})