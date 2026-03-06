const views = {
  home: document.getElementById("view-home"),
  marketplace: document.getElementById("view-marketplace"),
  product: document.getElementById("view-product"),
  artesano: document.getElementById("view-artesano"),
  contacto: document.getElementById("view-contacto"),
  seller: document.getElementById("view-seller"),
};

const BASE_PRODUCTS = {
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
    process: "Selección manual de fibra, hilado y acabados hechos en taller familiar.",
    storyVideo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    processVideo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    artisanProfile: {
      name: "Laura Quispe · Cusco",
      image: "https://images.unsplash.com/photo-1542204625-de293a42d5f3?auto=format&fit=crop&w=900&q=80",
      bio: "14 años de experiencia en tejido y bordado con algodón nativo.",
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
    description: "Vestido artesanal en algodón nativo, fresco y de edición limitada.",
    size: "Tallas: S, M",
    stock: "Stock: 8 unidades",
    artisan: "Artesana: Ana Huamán (Ayacucho)",
    story: "Ana convirtió el oficio familiar en su principal fuente de ingresos.",
    process: "Teñido natural y confección por lotes pequeños con control de calidad.",
    storyVideo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    processVideo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    artisanProfile: {
      name: "Ana Huamán · Ayacucho",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
      bio: "Especialista en confección artesanal de vestidos.",
      experience: "11 años",
      origin: "Ayacucho, Perú",
      technique: "Teñido natural",
      profileRating: "⭐ 4.9/5",
      donationGoal: "Ana necesita S/ 240 para comprar materiales.",
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
    description: "Bolso a crochet de algodón nativo resistente y versátil.",
    size: "Talla: Única",
    stock: "Stock: 25 unidades",
    artisan: "Artesano: Luis Mamani (Puno)",
    story: "Luis trabaja junto a su familia en técnicas de crochet tradicional.",
    process: "Trenzado manual por módulos y acabados de alta resistencia.",
    storyVideo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    processVideo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    artisanProfile: {
      name: "Luis Mamani · Puno",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=900&q=80",
      bio: "Artesano textil enfocado en bolsos y accesorios funcionales.",
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
const STORAGE_CUSTOM_PRODUCTS = "earthfiber_custom_products";
const STORAGE_B2B_LEADS = "earthfiber_b2b_leads";
const STORAGE_REVIEWS = "earthfiber_reviews";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const nameRegex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{2,}$/;
const rucRegex = /^\d{11}$/;

const placeholderAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='100%25' height='100%25' fill='%238a5a3b'/%3E%3Ctext x='50%25' y='56%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter,sans-serif' font-size='30' fill='white'%3EEF%3C/text%3E%3C/svg%3E";

let products = { ...BASE_PRODUCTS, ...loadCustomProducts() };
let productList = Object.values(products);
let currentProductId = "qori";
let currentLeadId = null;
let authSession = null;
let videoObserver;
let selectedReviewStars = 0;

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

const companyContactSection = document.getElementById("companyContactSection");
const sellerInboxSection = document.getElementById("sellerInboxSection");
const sellerInboxList = document.getElementById("sellerInboxList");
const inboxChatPanel = document.getElementById("inboxChatPanel");
const chatTitle = document.getElementById("chatTitle");
const inboxChatMessages = document.getElementById("inboxChatMessages");
const sellerReplyForm = document.getElementById("sellerReplyForm");
const sellerReplyText = document.getElementById("sellerReplyText");
const sellerReplyFeedback = document.getElementById("sellerReplyFeedback");

const reviewForm = document.getElementById("reviewForm");
const reviewRoleHint = document.getElementById("reviewRoleHint");
const reviewComment = document.getElementById("reviewComment");
const reviewFeedback = document.getElementById("reviewFeedback");
const reviewSummary = document.getElementById("reviewSummary");
const reviewList = document.getElementById("reviewList");
const starButtons = Array.from(document.querySelectorAll(".star-btn"));

const b2bForm = document.getElementById("b2bForm");
const b2bFeedback = document.getElementById("b2bFeedback");

const sellerProductForm = document.getElementById("sellerProductForm");
const sellerProfileForm = document.getElementById("sellerProfileForm");
const sellerProductsList = document.getElementById("sellerProductsList");
const sellerProductFeedback = document.getElementById("sellerProductFeedback");
const sellerProfileFeedback = document.getElementById("sellerProfileFeedback");
const sellerEditingId = document.getElementById("sellerEditingId");
const sellerProductImage = document.getElementById("sellerProductImage");
const sellerImagePreview = document.getElementById("sellerImagePreview");
const sellerProductSubmitBtn = document.getElementById("sellerProductSubmitBtn");

floatingImage.addEventListener("error", () => {
  floatingImage.src = placeholderAvatar;
});

sellerProductImage.addEventListener("change", async () => {
  const file = sellerProductImage.files?.[0];
  if (!file) {
    sellerImagePreview.hidden = true;
    return;
  }
  sellerImagePreview.src = await fileToDataUrl(file);
  sellerImagePreview.hidden = false;
});

function getUsers() {
  const raw = localStorage.getItem(STORAGE_USERS);
  if (raw) return JSON.parse(raw);
  const seed = [
    { fullName: "Cliente Demo", email: "cliente@earthfiber.pe", password: "12345678", role: "cliente", profile: {} },
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

function loadCustomProducts() {
  const raw = localStorage.getItem(STORAGE_CUSTOM_PRODUCTS);
  return raw ? JSON.parse(raw) : {};
}

function persistCustomProducts() {
  const onlyCustom = Object.fromEntries(Object.entries(products).filter(([id]) => !BASE_PRODUCTS[id]));
  localStorage.setItem(STORAGE_CUSTOM_PRODUCTS, JSON.stringify(onlyCustom));
}

function getLeads() {
  const raw = localStorage.getItem(STORAGE_B2B_LEADS);
  return raw ? JSON.parse(raw) : [];
}

function saveLeads(leads) {
  localStorage.setItem(STORAGE_B2B_LEADS, JSON.stringify(leads));
}

function getReviews() {
  const raw = localStorage.getItem(STORAGE_REVIEWS);
  return raw ? JSON.parse(raw) : [];
}

function saveReviews(reviews) {
  localStorage.setItem(STORAGE_REVIEWS, JSON.stringify(reviews));
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
  authSession = raw ? JSON.parse(raw) : null;
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
    openLoginModal.textContent = "Iniciar sesión";
    logoutBtn.hidden = true;
    sellerRouteBtn.hidden = true;
  }
  updateContactViewMode();
  renderReviewSection(currentProductId);
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

function validateEmail(value) {
  return emailRegex.test(value);
}

function parsePriceValue(rawValue) {
  const digits = String(rawValue ?? "").replace(/[^\d]/g, "");
  if (!digits) return null;
  const amount = Number(digits);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return `S/ ${amount}`;
}

async function fileToDataUrl(file) {
  const rawDataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  // Reduce very large uploads to avoid UI freezes/localStorage bloat in demo mode.
  const compressed = await compressImageDataUrl(rawDataUrl, 1280, 0.78);
  return compressed || rawDataUrl;
}

function compressImageDataUrl(dataUrl, maxWidth = 1280, quality = 0.78) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(dataUrl);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      } catch {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

function updateStarInputUI() {
  starButtons.forEach((btn) => {
    btn.classList.toggle("active", Number(btn.dataset.star) <= selectedReviewStars);
  });
}

function renderReviewSection(productId) {
  const isClient = authSession?.role === "cliente";
  reviewForm.hidden = !isClient;
  reviewRoleHint.hidden = isClient;
  if (isClient) {
    reviewRoleHint.textContent = "";
  } else {
    reviewRoleHint.textContent = "Inicia sesión como cliente para dejar tu valoración.";
  }

  const reviews = getReviews().filter((r) => r.productId === productId);
  if (!reviews.length) {
    reviewSummary.textContent = "Aún no hay reseñas para este producto.";
    reviewList.innerHTML = "";
    return;
  }

  const avg = reviews.reduce((acc, r) => acc + r.stars, 0) / reviews.length;
  reviewSummary.textContent = `Promedio: ${avg.toFixed(1)} ★ (${reviews.length} reseñas)`;
  reviewList.innerHTML = reviews
    .slice()
    .reverse()
    .map(
      (r) => `<article class="review-item"><strong>${"★".repeat(r.stars)}${"☆".repeat(5-r.stars)}</strong><p>${r.comment}</p><div class="meta">${r.author} · ${new Date(r.createdAt).toLocaleDateString()}</div></article>`
    )
    .join("");
}

function getArtisanRating(artisanName) {
  const artisanProducts = productList.filter((p) => p.artisanProfile.name === artisanName);
  const ids = new Set(artisanProducts.map((p) => p.id));
  const reviews = getReviews().filter((r) => ids.has(r.productId));
  if (!reviews.length) return null;
  const avg = reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length;
  return `⭐ ${avg.toFixed(1)}/5`;
}

function renderMarketplace() {
  productList = Object.values(products);
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
    el.classList.toggle("active", el.dataset.route === route);
  });
}

function bindVideoAutoplay() {
  if (videoObserver) videoObserver.disconnect();
  const videos = document.querySelectorAll(".auto-video");
  videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!(entry.target instanceof HTMLVideoElement)) return;
        if (entry.isIntersecting) entry.target.play().catch(() => null);
        else entry.target.pause();
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

  if (route === "seller") {
    hydrateSellerForms();
    renderSellerProducts();
  }

  if (route === "contacto") {
    updateContactViewMode();
  }
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
  document.getElementById("storyVideo").src = product.storyVideo;

  renderReviewSection(product.id);

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
  const dynamicRating = getArtisanRating(artisan.name);
  document.getElementById("artisanRating").textContent = dynamicRating || artisan.profileRating;
  document.getElementById("donationGoal").textContent = artisan.donationGoal;
  document.getElementById("donationProgress").textContent = `S/ ${artisan.donationCurrent} recaudados de S/ ${artisan.donationTarget}`;
  document.getElementById("progressBar").style.width = `${Math.min((artisan.donationCurrent / artisan.donationTarget) * 100, 100)}%`;

  const carouselProducts = productList.filter((item) => item.artisanProfile.name === artisan.name);

  if (!carouselProducts.length) {
    artisanProducts.innerHTML = "<p>Este artesano aún no tiene productos publicados.</p>";
  } else {
    artisanProducts.innerHTML = carouselProducts
      .map(
        (item) => `
        <article class="mini-card" data-product-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" />
          <h4>${item.name}</h4>
          <p>${item.price}</p>
          <small>Ver detalle del producto →</small>
        </article>`
      )
      .join("");
  }
}

function navigate(route) {
  if (route === "seller" && (!authSession || authSession.role !== "artesano")) {
    showView("marketplace");
    location.hash = "marketplace";
    return;
  }

  if (route === "product") renderProduct(currentProductId);
  if (route === "artesano") renderArtisanFromCurrentProduct();

  showView(route);
  location.hash = route;
}

function openModal() {
  loginModal.hidden = false;
  loginFeedback.hidden = true;
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
}

function hydrateSellerForms() {
  if (!authSession || authSession.role !== "artesano") return;
  const user = getUsers().find((u) => u.email === authSession.email);
  const profile = user?.profile || {};

  document.getElementById("sellerProfileName").value = profile.displayName || user?.fullName || "";
  document.getElementById("sellerProfileOrigin").value = profile.origin || "";
  document.getElementById("sellerProfileTechnique").value = profile.technique || "";
  document.getElementById("sellerProfileBio").value = profile.bio || "";
}

function resetProductEditor() {
  sellerEditingId.value = "";
  sellerProductSubmitBtn.textContent = "Publicar producto";
  sellerProductForm.reset();
  sellerImagePreview.hidden = true;
  sellerImagePreview.src = "";
}

function renderSellerProducts() {
  if (!authSession || authSession.role !== "artesano") {
    sellerProductsList.innerHTML = "";
    return;
  }

  const mine = productList.filter((p) => p.ownerEmail === authSession.email);
  if (!mine.length) {
    sellerProductsList.innerHTML = "<p>Aún no has publicado productos.</p>";
    return;
  }

  sellerProductsList.innerHTML = mine
    .map(
      (item) => `
      <article class="seller-product-item">
        <strong>${item.name}</strong>
        <p>${item.price} · ${item.category}</p>
        <small>${item.description}</small>
        <div class="actions">
          <button class="btn btn-outline edit-product-btn" data-product-id="${item.id}" type="button">Editar</button>
          <button class="btn btn-outline delete-product-btn" data-product-id="${item.id}" type="button">Retirar</button>
        </div>
      </article>`
    )
    .join("");
}

function deleteSellerProduct(productId) {
  const product = products[productId];
  if (!product || product.ownerEmail !== authSession?.email) return;

  delete products[productId];
  persistCustomProducts();
  renderMarketplace();
  renderSellerProducts();

  if (sellerEditingId.value === productId) {
    resetProductEditor();
  }

  setFeedback(sellerProductFeedback, "Producto retirado correctamente.", "success");
}

function fillProductEditor(productId) {
  const product = products[productId];
  if (!product) return;
  sellerEditingId.value = product.id;
  document.getElementById("sellerProductName").value = product.name;
  document.getElementById("sellerProductPrice").value = String(product.price).replace(/[^\d]/g, "");
  document.getElementById("sellerProductCategory").value = product.category;
  document.getElementById("sellerProductDescription").value = product.description;
  sellerImagePreview.src = product.image;
  sellerImagePreview.hidden = false;
  sellerProductSubmitBtn.textContent = "Guardar cambios";
}

function updateContactViewMode() {
  const isArtisan = authSession?.role === "artesano";
  companyContactSection.hidden = isArtisan;
  sellerInboxSection.hidden = !isArtisan;
  if (isArtisan) renderSellerInbox();
}

function renderSellerInbox() {
  const leads = getLeads();
  if (!leads.length) {
    sellerInboxList.innerHTML = "<p>Aún no hay solicitudes empresariales.</p>";
    inboxChatPanel.hidden = true;
    currentLeadId = null;
    return;
  }

  sellerInboxList.innerHTML = leads
    .map(
      (lead) => `
      <article class="inbox-item">
        <strong>${lead.companyName}</strong>
        <p>${lead.contactPerson} · ${lead.contactEmail}</p>
        <small>RUC: ${lead.companyRuc} · Producto: ${lead.interestProduct} · Cantidad: ${lead.estimatedQty}</small>
        <div class="actions" style="margin-top:.55rem">
          <button type="button" class="btn btn-outline open-chat-btn" data-lead-id="${lead.id}">Abrir chat</button>
        </div>
      </article>`
    )
    .join("");
}

function openLeadChat(leadId) {
  const leads = getLeads();
  const lead = leads.find((l) => l.id === leadId);
  if (!lead) return;

  currentLeadId = leadId;
  inboxChatPanel.hidden = false;
  chatTitle.textContent = `Chat con ${lead.companyName}`;
  inboxChatMessages.innerHTML = lead.messages
    .map((msg) => `<div class="chat-msg ${msg.from}"><strong>${msg.from === "company" ? "Empresa" : "Artesano"}:</strong> ${msg.text}</div>`)
    .join("");
}

starButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedReviewStars = Number(btn.dataset.star);
    updateStarInputUI();
  });
});

reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (authSession?.role !== "cliente") {
    setFeedback(reviewFeedback, "Solo los clientes pueden dejar reseñas.");
    return;
  }

  const comment = reviewComment.value.trim();
  if (selectedReviewStars < 1 || selectedReviewStars > 5) {
    setFeedback(reviewFeedback, "Selecciona una calificación de 1 a 5 estrellas.");
    return;
  }
  if (comment.length < 6) {
    setFeedback(reviewFeedback, "Escribe una reseña con al menos 6 caracteres.");
    return;
  }

  const reviews = getReviews();
  reviews.push({
    productId: currentProductId,
    stars: selectedReviewStars,
    comment,
    author: authSession.fullName,
    createdAt: new Date().toISOString(),
  });
  saveReviews(reviews);

  reviewComment.value = "";
  selectedReviewStars = 0;
  updateStarInputUI();
  setFeedback(reviewFeedback, "Reseña publicada correctamente.", "success");

  renderReviewSection(currentProductId);
});

openLoginModal.addEventListener("click", () => {
  if (authSession) {
    navigate(authSession.role === "artesano" ? "seller" : "marketplace");
    return;
  }
  openModal();
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

  if (!validateEmail(email)) return setLoginFeedback("Ingresa un correo válido.");
  if (password.length < 8) return setLoginFeedback("La contraseña debe tener al menos 8 caracteres.");

  const user = getUsers().find((u) => u.email.toLowerCase() === email && u.role === role);
  if (!user || user.password !== password) {
    return setLoginFeedback("Credenciales inválidas o cuenta no registrada para este rol.");
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

  if (!nameRegex.test(fullName)) return setLoginFeedback("Ingresa un nombre válido (solo letras y espacios).");
  if (!validateEmail(email)) return setLoginFeedback("Ingresa un correo válido para crear cuenta.");
  if (password.length < 8) return setLoginFeedback("La contraseña debe tener mínimo 8 caracteres.");

  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === email && u.role === role)) {
    return setLoginFeedback("Ya existe una cuenta con ese correo para este rol.");
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
  const contactDetails = document.getElementById("contactDetails").value.trim();

  if (companyName.length < 2) return setFeedback(b2bFeedback, "Ingresa un nombre de empresa válido.");
  if (!rucRegex.test(companyRuc)) return setFeedback(b2bFeedback, "El RUC debe tener exactamente 11 dígitos.");
  if (!nameRegex.test(contactPerson)) return setFeedback(b2bFeedback, "La persona de contacto debe contener solo letras y espacios.");
  if (!validateEmail(contactEmail)) return setFeedback(b2bFeedback, "Ingresa un correo empresarial válido.");
  if (interestProduct.length < 2) return setFeedback(b2bFeedback, "Detalla al menos un producto de interés.");
  if (!Number.isFinite(estimatedQty) || estimatedQty < 1) return setFeedback(b2bFeedback, "La cantidad estimada debe ser mayor a 0.");

  const leads = getLeads();
  leads.unshift({
    id: `lead-${Date.now()}`,
    companyName,
    companyRuc,
    contactPerson,
    contactEmail,
    interestProduct,
    estimatedQty,
    messages: [
      {
        from: "company",
        text: `${contactDetails || "Solicitud inicial"} (Producto: ${interestProduct}, Cantidad: ${estimatedQty})`,
      },
    ],
  });
  saveLeads(leads);

  setFeedback(b2bFeedback, "Solicitud enviada correctamente. Un artesano te responderá pronto.", "success");
  b2bForm.reset();
});

sellerReplyForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!currentLeadId) return setFeedback(sellerReplyFeedback, "Selecciona una solicitud para responder.");
  const text = sellerReplyText.value.trim();
  if (text.length < 3) return setFeedback(sellerReplyFeedback, "Escribe un mensaje más detallado.");

  const leads = getLeads();
  const lead = leads.find((l) => l.id === currentLeadId);
  if (!lead) return;

  lead.messages.push({ from: "seller", text });
  saveLeads(leads);
  sellerReplyText.value = "";
  setFeedback(sellerReplyFeedback, "Respuesta enviada correctamente.", "success");
  openLeadChat(currentLeadId);
});

sellerProductForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!authSession || authSession.role !== "artesano") {
    return setFeedback(sellerProductFeedback, "Debes iniciar sesión como artesano para publicar.");
  }

  const name = document.getElementById("sellerProductName").value.trim();
  const priceInput = document.getElementById("sellerProductPrice").value.trim();
  const category = document.getElementById("sellerProductCategory").value.trim();
  const description = document.getElementById("sellerProductDescription").value.trim();
  const file = sellerProductImage.files?.[0];
  const editingId = sellerEditingId.value;

  const price = parsePriceValue(priceInput);

  if (name.length < 3) return setFeedback(sellerProductFeedback, "El nombre del producto debe tener al menos 3 caracteres.");
  if (!price) return setFeedback(sellerProductFeedback, "Ingresa un precio válido en números (ejemplo: 199).");
  if (!category) return setFeedback(sellerProductFeedback, "Selecciona una categoría.");
  if (description.length < 12) return setFeedback(sellerProductFeedback, "La descripción debe tener al menos 12 caracteres.");

  const previewImage = sellerImagePreview.hidden ? "" : sellerImagePreview.src;
  if (!editingId && !file && !previewImage) {
    return setFeedback(sellerProductFeedback, "Sube una imagen del producto.");
  }

  let image = editingId ? products[editingId]?.image : (previewImage || placeholderAvatar);
  if (file) {
    image = await fileToDataUrl(file);
  }

  const user = getUsers().find((u) => u.email === authSession.email);
  const profile = user?.profile || {};

  const id = editingId || `seller-${Date.now()}`;
  products[id] = {
    id,
    ownerEmail: authSession.email,
    name,
    category,
    rating: products[id]?.rating || "5.0",
    price,
    image,
    description,
    size: products[id]?.size || "Talla: Disponible",
    stock: products[id]?.stock || "Stock: 10 unidades",
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

  persistCustomProducts();
  renderMarketplace();
  renderSellerProducts();
  resetProductEditor();
  setFeedback(sellerProductFeedback, editingId ? "Producto actualizado correctamente." : "Producto publicado correctamente.", "success");
});

sellerProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!authSession || authSession.role !== "artesano") {
    return setFeedback(sellerProfileFeedback, "Debes iniciar sesión como artesano para editar perfil.");
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
  const idx = users.findIndex((u) => u.email === authSession.email);
  if (idx === -1) return setFeedback(sellerProfileFeedback, "No se encontró la cuenta del artesano.");

  users[idx].fullName = displayName;
  users[idx].profile = { displayName, origin, technique, bio };
  saveUsers(users);

  authSession.fullName = displayName;
  localStorage.setItem(STORAGE_SESSION, JSON.stringify(authSession));

  Object.values(products).forEach((p) => {
    if (p.ownerEmail === authSession.email) {
      p.artisan = `Artesano: ${displayName}`;
      p.artisanProfile = {
        ...p.artisanProfile,
        name: displayName,
        origin,
        technique,
        bio,
      };
    }
  });
  persistCustomProducts();
  renderMarketplace();
  renderSellerProducts();
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
    return;
  }

  const editButton = event.target.closest(".edit-product-btn");
  if (editButton?.dataset.productId) {
    fillProductEditor(editButton.dataset.productId);
    return;
  }

  const deleteButton = event.target.closest(".delete-product-btn");
  if (deleteButton?.dataset.productId) {
    deleteSellerProduct(deleteButton.dataset.productId);
    return;
  }

  const openChatBtn = event.target.closest(".open-chat-btn");
  if (openChatBtn?.dataset.leadId) {
    openLeadChat(openChatBtn.dataset.leadId);
  }
});

floatingArtisan.addEventListener("click", () => navigate("artesano"));

window.addEventListener("hashchange", () => {
  const route = location.hash.replace("#", "") || "home";
  if (views[route]) {
    if (route === "product") renderProduct(currentProductId);
    if (route === "artesano") renderArtisanFromCurrentProduct();
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
  showView(initialRoute);
} else {
  showView("home");
}
