import { BookType, IBook, IBookstoreBook, IBorrow, IDibs, ILibraryBook } from "../src/db/interfaces/Book"
import { IWorkshop, IEnrollment } from "../src/db/interfaces/Workshops"
import { IEvents } from "../src/db/interfaces/Events"
import { io } from "socket.io-client";

const { token } = localStorage;

const socket = io({
  auth: {
    token
  }
})

/* When implementing the notifications part consider the following (rakkez m3aya ya hamada mennak lyy): */

// hyb2a fy array kbeer stored fl localStorage esmo notifications
// hyb2a fy listeners zy l t7t dah "confirmation-notification", "warning-notification", "penalty-notification"
// fl page dy w f Home l listeners msh hy3mlo haga 8eer enohom y-insert fl notifications w y-call updateNotificationsCount ely htkoon fl navbar.ts
// amma l listener bta3 warnings.ts, dah hy-display l notification  (Warnings_List.insertAdjacentHTML("afterbegin", {html bta3 l notification}))

// updateNotificationsCount hta5od rakam w t-add it ll currentNotificationsCount w t-call functions bta3t kol page
// kol page hyb2a leha l function bt3tha ely bt-update l rakam bt3ha
// dah shakl l function ely fl navbar.ts

//   updateNotificationsCount(n) {
//
//      update_home_notifications_count(n)
//      update_datatable_notifications_count(n)
//      update_warnings_notifications_count(n)

//  }


// kol function ml 3 ely gowa dool hta5od l rakam w t7otto zy mahwa kda 3ndaha fl page
// l edge case l waheeeda lw n=0 sa3etha bnsheel l bta3a l 7amra :)


socket.on("confirmation-notification", (confirmation) => {
  console.log(confirmation);
  // "confirmation" should be added to the notifications array
})


let totalLibraryBooks: ILibraryBook[];
let displayedLibraryBooks: ILibraryBook[];

let totalBookstoreBooks: IBookstoreBook[];
let displayedBookstoreBooks: IBookstoreBook[];

let totalDibs: IDibs[];
let displayedDibs: IDibs[];

let totalBorrows: IBorrow[];
let displayedBorrows: IBorrow[];

let totalWorkshops: IWorkshop[];
let displayedWorkshops: IWorkshop[];

let totalEnrollments: IEnrollment[];
let displayedEnrollments: IEnrollment[];

let totalEvents: IEvents[];
let displayedEvents: IEvents[];

let totalAttendedEvents: IEvents[];
let displayedAttendedEvents: IEvents[];

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNWRiODdjMzgtNDg2My00ODM3LWJlOGItNDhlZmQ3ODUwMjU1IiwiaWF0IjoxNjcyMDQ2NjEzfQ.IlQ1neU1Ei83YaQ7uubqodYxQHJUEkUPEcVZzf4Ll_c";
// const token = localStorage.getItem('token');
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
var selected_item_price = document.getElementById('selected-element-price') as HTMLElement;
var reserve_div = document.getElementById('reserve') as HTMLElement;
var reserveButton = document.getElementById("reserve-btn") as HTMLButtonElement;
let description = document.getElementById('description') as HTMLElement;

var response;
var reservedBook: ILibraryBook;
var purchasedBook: IBookstoreBook;

reserveButton.onclick = async (e) => {
  // prevents refreshing
  e.preventDefault();

  response = await fetch("/calldibs", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ isbn: reservedBook.isbn })
  })

  if (response.status == 400) {
    // show error messsage above the reserve button
  }
}

