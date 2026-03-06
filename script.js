const views = {
  home: document.getElementById("view-home"),
  marketplace: document.getElementById("view-marketplace"),
  product: document.getElementById("view-product"),
  artesano: document.getElementById("view-artesano"),
  contacto: document.getElementById("view-contacto"),
  seller: document.getElementById("view-seller"),
};

const products = {
  misti: {
    id: "misti",
    name: "Blusa Misti",
    category: "Blusa",
    rating: "4.8",
    price: "S/ 189",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80",
    description: "Blusa de algodón nativo con acabado fino y caída ligera para uso diario y eventos.",
    size: "Tallas: S, M, L",
    stock: "Stock: 18 unidades",
    artisan: "Artesana: Laura Quispe (Cusco)",
    story: "Laura aprendió a hilar con su madre en Chinchero y hoy crea piezas modernas preservando técnicas ancestrales.",
    process: "El proceso incluye selección manual de fibra, hilado, tejido y acabados hechos en taller familiar.",
    storyVideo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    processVideo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    artisanProfile: {
      name: "Laura Quispe · Cusco",
      image: "https://images.unsplash.com/photo-1542204625-de293a42d5f3?auto=format&fit=crop&w=900&q=80",
      bio: "14 años de experiencia en tejido y bordado con algodón nativo. Especialista en piezas contemporáneas con identidad andina.",
      experience: "14 años",
      origin: "Cusco, Perú",
      technique: "Tejido + bordado",
      profileRating: "⭐ 4.8/5",
      donationGoal: "Laura busca S/ 300 para mejorar su telar comunitario.",
      donationCurrent: 186,
      donationTarget: 300,
    },
  },
  sumaq: {
    id: "sumaq",
    name: "Vestido Sumaq",
    category: "Vestido",
    rating: "4.9",
    price: "S/ 290",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    description: "Vestido artesanal en algodón nativo, fresco, elegante y de edición limitada.",
    size: "Tallas: S, M",
    stock: "Stock: 8 unidades",
    artisan: "Artesana: Ana Huamán (Ayacucho)",
    story: "Ana convirtió el oficio familiar en su principal fuente de ingresos para su comunidad.",
    process: "Teñido natural, patronaje manual y costura en lotes pequeños con control de calidad.",
    storyVideo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    processVideo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    artisanProfile: {
      name: "Ana Huamán · Ayacucho",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
      bio: "Especialista en confección artesanal de vestidos con enfoque en diseño sostenible y tradición textil.",
      experience: "11 años",
      origin: "Ayacucho, Perú",
      technique: "Teñido natural",
      profileRating: "⭐ 4.9/5",
      donationGoal: "Ana necesita S/ 240 para comprar materiales para su taller.",
      donationCurrent: 120,
      donationTarget: 240,
    },
  },
  qori: {
    id: "qori",
    name: "Bolso Qori",
    category: "Bolso",
    rating: "4.7",
    price: "S/ 145",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80",
    description: "Bolso a crochet de algodón nativo, resistente y versátil para uso urbano.",
    size: "Talla: Única",
    stock: "Stock: 25 unidades",
    artisan: "Artesano: Luis Mamani (Puno)",
    story: "Luis trabaja junto a su familia en técnicas de crochet tradicional, adaptadas a mercados actuales.",
    process: "Trenzado manual por módulos, ensamblado y acabados finales con control de tensión.",
    storyVideo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    processVideo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    artisanProfile: {
      name: "Luis Mamani · Puno",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=900&q=80",
      bio: "Artesano textil enfocado en bolsos y accesorios funcionales con patrones inspirados en iconografía andina.",
      experience: "9 años",
      origin: "Puno, Perú",
      technique: "Crochet",
      profileRating: "⭐ 4.7/5",
      donationGoal: "Luis necesita S/ 150 para una laptop para su hija.",
      donationCurrent: 93,
      donationTarget: 150,
    },
  },
};

const STORAGE_USERS = "earthfiber_users";
const STORAGE_SESSION = "earthfiber_session";

let productList = Object.values(products);

const productGrid = document.getElementById("productGrid");
const artisanProducts = document.getElementById("artisanProducts");
const floatingArtisan = document.getElementById("floatingArtisan");
const floatingText = document.getElementById("floatingText");
const floatingImage = document.getElementById("floatingImage");

const loginModal = document.getElementById("loginModal");
const openLoginModal = document.getElementById("openLoginModal");
const closeLoginModal = document.getElementById("closeLoginModal");
const submitLogin = document.getElementById("submitLogin");
const loginRole = document.getElementById("loginRole");
const sessionBadge = document.getElementById("sessionBadge");
const logoutBtn = document.getElementById("logoutBtn");
const sellerRouteBtn = document.getElementById("sellerRouteBtn");

