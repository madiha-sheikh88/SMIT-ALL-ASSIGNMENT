// ==================== PNCA AUTH (shared by every page) — START ====================
// Load this file on EVERY page that needs to know who is signed in.
//
// localStorage keys used:
//   pnca_users    -> array of all registered accounts
//   pnca_session  -> the person currently signed in (or missing if nobody is)
//
// IMPORTANT: localStorage lives in the visitor's own browser and can be edited by
// anyone with DevTools. That is fine for learning / a demo, but it is NOT real
// security. A real site needs a backend + database and hashed passwords.

(function () {
  const USERS_KEY = "pnca_users";
  const SESSION_KEY = "pnca_session";

  // The one built-in admin account (change these!). Normal sign-up can never create an admin.
  const ADMIN = {
    id: "admin-1",
    name: "Admin",
    email: "admin@pnca.pk",
    phone: "",
    password: "Admin@123",
    role: "admin"
  };

  // ---------- tiny helpers to read/write JSON safely ----------
  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback; // corrupted data or storage blocked
    }
  }
  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // ---------- users ----------
  function getUsers() {
    return read(USERS_KEY, []);
  }

  // make sure the admin account exists (runs on every page load, harmless if already there)
  function seedAdmin() {
    const users = getUsers();
    if (!users.some((u) => u.role === "admin")) {
      users.push(ADMIN);
      write(USERS_KEY, users);
    }
  }

  function register({ name, email, phone, password }) {
    name = (name || "").trim();
    email = (email || "").trim().toLowerCase();
    phone = (phone || "").trim();

    if (name.length < 2) return { ok: false, error: "Please enter your name." };
    if (!/^\S+@\S+\.\S+$/.test(email)) return { ok: false, error: "Please enter a valid email." };
    if (!/^[0-9+\-\s]{7,15}$/.test(phone)) return { ok: false, error: "Please enter a valid phone number." };
    if ((password || "").length < 6) return { ok: false, error: "Password must be at least 6 characters." };

    const users = getUsers();
    if (users.some((u) => u.email === email)) {
      return { ok: false, error: "An account with this email already exists." };
    }

    users.push({
      id: "u-" + Date.now().toString(36),
      name, email, phone, password,
      role: "user",               // always "user" from the form
      createdAt: new Date().toISOString()
    });
    write(USERS_KEY, users);
    return { ok: true };
  }

  // ---------- session ----------
  function login(email, password) {
    email = (email || "").trim().toLowerCase();
    const user = getUsers().find((u) => u.email === email && u.password === password);
    if (!user) return { ok: false, error: "Wrong email or password." };

    // the session never stores the password
    write(SESSION_KEY, { id: user.id, name: user.name, email: user.email, role: user.role });
    return { ok: true, user: user };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  function currentUser() {
    return read(SESSION_KEY, null);
  }

  // Use on protected pages (dashboards): requireRole("admin", "sign-in.html")
  function requireRole(role, redirectTo) {
    const u = currentUser();
    if (!u || (role && u.role !== role)) {
      window.location.replace(redirectTo || "sign-in.html");
      return null;
    }
    return u;
  }

  // where each role lands (create these pages later)
  function dashboardFor(user) {
    return user && user.role === "admin" ? "admin-dashboard.html" : "user-dashboard.html";
  }

  // ---------- navbar: show "Sign In" or "<name> ▾" ----------
  // Fills every element with data-auth-slot. The "Sign In" link you already
  // have inside it stays as the fallback if this script doesn't run.
  function renderNavbar() {
    const user = currentUser();
    document.querySelectorAll("[data-auth-slot]").forEach((slot) => {
      slot.textContent = ""; // clear

      if (!user) {
        const a = document.createElement("a");
        a.href = "sign-in.html";
        a.className = "btn btn-glow";
        a.textContent = "Sign In";
        slot.appendChild(a);
        return;
      }

      const isAdmin = user.role === "admin";
      const label = isAdmin ? "Admin" : user.name.split(" ")[0];

      const wrap = document.createElement("div");
      wrap.className = "dropdown";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-glow dropdown-toggle auth-user-btn";
      btn.setAttribute("data-bs-toggle", "dropdown");
      btn.setAttribute("aria-expanded", "false");

      const icon = document.createElement("i");
      icon.className = "bi bi-person-circle";
      const text = document.createElement("span");
      text.style.color = "#fff"; // your global "span" colour is muted grey
      text.textContent = label;
      btn.append(icon, text);

      const menu = document.createElement("ul");
      menu.className = "dropdown-menu dropdown-menu-end dropdown-menu-dark";

      const info = document.createElement("li");
      const infoText = document.createElement("span");
      infoText.className = "dropdown-item-text small";
      infoText.textContent = "Signed in as " + (isAdmin ? "Admin" : user.name);
      info.appendChild(infoText);

      const dash = document.createElement("li");
      const dashLink = document.createElement("a");
      dashLink.className = "dropdown-item";
      dashLink.href = dashboardFor(user);
      dashLink.textContent = "My Dashboard";
      dash.appendChild(dashLink);

      const out = document.createElement("li");
      const outBtn = document.createElement("button");
      outBtn.type = "button";
      outBtn.className = "dropdown-item";
      outBtn.textContent = "Log out";
      outBtn.addEventListener("click", () => {
        logout();
        window.location.href = "index.html";
      });
      out.appendChild(outBtn);

      const divider = document.createElement("li");
      divider.innerHTML = '<hr class="dropdown-divider">';

      menu.append(info, divider, dash, out);
      wrap.append(btn, menu);
      slot.appendChild(wrap);
    });
  }

  seedAdmin();
  renderNavbar();

  // expose a small public API: PNCA.register(...), PNCA.login(...), PNCA.currentUser() ...
  window.PNCA = { register, login, logout, currentUser, requireRole, dashboardFor, renderNavbar };
})();
// ==================== PNCA AUTH (shared by every page) — END ====================
