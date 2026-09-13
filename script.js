const imageSlots = document.querySelectorAll(".image-slot");
const materialInputs = document.querySelectorAll('.material-card input[type="checkbox"]');
const checkedCount = document.querySelector("#checkedCount");
const statusPop = document.querySelector("#statusPop");
const guestbookForm = document.querySelector("#guestbookForm");

function showStatus(message) {
  statusPop.textContent = message;
  statusPop.classList.add("visible");
  window.clearTimeout(showStatus.timeout);
  showStatus.timeout = window.setTimeout(() => {
    statusPop.classList.remove("visible");
  }, 2200);
}

function activateImage(slot) {
  const image = slot.querySelector("img");
  if (!image) return;

  const markLoaded = () => slot.classList.add("has-image");
  const markMissing = () => slot.classList.remove("has-image");

  image.addEventListener("load", markLoaded);
  image.addEventListener("error", markMissing);

  if (image.complete && image.naturalWidth > 0) markLoaded();
}

imageSlots.forEach(activateImage);

function updateMaterialCount() {
  const total = document.querySelectorAll('.material-card input[type="checkbox"]:checked').length;
  checkedCount.textContent = total;
  if (total === materialInputs.length) showStatus("Everything is ready. Begin when the room is quiet.");
}

materialInputs.forEach((input) => input.addEventListener("change", updateMaterialCount));

document.querySelectorAll("[data-message]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showStatus(link.dataset.message);
  });
});

guestbookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = guestbookForm.elements.name.value.trim() || "anonymous";
  const message = guestbookForm.elements.message.value.trim();

  if (!message) {
    showStatus("Please write a message first.");
    return;
  }

  const entry = document.createElement("div");
  entry.className = "guestbook-entry";

  const author = document.createElement("b");
  author.textContent = `${name}:`;

  const note = document.createElement("span");
  note.textContent = message;

  entry.append(author, note);
  guestbookForm.before(entry);
  guestbookForm.reset();
  showStatus("Your message was added to the guestbook.");
});

updateMaterialCount();
