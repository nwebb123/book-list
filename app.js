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
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(tableRow);
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

    //Instantiate book
    const book = new Book(title, author, isbn);

    //Add Book to UI
    UI.addBookToList(book);

    UI.clearFields();
})

//Event to remove a book