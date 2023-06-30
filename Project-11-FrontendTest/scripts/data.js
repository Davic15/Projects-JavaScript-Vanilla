import users from '../data/data.json' assert { type: 'json' };
const ulData = document.getElementById('data');
let str = '';

users.map((user) => {
    str += `
        <li class="cards_item">
            <div class="card">
                <div class="card_image"><img src="https://picsum.photos/500/300/?image=5" alt="${user.name}"></div>
                <div class="card_content">
                    <h2 class="card_title">${user.name}</h2>
                    <p class="card_text">${user.phone}</p>
                    <!--<button class="btn card_btn">Read More</button>-->
                    <a href="mailto:${user.email}" class="btn card_btn">send email</a>
                </div>
            </div>
        </li>
    `;
    ulData.innerHTML = str;
});

console.log(ulData);
