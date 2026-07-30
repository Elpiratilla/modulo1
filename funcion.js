(function(){
  'use strict';

  const USERS_KEY = 'bitacora_users';
  const SESSION_KEY = 'bitacora_session';
  const itemsKey = (userId) => `bitacora_items_${userId}`;

  // ---------- Utilidades de "hash" simple (NO seguro, solo demo client-side) ----------
  function simpleHash(str){
    let h = 0;
    for(let i=0;i<str.length;i++){
      h = (Math.imul(31,h) + str.charCodeAt(i)) | 0;
    }
    return 'h' + Math.abs(h).toString(36) + str.length;
  }

  function getUsers(){
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  }
  function saveUsers(users){
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  function getSession(){
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  }
  function setSession(user){
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }
  function clearSession(){
    localStorage.removeItem(SESSION_KEY);
  }
  function getItems(userId){
    return JSON.parse(localStorage.getItem(itemsKey(userId)) || '[]');
  }
  function saveItems(userId, items){
    localStorage.setItem(itemsKey(userId), JSON.stringify(items));
  }

  // ---------- Referencias DOM ----------
  const authView = document.getElementById('authView');
  const appView = document.getElementById('appView');
  const whoami = document.getElementById('whoami');

  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const authError = document.getElementById('authError');

  const addForm = document.getElementById('addForm');
  const newTitle = document.getElementById('newTitle');
  const entriesList = document.getElementById('entriesList');

  function showError(msg){
    authError.textContent = msg;
    authError.classList.add('show');
  }
  function clearError(){
    authError.classList.remove('show');
    authError.textContent = '';
  }

  // ---------- Tabs de auth ----------
  tabLogin.addEventListener('click', () => {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    clearError();
  });
  tabRegister.addEventListener('click', () => {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    clearError();
  });

  // ---------- Registro ----------
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearError();

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const password = document.getElementById('regPassword').value;

    if(!name || !email || !password){
      showError('Completa todos los campos.');
      return;
    }

    const users = getUsers();
    if(users.some(u => u.email === email)){
      showError('Ese correo ya está registrado.');
      return;
    }

    const user = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2,7),
      name,
      email,
      passwordHash: simpleHash(password)
    };
    users.push(user);
    saveUsers(users);

    setSession({ id: user.id, name: user.name, email: user.email });
    registerForm.reset();
    renderApp();
  });

  // ---------- Login ----------
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearError();

    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    const users = getUsers();
    const user = users.find(u => u.email === email);

    if(!user || user.passwordHash !== simpleHash(password)){
      showError('Correo o contraseña incorrectos.');
      return;
    }

    setSession({ id: user.id, name: user.name, email: user.email });
    loginForm.reset();
    renderApp();
  });

  // ---------- Logout ----------
  function logout(){
    clearSession();
    renderApp();
  }

  // ---------- CRUD de entradas ----------
  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const session = getSession();
    if(!session) return;

    const title = newTitle.value.trim();
    if(!title) return;

    const items = getItems(session.id);
    items.unshift({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2,5),
      title,
      done: false,
      createdAt: new Date().toISOString()
    });
    saveItems(session.id, items);
    newTitle.value = '';
    renderEntries();
  });

  function toggleDone(id){
    const session = getSession();
    if(!session) return;
    const items = getItems(session.id);
    const idx = items.findIndex(i => i.id === id);
    if(idx === -1) return;
    items[idx].done = !items[idx].done;
    saveItems(session.id, items);
    renderEntries();
  }

  function editEntry(id){
    const session = getSession();
    if(!session) return;
    const items = getItems(session.id);
    const idx = items.findIndex(i => i.id === id);
    if(idx === -1) return;

    const nuevo = prompt('Editar entrada:', items[idx].title);
    if(nuevo === null) return;
    const trimmed = nuevo.trim();
    if(!trimmed) return;

    items[idx].title = trimmed;
    saveItems(session.id, items);
    renderEntries();
  }

  function deleteEntry(id){
    const session = getSession();
    if(!session) return;
    if(!confirm('¿Eliminar esta entrada?')) return;

    let items = getItems(session.id);
    items = items.filter(i => i.id !== id);
    saveItems(session.id, items);
    renderEntries();
  }

  function renderEntries(){
    const session = getSession();
    if(!session) return;
    const items = getItems(session.id);

    entriesList.innerHTML = '';

    if(items.length === 0){
      entriesList.innerHTML = `
        <li class="empty-state">
          <strong>Aún no hay entradas</strong>
          Añade la primera arriba para empezar tu bitácora.
        </li>`;
      return;
    }

    items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'entry' + (item.done ? ' done' : '');

      const stamp = document.createElement('button');
      stamp.className = 'stamp';
      stamp.type = 'button';
      stamp.title = item.done ? 'Marcar como pendiente' : 'Marcar como hecha';
      stamp.textContent = item.done ? '✓' : '';
      stamp.addEventListener('click', () => toggleDone(item.id));

      const body = document.createElement('div');
      body.className = 'entry-body';
      const titleEl = document.createElement('div');
      titleEl.className = 'entry-title';
      titleEl.textContent = item.title;
      body.appendChild(titleEl);

      const actions = document.createElement('div');
      actions.className = 'entry-actions';

      const editBtn = document.createElement('button');
      editBtn.className = 'icon-btn';
      editBtn.type = 'button';
      editBtn.textContent = 'Editar';
      editBtn.addEventListener('click', () => editEntry(item.id));

      const delBtn = document.createElement('button');
      delBtn.className = 'icon-btn';
      delBtn.type = 'button';
      delBtn.textContent = 'Eliminar';
      delBtn.addEventListener('click', () => deleteEntry(item.id));

      actions.appendChild(editBtn);
      actions.appendChild(delBtn);

      li.appendChild(stamp);
      li.appendChild(body);
      li.appendChild(actions);
      entriesList.appendChild(li);
    });
  }

  // ---------- Render general ----------
  function renderApp(){
    const session = getSession();

    if(session){
      authView.classList.add('hidden');
      appView.classList.remove('hidden');
      whoami.innerHTML = `<span>${session.name}</span><button id="logoutBtn" type="button">Salir</button>`;
      document.getElementById('logoutBtn').addEventListener('click', logout);
      renderEntries();
    } else {
      appView.classList.add('hidden');
      authView.classList.remove('hidden');
      whoami.innerHTML = '';
    }
  }

  renderApp();
})();