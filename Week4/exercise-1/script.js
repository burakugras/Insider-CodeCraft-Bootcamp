async function fetchUsers() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        let data = await response.json();

        localStorage.setItem('users', JSON.stringify(data));
    } catch (error) {
        console.log('Veriler getirilirken bir sorun oluştu.');
    }
}


const startConfig = async () => {
    await fetchUsers();
    const users = JSON.parse(localStorage.getItem('users'));
    if (!users) {
        localStorage.setItem('users', JSON.stringify([]));
    } else {
        users.forEach(user => {
            addHTML(user);
        });
    }
}

const addHTML = (user) => {
    const userDiv = document.createElement('li');
    userDiv.classList.add('user');

    const deleteSpan = document.createElement('span');
    deleteSpan.classList.add('delete-span');
    deleteSpan.textContent = 'X';

    userDiv.appendChild(deleteSpan);

    const name = document.createElement('div'); //
    name.classList.add('name-container');
    const nameLabel = document.createElement('label');
    nameLabel.textContent = "Full name : ";
    const nameVal = document.createElement('span');
    nameVal.textContent = user.name;

    name.appendChild(nameLabel);
    name.appendChild(nameVal);

    const username = document.createElement('div'); //
    username.classList.add('name-container');
    const userNameLabel = document.createElement('label');
    userNameLabel.textContent = "Username : ";
    const userNameVal = document.createElement('span');
    userNameVal.textContent = user.username;

    username.appendChild(userNameLabel);
    username.appendChild(userNameVal);

    const mail = document.createElement('div'); //
    mail.classList.add('mail-container');
    const mailLabel = document.createElement('label');
    mailLabel.textContent = 'Mail : ';
    const mailVal = document.createElement('span');
    mailVal.textContent = user.email;

    mail.appendChild(mailLabel);
    mail.appendChild(mailVal);

    const address = document.createElement('div'); //
    address.classList.add('address-container');
    const addressLabel = document.createElement('label');
    addressLabel.textContent = 'Address : ';
    const addressVal = document.createElement('span');
    addressVal.textContent = `${user.address.street} ${user.address.suite} ${user.address.city}`;

    address.appendChild(addressLabel);
    address.appendChild(addressVal);

    const phone = document.createElement('div'); //
    phone.classList.add('phone-container');
    const phoneLabel = document.createElement('label');
    phoneLabel.textContent = 'Phone : ';
    const phoneVal = document.createElement('span');
    phoneVal.textContent = user.phone;

    phone.appendChild(phoneLabel);
    phone.appendChild(phoneVal);

    const website = document.createElement('div'); //
    website.classList.add('website-container');
    const websiteLabel = document.createElement('label');
    websiteLabel.textContent = 'Website : ';
    const websiteVal = document.createElement('span');
    websiteVal.textContent = user.website;

    website.appendChild(websiteLabel);
    website.appendChild(websiteVal);

    const company = document.createElement('div'); //
    company.classList.add('company-container');
    const companyLabel = document.createElement('label');
    companyLabel.textContent = 'Company : ';
    const companyVal = document.createElement('span');
    companyVal.textContent = user.company.name;

    company.appendChild(companyLabel);
    company.appendChild(companyVal);

    userDiv.appendChild(name);
    userDiv.appendChild(username);
    userDiv.appendChild(mail);
    userDiv.appendChild(address);
    userDiv.appendChild(phone);
    userDiv.appendChild(website);
    userDiv.appendChild(company);

    document.querySelector('.ins-api-users').appendChild(userDiv);

}

document.addEventListener('DOMContentLoaded', startConfig);