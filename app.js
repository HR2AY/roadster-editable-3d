const viewer = document.querySelector("#roadster");
const swatches = [...document.querySelectorAll(".swatch")];

viewer.addEventListener("progress", (event) => {
  document.querySelector(".progress span").style.width = `${event.detail.totalProgress * 100}%`;
});

viewer.addEventListener("load", () => {
  document.querySelector(".progress").style.display = "none";
});

for (const swatch of swatches) {
  swatch.addEventListener("click", () => {
    const material = viewer.model?.materials.find((item) => item.name === "Paint");
    if (!material) return;
    const hex = swatch.dataset.color;
    const rgb = [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16) / 255);
    material.pbrMetallicRoughness.setBaseColorFactor([...rgb, 1]);
    swatches.forEach((item) => item.classList.toggle("active", item === swatch));
  });
}
