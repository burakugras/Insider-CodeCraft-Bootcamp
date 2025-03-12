async function fetchUsers() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        let data = await response.json();

        localStorage.setItem('users', JSON.stringify(data));
    } catch (error) {
        console.log('Veriler getirilirken bir sorun oluştu.');
    }
}

fetchUsers();

const startConfig = async () => {
    const users = await JSON.parse(localStorage.getItem('users'));
    if (!users) {
        localStorage.setItem('users', JSON.stringify([]));
    } else {
        users.forEach(user => {
            addHTML(user);
        });
    }
}

