const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

movieSelect.addEventListener("change", e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});


function updateSelectedCount() {
  // Get all selected seats
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  // Store selected seats index into local storage
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  // Calculate selected seats and count
  const selectedSeatsCounts = selectedSeats.length;
  count.innerText = selectedSeatsCounts;
  total.innerText = selectedSeatsCounts * ticketPrice;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}


function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Function to populate UI from local storage data

function populateUI() {
  // Get selected seats from local storage
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  // If there are selected seats, mark them as selected in the UI
  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  // Get selected movie data from local storage
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  // If there's a selected movie index, then set it in the dropdown
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

populateUI();

// Initialize ticket price
let ticketPrice = +movieSelect.value;

updateSelectedCount();