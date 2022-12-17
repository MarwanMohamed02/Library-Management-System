import { BookType, IBook, ILibraryBook } from "../src/db/interfaces/Book"

let totalLibraryBooks: ILibraryBook[];
let displayedLibraryBooks: ILibraryBook[];
const token = localStorage.getItem('token');
var source = localStorage.getItem('target-entity');
let search = document.getElementById('search') as HTMLInputElement;
let card_body = document.getElementById("error-card") as HTMLElement;
let reset = document.getElementById('reset-btn') as HTMLButtonElement;
let rows = document.querySelectorAll('tr');
let selected_item = document.getElementById('selected-item') as HTMLElement;
let accordion_selection = document.getElementById('accordion-selection') as HTMLElement;
var selected_item_name = document.getElementById('selected-element-name') as HTMLElement;
var selected_item_author = document.getElementById('selected-element-author') as HTMLElement;
var selected_item_ISBN = document.getElementById('selected-element-ISBN') as HTMLElement;
var selected_item_rating = document.getElementById('selected-element-rating') as HTMLElement;
var reserve_div = document.getElementById('reserve') as HTMLElement;
let description = document.getElementById('description') as HTMLElement;

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


function Show() {
  let element = document.getElementById("table-body") as HTMLTableElement;
  element.innerHTML = "";

  switch (source) {

    case 'library books':

      displayedLibraryBooks.forEach((book) => {
        element.innerHTML += "<tr> <td>" + book.isbn + "</td>" + "<td>" + book.book_name + "</td>" + "<td>" + book.genre + "</td>" + "<td>" + book.author + "</td>" + "<td>" + book.avg_rating + "</td>" + "<td>" + book.borrow_quantity + "</td>" + "</tr>";
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

  rows = document.querySelectorAll('tr');
  rows.forEach(row => {
    row?.addEventListener('click', function handleRowPress(event) {
      selected_item?.scrollIntoView();

      selected_item_name.innerHTML = "Book Name: " + displayedLibraryBooks[row.rowIndex - 1].book_name;
      selected_item_author.innerHTML = "Author: " + displayedLibraryBooks[row.rowIndex - 1].author;
      selected_item_ISBN.innerHTML = "ISBN: " + displayedLibraryBooks[row.rowIndex - 1].isbn;
      selected_item_rating.innerHTML = "Average Rating: " + displayedLibraryBooks[row.rowIndex - 1].avg_rating.toString();
      description.innerHTML = displayedLibraryBooks[row.rowIndex - 1].book_description;

      accordion_selection.style.display = 'block';
      reserve_div.style.display = 'block';
    });
  });
}

window.onload = async function () {
  reserve_div.style.display = 'none';
  accordion_selection.style.display = 'none';
  await GetEntities();
  prepareHeader();
  Show();
}

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

reset?.addEventListener('click', function handlePress(event) {

  card_body.innerHTML = "";
  search.value = "";
  displayedLibraryBooks = totalLibraryBooks;
  selected_item_name.innerHTML = "";
  selected_item_ISBN.innerHTML = "";
  selected_item_author.innerHTML = "";
  selected_item_rating.innerHTML = "";

  reserve_div.style.display = 'none';
  accordion_selection.style.display = 'none';

  Show();

});