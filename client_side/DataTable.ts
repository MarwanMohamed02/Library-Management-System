import { BookType, IBook, ILibraryBook } from "../src/db/interfaces/Book"


let totalLibraryBooks: ILibraryBook[];
let displayedLibraryBooks: ILibraryBook[];
const token = localStorage.getItem('token');
var source = localStorage.getItem('target-entity');

function Show() {
  let element = document.getElementById("table-body") as HTMLTableElement;
  element.innerHTML = "";

  switch (source) {

    case 'library books':

      displayedLibraryBooks.forEach((book) => {
        element.innerHTML += "<tr> <th scope=\"row\">" + book.isbn + "</th>" + "<td>" + book.book_name + "</td>" + "<td>" + book.genre + "</td>" + "<td>" + book.author + "</td>" + "<td>" + book.avg_rating + "</td>" + "<td>" + book.borrow_quantity + "</td>" + "</tr>";
      })
      
      break;

    case 'bookstore books':

      //Display bookstore books

      break;

    case 'reservations':

      //Display reservations

      break;

    case 'borrows':

      //Display Borrows

      break;

    case 'workshops':

      //Display workshops

      break;

    case 'enrollments':

      //Display Enrollments

      break;

    case 'upcoming events':

      //Display Upcoming Events

      break;

    case 'previous events':

      //Display Previous Events

      break;
  }
}

const search = document.getElementById('search') as HTMLInputElement;
let card_body = document.getElementById("error-card") as HTMLElement;
search?.addEventListener('keypress', function handlePress(event) {

  if (event.key != 'Enter') {
    return;
  }

  card_body.innerHTML = "";
  var name = search.value;
  displayedLibraryBooks = [];
  var i = 0;
  for (var book of totalLibraryBooks) {
    if (name.toLowerCase() === book.book_name.toLowerCase()) {
      displayedLibraryBooks[i] = book;
      i++;
    }
  }


  if (i == 0) {
    displayedLibraryBooks = []
    card_body.innerHTML = '<div class="card-body"><i>No Book Exists With This Name. Please Check Your Spelling and Try Again.</i></div>';
  }

  Show();


});

const reset = document.getElementById('reset-btn') as HTMLButtonElement;
reset?.addEventListener('click', function handlePress(event) {

  card_body.innerHTML = "";
  search.value = "";
  displayedLibraryBooks = totalLibraryBooks;
  Show();

});

function prepareHeader() {

  let tableHeader = document.getElementById('table-header') as HTMLTemplateElement;

  switch (source) {

    case 'library books':
      tableHeader.innerHTML = '<th scope="col">ISBN</th><th scope="col">Book Name</th><th scope="col">Genre</th><th scope="col">Author</th><th scope="col">Rating</th><th scope="col">Available Quantity</th>';
      break;

    case 'bookstore books':

      tableHeader.innerHTML = '<th scope="col">#</th><th scope="col">Book Name</th><th scope="col">Genre</th><th scope="col">Author</th><th scope="col">Rating</th><th scope="col">Description</th><th scope="col">Available Quantity</th>';
      break;

    case 'reservations':

      tableHeader.innerHTML = '<th scope="col">ISBN</th><th scope="col">Book Name</th><th scope="col">Reservation Date</th><th scope="col">Deadline</th>';
      break;

    case 'borrows':

      tableHeader.innerHTML = '<th scope="col">ISBN</th><th scope="col">Book Name</th><th scope="col">Accepting Staff Member</th><th scope="col">Borrow Date</th><th scope="col">Deadline</th>';
      break;

    case 'workshops':

      tableHeader.innerHTML = '<th scope="col">Workshop Title</th><th scope="col">Enrollment Price</th><th scope="col">Instructor Name</th><th scope="col">Sponsoring Organization</th><th scope="col">Average Rating</th>';
      break;

    case 'enrollments':

      tableHeader.innerHTML = '<th scope="col">Workshop Title</th><th scope="col">Enrollment Date</th><th scope="col">Start Date</th><th scope="col">End Date</th>';
      break;

    case 'upcoming events':

      tableHeader.innerHTML = '<th scope="col">Attending Author</th><th scope="col">Date</th><th scope="col">Start Time</th><th scope="col">End Time</th>';
      break;

    case 'previous events':

      tableHeader.innerHTML = '<th scope="col">Attending Author</th><th scope="col">Date</th><th scope="col">Start Time</th><th scope="col">End Time</th><th scope="col">Average Rating</th>';
      break;
  }
}

async function GetEntities() {
  switch (source) {

    case 'library books':
      const request = await fetch(`/books?type=${BookType.LIBRARY_BOOK}`, {
        headers: {
          'Authorization': JSON.stringify("Bearer " + token)
        }
      });
      totalLibraryBooks = await request.json();
      displayedLibraryBooks = totalLibraryBooks;
      break;

    case 'bookstore books':

      //Fetch bookstore books

      break;

    case 'reservations':

      //Fetch reservations

      break;

    case 'borrows':

      //Fetch Borrows

      break;

    case 'workshops':

      //Fetch workshops

      break;

    case 'enrollments':

      //Fetch Enrollments

      break;

    case 'upcoming events':

      //Fetch Upcoming Events

      break;

    case 'previous events':

      //Fetch Previous Events

      break;
  }

}


window.onload = async function () {
  await GetEntities();
  prepareHeader();
  Show();
}

