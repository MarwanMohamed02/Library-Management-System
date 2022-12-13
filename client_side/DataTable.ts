import { IBook } from "../src/db/interfaces/Book"

let totalLibraryBooks: IBook[];
let displayedLibraryBooks: IBook[];

var source = localStorage.getItem('target-entity');

function Show() {
  let element = document.getElementById("table-row") as HTMLTableRowElement;
  element.innerHTML = "";

  switch (source) {

    case 'library books':

      for (let i = 0; i < displayedLibraryBooks.length; i++) {
        element.innerHTML += "<tr> <th scope=\"row\">" + (i + 1) + "</th>" + "<td>" + displayedLibraryBooks[i].book_name + "</td>" + "<td>" + displayedLibraryBooks[i].genre + "</td>" + "<td>" + displayedLibraryBooks[i].author + "</td>" + "<td>" + displayedLibraryBooks[i].avg_rating + "</td>" + "<td>" + displayedLibraryBooks[i].book_description + "</td>" + "</tr>";
      }
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

const search = document.getElementById('search-a');
search?.addEventListener('click', function handleClick(event) {
  var element = document.getElementById("search") as HTMLInputElement;
  var name = element.value;
  displayedLibraryBooks = [];
  var i = 0;
  for (var book of totalLibraryBooks) {
    if (name == book.book_name) {
      displayedLibraryBooks[i] = book;
      i++;
    }
  }


  if (i == 0) {
    window.alert("No Book with this name");
    displayedLibraryBooks = totalLibraryBooks
  }

  Show();
});


function prepareHeader() {

  let tableHeader = document.getElementById('table-header') as HTMLTemplateElement;

  switch (source) {

    case 'library books':
      tableHeader.innerHTML = '<th scope="col">#</th><th scope="col">Book Name</th><th scope="col">Genre</th><th scope="col">Author</th><th scope="col">Rating</th><th scope="col">Description</th>';
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
      const request = await fetch("/books");
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

