const API_BASE_URL = "http://localhost:3000";

const views = {
  home: document.getElementById("view-home"),
  marketplace: document.getElementById("view-marketplace"),
  product: document.getElementById("view-product"),
  artesano: document.getElementById("view-artesano"),
  contacto: document.getElementById("view-contacto"),
  seller: document.getElementById("view-seller"),
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const rucRegex = /^\d{11}$/;
const placeholderAvatar =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='220'%3E%3Crect width='100%25' height='100%25' fill='%23ddd4c9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b5c50' font-family='Inter,sans-serif' font-size='16'%3EEarth Fiber%3C/text%3E%3C/svg%3E";

const sessionBadge = document.getElementById("sessionBadge");
const openLoginModal = document.getElementById("openLoginModal");
const logoutBtn = document.getElementById("logoutBtn");
const sellerRouteBtn = document.getElementById("sellerRouteBtn");

const loginModal = document.getElementById("loginModal");
const tabLogin = document.getElementById("tabLogin");
const tabRegister = document.getElementById("tabRegister");
const loginPanel = document.getElementById("loginPanel");
const registerPanel = document.getElementById("registerPanel");
const closeLoginModal = document.getElementById("closeLoginModal");
const closeRegisterModal = document.getElementById("closeRegisterModal");
const submitLogin = document.getElementById("submitLogin");
const submitRegister = document.getElementById("submitRegister");
const loginFeedback = document.getElementById("loginFeedback");

const productGrid = document.getElementById("productGrid");
const floatingArtisan = document.getElementById("floatingArtisan");
const floatingText = document.getElementById("floatingText");
const floatingImage = document.getElementById("floatingImage");

const sellerProductForm = document.getElementById("sellerProductForm");
const sellerProductFeedback = document.getElementById("sellerProductFeedback");
const sellerProfileFeedback = document.getElementById("sellerProfileFeedback");
const sellerImagePreview = document.getElementById("sellerImagePreview");
const sellerProductImage = document.getElementById("sellerProductImage");

const b2bForm = document.getElementById("b2bForm");
const b2bFeedback = document.getElementById("b2bFeedback");

const STORAGE_SESSION = "earthfiber_session";

let authSession = null;
let productList = [];
let currentProduct = null;

function setFeedback(el, message, type = "error") {
  if (!el) return;
  el.hidden = false;
  el.textContent = message;
  el.className = `form-feedback ${type}`;
}

function setLoginFeedback(message, type = "error") {
  loginFeedback.hidden = false;
  loginFeedback.textContent = message;
  loginFeedback.className = `login-feedback ${type}`;
}

function clearLoginFeedback() {
  loginFeedback.hidden = true;
  loginFeedback.textContent = "";
}

function loadSession() {
  const raw = localStorage.getItem(STORAGE_SESSION);
  authSession = raw ? JSON.parse(raw) : null;
  applySessionUI();
}

function setSession(session) {
  authSession = session;
  localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));
  applySessionUI();
}

function clearSession() {
  authSession = null;
  localStorage.removeItem(STORAGE_SESSION);
  applySessionUI();
}

function applySessionUI() {
  if (authSession) {
    sessionBadge.hidden = false;
    sessionBadge.textContent = `Sesión activa: ${authSession.role} · ${authSession.email}`;
    openLoginModal.textContent = "Mi cuenta";
    logoutBtn.hidden = false;
    sellerRouteBtn.hidden = authSession.role !== "artesano";
  } else {
    sessionBadge.hidden = true;
    openLoginModal.textContent = "Iniciar sesión";
    logoutBtn.hidden = true;
    sellerRouteBtn.hidden = true;
  }
}

function showView(route) {
  Object.values(views).forEach((v) => v?.classList.remove("active"));
  views[route]?.classList.add("active");
  setActiveNav(route);
  floatingArtisan.style.display = route === "product" ? "flex" : "none";
}

function setActiveNav(route) {
  document.querySelectorAll(".route-link").forEach((el) => {
    el.classList.toggle("active", el.dataset.route === route);
  });
}

function navigate(route) {
  if (route === "seller" && authSession?.role !== "artesano") {
    showView("home");
    location.hash = "home";
    return;
  }
  if (route === "product" && currentProduct) {
    renderProductDetail(currentProduct);
  }
  showView(route);
  location.hash = route;
}

