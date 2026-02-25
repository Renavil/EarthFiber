const views = {
  home: document.getElementById("view-home"),
  marketplace: document.getElementById("view-marketplace"),
  product: document.getElementById("view-product"),
  artesano: document.getElementById("view-artesano"),
  contacto: document.getElementById("view-contacto"),
};

const products = {
  misti: {
    name: "Blusa Misti",
    price: "S/ 189",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80",
    description:
      "Blusa de algodón nativo con acabado fino y caída ligera para uso diario y eventos.",
    size: "Tallas: S, M, L",
    stock: "Stock: 18 unidades",
    artisan: "Artesana: Laura Quispe (Cusco)",
    story:
      "Laura aprendió a hilar con su madre en Chinchero y hoy crea piezas modernas preservando técnicas ancestrales.",
    process:
      "El proceso incluye selección manual de fibra, hilado, tejido y acabados hechos en taller familiar.",
    artisanName: "Laura Quispe · Cusco",
    artisanBio:
      "14 años de experiencia en tejido y bordado con algodón nativo. Especialista en piezas contemporáneas con identidad andina.",
    donationGoal: "Laura busca S/ 300 para mejorar su telar comunitario.",
    donationCurrent: 186,
    donationTarget: 300,
  },
  sumaq: {
    name: "Vestido Sumaq",
    price: "S/ 290",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    description: "Vestido artesanal en algodón nativo, fresco, elegante y de edición limitada.",
    size: "Tallas: S, M",
    stock: "Stock: 8 unidades",
    artisan: "Artesana: Ana Huamán (Ayacucho)",
    story: "Ana convirtió el oficio familiar en su principal fuente de ingresos para su comunidad.",
    process: "Teñido natural, patronaje manual y costura en lotes pequeños con control de calidad.",
    artisanName: "Ana Huamán · Ayacucho",
    artisanBio:
      "Especialista en confección artesanal de vestidos con enfoque en diseño sostenible y tradición textil.",
    donationGoal: "Ana necesita S/ 240 para comprar materiales para su taller.",
    donationCurrent: 120,
    donationTarget: 240,
  },
  qori: {
    name: "Bolso Qori",
    price: "S/ 145",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80",
    description: "Bolso a crochet de algodón nativo, resistente y versátil para uso urbano.",
    size: "Talla: Única",
    stock: "Stock: 25 unidades",
    artisan: "Artesano: Luis Mamani (Puno)",
    story:
      "Luis trabaja junto a su familia en técnicas de crochet tradicional, adaptadas a mercados actuales.",
    process: "Trenzado manual por módulos, ensamblado y acabados finales con control de tensión.",
    artisanName: "Luis Mamani · Puno",
    artisanBio:
      "Artesano textil enfocado en bolsos y accesorios funcionales con patrones inspirados en iconografía andina.",
    donationGoal: "Luis necesita S/ 150 para una laptop para su hija.",
    donationCurrent: 93,
    donationTarget: 150,
  },
};

const floatingArtisan = document.getElementById("floatingArtisan");
const floatingText = document.getElementById("floatingText");

let currentProductId = "qori";
let videoObserver;

function setActiveNav(route) {
  document.querySelectorAll(".route-link").forEach((el) => {
    const matches = el.dataset.route === route;
    el.classList.toggle("active", matches);
  });
}

function showView(route) {
  Object.values(views).forEach((view) => view?.classList.remove("active"));
  views[route]?.classList.add("active");
  setActiveNav(route);
  window.scrollTo({ top: 0, behavior: "auto" });

  floatingArtisan.style.display = route === "product" ? "flex" : "none";

  const video = document.getElementById("storyVideo");
  if (videoObserver) {
    videoObserver.disconnect();
  }

  if (route === "product" && video) {
    videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => null);
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 }
    );
    videoObserver.observe(video);
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

  floatingText.textContent = `Ver perfil de ${product.artisanName.split("·")[0].trim()}`;
}

function renderArtisanFromCurrentProduct() {
  const product = products[currentProductId];
  if (!product) return;

  document.getElementById("artisanName").textContent = product.artisanName;
  document.getElementById("artisanBio").textContent = product.artisanBio;
  document.getElementById("donationGoal").textContent = product.donationGoal;
  document.getElementById("donationProgress").textContent = `S/ ${product.donationCurrent} recaudados de S/ ${product.donationTarget}`;

  const width = Math.min((product.donationCurrent / product.donationTarget) * 100, 100);
  document.getElementById("progressBar").style.width = `${width}%`;
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

document.addEventListener("click", (event) => {
  const routeButton = event.target.closest(".route-link");
  if (routeButton) {
    navigate(routeButton.dataset.route);
    return;
  }

  const productButton = event.target.closest(".product-btn, .product-card");
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
    if (route === "artesano") renderArtisanFromCurrentProduct();
    if (route === "product") renderProduct(currentProductId);
    showView(route);
  }
});

renderProduct(currentProductId);
const initialRoute = location.hash.replace("#", "") || "home";
if (views[initialRoute]) {
  if (initialRoute === "artesano") renderArtisanFromCurrentProduct();
  showView(initialRoute);
} else {
  showView("home");
}
