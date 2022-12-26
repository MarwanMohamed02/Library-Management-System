const library_btn = document.getElementById("btn-books-library");
const bookstore_btn = document.getElementById("btn-books-bookstore");
const reservations_btn = document.getElementById("btn-reservations");
const borrows_btn = document.getElementById("btn-borrows");
const workshops_btn = document.getElementById("btn-available-workshops");
const enrollments_btn = document.getElementById("btn-enrollments");
const upcoming_events_btn = document.getElementById("btn-upcoming-events");
const prev_events_btn = document.getElementById("btn-prev-events");
const warnings = document.getElementById("Warnings");
const logo_navbar = document.getElementById("logo") as HTMLElement;




library_btn?.addEventListener('click', function handleClick(event) {
    localStorage.setItem('target-entity', 'library books');
    console.log("hamada");
})

bookstore_btn?.addEventListener('click', function handleClick(event) {
    localStorage.setItem('target-entity', 'bookstore books');
})

reservations_btn?.addEventListener('click', function handleClick(event) {
    localStorage.setItem('target-entity', 'reservations');
})

borrows_btn?.addEventListener('click', function handleClick(event) {
    localStorage.setItem('target-entity', 'borrows');
})

workshops_btn?.addEventListener('click', function handleClick(event) {
    localStorage.setItem('target-entity', 'workshops');
})

enrollments_btn?.addEventListener('click', function handleClick(event) {
    localStorage.setItem('target-entity', 'enrollments');
})

upcoming_events_btn?.addEventListener('click', function handleClick(event) {
    localStorage.setItem('target-entity', 'upcoming events');
})

prev_events_btn?.addEventListener('click', function handleClick(event) {
    localStorage.setItem('target-entity', 'previous events');
})
warnings?.addEventListener('click', function handleClick(event) {
   
    location.href = "warnings.html";
})


// window.onload = function () {
//     logo_navbar.innerText = "10";   //we should here call fetch function that will return count of warnings


   

// }

//Next lines related to warnings



