import users from '../data/data.json' assert { type: 'json' };
const ulData = document.getElementById('data');
const selectData = document.getElementById('search');
let str = '';
let newDataUsers = [];

const onChange = () => {
    const value = selectData.value;
    const text = selectData.options[selectData.selectedIndex].text;

    switch (value) {
        case 'all':
            newDataUsers = users;
            break;
        case 'female':
            newDataUsers = users.filter((user) => user.gender === 'female');
            break;
        case 'male':
            newDataUsers = users.filter((user) => user.gender === 'male');
            break;
        case 'active':
            newDataUsers = users.filter((user) => user.isActive === true);
            break;
        case 'not_active':
            newDataUsers = users.filter((user) => user.isActive === false);
            break;

        case 'LAVAZZA':
            newDataUsers = users.filter((user) => user.company === 'LAVAZZA');
            break;
        case 'EURON':
            newDataUsers = users.filter((user) => user.company === 'EURON');
            break;
        case 'CANDECOR':
            newDataUsers = users.filter((user) => user.company === 'CANDECOR');
            break;
        case 'ORGANICA':
            newDataUsers = users.filter((user) => user.company === 'ORGANICA');
            break;

        case 'VIRVA':
            newDataUsers = users.filter((user) => user.company === 'VIRVA');
            break;
        case 'ERIDANIA':
            newDataUsers = users.filter((user) => user.company === 'ERIDANIA');
            break;
        case 'TERAPRENE':
            newDataUsers = users.filter((user) => user.company === 'TERAPRENE');
            break;
        case 'VELITY':
            newDataUsers = users.filter((user) => user.company === 'VELITY');
            break;

        default:
            newDataUsers = users;
    }

    str = '';
    getData();
};

const getData = () => {
    newDataUsers.map((user) => {
        str += `
            <li class="cards_item">
                <div class="card">
                    <div class="card_image">
                    
                    <img src="${
                        user.gender === 'female'
                            ? 'assets/images/female.jpg'
                            : 'assets/images/male.jpg'
                    }" alt="${user.name}"></div>
                    <div class="card_content">
                        <h2 class="card_title">${user.name} ${
            user.isActive
                ? '<i class="fa-solid fa-user"></i>'
                : '<i class="fa-solid fa-user-slash"></i>'
        }</h2>
                        <p class="card_text">${user.company}</p>
                        <div class="card_content-contact">
                            <a href="mailto:${
                                user.email
                            }" class="btn card_btn"><i class="fa-solid fa-envelope"></i></a>
                            <a href="tel:${
                                user.phone
                            }" class="btn card_btn"><i class="fa-solid fa-phone"></i></a>
                        </div>
                    </div>
                </div>
            </li>
        `;
        ulData.innerHTML = str;
    });
};

selectData.onchange = onChange;
onChange();
