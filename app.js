//------------------------- spinner loading ----------------------------//
const toggleSpinner = displayStyle => {
    document.getElementById('loading').style.display = displayStyle;
}
//book images
const bookImages = () => {
    const displayImages = document.getElementById('book-images');
    displayImages.textContent = '';
}

//-------------------------- search book field -------------------------//
const loadBooks = () => {
    const inputField = document.getElementById('input-field');
    const inputFieldText = inputField.value;

    bookImages()

    //------------show spinner --------------//
    toggleSpinner('block');

    //------------- empty input error -----------//
    if (inputFieldText == '') {
        const emptyError = document.getElementById('empty-error');
        emptyError.textContent = '';
        const p = document.createElement('p');
        p.classList.add('empty-error');
        p.innerText = 'Please type a book name and search.';
        emptyError.appendChild(p)
    }

    //-------------- random type error ---------------//
    if (inputFieldText.length === '0') {
        console.log('random name is not allowd')
        const randomError = document.getElementById('random-error');
        const p = document.createElement('p');
        p.classList.add('random-error')
        p.innerText = 'Not found result.'
        randomError.appendChild(p);
    }

    //------------------- api link add ---------------------//
    else {
        const url = `https://openlibrary.org/search.json?q=${inputFieldText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayResult(data.docs.slice(0, 20)))
    }

    //------- clear search field ----------//
    inputField.value = '';
};

//----------------------------- display result -----------------------//
const displayResult = books => {
    console.log(books);
    const bookContainer = document.getElementById('display-result');
    //------- clear previous result ---------//
    bookContainer.textContent = '';

    //------------------ result found digit -----------------//
    const searchResult = document.getElementById('result-digit');
    searchResult.textContent = '';
    books.forEach(number => {
        const p = document.createElement('p');
        p.classList.add('result-digit');
        searchResult.appendChild(p);
    });

    //------------------ result display -----------------//
    books.forEach(book => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="results">
             <img width="250" height="300" src = "https://covers.openlibrary.org/b/id/${book.cover_i}.jpg">
                <h3><i><b>Name:</b></i> ${book.title}</h3>
                <p><i><b>Author Name:</b></i>  ${book.author_name}</p>
                <p><i><b>First Published:</b></i>  ${book.first_publish_year}</p>
                <p><i><b>Publisher:</b></i>  ${book.publisher.slice(0, 1)}</p>
            </div>
    `;
        bookContainer.appendChild(div);

    });

    //------ spinner call and display none ------//
    toggleSpinner('none')
}