const loginFeedback = document.getElementById("loginFeedback");
const tabLogin = document.getElementById("tabLogin");
const tabRegister = document.getElementById("tabRegister");
const loginPanel = document.getElementById("loginPanel");
const registerPanel = document.getElementById("registerPanel");
const closeRegisterModal = document.getElementById("closeRegisterModal");
const submitRegister = document.getElementById("submitRegister");

const b2bForm = document.getElementById("b2bForm");
const b2bFeedback = document.getElementById("b2bFeedback");

const sellerProductForm = document.getElementById("sellerProductForm");
const sellerProfileForm = document.getElementById("sellerProfileForm");
const sellerProductFeedback = document.getElementById("sellerProductFeedback");
const sellerProfileFeedback = document.getElementById("sellerProfileFeedback");

let currentProductId = "qori";
let videoObserver;
let authSession = null;

const placeholderAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='100%25' height='100%25' fill='%238a5a3b'/%3E%3Ctext x='50%25' y='56%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter,sans-serif' font-size='30' fill='white'%3EEF%3C/text%3E%3C/svg%3E";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const nameRegex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{2,}$/;
const rucRegex = /^\d{11}$/;

floatingImage.addEventListener("error", () => {
  floatingImage.src = placeholderAvatar;
});

function getUsers() {
  const stored = localStorage.getItem(STORAGE_USERS);
  if (stored) return JSON.parse(stored);
  const seed = [
    {
      fullName: "Cliente Demo",
      email: "cliente@earthfiber.pe",
      password: "12345678",
      role: "cliente",
      profile: {},
    },
    {
      fullName: "Artesano Demo",
      email: "artesano@earthfiber.pe",
      password: "12345678",
      role: "artesano",
      profile: {
        displayName: "Artesano Demo · Cusco",
        origin: "Cusco, Perú",
        technique: "Tejido artesanal",
        bio: "Perfil demo de vendedor Earth Fiber.",
      },
    },
  ];
  localStorage.setItem(STORAGE_USERS, JSON.stringify(seed));
  return seed;
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}

function setSession(user) {
  authSession = { email: user.email, role: user.role, fullName: user.fullName };
  localStorage.setItem(STORAGE_SESSION, JSON.stringify(authSession));
  applySessionUI();
}

function clearSession() {
  authSession = null;
  localStorage.removeItem(STORAGE_SESSION);
  applySessionUI();
}

function loadSession() {
  const raw = localStorage.getItem(STORAGE_SESSION);
  if (raw) authSession = JSON.parse(raw);
  applySessionUI();
}

function applySessionUI() {
  if (authSession) {
    const roleLabel = authSession.role === "artesano" ? "Vendedor" : "Cliente";
    sessionBadge.hidden = false;
    sessionBadge.textContent = `Sesión activa: ${roleLabel}`;
    openLoginModal.textContent = "Mi cuenta";
    logoutBtn.hidden = false;
    sellerRouteBtn.hidden = authSession.role !== "artesano";
  } else {
    sessionBadge.hidden = true;
    sessionBadge.textContent = "";
    openLoginModal.textContent = "Iniciar sesión";
    logoutBtn.hidden = true;
    sellerRouteBtn.hidden = true;
  }
}

function setFeedback(el, message, type = "error") {
  el.hidden = false;
  el.textContent = message;
  el.className = `form-feedback ${type}`;
}

function setLoginFeedback(message, type = "error") {
  loginFeedback.hidden = false;
  loginFeedback.textContent = message;
  loginFeedback.className = `login-feedback ${type}`;
}

function renderMarketplace() {
  productGrid.innerHTML = productList
    .map(
      (product) => `
      <article class="product-card" data-product-id="${product.id}">
        <img src="${product.image}" alt="${product.name}" />
        <div class="product-info">
          <h4>${product.name}</h4>
          <p>${product.price} · ${product.artisan.replace("Artesana: ", "").replace("Artesano: ", "")}</p>
          <small>⭐ ${product.rating} · ${product.category}</small>
          <button class="btn btn-primary product-btn" data-product-id="${product.id}">Ver detalle</button>
        </div>
      </article>
    `
    )
    .join("");
}

function setActiveNav(route) {
  document.querySelectorAll(".route-link").forEach((el) => {
    const matches = el.dataset.route === route;
    el.classList.toggle("active", matches);
  });
}

