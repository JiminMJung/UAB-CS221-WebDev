// Was created by chat 3.5
const searchInput = document.getElementById('searchInput');
const bookList = document.getElementById('bookList');
const bookDetails = document.getElementById('bookDetails');
const readingListContainer = document.getElementById('readingList');
let readingList = JSON.parse(localStorage.getItem('readingList')) || [];

// This function is to search for books for the search box. it uses fetch and catches any errors
function searchBooks() {
    const query = searchInput.value;

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const books = data.items || [];
            displayBooks(books);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            displayError('Error fetching data. Please try again.');
        });
}

// this function is used to display the fetched book options in the google book api on the web app
function displayBooks(books) {
    bookList.innerHTML = '';

    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book';
        bookItem.innerHTML = `
            <h3>${book.volumeInfo.title}</h3>
            <p>${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Author not available'}</p>
            <button onclick="displayBookDetails('${book.id}')">Details</button>
            <button onclick="addToReadingList('${book.id}')">Add to Bookshelf</button>
        `;
        bookList.appendChild(bookItem);
    });
}

// This function is used to display the fetched book details in the google book api on the web app
function displayBookDetails(bookId) {
    fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        .then(response => response.json())
        .then(data => {
            const book = data.volumeInfo;
            bookDetails.innerHTML = `
                <h2>${book.title}</h2>
                <p>${book.description || 'Description not available'}</p>
                <p>Author(s): ${book.authors ? book.authors.join(', ') : 'Author not available'}</p>
            `;
            bookDetails.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching book details:', error);
            displayError('Error fetching book details. Please try again.');
        });
}

// This function is created to add and book-mark books (The bookshelf) 
function addToReadingList(bookId) {
    const book = readingList.find(item => item.id === bookId);

    if (!book) {
        readingList.push({ id: bookId });
        localStorage.setItem('readingList', JSON.stringify(readingList));
        displayReadingList();
    }
}

// This function displays the bookmarked books on the webapp
function displayReadingList() {
    readingListContainer.innerHTML = '';

    readingList.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book';
        bookItem.innerHTML = `
            <h3>${book.id}</h3>
            <button onclick="displayBookDetails('${book.id}')">Details</button>
            <button onclick="removeFromReadingList('${book.id}')">Remove from Bookshelf</button>
        `;
        readingListContainer.appendChild(bookItem);
    });
}

// this function removes from the bookshelf
function removeFromReadingList(bookId) {
    const index = readingList.findIndex(book => book.id === bookId);

    if (index !== -1) {
        readingList.splice(index, 1);
        localStorage.setItem('readingList', JSON.stringify(readingList));
        displayReadingList();
    }
}

// this function is to catch any errors and will let you know if any errors is occured
function displayError(message) {
    const errorContainer = document.getElementById('errorContainer');

    if (!errorContainer) {
        const body = document.querySelector('body');
        errorContainer = document.createElement('div');
        errorContainer.id = 'errorContainer';
        body.appendChild(errorContainer);
    }

    errorContainer.innerHTML = `<p class="error-message">${message}</p>`;

    setTimeout(() => {
        errorContainer.innerHTML = '';
    }, 5000);
}
