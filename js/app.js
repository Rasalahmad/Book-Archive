// loading data function 
const loadBooks = () => {
    const bookDetails = document.getElementById('details');
    const searchInput = document.getElementById('search-btn');
    const searchText = searchInput.value;
    searchInput.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    if (searchText === '') {
        const errorMessage = document.getElementById('error');
        const result = document.getElementById('result');
        errorMessage.innerText = 'Please, type your book name'
        bookDetails.textContent = '';
        result.textContent = '';
    } else {
        fetch(url)
            .then(res => res.json())
            .then(data => displayBooks(data))
    }
};
// display function
const displayBooks = (data) => {
    // showing how many search result found
    const result = document.getElementById('result');
    result.innerText = `About ${data.numFound} results found`;
    // target book details
    const books = data.docs;
    const errorMessage = document.getElementById('error');
    const bookDetails = document.getElementById('details');
    // checking wrong user input
    if (books.length === 0) {
        errorMessage.innerText = "This book is not found";
        bookDetails.textContent = '';
    } else {
        bookDetails.textContent = '';
        errorMessage.textContent = '';
        books.slice(0, 30).forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            let coverPhoto = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            div.innerHTML = `
        <div class="card h-100">
        <img id="cover-photo" src="${coverPhoto ? coverPhoto :''}" class="card-img-top" alt="book cover page">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">by ${book.author_name ? book.author_name[0]: 'Not found'}</p>
                <p class="card-text">Publisher: ${book.publisher[0] ? book.publisher[0]: 'Not found'}</p>
                <p class="card-text">First Published : ${book.first_publish_year ? book.first_publish_year : 'Not found'}</p>
            </div>
         </div>
        `;
            bookDetails.appendChild(div)
        });
    }

};