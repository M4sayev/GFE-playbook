import "./styles.css";

// Write your JavaScript here.

const root = document.getElementById("root");

const state = {
  hoverRating: 0,
  rating: 0,
};

const starHTML = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="star-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            focusable="false"
            >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
        </svg>
        `;

function initRating(initialRating = 0, maxRating = 5) {
  state.rating = initialRating;

  const div = document.createElement("div");
  div.setAttribute("class", "star-rating");
  div.setAttribute("role", "radiogroup");

  div.addEventListener("mouseleave", () => {
    state.hoverRating = 0;
    renderStars();
  });

  // Populate stars

  Array.from({ length: maxRating }).map((_, index) => {
    const starNumber = index + 1;
    const btn = createStarButton(starNumber);
    div.appendChild(btn);
  });

  root.appendChild(div);
}

function createStarButton(starNumber) {
  const button = document.createElement("button");

  button.setAttribute("class", "star-btn");
  button.setAttribute("aria-checked", false);
  button.setAttribute("role", "radio");
  button.setAttribute("aria-label", "star");
  button.setAttribute("type", "button");

  button.innerHTML = starHTML;

  button.addEventListener("click", () => {
    state.rating = starNumber;
    renderStars();
  });
  button.addEventListener("mouseenter", () => {
    state.hoverRating = starNumber;
    renderStars();
  });

  return button;
}

function renderStars() {
  const buttons = document.querySelectorAll(".star-btn");

  buttons.forEach((button, index) => {
    const starNumber = index + 1;
    const star = button.querySelector("svg");

    const isFilled =
      state.hoverRating === 0
        ? starNumber <= state.rating
        : starNumber <= state.hoverRating;

    button.setAttribute("aria-checked", isFilled);
    star.classList.toggle("star-icon-filled", isFilled);
  });
}

initRating();
