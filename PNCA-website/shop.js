// =====================================================================================
// cart + ticket requests + ticket popup + user & admin dashboards

(function () {

  // ==================== SECTION 1: SETTINGS + EVENT DATA — START ====================
 
  const ORDERS_KEY = "pnca_orders";   
  const MAX_PER_EVENT = 10;          

  const EVENTS = [
    { id: 1, type: "Exhibition", title: "Colours of Pakistan", img: "./asset/exhibition.webp", date: "Oct 18, 2026", time: "5:00 PM", venue: "PNCA Main Gallery", price: 500 },
    { id: 2, type: "Concert", title: "Sufi Night: Raags of the Indus", img: "./asset/saira-sufi.jpg", date: "Oct 25, 2026", time: "8:00 PM", venue: "PNCA Auditorium", price: 1500 },
    { id: 3, type: "Theatre", title: "Muqaddima: A Stage Story", img: "./asset/muqadma.jpg", date: "Nov 02, 2026", time: "7:30 PM", venue: "PNCA Theatre Hall", price: 1000 },
    { id: 4, type: "Workshop", title: "Cyanotype Printing Masterclass", img: "./asset/cyanotype-workshop.heic", date: "Nov 09, 2026", time: "11:00 AM", venue: "Studio Hall B", price: 2000 },
    { id: 5, type: "Concert", title: "Shaam-E-Mouseeqi", img: "./asset/shame-moseequi.jpg", date: "Nov 15, 2026", time: "6:00 PM", venue: "Open Air Courtyard", price: 700 },
    { id: 6, type: "Film", title: "Posheeda Qadam", img: "./asset/babey-lok.heic", date: "Nov 28, 2026", time: "3:00 PM", venue: "PNCA Screening Room", price: 3000 }
  ];
  // ==================== SECTION 1: SETTINGS + EVENT DATA — END ====================


  // ==================== SECTION 2: SMALL HELPER FUNCTIONS — START ====================

  function byId(id) {
    return document.getElementById(id);
  }

  
  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);       // the saved text, or null if nothing saved
      return raw ? JSON.parse(raw) : fallback;     // "if raw has text, parse it, otherwise fallback"
    } catch (e) {
      return fallback;                             // text was corrupted -> don't crash the page
    }
  }

  // Save to localStorage. JSON.stringify turns arrays/objects into text so they can be stored.
  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // 1500 -> "Rs. 1,500". toLocaleString puts the commas in.
  function money(n) {
    return "Rs. " + Number(n).toLocaleString("en-US");
  }


  function esc(text) {
    return String(text).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function findEvent(id) {
    return EVENTS.find(function (e) { return e.id === Number(id); });
  }


  function niceDate(iso) {
    return new Date(iso).toLocaleString("en-GB", {
      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  }

  // ----- popups (your existing .ev-modal style: it is shown when it has the class "open") -----
  function openModal(el) { el.classList.add("open"); }
  function closeModal(el) { el.classList.remove("open"); }

  // One listener on the whole page handles EVERY popup's closing:
  function wireModals() {
    document.addEventListener("click", function (ev) {
      // 1) any element with the attribute data-close closes the popup it sits inside
      const closer = ev.target.closest("[data-close]");
      if (closer) closeModal(closer.closest(".ev-modal"));

      // 2) clicking the dark background itself (not the content) also closes it
      if (ev.target.classList.contains("ev-modal")) closeModal(ev.target);
    });

    // 3) the Escape key closes every open popup
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") {
        document.querySelectorAll(".ev-modal.open").forEach(closeModal);
      }
    });
  }
  // ==================== SECTION 2: SMALL HELPER FUNCTIONS — END ====================


  // ==================== SECTION 3: THE CART — START ====================
  // Each signed-in user gets their own cart, so the key includes their id: "pnca_cart_u-abc123".
  function cartKey() {
    const user = PNCA.currentUser();                // PNCA.currentUser() comes from auth.js
    return user ? "pnca_cart_" + user.id : null;    // nobody signed in -> no cart
  }

  // Get the cart array. filter() throws away any line whose event no longer exists.
  function getCart() {
    const key = cartKey();
    if (!key) return [];
    return read(key, []).filter(function (line) { return findEvent(line.eventId); });
  }

  // Save the cart, then refresh the little number on the cart button.
  function saveCart(cart) {
    const key = cartKey();
    if (key) write(key, cart);
    updateBadge();
  }

  // Add `qty` tickets of an event. If that event is already in the cart, increase its quantity.
  function addToCart(eventId, qty) {
    const cart = getCart();
    const line = cart.find(function (l) { return l.eventId === eventId; });   // already there?
    if (line) {
      line.qty = Math.min(MAX_PER_EVENT, line.qty + qty);                     // never above the max
    } else {
      cart.push({ eventId: eventId, qty: Math.min(MAX_PER_EVENT, qty) });     // new line
    }
    saveCart(cart);
  }

  // Set an exact quantity for one line. 0 or less removes the line.
  function setLineQty(eventId, qty) {
    let cart = getCart();
    if (qty < 1) {
      // keep every line EXCEPT the one we are removing
      cart = cart.filter(function (l) { return l.eventId !== eventId; });
    } else {
      const line = cart.find(function (l) { return l.eventId === eventId; });
      if (line) line.qty = Math.min(MAX_PER_EVENT, qty);
    }
    saveCart(cart);
  }

  // How many tickets in total (shown on the cart button).
  // reduce() walks through the list keeping a running total (`sum`), starting from 0.
  function cartCount() {
    return getCart().reduce(function (sum, l) { return sum + l.qty; }, 0);
  }

  // Grand total in rupees. The price is looked up from EVENTS every time, never from the screen.
  function cartTotal() {
    return getCart().reduce(function (sum, l) {
      return sum + findEvent(l.eventId).price * l.qty;
    }, 0);
  }

  // Update the red/orange number bubble on the floating cart button (only exists on events.html).
  function updateBadge() {
    const badge = byId("cartBadge");
    if (!badge) return;                              // this page has no cart button -> do nothing
    const n = cartCount();
    badge.textContent = n;
    badge.classList.toggle("show", n > 0);           // show the bubble only when the cart has tickets
  }
  // ==================== SECTION 3: THE CART — END ====================


  // ==================== SECTION 4: ORDERS (requests to buy) — START ====================
  function getOrders() { 
    return read(ORDERS_KEY, []); 
  }
  function saveOrders(orders) { write(ORDERS_KEY, orders); }

  // Turn the current cart into a new "pending" order.
  function createOrder() {
    const user = PNCA.currentUser();
    const cart = getCart();
    if (!user || cart.length === 0)
      return null;     // nothing to send

    // map() builds a NEW list from the cart. We copy the title/price/date into the order
    // ("snapshot") so the order stays correct even if the event list changes later.
    const items = cart.map(function (l) {
      const e = findEvent(l.eventId);
      return {
        eventId: e.id, type: e.type, title: e.title, date: e.date, time: e.time,
        venue: e.venue, price: e.price, qty: l.qty
      };
    });

    const order = {
      id: "ORD-" + Date.now().toString(36).toUpperCase(),   // unique-ish id from the current time
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      createdAt: new Date().toISOString(),
      status: "pending",                                    // pending -> approved / rejected
      items: items,
      total: items.reduce(function (sum, i) { return sum + i.price * i.qty; }, 0),
      tickets: []                                           // filled in when the admin approves
    };

    const orders = getOrders();
    orders.push(order);
    saveOrders(orders);
    saveCart([]);                                           // the cart is now empty
    return order;
  }

  // Seat numbers: count how many tickets of this event already exist, the next seat is that + 1.
  function nextSeat(eventId, orders) {
    let used = 0;
    orders.forEach(function (o) {
      o.tickets.forEach(function (t) { if (t.eventId === eventId) used++; });
    });
    return used + 1;
  }

  // ADMIN ONLY: approve a pending order and create one ticket per seat.
  function approveOrder(orderId) {
    const me = PNCA.currentUser();
    if (!me || me.role !== "admin") return;                 // safety: only the admin may do this

    const orders = getOrders();
    const order = orders.find(function (o) { return o.id === orderId; });
    if (!order || order.status !== "pending") return;       // only pending orders can be approved

    let number = 0;                                         // ticket number inside this order
    order.tickets = [];
    order.items.forEach(function (item) {
      for (let i = 0; i < item.qty; i++) {                  // repeat once per ticket bought
        number++;
        order.tickets.push({
          code: order.id + "-T" + number,                   // e.g. ORD-LX3K9A-T2
          eventId: item.eventId, type: item.type, title: item.title,
          date: item.date, time: item.time, venue: item.venue,
          seat: nextSeat(item.eventId, orders)
        });
      }
    });

    order.status = "approved";
    order.decidedAt = new Date().toISOString();
    saveOrders(orders);
  }

  // ADMIN ONLY: reject a pending order.
  function rejectOrder(orderId) {
    const me = PNCA.currentUser();
    if (!me || me.role !== "admin") return;

    const orders = getOrders();
    const order = orders.find(function (o) { return o.id === orderId; });
    if (!order || order.status !== "pending") return;

    order.status = "rejected";
    order.decidedAt = new Date().toISOString();
    saveOrders(orders);
  }
  // ==================== SECTION 4: ORDERS — END ====================


  // ==================== SECTION 5: TICKET POPUP (user dashboard) — START ====================

  let ticketList = [];
  let ticketPos = 0;

  
  function showTicket() {
    const t = ticketList[ticketPos];
    byId("tkType").textContent = t.type;
    byId("tkTitle").textContent = t.title;
    byId("tkName").textContent = t.name;
    byId("tkDate").textContent = t.date;
    byId("tkTime").textContent = t.time;
    byId("tkVenue").textContent = t.venue;
    byId("tkSeat").textContent = t.seat;
    byId("tkId").textContent = t.code;
    byId("tkCount").textContent = "Ticket " + (ticketPos + 1) + " of " + ticketList.length;
  }

  // Open the popup for one order.
  function openTickets(orderId) {
    const user = PNCA.currentUser();
    const order = getOrders().find(function (o) { return o.id === orderId; });

    // SAFETY LOCK: tickets open only if the order exists, belongs to this user, and is approved.
    if (!user || !order || order.userId !== user.id || order.status !== "approved") return;

    // copy each ticket and add the buyer's name to it
    ticketList = order.tickets.map(function (t) {
      return Object.assign({}, t, { name: order.userName });
    });
    ticketPos = 0;
    showTicket();
    openModal(byId("ticketModal"));
  }

  // Previous / Next / Print buttons under the ticket (only exist on user-dashboard.html).
  function initTicketPopup() {
    const modal = byId("ticketModal");
    if (!modal) return;

    byId("tkPrev").addEventListener("click", function () {
      if (ticketPos > 0) { ticketPos--; showTicket(); }
    });
    byId("tkNext").addEventListener("click", function () {
      if (ticketPos < ticketList.length - 1) { ticketPos++; showTicket(); }
    });
    // window.print() opens the browser's print dialog (the CSS print rules hide everything but the ticket)
    byId("tkPrint").addEventListener("click", function () { window.print(); });
  }
  // ==================== SECTION 5: TICKET POPUP — END ====================


  // ==================== SECTION 6: EVENTS PAGE (cards + cart popup) — START ====================
  function initEventsPage() {
    const grid = byId("eventGrid");
    if (!grid) return;                                  
    grid.innerHTML = EVENTS.map(function (e) {
      return `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="ev-outer">
          <div class="ev-dot"></div>
          <div class="ev-card">
            <div class="ev-ray"></div>
            <div class="ev-card-img">
              <i class="bi bi-image"></i>
              <img src="${e.img}" alt="${e.title}" loading="lazy" onerror="this.remove()">
            </div>
            <div class="ev-card-body">
              <span class="ev-tag">${e.type}</span>
              <h3 class="ev-title">${e.title}</h3>
              <ul class="ev-meta">
                <li><strong>Date:</strong> ${e.date}</li>
                <li><strong>Time:</strong> ${e.time}</li>
                <li><strong>Venue:</strong> ${e.venue}</li>
              </ul>
              <div class="ev-price">${money(e.price)} <small>per ticket</small></div>
              <div class="card-actions">
                <div class="qty-box">
                  <button type="button" class="qty-btn" data-act="minus" aria-label="Fewer tickets">&minus;</button>
                  <span class="qty-val">1</span>
                  <button type="button" class="qty-btn" data-act="plus" aria-label="More tickets">+</button>
                </div>
                <button type="button" class="btn btn-glow add-btn" data-id="${e.id}">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    }).join("");


    grid.addEventListener("click", function (ev) {

      // the − / + buttons on a card: only change the number on the card, nothing is saved yet
      const qtyBtn = ev.target.closest(".qty-btn");
      if (qtyBtn) {
        const valEl = qtyBtn.parentElement.querySelector(".qty-val");         // the number between − and +
        let n = Number(valEl.textContent);                                    // text "1" -> number 1
        n += qtyBtn.dataset.act === "plus" ? 1 : -1;                          // plus -> +1, minus -> -1
        valEl.textContent = Math.max(1, Math.min(MAX_PER_EVENT, n));          // keep it between 1 and 10
        return;                                                               // stop here
      }

      // the "Add to Cart" button
      const addBtn = ev.target.closest(".add-btn");
      if (!addBtn) return;                                                    // clicked something else

      if (!PNCA.currentUser()) {                                              // not signed in
        window.location.href = "sign-in.html";
        return;
      }

      const body = addBtn.closest(".ev-card-body");
      const valEl = body.querySelector(".qty-val");
      addToCart(Number(addBtn.dataset.id), Number(valEl.textContent));        // save to the cart

      valEl.textContent = "1";                                                // reset the card's number
      addBtn.textContent = "Added \u2713";                                    // little confirmation
      setTimeout(function () { addBtn.textContent = "Add to Cart"; }, 1200);  // go back after 1.2 seconds
    });

    // ----- 6c) the floating cart button opens the cart popup -----
    byId("cartFab").addEventListener("click", function () {
      if (!PNCA.currentUser()) { window.location.href = "sign-in.html"; return; }
      renderCart();
      openModal(byId("cartModal"));
    });

    // ----- 6d) buttons inside the cart popup (also one delegated listener) -----
    byId("cartBody").addEventListener("click", function (ev) {
      const btn = ev.target.closest("[data-act]");
      if (!btn) return;

      const id = Number(btn.dataset.id);                                      // which event line
      const act = btn.dataset.act;                                            // what to do
      const line = getCart().find(function (l) { return l.eventId === id; });

      if (act === "plus" && line) setLineQty(id, line.qty + 1);
      else if (act === "minus" && line) setLineQty(id, line.qty - 1);
      else if (act === "remove") setLineQty(id, 0);
      else if (act === "send") { sendRequest(); return; }                     // different screen, so stop

      renderCart();                                                           // redraw with new numbers
    });

    updateBadge();                                                            // show the count on page load
  }

  // Draw the inside of the cart popup.
  function renderCart() {
    const body = byId("cartBody");
    const cart = getCart();

    if (cart.length === 0) {
      body.innerHTML = `
        <h3 class="cart-title">Your cart</h3>
        <p class="cart-empty">Your cart is empty. Choose an event and press Add to Cart.</p>
        <button type="button" class="btn btn-glow w-100" data-close>Browse events</button>`;
      return;
    }

    const rows = cart.map(function (l) {
      const e = findEvent(l.eventId);
      return `
        <div class="cart-row">
          <div class="cart-thumb"><img src="${e.img}" alt="" onerror="this.remove()"></div>
          <div class="cart-info">
            <strong>${esc(e.title)}</strong>
            <small>${money(e.price)} each &middot; ${esc(e.date)}</small>
          </div>
          <div class="qty-box">
            <button type="button" class="qty-btn" data-act="minus" data-id="${e.id}" aria-label="Fewer tickets">&minus;</button>
            <span class="qty-val">${l.qty}</span>
            <button type="button" class="qty-btn" data-act="plus" data-id="${e.id}" aria-label="More tickets">+</button>
          </div>
          <div class="cart-line">${money(e.price * l.qty)}</div>
          <button type="button" class="cart-remove" data-act="remove" data-id="${e.id}" aria-label="Remove">
            <i class="bi bi-trash3"></i>
          </button>
        </div>`;
    }).join("");

    body.innerHTML = `
      <h3 class="cart-title">Your cart</h3>
      ${rows}
      <div class="cart-total"><span>Total (${cartCount()} tickets)</span><strong>${money(cartTotal())}</strong></div>
      <p class="cart-note">Your request goes to the admin for approval. Nothing is charged online.</p>
      <button type="button" class="btn btn-glow w-100" data-act="send">Send Request to Buy</button>`;
  }

  // Press "Send Request to Buy": create the order, then show the confirmation inside the same popup.
  function sendRequest() {
    const order = createOrder();
    if (!order) return;

    byId("cartBody").innerHTML = `
      <div class="cart-done">
        <i class="bi bi-check-circle-fill"></i>
        <h3 class="cart-title">Request sent</h3>
        <p>Your request <strong>${esc(order.id)}</strong> for <strong>${money(order.total)}</strong>
           has been forwarded to the admin. Once it is approved you can print your tickets
           from your dashboard.</p>
        <a class="btn btn-glow w-100 mb-2" href="user-dashboard.html">View my requests</a>
        <button type="button" class="btn btn-outline-secondary w-100" data-close>Keep browsing</button>
      </div>`;
  }
  // ==================== SECTION 6: EVENTS PAGE — END ====================


  // ==================== SECTION 7: DASHBOARD ENGINE (shared by both dashboards) — START ====================
  // Everything in this section is used by BOTH the user dashboard and the admin dashboard,
  // so we write it once.

  // A coloured badge: "Pending" / "Approved" / "Rejected" (colours come from CSS: st-pending etc.)
  function statusBadge(status) {
    const label = { pending: "Pending", approved: "Approved", rejected: "Rejected" }[status] || status;
    return `<span class="st-badge st-${esc(status)}">${label}</span>`;
  }

  
  function itemsList(order) {
    return `<ul class="ord-items">` + order.items.map(function (i) {
      return `<li><span>${i.qty} &times; ${esc(i.title)}</span><b>${money(i.price * i.qty)}</b></li>`;
    }).join("") + `</ul>`;
  }

  // One small number box, used in the Overview panel: statBox("Pending", 3)
  function statBox(label, value) {
    return `<div class="dash-stat"><b>${value}</b><span>${label}</span></div>`;
  }


  function greetingWord() {
    const hour = new Date().getHours();              // 0 to 23
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }


  function setGreeting(user) {
    // user.name is "Ali Khan" -> split(" ") makes ["Ali","Khan"] -> [0] is "Ali"
    const first = user.role === "admin" ? "Admin" : user.name.split(" ")[0];
    byId("dashGreet").textContent = greetingWord();
    byId("dashName").textContent = first;
    byId("helloWord").textContent = greetingWord();
    byId("helloName").textContent = first;
  }


  function initSidebar() {
    const navButtons = document.querySelectorAll(".dash-nav [data-panel]");   // only the sidebar buttons
    const anyButtons = document.querySelectorAll("[data-panel]");             // sidebar + "View all" links
    const panels = document.querySelectorAll(".dash-panel");

    function show(name) {
      if (!byId("panel-" + name)) name = "overview";                          // unknown name -> Overview
      panels.forEach(function (p) {
        p.classList.toggle("active", p.id === "panel-" + name);               // true only for the chosen one
      });
      navButtons.forEach(function (b) {
        b.classList.toggle("active", b.dataset.panel === name);               // highlight its sidebar button
      });
      history.replaceState(null, "", "#" + name);                             // URL becomes ...#requests
    }

    anyButtons.forEach(function (b) {
      b.addEventListener("click", function () { show(b.dataset.panel); });
    });

    // the Log out button in the sidebar
    byId("dashLogout").addEventListener("click", function () {
      PNCA.logout();
      window.location.href = "index.html";
    });

    // when the page opens, jump to the panel named in the URL (#requests), else Overview
    show(location.hash.slice(1) || "overview");
  }

  // -----SEARCH + FILTER + SORT for the requests list -----
 
  function applyFilters(orders) {
    const q = byId("fSearch").value.trim().toLowerCase();    // what was typed, lower-case, no side spaces
    const status = byId("fStatus").value;                    // "all", "pending", "approved" or "rejected"
    const sort = byId("fSort").value;                        // "newest", "oldest", "high", "low", "pending"

    // filter() keeps an order only if the function returns true for it
    const list = orders.filter(function (o) {
      if (status !== "all" && o.status !== status) return false;    // STATUS FILTER
      if (q === "") return true;                                    // nothing typed -> keep everything

      // SEARCH: glue the searchable words of the order into one long lower-case text...
      const haystack = [o.id, o.userName, o.userEmail, o.status]
        .concat(o.items.map(function (i) { return i.title; }))      // ...plus every event title
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);                                  // ...and check it contains what was typed
    });

    // SORT
    list.sort(function (a, b) {
      if (sort === "oldest") return a.createdAt.localeCompare(b.createdAt);   // older date first
      if (sort === "high") return b.total - a.total;                          // bigger total first
      if (sort === "low") return a.total - b.total;                           // smaller total first
      if (sort === "pending") {
        // pending first (0 beats 1); if both are in the same group the difference is 0,
        // and || moves on to the second rule: newest first
        return (a.status === "pending" ? 0 : 1) - (b.status === "pending" ? 0 : 1)
          || b.createdAt.localeCompare(a.createdAt);
      }
      return b.createdAt.localeCompare(a.createdAt);                          // default: newest first
    });

    return list;
  }

  // Connects the controls: whenever the person types or changes a choice, run `render` again.
  function wireToolbar(render) {
    byId("fSearch").addEventListener("input", render);       // "input" fires on every keystroke
    byId("fStatus").addEventListener("change", render);      // "change" fires when a choice is picked
    byId("fSort").addEventListener("change", render);
    byId("fReset").addEventListener("click", function () {   // "Clear" button
      byId("fSearch").value = "";
      byId("fStatus").value = "all";
      byId("fSort").value = byId("fSort").dataset.default;   // back to this page's default sort
      render();
    });
  }

  // One order card. mode is "user" or "admin": same card, different message/buttons at the bottom.
  function orderCard(o, mode, users) {
    let bottom = "";
    let buyer = "";

    if (mode === "user") {
      if (o.status === "pending") {
        bottom = `<p class="ord-msg">Waiting for the admin to review your request.</p>`;
      } else if (o.status === "approved") {
        bottom = `<p class="ord-msg ok">Request approved. Print your ticket(s) now. You can pay directly at the
                  PNCA counter or at any branch of the bank. Quote order number ${esc(o.id)}.</p>
                  <button type="button" class="btn btn-glow btn-sm" data-tickets="${esc(o.id)}">
                    <i class="bi bi-printer"></i> View &amp; print tickets</button>`;
      } else {
        bottom = `<p class="ord-msg bad">Sorry, this request was not approved. You can send a new request from the events page.</p>`;
      }
    } else {
      const person = users.find(function (u) { return u.id === o.userId; });   // look up the customer's phone
      const phone = person && person.phone ? " &middot; " + esc(person.phone) : "";
      buyer = `<p class="ord-buyer">${esc(o.userName)} &middot; ${esc(o.userEmail)}${phone}</p>`;

      if (o.status === "pending") {
        bottom = `<div class="ord-actions">
                    <button type="button" class="btn btn-glow btn-sm" data-approve="${esc(o.id)}">Approve</button>
                    <button type="button" class="btn btn-outline-danger btn-sm" data-reject="${esc(o.id)}">Reject</button>
                  </div>`;
      } else {
        bottom = `<p class="ord-msg">Decided ${niceDate(o.decidedAt)}${o.status === "approved" ? " &middot; " + o.tickets.length + " ticket(s) issued" : ""}</p>`;
      }
    }

    return `
      <article class="ord-card">
        <header class="ord-head">
          <div><strong>${esc(o.id)}</strong><small>${niceDate(o.createdAt)}</small></div>
          ${statusBadge(o.status)}
        </header>
        ${buyer}
        ${itemsList(o)}
        <div class="ord-total"><span>Total</span><strong>${money(o.total)}</strong></div>
        ${bottom}
      </article>`;
  }

  // Draw the full requests list (Requests panel) after applying search / filter / sort.
  function renderRequestList(all, mode, users) {
    const box = byId("orderList");
    const list = applyFilters(all);

    byId("fCount").textContent = "Showing " + list.length + " of " + all.length + " requests";

    if (all.length === 0) {                                  // the person has no orders at all
      box.innerHTML = mode === "user"
        ? `<p class="dash-empty">You have not sent any ticket requests yet. <a href="events.html">Browse events</a></p>`
        : `<p class="dash-empty">No ticket requests yet.</p>`;
      return;
    }
    if (list.length === 0) {                                 // orders exist, but none match the filters
      box.innerHTML = `<p class="dash-empty">No requests match your search or filter. Press Clear to see everything.</p>`;
      return;
    }
    box.innerHTML = list.map(function (o) { return orderCard(o, mode, users); }).join("");
  }

  // -----  THE CHART (Chart.js) -----

  let chartObj = null;      
  let chartData = null;    
  let chartKey = "";       

 
  function cssVar(name, fallback) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
  }

  function drawChart(orders) {
    const canvas = byId("mainChart");
    // stop quietly if this page has no chart, or the Chart.js file failed to load
    if (!canvas || typeof Chart === "undefined") return;

    chartData = orders;                                    // remember for the theme watcher

 
    const counts = EVENTS.map(function (e) {
      let total = 0;
      orders.forEach(function (o) {
        if (o.status === "rejected") return;               // inside forEach, "return" = skip this order
        o.items.forEach(function (item) {
          if (item.eventId === e.id) total += item.qty;    // add the quantity of matching lines
        });
      });
      return total;
    });
    const labels = EVENTS.map(function (e) { return e.title; });   // the names shown next to the bars

   
    const theme = document.documentElement.getAttribute("data-theme") || "light";
    const key = theme + "|" + counts.join(",");
    if (key === chartKey && chartObj) return;
    chartKey = key;

    // 3) A canvas can hold only one chart, so remove the old one first.
    if (chartObj) chartObj.destroy();

    // 4) COLOURS come from your CSS variables, so they follow dark / light mode.
    const accent = cssVar("--accent", "#EA580C");                     // burnt orange bars
    const accentAlt = cssVar("--accent-alt", "#955D20");              // darker orange when you hover a bar
    const muted = cssVar("--muted", "#8a8f98");                       // numbers on the axis
    const heading = cssVar("--heading", "#111111");                   // event names (white in dark, black in light)
    const grid = cssVar("--border", "rgba(128,128,128,0.2)");                       // faint grid lines

    // 5) CREATE THE CHART. new Chart(canvas, { type, data, options })
    chartObj = new Chart(canvas, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Tickets requested",
          data: counts,                                    // one number per label
          backgroundColor: accent,
          hoverBackgroundColor: accentAlt,
          borderRadius: 8,                                 // rounded bar ends
          borderSkipped: false                             // round ALL corners, not just the top
        }]
      },
      options: {
        indexAxis: "y",                                    // horizontal bars, so long names fit
        responsive: true,                                  // resizes with its box
        maintainAspectRatio: false,                        // use the height we set in CSS (.dash-chart-box)
        animation: { duration: 900 },                      // bars grow in over 0.9 seconds
        plugins: {
          legend: { display: false },                      // one dataset, so no legend needed
          tooltip: {                                       // the little box that appears on hover
            callbacks: {
              label: function (ctx) { return ctx.parsed.x + " ticket(s)"; }   // "3 ticket(s)"
            }
          }
        },
        scales: {
          x: {                                             // the number axis (bottom)
            beginAtZero: true,
            ticks: { color: muted, precision: 0 },         // precision 0 = whole numbers only
            grid: { color: grid }
          },
          y: {                                             // the names axis (left)
            ticks: { color: heading },
            grid: { display: false }
          }
        }
      }
    });
  }


  function watchTheme() {
    new MutationObserver(function () {
      if (chartData) drawChart(chartData);
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }

  // ----- "Upcoming events" picture strip (user overview) -----

  function renderEventStrip() {
    const box = byId("eventStrip");
    if (!box) return;                                      // this page has no strip
    box.innerHTML = EVENTS.filter(function (e) { return /\.(jpe?g|webp|png)$/i.test(e.img); })
      .slice(0, 3)                                         // keep the first three
      .map(function (e) {
        return `
        <a class="strip-card" href="events.html">
          <div class="strip-img"><img src="${e.img}" alt="${esc(e.title)}" loading="lazy" onerror="this.remove()"></div>
          <div class="strip-body">
            <strong>${esc(e.title)}</strong>
            <small>${esc(e.date)} &middot; ${money(e.price)}</small>
          </div>
        </a>`;
      }).join("");
  }

  // ==================== SECTION 7: DASHBOARD ENGINE — END ====================


  // ==================== SECTION 8: USER DASHBOARD — START ====================
  function initUserDashboard() {
    const app = byId("userApp");
    if (!app) return;                                        // not on user-dashboard.html

    // requireRole(null, ...) means "any signed-in person"; otherwise it sends them to sign-in.html
    const user = PNCA.requireRole(null, "sign-in.html");
    if (!user) return;

    setGreeting(user);
    initSidebar();

    // Overview panel: number boxes + the 3 latest requests
    function renderOverview(mine) {
      const approved = mine.filter(function (o) { return o.status === "approved"; });
      const tickets = approved.reduce(function (sum, o) { return sum + o.tickets.length; }, 0);
      const amount = approved.reduce(function (sum, o) { return sum + o.total; }, 0);

      byId("statGrid").innerHTML =
        statBox("Requests sent", mine.length) +
        statBox("Pending", mine.filter(function (o) { return o.status === "pending"; }).length) +
        statBox("Approved", approved.length) +
        statBox("Tickets ready", tickets) +
        statBox("Approved amount", money(amount));

      // slice() makes a copy so sorting does not disturb the original; newest first; keep 3
      const latest = mine.slice().sort(function (a, b) {
        return b.createdAt.localeCompare(a.createdAt);
      }).slice(0, 3);

      byId("recentList").innerHTML = latest.length
        ? latest.map(function (o) { return orderCard(o, "user", []); }).join("")
        : `<p class="dash-empty">Nothing here yet. <a href="events.html">Browse events</a> and add tickets to your cart.</p>`;
    }

    function render() {
      // keep only MY orders
      const mine = getOrders().filter(function (o) { return o.userId === user.id; });
      renderOverview(mine);
      drawChart(mine);                                       // the chart (only MY tickets)
      renderEventStrip();                                    // the three picture cards
      renderRequestList(mine, "user", []);
    }

    wireToolbar(render);
    render();

    // clicking "View & print tickets" on any card (one delegated listener for the whole app)
    app.addEventListener("click", function (ev) {
      const btn = ev.target.closest("[data-tickets]");
      if (btn) openTickets(btn.dataset.tickets);
    });

    // Refresh automatically:
    //  - "storage" fires when ANOTHER browser tab changes localStorage (admin approving in his tab)
    //  - "focus" fires when the user comes back to this tab
    window.addEventListener("storage", render);
    window.addEventListener("focus", render);
  }
  // ==================== SECTION 8: USER DASHBOARD — END ====================


  // ==================== SECTION 9: ADMIN DASHBOARD — START ====================
  function initAdminDashboard() {
    const app = byId("adminApp");
    if (!app) return;                                        // not on admin-dashboard.html

    // only the admin may stay on this page; everyone else is sent to sign-in.html
    const admin = PNCA.requireRole("admin", "sign-in.html");
    if (!admin) return;

    setGreeting(admin);
    initSidebar();


    function renderOverview(orders, users) {
      const count = function (s) { return orders.filter(function (o) { return o.status === s; }).length; };
      const approved = orders.filter(function (o) { return o.status === "approved"; });
      const value = approved.reduce(function (sum, o) { return sum + o.total; }, 0);
      const tickets = approved.reduce(function (sum, o) { return sum + o.tickets.length; }, 0);
      const customers = users.filter(function (u) { return u.role !== "admin"; }).length;

      byId("statGrid").innerHTML =
        statBox("Pending", count("pending")) +
        statBox("Approved", count("approved")) +
        statBox("Rejected", count("rejected")) +
        statBox("Tickets issued", tickets) +
        statBox("Approved value", money(value)) +
        statBox("Customers", customers);

      const waiting = orders.filter(function (o) { return o.status === "pending"; })
        .sort(function (a, b) { return b.createdAt.localeCompare(a.createdAt); })
        .slice(0, 3);

      byId("recentList").innerHTML = waiting.length
        ? waiting.map(function (o) { return orderCard(o, "admin", users); }).join("")
        : `<p class="dash-empty">All caught up. No requests are waiting for approval.</p>`;
    }


    function renderCustomers(orders, users) {
      const q = byId("cSearch").value.trim().toLowerCase();
      const filter = byId("cFilter").value;                  // "all", "with", "without"
      const sort = byId("cSort").value;                      // "newest", "name", "most"

      // one row per customer (not admin): { person, requests, tickets }
      let rows = users.filter(function (u) { return u.role !== "admin"; }).map(function (u) {
        const theirs = orders.filter(function (o) { return o.userId === u.id; });
        return {
          person: u,
          requests: theirs.length,
          tickets: theirs.reduce(function (sum, o) { return sum + o.tickets.length; }, 0)
        };
      });

      rows = rows.filter(function (r) {
        if (filter === "with" && r.requests === 0) return false;       // FILTER: only people who sent requests
        if (filter === "without" && r.requests > 0) return false;      // FILTER: only people who never did
        if (q === "") return true;
        // SEARCH in name, email and phone
        return (r.person.name + " " + r.person.email + " " + r.person.phone).toLowerCase().includes(q);
      });

      rows.sort(function (a, b) {
        if (sort === "name") return a.person.name.localeCompare(b.person.name);   // A to Z
        if (sort === "most") return b.requests - a.requests;                      // most requests first
        return (b.person.createdAt || "").localeCompare(a.person.createdAt || ""); // newest sign-up first
      });

      byId("cCount").textContent = "Showing " + rows.length + " customers";

      byId("customerList").innerHTML = rows.length
        ? `<div class="table-wrap"><table class="dash-table">
             <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Requests</th><th>Tickets</th></tr></thead>
             <tbody>` + rows.map(function (r) {
          return `<tr><td>${esc(r.person.name)}</td><td>${esc(r.person.email)}</td>
                    <td>${esc(r.person.phone || "-")}</td><td>${r.requests}</td><td>${r.tickets}</td></tr>`;
        }).join("") + `</tbody></table></div>`
        : `<p class="dash-empty">No customers match your search or filter.</p>`;
    }

    function render() {
      const orders = getOrders();
      const users = read("pnca_users", []);
      renderOverview(orders, users);
      drawChart(orders);                                     // the chart (everyone's tickets)
      renderRequestList(orders, "admin", users);
      renderCustomers(orders, users);
    }

    wireToolbar(render);                                     // search/filter/sort for requests
    byId("cSearch").addEventListener("input", render);       // ...and for customers
    byId("cFilter").addEventListener("change", render);
    byId("cSort").addEventListener("change", render);
    render();

    // Approve / Reject buttons work on the cards in BOTH the Overview and the Requests panel
    app.addEventListener("click", function (ev) {
      const approve = ev.target.closest("[data-approve]");
      const reject = ev.target.closest("[data-reject]");
      if (approve) approveOrder(approve.dataset.approve);    // data-approve="ORD-XXXX" -> "ORD-XXXX"
      if (reject) rejectOrder(reject.dataset.reject);
      if (approve || reject) render();                       // redraw so the new status shows everywhere
    });

    // a new request from a user (in another tab) appears without refreshing
    window.addEventListener("storage", render);
  }
  // ==================== SECTION 9: ADMIN DASHBOARD — END ====================


  // ==================== SECTION 10: START EVERYTHING — START ====================
 
  wireModals();
  watchTheme();                                            // redraw the chart when dark/light changes
  initEventsPage();
  initTicketPopup();
  initUserDashboard();
  initAdminDashboard();
  // ==================== SECTION 10: START EVERYTHING — END ====================

})();
