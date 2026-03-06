const API_BASE_URL = "http://localhost:3000";
const STORAGE_SESSION = "earthfiber_session";
const STORAGE_CART = "earthfiber_cart";
const STORAGE_CHAT = "earthfiber_chat_threads";
const STORAGE_META = "earthfiber_product_meta";

const views = {
  home: document.getElementById("view-home"),
  marketplace: document.getElementById("view-marketplace"),
  product: document.getElementById("view-product"),
  artesano: document.getElementById("view-artesano"),
  contacto: document.getElementById("view-contacto"),
  cart: document.getElementById("view-cart"),
  nosotros: document.getElementById("view-nosotros"),
  seller: document.getElementById("view-seller"),
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const rucRegex = /^\d{11}$/;
const placeholderAvatar =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='420'%3E%3Crect width='100%25' height='100%25' fill='%23ddd4c9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b5c50' font-family='Inter,sans-serif' font-size='22'%3EEarth Fiber%3C/text%3E%3C/svg%3E";

let authSession = null;
let allProducts = [];
let filteredProducts = [];
let currentProduct = null;
let cart = [];
let productMeta = {};
let chatThreads = {};

const els = {
  sessionBadge: document.getElementById("sessionBadge"),
  openLoginModal: document.getElementById("openLoginModal"),
  logoutBtn: document.getElementById("logoutBtn"),
  sellerRouteBtn: document.getElementById("sellerRouteBtn"),
  loginModal: document.getElementById("loginModal"),
  tabLogin: document.getElementById("tabLogin"),
  tabRegister: document.getElementById("tabRegister"),
  loginPanel: document.getElementById("loginPanel"),
  registerPanel: document.getElementById("registerPanel"),
  closeLoginModal: document.getElementById("closeLoginModal"),
  closeRegisterModal: document.getElementById("closeRegisterModal"),
  submitLogin: document.getElementById("submitLogin"),
  submitRegister: document.getElementById("submitRegister"),
  loginFeedback: document.getElementById("loginFeedback"),

  productGrid: document.getElementById("productGrid"),
  detailImage: document.getElementById("detailImage"),
  detailName: document.getElementById("detailName"),
  detailPrice: document.getElementById("detailPrice"),
  detailDescription: document.getElementById("detailDescription"),
  detailSize: document.getElementById("detailSize"),
  detailStock: document.getElementById("detailStock"),
  detailArtisan: document.getElementById("detailArtisan"),
  addToCartBtn: document.getElementById("addToCartBtn"),
  buyNowBtn: document.getElementById("buyNowBtn"),
  floatingArtisan: document.getElementById("floatingArtisan"),
  floatingText: document.getElementById("floatingText"),
  floatingImage: document.getElementById("floatingImage"),

  filterType: document.getElementById("filterType"),
  filterGender: document.getElementById("filterGender"),
  filterSize: document.getElementById("filterSize"),
  minPriceInput: document.getElementById("minPriceInput"),
  maxPriceInput: document.getElementById("maxPriceInput"),
  minPriceRange: document.getElementById("minPriceRange"),
  maxPriceRange: document.getElementById("maxPriceRange"),

  sellerProductForm: document.getElementById("sellerProductForm"),
  sellerProductFeedback: document.getElementById("sellerProductFeedback"),
  sellerProfileFeedback: document.getElementById("sellerProfileFeedback"),
  sellerProductImage: document.getElementById("sellerProductImage"),
  sellerProductImagePath: document.getElementById("sellerProductImagePath"),
  sellerImagePreview: document.getElementById("sellerImagePreview"),
  sellerNoStock: document.getElementById("sellerNoStock"),
  sellerProductStock: document.getElementById("sellerProductStock"),

  cartList: document.getElementById("cartList"),
  cartTotal: document.getElementById("cartTotal"),
  checkoutBtn: document.getElementById("checkoutBtn"),
  checkoutFeedback: document.getElementById("checkoutFeedback"),
  cardFields: document.getElementById("cardFields"),
  yapeBox: document.getElementById("yapeBox"),

  chatMessages: document.getElementById("chatMessages"),
  chatForm: document.getElementById("chatForm"),
  chatSender: document.getElementById("chatSender"),
  chatText: document.getElementById("chatText"),
  chatFeedback: document.getElementById("chatFeedback"),

  b2bForm: document.getElementById("b2bForm"),
  b2bFeedback: document.getElementById("b2bFeedback"),
};

function num(v) { return Number(v) || 0; }
function asPrice(v) { return `S/ ${num(v).toFixed(2)}`; }
function feedback(el, msg, type = "error") {
  if (!el) return;
  el.hidden = false;
  el.textContent = msg;
  el.className = `form-feedback ${type}`;
}
function clearFeedback(el) { if (el) el.hidden = true; }

function saveState() {
  localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
  localStorage.setItem(STORAGE_CHAT, JSON.stringify(chatThreads));
  localStorage.setItem(STORAGE_META, JSON.stringify(productMeta));
}
function loadState() {
  cart = JSON.parse(localStorage.getItem(STORAGE_CART) || "[]");
  chatThreads = JSON.parse(localStorage.getItem(STORAGE_CHAT) || "{}");
  productMeta = JSON.parse(localStorage.getItem(STORAGE_META) || "{}");
}

function loadSession() {
  authSession = JSON.parse(localStorage.getItem(STORAGE_SESSION) || "null");
  applySessionUI();
}
function setSession(s) {
  authSession = s;
  localStorage.setItem(STORAGE_SESSION, JSON.stringify(s));
  applySessionUI();
}
function clearSession() {
  authSession = null;
  localStorage.removeItem(STORAGE_SESSION);
  applySessionUI();
}
function applySessionUI() {
  if (authSession) {
    els.sessionBadge.hidden = false;
    els.sessionBadge.textContent = `Sesión activa: ${authSession.role}`;
    els.openLoginModal.textContent = "Mi cuenta";
    els.logoutBtn.hidden = false;
    els.sellerRouteBtn.hidden = authSession.role !== "artesano";
  } else {
    els.sessionBadge.hidden = true;
    els.openLoginModal.textContent = "Iniciar sesión";
    els.logoutBtn.hidden = true;
    els.sellerRouteBtn.hidden = true;
  }
}

function setActiveNav(route) {
  document.querySelectorAll(".route-link").forEach((el) => {
    el.classList.toggle("active", el.dataset.route === route);
  });
}
function showView(route) {
  Object.values(views).forEach((v) => v?.classList.remove("active"));
  views[route]?.classList.add("active");
  setActiveNav(route);
  els.floatingArtisan.style.display = route === "product" ? "flex" : "none";
  if (route === "cart") renderCart();
}
function navigate(route) {
  if (route === "seller" && authSession?.role !== "artesano") route = "home";
  showView(route);
  location.hash = route;
}

async function fetchProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/productos`);
    const payload = await response.json();
    if (!response.ok || !payload.ok) throw new Error(payload.error || "No se pudo obtener catálogo");
    allProducts = (payload.data || []).map((p) => ({
      ...p,
      priceNum: num(p.precio),
      image: productMeta[p.id]?.image || placeholderAvatar,
      category: productMeta[p.id]?.category || "Otro",
      gender: productMeta[p.id]?.gender || "Unisex",
      sizes: productMeta[p.id]?.sizes || "",
    }));
    applyFilters();
    if (!currentProduct && allProducts.length) {
      currentProduct = allProducts[0];
      renderProductDetail(currentProduct);
    }
  } catch (err) {
    els.productGrid.innerHTML = `<p>No se pudo conectar al backend: ${err.message}</p>`;
  }
}

function applyFilters() {
  const minP = Math.min(num(els.minPriceInput.value), num(els.maxPriceInput.value));
  const maxP = Math.max(num(els.minPriceInput.value), num(els.maxPriceInput.value));
  const t = els.filterType.value;
  const g = els.filterGender.value;
  const s = els.filterSize.value;

  filteredProducts = allProducts.filter((p) => {
    const byPrice = p.priceNum >= minP && p.priceNum <= maxP;
    const byType = !t || (p.category || "").toLowerCase() === t.toLowerCase();
    const byGender = !g || (p.gender || "").toLowerCase() === g.toLowerCase();
    const bySize = !s || (p.sizes || "").toUpperCase().split(",").map((x) => x.trim()).includes(s.toUpperCase());
    return byPrice && byType && byGender && bySize;
  });

  renderMarketplace();
}

function renderMarketplace() {
  if (!filteredProducts.length) {
    els.productGrid.innerHTML = "<p>Aún no hay productos disponibles en EarthFiber</p>";
    return;
  }
  els.productGrid.innerHTML = filteredProducts.map((p) => {
    const noStock = num(p.stock) <= 0;
    return `
      <article class="product-card" data-product-id="${p.id}">
        <img src="${p.image}" alt="${p.titulo}" />
        <div class="product-info">
          <h4>${p.titulo}</h4>
          <p>${asPrice(p.priceNum)} · ${p.artesano_nombre}</p>
          <small>${noStock ? "❌ Sin stock" : `✅ Stock: ${p.stock}`}</small>
          <button class="btn btn-primary product-btn" data-product-id="${p.id}">${noStock ? "Ver detalle" : "Ver / Comprar"}</button>
        </div>
      </article>`;
  }).join("");
}

function renderProductDetail(p) {
  currentProduct = p;
  els.detailImage.src = p.image;
  els.detailName.textContent = p.titulo;
  els.detailPrice.textContent = asPrice(p.priceNum);
  els.detailDescription.textContent = p.descripcion;
  els.detailSize.textContent = `Tallas: ${p.sizes || "No especificadas"}`;
  els.detailStock.textContent = num(p.stock) <= 0 ? "Estado: Sin stock" : `Stock: ${p.stock} unidades`;
  els.detailArtisan.textContent = `Artesano: ${p.artesano_nombre}`;

  els.addToCartBtn.disabled = num(p.stock) <= 0;
  els.buyNowBtn.disabled = num(p.stock) <= 0;

  document.getElementById("artisanName").textContent = p.artesano_nombre;
  document.getElementById("artisanBio").textContent = "Perfil del artesano conectado dinámicamente.";
  document.getElementById("artisanImage").src = p.image;
  document.getElementById("artisanExp").textContent = "—";
  document.getElementById("artisanOrigin").textContent = "Perú";
  document.getElementById("artisanTechnique").textContent = "Textil";
  document.getElementById("artisanRating").textContent = "⭐ —";
  document.getElementById("donationGoal").textContent = "Meta de donación próximamente";
  document.getElementById("donationProgress").textContent = "S/ 0 recaudados de S/ 0";
  document.getElementById("progressBar").style.width = "0%";
  document.getElementById("artisanProducts").innerHTML = `<article class="mini-card" data-product-id="${p.id}"><img src="${p.image}" alt="${p.titulo}"/><h4>${p.titulo}</h4><p>${asPrice(p.priceNum)}</p></article>`;

  els.floatingText.textContent = `Ver perfil de ${p.artesano_nombre}`;
  els.floatingImage.src = p.image;
  renderChat();
}

function addToCart(productId) {
  const p = allProducts.find((x) => String(x.id) === String(productId));
  if (!p || num(p.stock) <= 0) return;
  const row = cart.find((x) => String(x.id) === String(productId));
  if (row) row.qty += 1;
  else cart.push({ id: p.id, titulo: p.titulo, precio: p.priceNum, qty: 1, image: p.image });
  saveState();
  renderCart();
}

function renderCart() {
  if (!cart.length) {
    els.cartList.innerHTML = "<p>Tu carrito está vacío.</p>";
    els.cartTotal.textContent = "S/ 0.00";
    return;
  }
  els.cartList.innerHTML = cart.map((i) => `
    <article class="cart-item">
      <img src="${i.image}" alt="${i.titulo}" />
      <div>
        <strong>${i.titulo}</strong>
        <p>${asPrice(i.precio)} x ${i.qty}</p>
        <button class="btn btn-outline" data-action="cart-dec" data-id="${i.id}">-</button>
        <button class="btn btn-outline" data-action="cart-inc" data-id="${i.id}">+</button>
        <button class="btn btn-outline" data-action="cart-del" data-id="${i.id}">Quitar</button>
      </div>
    </article>
  `).join("");
  const total = cart.reduce((acc, i) => acc + i.precio * i.qty, 0);
  els.cartTotal.textContent = asPrice(total);
}

function updatePaymentUI() {
  const method = document.querySelector('input[name="payMethod"]:checked')?.value;
  els.cardFields.hidden = method !== "tarjeta";
  els.yapeBox.hidden = method !== "yape";
}

function checkout() {
  if (!cart.length) return feedback(els.checkoutFeedback, "Tu carrito está vacío.");
  const method = document.querySelector('input[name="payMethod"]:checked')?.value;
  if (method === "tarjeta") {
    const ok = ["cardName", "cardNumber", "cardExp", "cardCvv"].every((id) => document.getElementById(id).value.trim().length > 2);
    if (!ok) return feedback(els.checkoutFeedback, "Completa los datos de la tarjeta.");
  }
  feedback(els.checkoutFeedback, "Pago simulado procesado correctamente.", "success");
  cart = [];
  saveState();
  renderCart();
}

function renderChat() {
  if (!currentProduct) return;
  const key = String(currentProduct.id);
  const thread = chatThreads[key] || [];
  els.chatMessages.innerHTML = thread.length
    ? thread.map((m) => `<div class="chat-msg ${m.role}"><strong>${m.sender}:</strong> ${m.text}</div>`).join("")
    : "<p>Aún no hay mensajes. Inicia la conversación.</p>";
}

function submitChat(e) {
  e.preventDefault();
  if (!currentProduct) return;
  const sender = els.chatSender.value.trim();
  const text = els.chatText.value.trim();
  if (sender.length < 2 || text.length < 2) return feedback(els.chatFeedback, "Completa nombre y mensaje.");
  const role = authSession?.role === "artesano" ? "seller" : "company";
  const key = String(currentProduct.id);
  if (!chatThreads[key]) chatThreads[key] = [];
  chatThreads[key].push({ sender, text, role, ts: new Date().toISOString() });
  saveState();
  els.chatText.value = "";
  clearFeedback(els.chatFeedback);
  renderChat();
}

function openModal() {
  els.loginModal.hidden = false;
  clearFeedback(els.loginFeedback);
  setAuthTab("login");
}
function closeModal() { els.loginModal.hidden = true; }
function setAuthTab(mode) {
  const isLogin = mode === "login";
  els.loginPanel.hidden = !isLogin;
  els.registerPanel.hidden = isLogin;
  els.tabLogin.classList.toggle("active", isLogin);
  els.tabRegister.classList.toggle("active", !isLogin);
}

async function registerUser() {
  const rol = document.getElementById("registerRole").value;
  const nombre = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim().toLowerCase();
  const password = document.getElementById("registerPassword").value.trim();
  if (nombre.length < 2) return feedback(els.loginFeedback, "Nombre inválido.");
  if (!emailRegex.test(email)) return feedback(els.loginFeedback, "Correo inválido.");
  if (password.length < 8) return feedback(els.loginFeedback, "Contraseña mínima: 8 caracteres.");

  try {
    const res = await fetch(`${API_BASE_URL}/api/usuarios/registro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password, rol }),
    });
    const payload = await res.json();
    if (!res.ok || !payload.ok) return feedback(els.loginFeedback, payload.error || "No se pudo registrar");
    setSession({ userId: payload.data.id, role: payload.data.rol, email: payload.data.email, nombre: payload.data.nombre });
    closeModal();
    navigate(rol === "artesano" ? "seller" : "marketplace");
  } catch (err) {
    feedback(els.loginFeedback, `Error backend: ${err.message}`);
  }
}