function bindVideoAutoplay() {
  if (videoObserver) videoObserver.disconnect();

  const videos = document.querySelectorAll(".auto-video");
  videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target instanceof HTMLVideoElement) {
          if (entry.isIntersecting) entry.target.play().catch(() => null);
          else entry.target.pause();
        }
      });
    },
    { threshold: 0.55 }
  );

  videos.forEach((video) => videoObserver.observe(video));
}

function showView(route) {
  Object.values(views).forEach((view) => view?.classList.remove("active"));
  views[route]?.classList.add("active");
  setActiveNav(route);
  window.scrollTo({ top: 0, behavior: "auto" });

  floatingArtisan.style.display = route === "product" ? "flex" : "none";

  if (route === "product") bindVideoAutoplay();
  else if (videoObserver) videoObserver.disconnect();
}

function renderProduct(productId) {
  const product = products[productId];
  if (!product) return;
  currentProductId = productId;

  document.getElementById("detailName").textContent = product.name;
  document.getElementById("detailPrice").textContent = product.price;
  document.getElementById("detailImage").src = product.image;
  document.getElementById("detailImage").alt = product.name;
  document.getElementById("detailDescription").textContent = product.description;
  document.getElementById("detailSize").textContent = product.size;
  document.getElementById("detailStock").textContent = product.stock;
  document.getElementById("detailArtisan").textContent = product.artisan;
  document.getElementById("storyText").textContent = product.story;
  document.getElementById("processText").textContent = product.process;

  document.getElementById("storyVideo").src = product.storyVideo;
  document.getElementById("processVideo").src = product.processVideo;

  floatingText.textContent = `Ver perfil de ${product.artisanProfile.name.split("·")[0].trim()}`;
  floatingImage.src = product.artisanProfile.image || placeholderAvatar;
}

function renderArtisanFromCurrentProduct() {
  const product = products[currentProductId];
  if (!product) return;

  const artisan = product.artisanProfile;
  document.getElementById("artisanName").textContent = artisan.name;
  document.getElementById("artisanBio").textContent = artisan.bio;
  document.getElementById("artisanImage").src = artisan.image;
  document.getElementById("artisanExp").textContent = artisan.experience;
  document.getElementById("artisanOrigin").textContent = artisan.origin;
  document.getElementById("artisanTechnique").textContent = artisan.technique;
  document.getElementById("artisanRating").textContent = artisan.profileRating;

  document.getElementById("donationGoal").textContent = artisan.donationGoal;
  document.getElementById("donationProgress").textContent = `S/ ${artisan.donationCurrent} recaudados de S/ ${artisan.donationTarget}`;
  const width = Math.min((artisan.donationCurrent / artisan.donationTarget) * 100, 100);
  document.getElementById("progressBar").style.width = `${width}%`;

  const relatedProducts = productList.filter((item) => item.artisanProfile.name === artisan.name);
  const otherProducts = productList.filter((item) => item.artisanProfile.name !== artisan.name);
  const carouselProducts = [...relatedProducts, ...otherProducts].slice(0, 10);

  artisanProducts.innerHTML = carouselProducts
    .map(
      (item) => `
      <article class="mini-card" data-product-id="${item.id}">
        <h4>${item.name}</h4>
        <p>${item.price}</p>
        <small>Ver detalle del producto →</small>
      </article>
    `
    )
    .join("");
}

function navigate(route) {
  if (route === "seller" && (!authSession || authSession.role !== "artesano")) {
    navigate("marketplace");
    return;
  }

  if (route === "product") renderProduct(currentProductId);
  if (route === "artesano") renderArtisanFromCurrentProduct();
  if (route === "seller") hydrateSellerForms();

  showView(route);
  location.hash = route;
}

function openModal() {
  loginModal.hidden = false;
  loginFeedback.hidden = true;
  loginFeedback.textContent = "";
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
  loginFeedback.hidden = true;
  loginFeedback.textContent = "";
}

function validateEmail(value) {
  return emailRegex.test(value);
}

function hydrateSellerForms() {
  if (!authSession || authSession.role !== "artesano") return;
  const user = getUsers().find((item) => item.email === authSession.email);
  const profile = user?.profile || {};

  document.getElementById("sellerProfileName").value = profile.displayName || user?.fullName || "";
  document.getElementById("sellerProfileOrigin").value = profile.origin || "";
  document.getElementById("sellerProfileTechnique").value = profile.technique || "";
  document.getElementById("sellerProfileBio").value = profile.bio || "";
}

