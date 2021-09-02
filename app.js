
const loadBooks = () => {
    const inputField = document.getElementById('input-field');
    const inputFieldText = inputField.value;

    if (inputFieldText === '') {
        const emptyError = document.getElementById('empty-error');
        const p = document.createElement('p');
        p.classList.add('empty-error')
        p.innerText = 'Please type a book name and search.';
        emptyError.appendChild(p)
    }
    if (inputField === undefined) {
        console.log('random name is not allowd')
    }
    else {
        const url = `http://openlibrary.org/search.json?q=${inputFieldText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayResult(data.docs.slice(0, 20)))
    }

    inputField.value = '';
};
const displayResult = books => {
    console.log(books);
    const bookContainer = document.getElementById('display-result');
    bookContainer.textContent = '';
    books.forEach(book => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="results">
                <h3><i><b>Name:</b></i> ${book.title}</h3>
                <p><i><b>Author Name:</b></i>  ${book.author_name}</p>
                <p><i><b>First Published:</b></i>  ${book.first_publish_year}</p>
                <p><i><b>Publisher:</b></i>  ${book.publisher.slice(0, 1)}</p>
            </div>
    `;
        bookContainer.appendChild(div);
    });
}