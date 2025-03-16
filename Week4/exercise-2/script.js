(async () => {
  let appendLocation = "#app";
  const LOCAL_STORAGE_KEY = "usersData";
  const SESSION_STORAGE_KEY = "refetchUsed";
  const EXPIRE_DURATION = 300000;

  const addStyle = () => {
    let style = document.createElement("style");
    style.innerHTML = `
          ${appendLocation} {
            padding: 10px;
            font-family: sans-serif;
            width: 30%;
          }
          .user-item {
            margin-bottom: 8px;
            padding: 8px;
            border: 1px solid gray;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .delete-btn {
            margin-left: 10px;
            background-color: tomato;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
          }
          .delete-btn:hover {
            background-color: rgb(221, 21, 21);
          }
          .refetch-btn {
            display: block;
            margin-top: 10px;
            background-color: rgb(93, 213, 97);
            color: white;
            border: none;
            padding: 8px 10px;
            border-radius: 3px;
            cursor: pointer;
          }
          .refetch-btn:hover {
            background-color: rgb(32, 150, 38);
          }
        `;
    document.head.appendChild(style);
  };

  let container = document.querySelector(appendLocation);
  if (!container) {
    container = document.createElement("div");
    container.id = appendLocation.replace("#", "");
    document.body.appendChild(container);
  }

  addStyle();

  const saveUsersToStorage = (users) => {
    const data = {
      expire: Date.now() + EXPIRE_DURATION,
      users: users,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };

  const getUsersFromStorage = () => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.expire > Date.now() && Array.isArray(data.users)) {
          return data.users;
        }
      } catch (e) {
        console.error("Storage verisi okunamadı:", e);
      }
    }
    return null;
  };

  const fetchUsers = async () => {
    try {
      let response = await fetch("https://jsonplaceholder.typicode.com/users");
      let data = await response.json();
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ users: data, expire: Date.now() + EXPIRE_DURATION })
      );
      return data;
    } catch (error) {
      console.log("Veriler getirilirken bir sorun oluştu.", error);
      return [];
    }
  };

  const fetchAndStoreUsers = async () => {
    const users = await fetchUsers();
    saveUsersToStorage(users);
    return users;
  };

  const renderUsers = (users) => {
    container.innerHTML = "";

    users.forEach((user) => {
      const userDiv = document.createElement("div");
      userDiv.className = "user-item";
      userDiv.dataset.userId = user.id;

      const nameSpan = document.createElement("span");
      nameSpan.textContent = user.name;
      userDiv.appendChild(nameSpan);

      const delButton = document.createElement("button");
      delButton.textContent = "Sil";
      delButton.className = "delete-btn";
      delButton.addEventListener("click", () => {
        container.removeChild(userDiv);
        deleteUserFromStorage(user.id);
      });
      userDiv.appendChild(delButton);

      container.appendChild(userDiv);
    });
  };

  const deleteUserFromStorage = (userId) => {
    let users = getUsersFromStorage() || [];
    users = users.filter((user) => user.id !== userId);
    saveUsersToStorage(users);
  };

  const setupObserver = () => {
    const observer = new MutationObserver(() => {
      if (container.querySelectorAll(".user-item").length === 0) {
        if (!sessionStorage.getItem(SESSION_STORAGE_KEY)) {
          addRefetchButton();
        }
      }
    });

    observer.observe(container, { childList: true });
  };

  const addRefetchButton = () => {
    if (container.querySelector("#refetch-btn")) return;

    const btn = document.createElement("button");
    btn.id = "refetch-btn";
    btn.textContent = "Kullanıcıları Yeniden Çek";
    btn.className = "refetch-btn";
    btn.addEventListener("click", async () => {
      sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
      btn.remove();
      const newUsers = await fetchAndStoreUsers();
      renderUsers(newUsers);
    });
    container.appendChild(btn);
  };

  let users = getUsersFromStorage();
  if (!users || users.length === 0) {
    users = await fetchAndStoreUsers();
  }
  renderUsers(users);
  setupObserver();
})();