openLoginModal.addEventListener("click", () => {
  if (!authSession) {
    openModal();
    return;
  }
  navigate(authSession.role === "artesano" ? "seller" : "marketplace");
});

logoutBtn.addEventListener("click", () => {
  clearSession();
  navigate("home");
});

closeLoginModal.addEventListener("click", closeModal);
closeRegisterModal.addEventListener("click", closeModal);
tabLogin.addEventListener("click", () => setAuthTab("login"));
tabRegister.addEventListener("click", () => setAuthTab("register"));

loginModal.addEventListener("click", (event) => {
  if (event.target === loginModal) closeModal();
});

submitLogin.addEventListener("click", () => {
  const role = loginRole.value;
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value.trim();

  if (!validateEmail(email)) {
    setLoginFeedback("Ingresa un correo válido.");
    return;
  }

  if (password.length < 8) {
    setLoginFeedback("La contraseña debe tener al menos 8 caracteres.");
    return;
  }

  const user = getUsers().find((item) => item.email.toLowerCase() === email && item.role === role);
  if (!user || user.password !== password) {
    setLoginFeedback("Credenciales inválidas o cuenta no registrada para este rol.");
    return;
  }

  setSession(user);
  closeModal();
  navigate(role === "artesano" ? "seller" : "marketplace");
});

submitRegister.addEventListener("click", () => {
  const role = document.getElementById("registerRole").value;
  const fullName = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim().toLowerCase();
  const password = document.getElementById("registerPassword").value.trim();

  if (!nameRegex.test(fullName)) {
    setLoginFeedback("Ingresa un nombre válido (solo letras y espacios).");
    return;
  }

  if (!validateEmail(email)) {
    setLoginFeedback("Ingresa un correo válido para crear cuenta.");
    return;
  }

  if (password.length < 8) {
    setLoginFeedback("La contraseña debe tener mínimo 8 caracteres.");
    return;
  }

  const users = getUsers();
  if (users.some((item) => item.email.toLowerCase() === email && item.role === role)) {
    setLoginFeedback("Ya existe una cuenta con ese correo para este rol.");
    return;
  }

  const newUser = {
    fullName,
    email,
    password,
    role,
    profile: role === "artesano"
      ? {
          displayName: `${fullName} · Perú`,
          origin: "Perú",
          technique: "Tejido artesanal",
          bio: "Nuevo perfil de artesano en Earth Fiber.",
        }
      : {},
  };

  users.push(newUser);
  saveUsers(users);
  setSession(newUser);

  closeModal();
  navigate(role === "artesano" ? "seller" : "marketplace");
});

b2bForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const companyName = document.getElementById("companyName").value.trim();
  const companyRuc = document.getElementById("companyRuc").value.trim();
  const contactPerson = document.getElementById("contactPerson").value.trim();
  const contactEmail = document.getElementById("contactEmail").value.trim();
  const interestProduct = document.getElementById("interestProduct").value.trim();
  const estimatedQty = Number(document.getElementById("estimatedQty").value);

  if (companyName.length < 2) return setFeedback(b2bFeedback, "Ingresa un nombre de empresa válido.");
  if (!rucRegex.test(companyRuc)) return setFeedback(b2bFeedback, "El RUC debe tener exactamente 11 dígitos.");
  if (!nameRegex.test(contactPerson)) return setFeedback(b2bFeedback, "La persona de contacto debe contener solo letras y espacios.");
  if (!validateEmail(contactEmail)) return setFeedback(b2bFeedback, "Ingresa un correo empresarial válido.");
  if (interestProduct.length < 2) return setFeedback(b2bFeedback, "Detalla al menos un producto de interés.");
  if (!Number.isFinite(estimatedQty) || estimatedQty < 1) return setFeedback(b2bFeedback, "La cantidad estimada debe ser mayor a 0.");

  setFeedback(b2bFeedback, "Solicitud enviada correctamente. Te contactaremos pronto.", "success");
  b2bForm.reset();
});

sellerProductForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!authSession || authSession.role !== "artesano") {
    setFeedback(sellerProductFeedback, "Debes iniciar sesión como artesano para publicar.");
    return;
  }

  const name = document.getElementById("sellerProductName").value.trim();
  const price = document.getElementById("sellerProductPrice").value.trim();
  const category = document.getElementById("sellerProductCategory").value.trim();
  const image = document.getElementById("sellerProductImage").value.trim();
  const description = document.getElementById("sellerProductDescription").value.trim();

  if (name.length < 3) return setFeedback(sellerProductFeedback, "El nombre del producto debe tener al menos 3 caracteres.");
  if (!/^S\/\s?\d+/.test(price)) return setFeedback(sellerProductFeedback, "Usa formato de precio válido, por ejemplo: S/ 199.");
  if (!category) return setFeedback(sellerProductFeedback, "Selecciona una categoría.");
  if (!/^https?:\/\//i.test(image)) return setFeedback(sellerProductFeedback, "Ingresa una URL de imagen válida (http/https).");
  if (description.length < 12) return setFeedback(sellerProductFeedback, "La descripción debe tener al menos 12 caracteres.");

  const user = getUsers().find((item) => item.email === authSession.email);
  const profile = user?.profile || {};

  const newId = `seller-${Date.now()}`;
  const newProduct = {
    id: newId,
    name,
    category,
    rating: "5.0",
    price,
    image,
    description,
    size: "Talla: Disponible",
    stock: "Stock: 10 unidades",
    artisan: `Artesano: ${authSession.fullName}`,
    story: profile.bio || "Producto creado por artesano Earth Fiber.",
    process: "Proceso artesanal publicado por el vendedor.",
    storyVideo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    processVideo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    artisanProfile: {
      name: profile.displayName || `${authSession.fullName} · Perú`,
      image: placeholderAvatar,
      bio: profile.bio || "Perfil de artesano en Earth Fiber.",
      experience: "Nuevo",
      origin: profile.origin || "Perú",
      technique: profile.technique || "Artesanía",
      profileRating: "⭐ 5.0/5",
      donationGoal: "Meta inicial de donación del artesano.",
      donationCurrent: 0,
      donationTarget: 100,
    },
  };

  products[newId] = newProduct;
  productList = Object.values(products);
  renderMarketplace();
  setFeedback(sellerProductFeedback, "Producto publicado correctamente y visible en el marketplace.", "success");
  sellerProductForm.reset();
});

sellerProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!authSession || authSession.role !== "artesano") {
    setFeedback(sellerProfileFeedback, "Debes iniciar sesión como artesano para editar perfil.");
    return;
  }

  const displayName = document.getElementById("sellerProfileName").value.trim();
  const origin = document.getElementById("sellerProfileOrigin").value.trim();
  const technique = document.getElementById("sellerProfileTechnique").value.trim();
  const bio = document.getElementById("sellerProfileBio").value.trim();

  if (!nameRegex.test(displayName)) return setFeedback(sellerProfileFeedback, "Nombre de perfil inválido.");
  if (origin.length < 2) return setFeedback(sellerProfileFeedback, "Ingresa un origen válido.");
  if (technique.length < 3) return setFeedback(sellerProfileFeedback, "Ingresa una técnica principal válida.");
  if (bio.length < 12) return setFeedback(sellerProfileFeedback, "La biografía debe tener al menos 12 caracteres.");

  const users = getUsers();
  const idx = users.findIndex((item) => item.email === authSession.email);
  if (idx === -1) return setFeedback(sellerProfileFeedback, "No se encontró la cuenta del artesano.");

  users[idx].fullName = displayName;
  users[idx].profile = { displayName, origin, technique, bio };
  saveUsers(users);
  authSession.fullName = displayName;
  localStorage.setItem(STORAGE_SESSION, JSON.stringify(authSession));

  setFeedback(sellerProfileFeedback, "Perfil actualizado correctamente.", "success");
  applySessionUI();
});

document.addEventListener("click", (event) => {
  const routeButton = event.target.closest(".route-link");
  if (routeButton) {
    navigate(routeButton.dataset.route);
    return;
  }

  const productButton = event.target.closest(".product-btn, .product-card, .mini-card");
  if (productButton?.dataset.productId) {
    renderProduct(productButton.dataset.productId);
    navigate("product");
  }
});

floatingArtisan.addEventListener("click", () => {
  navigate("artesano");
});

window.addEventListener("hashchange", () => {
  const route = location.hash.replace("#", "") || "home";
  if (views[route]) {
    if (route === "product") renderProduct(currentProductId);
    if (route === "artesano") renderArtisanFromCurrentProduct();
    if (route === "seller") hydrateSellerForms();
    showView(route);
  }
});

renderMarketplace();
renderProduct(currentProductId);
loadSession();

const initialRoute = location.hash.replace("#", "") || "home";
if (views[initialRoute]) {
  if (initialRoute === "product") renderProduct(currentProductId);
  if (initialRoute === "artesano") renderArtisanFromCurrentProduct();
  if (initialRoute === "seller") hydrateSellerForms();
  showView(initialRoute);
} else {
  showView("home");
}
