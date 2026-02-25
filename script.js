const storyFloat = document.getElementById("storyFloat");
const historySection = document.getElementById("historia");
const storyVideo = document.getElementById("storyVideo");

storyFloat?.addEventListener("click", () => {
  historySection?.scrollIntoView({ behavior: "smooth", block: "start" });
});

if (historySection && storyFloat) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        storyFloat.style.display = entry.isIntersecting ? "none" : "flex";
      });
    },
    { threshold: 0.4 }
  );
  sectionObserver.observe(historySection);
}

if (storyVideo) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          storyVideo.play().catch(() => null);
        } else {
          storyVideo.pause();
        }
      });
    },
    { threshold: 0.6 }
  );

  videoObserver.observe(storyVideo);
}
