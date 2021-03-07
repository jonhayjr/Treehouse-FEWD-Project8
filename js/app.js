// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => displayError(err))

function displayEmployees(employeeData) {
    employees = employeeData;
    // store the employee HTML as we create it
    let employeeHTML = '';
    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
 
    employeeHTML += `
    <div class="card" data-index="${index}" data-employee="${name.first} ${name.last}">
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    </div>
    </div>
    `
    });
    gridContainer.innerHTML = employeeHTML;
}

function displayError(err) {
    let errorHTML = '<div class="error"><p>Sorry, something went wrong.  Please refresh the page and try again.</p><img src="img/error.png"></div>';
    gridContainer.innerHTML = errorHTML;
    console.log(err);
}

function displayModal(index) {
    // use object destructuring make our template literal cleaner
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
    <img class="avatar" src="${picture.large}" />
    <div class="text-container" data-index="${index}">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    <hr />
    <p class="phone">${phone}</p>
    <p class="street-address">${street.number} ${street.name}, ${state} ${postcode}</p>
    <p class="birthday">Birthday:
    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element clicked
    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');
    displayModal(index);
    }
});

gridContainer.addEventListener('mouseover', e => {
    // make sure the click is not on the gridContainer itself
    const card = e.target.closest(".card");
    if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element clicked
    card.classList.add('card-hover')
    }
});

gridContainer.addEventListener('mouseout', e => {
    // make sure the click is not on the gridContainer itself
    const card = e.target.closest(".card");
    if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element clicked
    card.classList.remove('card-hover')
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
    });


/*Filter Employee Logic*/
const searchbar = document.querySelector('.searchbar');

function employeeSearch() {
    const cards = document.querySelectorAll('.card');
    const searchInput = searchbar.value.toLowerCase();
    const searchInputLength = searchInput.length;

    cards.forEach(card => {
        let employeeName = card.getAttribute("data-employee").toLowerCase();
        let subVal = employeeName.substr(0, searchInputLength).toLowerCase();
        if (subVal === searchInput) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    })
}

searchbar.addEventListener("keyup", employeeSearch);

/* Overlay Navigation */
const previous = document.querySelector('.previous');
const next = document.querySelector('.next');

previous.addEventListener('click', () => {
    const overlayElement = document.querySelector('.modal-content .text-container');
    const currentIndex = parseInt(overlayElement.getAttribute('data-index'));
    const previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
        displayModal(previousIndex);
    }
})

next.addEventListener('click', () => {
    const overlayElement = document.querySelector('.modal-content .text-container');
    const cards = document.querySelectorAll('.card');
    const maxIndex = cards.length - 1;
    const currentIndex = parseInt(overlayElement.getAttribute('data-index'));
    const nextIndex = currentIndex + 1;
    if (nextIndex <= maxIndex) {
        displayModal(nextIndex);
    }
})