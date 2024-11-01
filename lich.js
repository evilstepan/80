function loadProfile() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('profile-pic').src = currentUser.avatar || 'img/free-icon-boy-4537069.png';
        document.getElementById('user-name').innerText = currentUser.name;
        document.getElementById('user-email').innerText = `Email: ${currentUser.email}`;
        document.getElementById('user-phone').innerText = `Телефон: ${currentUser.phone}`;
        loadEvents(); 
    } else {
        alert('Пожалуйста, войдите в систему.');
        window.location.href = 'login.html';
    }
}

function saveProfile() {
    const name = document.getElementById('edit-name').value;
    const email = document.getElementById('edit-email').value;
    const phone = document.getElementById('edit-phone').value;
    const currentUser = { name, email, phone, avatar: document.getElementById('profile-pic').src };
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    loadProfile();
    toggleEditForm();
}

function closeAllForms() {
    document.getElementById('edit-form').style.display = 'none';
    document.getElementById('events-list').style.display = 'none';
    document.getElementById('order-event-form').style.display = 'none';
}

function toggleEditForm() {
    closeAllForms();
    const form = document.getElementById('edit-form');
    form.style.display = form.style.display === 'block' ? 'none' : 'block';
    if (form.style.display === 'block') {
        document.getElementById('edit-name').value = document.getElementById('user-name').innerText;
        document.getElementById('edit-email').value = document.getElementById('user-email').innerText.replace('Email: ', '');
        document.getElementById('edit-phone').value = document.getElementById('user-phone').innerText.replace('Телефон: ', '');
    }
}

function toggleEventsList() {
    closeAllForms();
    const eventsList = document.getElementById('events-list');
    eventsList.style.display = eventsList.style.display === 'block' ? 'none' : 'block';
}

function toggleOrderEventForm() {
    closeAllForms();
    const orderForm = document.getElementById('order-event-form');
    orderForm.style.display = orderForm.style.display === 'block' ? 'none' : 'block';
}

function orderEvent() {
    const code = document.getElementById('event-code').value;
    const name = document.getElementById('event-name').value;
    const dateTime = document.getElementById('event-date-time').value;
    const location = document.getElementById('event-location').value;
    const responsible = document.getElementById('event-responsible').value;
    const participants = document.getElementById('event-participants').value;
    
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    const order = {
        userId: currentUser.email,
        code,
        name,
        dateTime,
        location,
        responsible,
        participants,
        status: "в процессе"
    };
    
    const orders = JSON.parse(localStorage.getItem('eventOrders')) || [];
    
    orders.push(order);
    
    localStorage.setItem('eventOrders', JSON.stringify(orders));
    
    alert(`Мероприятие "${name}" заказано!`);
    
    clearOrderEventForm();
    
    toggleOrderEventForm();
}

function clearOrderEventForm() {
    document.getElementById('event-code').value = '';
    document.getElementById('event-name').value = '';
    document.getElementById('event-date-time').value = '';
    document.getElementById('event-location').value = '';
    document.getElementById('event-responsible').value = '';
    document.getElementById('event-participants').value = '';
}

function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function loadEvents() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    const orders = JSON.parse(localStorage.getItem("eventOrders")) || [];
    
    const userOrders = orders.filter(order => order.userId === currentUser.email);
    
    const tbody = document.querySelector('#events-list tbody');
    
    tbody.innerHTML = '';
    
    userOrders.forEach(order => {
        const row = document.createElement("tr");
        row.innerHTML =
            `<td>${order.code}</td>` +
            `<td>${order.name}</td>` +
            `<td>${order.dateTime}</td>` +
            `<td>${order.location}</td>` +
            `<td>${order.responsible}</td>` +
            `<td>${order.participants}</td>` +
            `<td>${order.status}</td>`;
        
        tbody.appendChild(row);
   });
}

// Загружаем профиль при загрузке страницы
loadProfile();