async function fetchProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/productos`);
    if (!response.ok) throw new Error("No se pudo obtener el catálogo");
    const payload = await response.json();
    productList = Array.isArray(payload.data) ? payload.data : [];
    renderMarketplace();

    if (productList.length > 0) {
      currentProduct = productList[0];
      renderProductDetail(currentProduct);
    } else {
      currentProduct = null;
    }
  } catch (error) {
    productGrid.innerHTML = `<p>No se pudo conectar con el servidor: ${error.message}</p>`;
  }
}

function renderMarketplace() {
  if (!productList.length) {
    productGrid.innerHTML = "<p>Aún no hay productos disponibles en EarthFiber</p>";
    return;
  }

  productGrid.innerHTML = productList
    .map(
      (product) => `
      <article class="product-card" data-product-id="${product.id}">
        <img src="${placeholderAvatar}" alt="${product.titulo}" />
        <div class="product-info">
          <h4>${product.titulo}</h4>
          <p>S/ ${Number(product.precio).toFixed(2)} · ${product.artesano_nombre}</p>
          <small>Stock: ${product.stock}</small>
          <button class="btn btn-primary product-btn" data-product-id="${product.id}">Ver detalle</button>
        </div>
      </article>`
    )
    .join("");
}

function renderProductDetail(product) {
  document.getElementById("detailName").textContent = product.titulo;
  document.getElementById("detailPrice").textContent = `S/ ${Number(product.precio).toFixed(2)}`;
  document.getElementById("detailImage").src = placeholderAvatar;
  document.getElementById("detailDescription").textContent = product.descripcion;
  document.getElementById("detailSize").textContent = "Tallas: Según disponibilidad";
  document.getElementById("detailStock").textContent = `Stock: ${product.stock} unidades`;
  document.getElementById("detailArtisan").textContent = `Artesano: ${product.artesano_nombre}`;
  document.getElementById("storyVideo").removeAttribute("src");

  document.getElementById("artisanName").textContent = `${product.artesano_nombre}`;
  document.getElementById("artisanBio").textContent = "Perfil dinámico conectado al backend.";
  document.getElementById("artisanImage").src = placeholderAvatar;
  document.getElementById("artisanExp").textContent = "—";
  document.getElementById("artisanOrigin").textContent = "Perú";
  document.getElementById("artisanTechnique").textContent = "Artesanía textil";
  document.getElementById("artisanRating").textContent = "⭐ Sin reseñas";
  document.getElementById("donationGoal").textContent = "Meta de donación aún no configurada.";
  document.getElementById("donationProgress").textContent = "S/ 0 recaudados de S/ 0";
  document.getElementById("progressBar").style.width = "0%";
  document.getElementById("artisanProducts").innerHTML = `
    <article class="mini-card" data-product-id="${product.id}">
      <img src="${placeholderAvatar}" alt="${product.titulo}" />
      <h4>${product.titulo}</h4>
      <p>S/ ${Number(product.precio).toFixed(2)}</p>
    </article>
  `;

  floatingText.textContent = `Ver perfil de ${product.artesano_nombre}`;
  floatingImage.src = placeholderAvatar;
}

function openModal() {
  loginModal.hidden = false;
  clearLoginFeedback();
  setAuthTab("login");
}

function closeModal() {
  loginModal.hidden = true;
}

function setAuthTab(mode) {
  const isLogin = mode === "login";
  loginPanel.hidden = !isLogin;
  registerPanel.hidden = isLogin;
  tabLogin.classList.toggle("active", isLogin);
  tabRegister.classList.toggle("active", !isLogin);
  clearLoginFeedback();
}

async function registerUser() {
  const role = document.getElementById("registerRole").value;
  const nombre = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim().toLowerCase();
  const password = document.getElementById("registerPassword").value.trim();

  if (nombre.length < 2) return setLoginFeedback("Ingresa un nombre válido.");
  if (!emailRegex.test(email)) return setLoginFeedback("Ingresa un correo válido.");
  if (password.length < 8) return setLoginFeedback("La contraseña debe tener mínimo 8 caracteres.");

  try {
    const response = await fetch(`${API_BASE_URL}/api/usuarios/registro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password, rol: role }),
    });

    const payload = await response.json();
    if (!response.ok || !payload.ok) {
      return setLoginFeedback(payload.error || "No se pudo registrar el usuario.");
    }

    setSession({
      userId: payload.data.id,
      role: payload.data.rol,
      email: payload.data.email,
      nombre: payload.data.nombre,
    });

    setLoginFeedback("Cuenta creada. Sesión iniciada correctamente.", "success");
    closeModal();
    navigate(role === "artesano" ? "seller" : "marketplace");
  } catch (error) {
    setLoginFeedback(`Error conectando con backend: ${error.message}`);
  }
}

function loginUser() {
  const role = document.getElementById("loginRole").value;
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value.trim();

  if (!emailRegex.test(email)) return setLoginFeedback("Ingresa un correo válido.");
  if (password.length < 8) return setLoginFeedback("Ingresa una contraseña válida.");

  setSession({ userId: null, role, email, nombre: email });
  setLoginFeedback("Sesión iniciada (modo temporal sin endpoint de login).", "success");
  closeModal();
  navigate(role === "artesano" ? "seller" : "marketplace");
}