function loginUser() {
  const role = document.getElementById("loginRole").value;
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value.trim();
  if (!emailRegex.test(email)) return feedback(els.loginFeedback, "Correo inválido.");
  if (password.length < 8) return feedback(els.loginFeedback, "Contraseña inválida.");
  setSession({ userId: null, role, email, nombre: email });
  closeModal();
  navigate(role === "artesano" ? "seller" : "marketplace");
}

async function submitProduct(e) {
  e.preventDefault();
  if (!authSession || authSession.role !== "artesano") return feedback(els.sellerProductFeedback, "Debes iniciar sesión como artesano.");
  if (!authSession.userId) return feedback(els.sellerProductFeedback, "Regístrate como artesano para obtener ID real.");

  const titulo = document.getElementById("sellerProductName").value.trim();
  const descripcion = document.getElementById("sellerProductDescription").value.trim();
  const precio = num(document.getElementById("sellerProductPrice").value);
  const category = document.getElementById("sellerProductCategory").value || "Otro";
  const sizes = document.getElementById("sellerProductSizes").value.trim();
  const gender = document.getElementById("sellerProductGender").value;
  const noStock = els.sellerNoStock.checked;
  const stock = noStock ? 0 : num(els.sellerProductStock.value);

  if (titulo.length < 3) return feedback(els.sellerProductFeedback, "Nombre de producto inválido.");
  if (descripcion.length < 12) return feedback(els.sellerProductFeedback, "Descripción demasiado corta.");
  if (precio <= 0) return feedback(els.sellerProductFeedback, "Precio inválido.");

  try {
    const res = await fetch(`${API_BASE_URL}/api/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, descripcion, precio, stock, artesano_id: authSession.userId }),
    });
    const payload = await res.json();
    if (!res.ok || !payload.ok) return feedback(els.sellerProductFeedback, payload.error || "No se pudo publicar.");

    const newId = payload.data.id;
    const file = els.sellerProductImage.files?.[0];
    const imagePath = els.sellerProductImagePath.value.trim();
    let image = placeholderAvatar;
    if (file) image = URL.createObjectURL(file);
    else if (imagePath) image = imagePath;

    productMeta[newId] = { category, sizes, gender, image };
    saveState();
    els.sellerProductForm.reset();
    els.sellerImagePreview.hidden = true;
    feedback(els.sellerProductFeedback, "Producto publicado correctamente.", "success");
    await fetchProducts();
  } catch (err) {
    feedback(els.sellerProductFeedback, `Error backend: ${err.message}`);
  }
}

function submitB2B(e) {
  e.preventDefault();
  const companyName = document.getElementById("companyName").value.trim();
  const companyRuc = document.getElementById("companyRuc").value.trim();
  const contactEmail = document.getElementById("contactEmail").value.trim().toLowerCase();
  if (companyName.length < 2) return feedback(els.b2bFeedback, "Ingresa empresa.");
  if (!rucRegex.test(companyRuc)) return feedback(els.b2bFeedback, "RUC inválido (11 dígitos).");
  if (!emailRegex.test(contactEmail)) return feedback(els.b2bFeedback, "Correo inválido.");
  feedback(els.b2bFeedback, "Solicitud comercial enviada (demo).", "success");
  els.b2bForm.reset();
}

function syncRangeFromInputs() {
  let min = num(els.minPriceInput.value);
  let max = num(els.maxPriceInput.value);
  if (min > max) [min, max] = [max, min];
  els.minPriceInput.value = String(min);
  els.maxPriceInput.value = String(max);
  els.minPriceRange.value = String(min);
  els.maxPriceRange.value = String(max);
  applyFilters();
}
function syncRangeFromSliders() {
  let min = num(els.minPriceRange.value);
  let max = num(els.maxPriceRange.value);
  if (min > max) [min, max] = [max, min];
  els.minPriceRange.value = String(min);
  els.maxPriceRange.value = String(max);
  els.minPriceInput.value = String(min);
  els.maxPriceInput.value = String(max);
  applyFilters();
}

document.addEventListener("click", (e) => {
  const routeBtn = e.target.closest(".route-link");
  if (routeBtn) return navigate(routeBtn.dataset.route);

  const productBtn = e.target.closest(".product-btn, .product-card, .mini-card");
  if (productBtn?.dataset.productId) {
    const p = allProducts.find((x) => String(x.id) === String(productBtn.dataset.productId));
    if (p) {
      renderProductDetail(p);
      navigate("product");
    }
    return;
  }

  const action = e.target.dataset.action;
  if (!action) return;
  const id = e.target.dataset.id;
  const row = cart.find((x) => String(x.id) === String(id));
  if (!row) return;
  if (action === "cart-inc") row.qty += 1;
  if (action === "cart-dec") row.qty = Math.max(1, row.qty - 1);
  if (action === "cart-del") cart = cart.filter((x) => String(x.id) !== String(id));
  saveState();
  renderCart();
});

els.addToCartBtn.addEventListener("click", () => {
  if (currentProduct) addToCart(currentProduct.id);
});
els.buyNowBtn.addEventListener("click", () => {
  if (currentProduct) addToCart(currentProduct.id);
  navigate("cart");
});
els.floatingArtisan.addEventListener("click", () => navigate("artesano"));

els.openLoginModal.addEventListener("click", () => {
  if (authSession) return navigate(authSession.role === "artesano" ? "seller" : "marketplace");
  openModal();
});
els.logoutBtn.addEventListener("click", () => {
  clearSession();
  navigate("home");
});
els.closeLoginModal.addEventListener("click", closeModal);
els.closeRegisterModal.addEventListener("click", closeModal);
els.loginModal.addEventListener("click", (e) => {
  if (e.target === els.loginModal) closeModal();
});
els.tabLogin.addEventListener("click", () => setAuthTab("login"));
els.tabRegister.addEventListener("click", () => setAuthTab("register"));
els.submitLogin.addEventListener("click", loginUser);
els.submitRegister.addEventListener("click", registerUser);

els.sellerProductForm.addEventListener("submit", submitProduct);
document.getElementById("sellerProfileForm").addEventListener("submit", (e) => {
  e.preventDefault();
  feedback(els.sellerProfileFeedback, "Perfil actualizado visualmente (demo).", "success");
});
els.sellerProductImage.addEventListener("change", () => {
  const file = els.sellerProductImage.files?.[0];
  if (!file) {
    els.sellerImagePreview.hidden = true;
    return;
  }
  els.sellerImagePreview.src = URL.createObjectURL(file);
  els.sellerImagePreview.hidden = false;
});
els.sellerNoStock.addEventListener("change", () => {
  els.sellerProductStock.disabled = els.sellerNoStock.checked;
  if (els.sellerNoStock.checked) els.sellerProductStock.value = "0";
});

els.chatForm.addEventListener("submit", submitChat);
els.b2bForm.addEventListener("submit", submitB2B);
els.checkoutBtn.addEventListener("click", checkout);
document.querySelectorAll('input[name="payMethod"]').forEach((r) => r.addEventListener("change", updatePaymentUI));

[els.filterType, els.filterGender, els.filterSize].forEach((f) => f.addEventListener("change", applyFilters));
[els.minPriceInput, els.maxPriceInput].forEach((i) => i.addEventListener("input", syncRangeFromInputs));
[els.minPriceRange, els.maxPriceRange].forEach((i) => i.addEventListener("input", syncRangeFromSliders));

window.addEventListener("hashchange", () => {
  const route = location.hash.replace("#", "") || "home";
  navigate(route in views ? route : "home");
});

(async function init() {
  loadSession();
  loadState();
  renderCart();
  updatePaymentUI();
  showView((location.hash.replace("#", "") || "home") in views ? location.hash.replace("#", "") : "home");
  await fetchProducts();
})();
