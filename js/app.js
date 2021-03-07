// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`
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
    let dateMonth = date.getMonth().toString().padStart(2, "0");
    let dateDay = date.getDate().toString().padStart(2, "0");
    let dateYear = date.getFullYear().toString().substr(-2);
    let phoneFormatted = phone.toString().replace('-', ' ');
    let stateAbbreviation = findStateAbbreviation(state);

    const modalHTML = `
    <img class="avatar" src="${picture.large}" />
    <div class="text-container" data-index="${index}">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    <hr />
    <p class="phone">${phoneFormatted}</p>
    <p class="street-address">${street.number} ${street.name}, ${stateAbbreviation} ${postcode}</p>
    <p class="birthday">Birthday:
    ${dateMonth}/${dateDay}/${dateYear}</p>
    </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

/*Custom Function to find state abbreviation*/
function findStateAbbreviation(state) {
    const usStates = [
        { name: 'ALABAMA', abbreviation: 'AL'},
        { name: 'ALASKA', abbreviation: 'AK'},
        { name: 'AMERICAN SAMOA', abbreviation: 'AS'},
        { name: 'ARIZONA', abbreviation: 'AZ'},
        { name: 'ARKANSAS', abbreviation: 'AR'},
        { name: 'CALIFORNIA', abbreviation: 'CA'},
        { name: 'COLORADO', abbreviation: 'CO'},
        { name: 'CONNECTICUT', abbreviation: 'CT'},
        { name: 'DELAWARE', abbreviation: 'DE'},
        { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC'},
        { name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM'},
        { name: 'FLORIDA', abbreviation: 'FL'},
        { name: 'GEORGIA', abbreviation: 'GA'},
        { name: 'GUAM', abbreviation: 'GU'},
        { name: 'HAWAII', abbreviation: 'HI'},
        { name: 'IDAHO', abbreviation: 'ID'},
        { name: 'ILLINOIS', abbreviation: 'IL'},
        { name: 'INDIANA', abbreviation: 'IN'},
        { name: 'IOWA', abbreviation: 'IA'},
        { name: 'KANSAS', abbreviation: 'KS'},
        { name: 'KENTUCKY', abbreviation: 'KY'},
        { name: 'LOUISIANA', abbreviation: 'LA'},
        { name: 'MAINE', abbreviation: 'ME'},
        { name: 'MARSHALL ISLANDS', abbreviation: 'MH'},
        { name: 'MARYLAND', abbreviation: 'MD'},
        { name: 'MASSACHUSETTS', abbreviation: 'MA'},
        { name: 'MICHIGAN', abbreviation: 'MI'},
        { name: 'MINNESOTA', abbreviation: 'MN'},
        { name: 'MISSISSIPPI', abbreviation: 'MS'},
        { name: 'MISSOURI', abbreviation: 'MO'},
        { name: 'MONTANA', abbreviation: 'MT'},
        { name: 'NEBRASKA', abbreviation: 'NE'},
        { name: 'NEVADA', abbreviation: 'NV'},
        { name: 'NEW HAMPSHIRE', abbreviation: 'NH'},
        { name: 'NEW JERSEY', abbreviation: 'NJ'},
        { name: 'NEW MEXICO', abbreviation: 'NM'},
        { name: 'NEW YORK', abbreviation: 'NY'},
        { name: 'NORTH CAROLINA', abbreviation: 'NC'},
        { name: 'NORTH DAKOTA', abbreviation: 'ND'},
        { name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP'},
        { name: 'OHIO', abbreviation: 'OH'},
        { name: 'OKLAHOMA', abbreviation: 'OK'},
        { name: 'OREGON', abbreviation: 'OR'},
        { name: 'PALAU', abbreviation: 'PW'},
        { name: 'PENNSYLVANIA', abbreviation: 'PA'},
        { name: 'PUERTO RICO', abbreviation: 'PR'},
        { name: 'RHODE ISLAND', abbreviation: 'RI'},
        { name: 'SOUTH CAROLINA', abbreviation: 'SC'},
        { name: 'SOUTH DAKOTA', abbreviation: 'SD'},
        { name: 'TENNESSEE', abbreviation: 'TN'},
        { name: 'TEXAS', abbreviation: 'TX'},
        { name: 'UTAH', abbreviation: 'UT'},
        { name: 'VERMONT', abbreviation: 'VT'},
        { name: 'VIRGIN ISLANDS', abbreviation: 'VI'},
        { name: 'VIRGINIA', abbreviation: 'VA'},
        { name: 'WASHINGTON', abbreviation: 'WA'},
        { name: 'WEST VIRGINIA', abbreviation: 'WV'},
        { name: 'WISCONSIN', abbreviation: 'WI'},
        { name: 'WYOMING', abbreviation: 'WY' }
    ]

    const index = usStates.findIndex(usState => usState.name === state.toUpperCase());

    if (index < 0) {
        return state;
    } else {
        return usStates[index].abbreviation;
    }
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