async function submitProduct(event) {
  event.preventDefault();

  if (!authSession || authSession.role !== "artesano") {
    return setFeedback(sellerProductFeedback, "Debes iniciar sesión como artesano.");
  }

  if (!authSession.userId) {
    return setFeedback(sellerProductFeedback, "Regístrate como artesano para obtener tu ID real antes de publicar.");
  }

  const titulo = document.getElementById("sellerProductName").value.trim();
  const descripcion = document.getElementById("sellerProductDescription").value.trim();
  const precio = Number(document.getElementById("sellerProductPrice").value);
  const stock = 10;

  if (titulo.length < 3) return setFeedback(sellerProductFeedback, "Título inválido.");
  if (descripcion.length < 12) return setFeedback(sellerProductFeedback, "Descripción demasiado corta.");
  if (!Number.isFinite(precio) || precio <= 0) return setFeedback(sellerProductFeedback, "Precio inválido.");

  try {
    const response = await fetch(`${API_BASE_URL}/api/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo,
        descripcion,
        precio,
        stock,
        artesano_id: authSession.userId,
      }),
    });

    const payload = await response.json();
    if (!response.ok || !payload.ok) {
      return setFeedback(sellerProductFeedback, payload.error || "No se pudo publicar el producto.");
    }

    setFeedback(sellerProductFeedback, "Producto publicado correctamente.", "success");
    sellerProductForm.reset();
    sellerImagePreview.hidden = true;
    await fetchProducts();
  } catch (error) {
    setFeedback(sellerProductFeedback, `Error conectando con backend: ${error.message}`);
  }
}

function submitB2B(event) {
  event.preventDefault();
  const companyName = document.getElementById("companyName").value.trim();
  const companyRuc = document.getElementById("companyRuc").value.trim();
  const contactEmail = document.getElementById("contactEmail").value.trim().toLowerCase();

  if (companyName.length < 2) return setFeedback(b2bFeedback, "Ingresa el nombre de empresa.");
  if (!rucRegex.test(companyRuc)) return setFeedback(b2bFeedback, "El RUC debe tener 11 dígitos.");
  if (!emailRegex.test(contactEmail)) return setFeedback(b2bFeedback, "Correo de contacto inválido.");

  setFeedback(b2bFeedback, "Solicitud registrada localmente. Integraremos este flujo al backend en el siguiente paso.", "success");
  b2bForm.reset();
}

document.addEventListener("click", (event) => {
  const routeButton = event.target.closest(".route-link");
  if (routeButton) {
    navigate(routeButton.dataset.route);
    return;
  }

  const productButton = event.target.closest(".product-btn, .product-card, .mini-card");
  if (productButton?.dataset.productId) {
    const found = productList.find((p) => String(p.id) === String(productButton.dataset.productId));
    if (!found) return;
    currentProduct = found;
    renderProductDetail(found);
    navigate("product");
  }
});

floatingArtisan.addEventListener("click", () => navigate("artesano"));

openLoginModal.addEventListener("click", () => {
  if (authSession) return navigate(authSession.role === "artesano" ? "seller" : "marketplace");
  openModal();
});
logoutBtn.addEventListener("click", () => {
  clearSession();
  navigate("home");
});
closeLoginModal.addEventListener("click", closeModal);
closeRegisterModal.addEventListener("click", closeModal);
loginModal.addEventListener("click", (event) => {
  if (event.target === loginModal) closeModal();
});

tabLogin.addEventListener("click", () => setAuthTab("login"));
tabRegister.addEventListener("click", () => setAuthTab("register"));
submitLogin.addEventListener("click", loginUser);
submitRegister.addEventListener("click", registerUser);
sellerProductForm.addEventListener("submit", submitProduct);
b2bForm.addEventListener("submit", submitB2B);

sellerProductImage.addEventListener("change", () => {
  const file = sellerProductImage.files?.[0];
  if (!file) {
    sellerImagePreview.hidden = true;
    return;
  }
  sellerImagePreview.hidden = false;
  sellerImagePreview.src = URL.createObjectURL(file);
});

document.getElementById("sellerProfileForm").addEventListener("submit", (event) => {
  event.preventDefault();
  setFeedback(sellerProfileFeedback, "Perfil visual actualizado. Conectaremos este formulario al backend en el siguiente paso.", "success");
});

window.addEventListener("hashchange", () => {
  const route = location.hash.replace("#", "") || "home";
  navigate(route in views ? route : "home");
});

(async function init() {
  loadSession();
  const startRoute = location.hash.replace("#", "") || "home";
  showView(startRoute in views ? startRoute : "home");
  await fetchProducts();
})();
