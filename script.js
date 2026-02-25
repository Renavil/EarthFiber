const views = {
  home: document.getElementById("view-home"),
  marketplace: document.getElementById("view-marketplace"),
  product: document.getElementById("view-product"),
  artesano: document.getElementById("view-artesano"),
  contacto: document.getElementById("view-contacto"),
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
  inti: {
    id: "inti",
    name: "Bufanda Inti",
    category: "Bufanda",
    rating: "4.6",
    price: "S/ 110",
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1200&q=80",
    description: "Bufanda de fibra natural con patrón andino y acabado suave para climas fríos.",
    size: "Talla: Única",
    stock: "Stock: 30 unidades",
    artisan: "Artesana: Rosa Ccahuana (Cusco)",
    story: "Rosa impulsa una red de mujeres tejedoras que preservan técnicas comunitarias.",
    process: "Tejido en telar de cintura y acabado con lavado artesanal en frío.",
    storyVideo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    processVideo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    artisanProfile: {
      name: "Rosa Ccahuana · Cusco",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
      bio: "Lideresa textil comunitaria y promotora de moda artesanal con enfoque de comercio justo.",
      experience: "16 años",
      origin: "Cusco, Perú",
      technique: "Telar de cintura",
      profileRating: "⭐ 4.6/5",
      donationGoal: "Rosa busca S/ 200 para equipar su taller con nuevas agujas y telares.",
      donationCurrent: 145,
      donationTarget: 200,
    },
  },
  kantu: {
    id: "kantu",
    name: "Blusa Kantu",
    category: "Blusa",
    rating: "4.8",
    price: "S/ 210",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    description: "Blusa premium en algodón nativo de color natural con costura reforzada.",
    size: "Tallas: M, L",
    stock: "Stock: 11 unidades",
    artisan: "Artesana: Julia Ñahui (Lima)",
    story: "Julia fusiona patronaje moderno con técnicas de bordado heredadas por su abuela.",
    process: "Diseño, corte y bordado manual por lotes pequeños para asegurar calidad.",
    storyVideo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    processVideo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    artisanProfile: {
      name: "Julia Ñahui · Lima",
      image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80",
      bio: "Diseñadora y artesana que conecta moda urbana con identidad textil peruana.",
      experience: "7 años",
      origin: "Lima, Perú",
      technique: "Bordado contemporáneo",
      profileRating: "⭐ 4.8/5",
      donationGoal: "Julia necesita S/ 280 para adquirir una remalladora industrial.",
      donationCurrent: 98,
      donationTarget: 280,
    },
  },
  nayra: {
    id: "nayra",
    name: "Vestido Nayra",
    category: "Vestido",
    rating: "4.9",
    price: "S/ 340",
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=1200&q=80",
    description: "Vestido de edición limitada elaborado en fibras naturales y teñido orgánico.",
    size: "Tallas: S, M",
    stock: "Stock: 6 unidades",
    artisan: "Artesana: Miriam Soto (Arequipa)",
    story: "Miriam lidera talleres de formación para jóvenes artesanas en diseño textil.",
    process: "Teñido orgánico, confección por etapas y pruebas de acabado para colección premium.",
    storyVideo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    processVideo: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    artisanProfile: {
      name: "Miriam Soto · Arequipa",
      image: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=900&q=80",
      bio: "Artesana y formadora textil con enfoque en innovación de prendas premium.",
      experience: "13 años",
      origin: "Arequipa, Perú",
      technique: "Confección premium",
      profileRating: "⭐ 4.9/5",
      donationGoal: "Miriam busca S/ 360 para financiar becas de formación textil.",
      donationCurrent: 210,
      donationTarget: 360,
    },
  },
};

const productList = Object.values(products);
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
const loginFeedback = document.getElementById("loginFeedback");
const tabLogin = document.getElementById("tabLogin");
const tabRegister = document.getElementById("tabRegister");
const loginPanel = document.getElementById("loginPanel");
const registerPanel = document.getElementById("registerPanel");
const closeRegisterModal = document.getElementById("closeRegisterModal");
const submitRegister = document.getElementById("submitRegister");

let currentProductId = "qori";
let videoObserver;

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
  if (videoObserver) {
    videoObserver.disconnect();
  }

  const videos = document.querySelectorAll(".auto-video");
  videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target instanceof HTMLVideoElement) {
          if (entry.isIntersecting) {
            entry.target.play().catch(() => null);
          } else {
            entry.target.pause();
          }
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

  if (route === "product") {
    bindVideoAutoplay();
  } else if (videoObserver) {
    videoObserver.disconnect();
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
  document.getElementById("storyText").textContent = product.story;
  document.getElementById("processText").textContent = product.process;

  document.getElementById("storyVideo").src = product.storyVideo;
  document.getElementById("processVideo").src = product.processVideo;

  floatingText.textContent = `Ver perfil de ${product.artisanProfile.name.split("·")[0].trim()}`;
  floatingImage.src = product.artisanProfile.image;
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
  const fallbackProducts = relatedProducts.length ? relatedProducts : [product, ...productList.filter((item) => item.id !== product.id).slice(0, 3)];

  artisanProducts.innerHTML = fallbackProducts
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
  if (route === "product") {
    renderProduct(currentProductId);
  }

  if (route === "artesano") {
    renderArtisanFromCurrentProduct();
  }

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

openLoginModal.addEventListener("click", openModal);
closeLoginModal.addEventListener("click", closeModal);
closeRegisterModal.addEventListener("click", closeModal);
tabLogin.addEventListener("click", () => setAuthTab("login"));
tabRegister.addEventListener("click", () => setAuthTab("register"));
loginModal.addEventListener("click", (event) => {
  if (event.target === loginModal) {
    closeModal();
  }
});

submitLogin.addEventListener("click", () => {
  const role = loginRole.value;
  const roleLabel = role === "artesano" ? "Vendedor" : "Cliente";
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    loginFeedback.hidden = false;
    loginFeedback.textContent = "Completa correo y contraseña para continuar.";
    loginFeedback.className = "login-feedback error";
    return;
  }

  sessionBadge.hidden = false;
  sessionBadge.textContent = `Sesión activa: ${roleLabel}`;
  openLoginModal.textContent = "Mi cuenta";

  closeModal();
  navigate(role === "artesano" ? "artesano" : "marketplace");
});

submitRegister.addEventListener("click", () => {
  const role = document.getElementById("registerRole").value;
  const roleLabel = role === "artesano" ? "Vendedor" : "Cliente";
  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  if (!name || !email || password.length < 8) {
    loginFeedback.hidden = false;
    loginFeedback.textContent = "Completa todos los campos y usa una contraseña de mínimo 8 caracteres.";
    loginFeedback.className = "login-feedback error";
    return;
  }

  sessionBadge.hidden = false;
  sessionBadge.textContent = `Cuenta creada: ${roleLabel}`;
  openLoginModal.textContent = "Mi cuenta";

  closeModal();
  navigate(role === "artesano" ? "artesano" : "marketplace");
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
    showView(route);
  }
});

renderMarketplace();
renderProduct(currentProductId);

const initialRoute = location.hash.replace("#", "") || "home";
if (views[initialRoute]) {
  if (initialRoute === "product") renderProduct(currentProductId);
  if (initialRoute === "artesano") renderArtisanFromCurrentProduct();
  showView(initialRoute);
} else {
  showView("home");
}