async function GetEntities() {

  console.log(source);
  switch (source) {
    case 'library books':
      console.log("lib books: " + totalLibraryBooks);
      response = await fetch(`/books?type=${BookType.LIBRARY_BOOK}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      totalLibraryBooks = await response.json();

      displayedLibraryBooks = totalLibraryBooks;
      break;

    case 'bookstore books':

      response = await fetch(`/books?type=${BookType.BOOKSTORE_BOOK}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      totalBookstoreBooks = await response.json();
      displayedBookstoreBooks = totalBookstoreBooks;
      break;

    case 'reservations':

      response = await fetch("/mydibs", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const { dibs } = await response.json();
      totalDibs = dibs
      displayedDibs = totalDibs;

      break;

    case 'borrows':

      response = await fetch("/myborrows", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const { borrows } = await response.json();
      console.log(borrows);
      totalBorrows = borrows
      displayedBorrows = totalBorrows;

      break;

    case 'workshops':

      //Fetch workshops
      response = await fetch("/workshops", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const { availableWorkshops } = await response.json();
      totalWorkshops = availableWorkshops;
      displayedWorkshops = totalWorkshops;
      // console.log(displayedWorkshops)

      break;

    case 'enrollments':

      //Fetch Enrollments
      response = await fetch("/myenrollments", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const { enrollments } = await response.json();

      totalEnrollments = enrollments;
      displayedEnrollments = totalEnrollments;

      console.log(totalEnrollments);

      break;

    case 'upcoming events':

      //Fetch Upcoming Events
      response = await fetch("/events", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const { events } = await response.json();

      totalEvents = events
      displayedEvents = totalEvents;

      break;

    case 'previous events':

      //Fetch Previous Events
      response = await fetch("/events?attended=1", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const { events: attendedEvents } = await response.json();

      totalAttendedEvents = attendedEvents
      displayedAttendedEvents = totalAttendedEvents;
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

      tableHeader.innerHTML = '<th scope="col">ISBN</th><th scope="col">Book Name</th><th scope="col">Genre</th><th scope="col">Author</th><th scope="col">Rating</th><th scope="col">Price</th><th scope="col">Available Quantity</th>';
      break;

    case 'reservations':

      tableHeader.innerHTML = '<th scope="col">Book Name</th><th scope="col">Reservation Date</th><th scope="col">Deadline</th><th scope="col">Verification Code</th>';
      break;

    case 'borrows':

      tableHeader.innerHTML = '<th scope="col">Book Name</th><th scope="col">Borrow Date</th><th scope="col">Deadline</th>';
      break;

    case 'workshops':

      tableHeader.innerHTML = '<th scope="col">Workshop Title</th><th scope="col">Enrollment Price</th><th scope="col">Instructor Name</th><th scope="col">Sponsoring Organization</th><th scope="col">Average Rating</th>';
      break;

    case 'enrollments':

      tableHeader.innerHTML = '<th scope="col">Workshop Title</th><th scope="col">Enrollment Price</th><th scope="col">Instructor Name</th><th scope="col">Sponsoring Organization</th><th scope="col">Average Rating</th><th scope="col">Enrollment Date</th>';
      break;

    case 'upcoming events':

      tableHeader.innerHTML = '<th scope="col">Attending Author</th><th scope="col">Date</th><th scope="col">Start Time</th><th scope="col">End Time</th>';
      break;

    case 'previous events':

      tableHeader.innerHTML = '<th scope="col">Attending Author</th><th scope="col">Date</th><th scope="col">Start Time</th><th scope="col">End Time</th>';
      break;
  }
}

function PrepareSelectedItemEvents() {
  rows = document.querySelectorAll('tr');
  rows.forEach(row => {
    row?.addEventListener('click', function handleRowPress(event) {
      selected_item?.scrollIntoView();

      switch (source) {

        case 'library books':
          reservedBook = displayedLibraryBooks[row.rowIndex - 1];
          selected_item_name.innerHTML = "Book Name: " + reservedBook.book_name;
          selected_item_author.innerHTML = "Author: " + reservedBook.firstname + " " + reservedBook.lastname;
          selected_item_ISBN.innerHTML = "ISBN: " + reservedBook.isbn;
          selected_item_rating.innerHTML = "Average Rating: " + reservedBook.avg_rating.toString() + " (" + reservedBook.ratings_count + ")";
          description.innerHTML = reservedBook.book_description;

          accordion_selection.style.display = 'block';
          reserve_div.style.display = 'block';
          break;

        case 'bookstore books':
          purchasedBook = displayedBookstoreBooks[row.rowIndex - 1];

          selected_item_name.innerHTML = "Book Name: " + purchasedBook.book_name;
          selected_item_author.innerHTML = "Author: " + purchasedBook.firstname + " " + purchasedBook.lastname;
          selected_item_ISBN.innerHTML = "ISBN: " + purchasedBook.isbn;
          selected_item_rating.innerHTML = "Average Rating: " + purchasedBook.avg_rating.toString() + " (" + purchasedBook.ratings_count + ")";
          selected_item_price.innerHTML = "Selling Price: $" + purchasedBook.price;
          description.innerHTML = purchasedBook.book_description;

          accordion_selection.style.display = 'block';
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

    });
  });
}

function Show() {
  let table_body = document.getElementById("table-body") as HTMLTableElement;
  table_body.innerHTML = "";

  switch (source) {

    case 'library books':

      displayedLibraryBooks.forEach((book) => {
        table_body.innerHTML += "<tr> <td>" + book.isbn + "</td>" + "<td>" + book.book_name + "</td>" + "<td>" + book.genre + "</td>" + "<td>" + `${book.firstname} ${book.lastname}` + "</td>" + "<td>" + book.avg_rating + "</td>" + "<td>" + book.borrow_quantity + "</td>" + "</tr>";
      })

      break;

    case 'bookstore books':

      displayedBookstoreBooks.forEach((book) => {
        table_body.innerHTML += "<tr> <td>" + book.isbn + "</td>" + "<td>" + book.book_name + "</td>" + "<td>" + book.genre + "</td>" + "<td>" + `${book.firstname} ${book.lastname}` + "</td>" + "<td>" + book.avg_rating + "</td>" + "<td>" + book.price + "</td>" + "<td>" + book.selling_quantity + "</td>" + "</tr>";
      })

      break;

    case 'reservations':

      displayedDibs.forEach((dib) => {
        table_body.innerHTML += "<tr> <td>" + dib.book_name + "</td>" + "<td>" + dib.reservation_date + "</td>" + "<td>" + dib.pick_up_before_date + "</td>" + "<td>" + dib.verification_code + "</td>";
      })

      break;

    case 'borrows':

      displayedBorrows.forEach((borrow) => {
        table_body.innerHTML += "<tr> <td>" + borrow.book_name + "</td>" + "<td>" + borrow.borrow_date + "</td>" + "<td>" + borrow.return_before_date + "</td>";
      })

      break;

    case 'workshops':

      displayedWorkshops.forEach((workshop) => {
        table_body.innerHTML += "<tr> <td>" + workshop.workshop_title + "</td>" + "<td>" + workshop.price + "</td>" + "<td>" + workshop.instructor + "</td>" + "<td>" + workshop.sponsor + "</td>" + "<td>" + workshop.avg_rating + "</td>";
      })


      break;

    case 'enrollments':

      displayedEnrollments.forEach((workshop) => {
        table_body.innerHTML += "<tr> <td>" + workshop.workshop_title + "</td>" + "<td>" + workshop.price + "</td>" + "<td>" + workshop.instructor + "</td>" + "<td>" + workshop.sponsor + "</td>" + "<td>" + workshop.avg_rating + "</td>" + "<td>" + workshop.enrollment_date + "</td>";
      })

      break;

    case 'upcoming events':

      displayedEvents.forEach((event) => {
        table_body.innerHTML += "<tr> <td>" + event.author_firstname + " " + event.author_lastname + "</td>" + "<td>" + event.event_date + "</td>" + "<td>" + event.event_start_time + "</td>" + "<td>" + event.event_end_time + "</td>" + "<td>";
      })

      break;

    case 'previous events':

      displayedAttendedEvents.forEach((event) => {
        table_body.innerHTML += "<tr> <td>" + event.author_firstname + " " + event.author_lastname + "</td>" + "<td>" + event.event_date + "</td>" + "<td>" + event.event_start_time + "</td>" + "<td>" + event.event_end_time + "</td>" + "<td>";
      })

      break;
  }

  PrepareSelectedItemEvents();

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

  switch (source) {

    case 'library books':

      displayedLibraryBooks = [];
      var i = 0;
      for (var libraryBook of totalLibraryBooks) {
        if (name.toLowerCase() === libraryBook.book_name.toLowerCase()) {
          displayedLibraryBooks[i] = libraryBook;
          i++;
        }
      }


      if (i == 0) {
        displayedLibraryBooks = []
        card_body.innerHTML = '<div class="card-body"><i>No Book Exists With This Name In The Library. Please Check Your Spelling and Try Again.</i></div>';
      }

      break;

    case 'bookstore books':

      displayedBookstoreBooks = [];
      var i = 0;
      for (var bookstoreBook of totalBookstoreBooks) {
        if (name.toLowerCase() === bookstoreBook.book_name.toLowerCase()) {
          displayedBookstoreBooks[i] = bookstoreBook;
          i++;
        }
      }


      if (i == 0) {
        displayedBookstoreBooks = []
        card_body.innerHTML = '<div class="card-body"><i>No Book Exists With This Name In The Bookstore. Please Check Your Spelling and Try Again.</i></div>';
      }

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

  Show();


});

reset?.addEventListener('click', function handlePress(event) {

  card_body.innerHTML = "";
  search.value = "";
  displayedLibraryBooks = totalLibraryBooks;
  displayedBookstoreBooks = totalBookstoreBooks;
  selected_item_name.innerHTML = "";
  selected_item_ISBN.innerHTML = "";
  selected_item_author.innerHTML = "";
  selected_item_rating.innerHTML = "";
  selected_item_price.innerHTML = "";

  reserve_div.style.display = 'none';
  accordion_selection.style.display = 'none';

  Show();

});