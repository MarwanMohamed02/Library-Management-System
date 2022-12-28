import { BookType, IBook, IBookstoreBook, IBorrow, IDibs, ILibraryBook } from "../src/db/interfaces/Book"
import { IWorkshop, IEnrollment } from "../src/db/interfaces/Workshops"
import { IEvents } from "../src/db/interfaces/Events"
import { IReviews } from "../src/db/interfaces/Reviews"
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

let item1Reviews: IReviews[];
let item2Reviews: IReviews[];

//const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNWRiODdjMzgtNDg2My00ODM3LWJlOGItNDhlZmQ3ODUwMjU1IiwiaWF0IjoxNjcyMDQ2NjEzfQ.IlQ1neU1Ei83YaQ7uubqodYxQHJUEkUPEcVZzf4Ll_c";
// const token = localStorage.getItem('token');
var source = localStorage.getItem('target-entity');
let search = document.getElementById('search') as HTMLInputElement;
let card_body = document.getElementById("error-card") as HTMLElement;
let reset = document.getElementById('reset-btn') as HTMLButtonElement;
let rows = document.querySelectorAll('tr');
let selected_item = document.getElementById('selected-item') as HTMLElement;
let accordion_selection = document.getElementById('accordion-selection') as HTMLElement;
var selected_item_name = document.getElementById('selected-element-name') as HTMLElement;
var selected_item_1 = document.getElementById('selected-element-item1') as HTMLElement;
var selected_item_2 = document.getElementById('selected-element-item2') as HTMLElement;
var selected_item_3 = document.getElementById('selected-element-item3') as HTMLElement;
var selected_item_4 = document.getElementById('selected-element-item4') as HTMLElement;
var selected_item_5 = document.getElementById('selected-element-item5') as HTMLElement;
var reserve_div = document.getElementById('reserve') as HTMLElement;
var reserveButton = document.getElementById("reserve-btn") as HTMLButtonElement;
let description_header = document.getElementById('description-header') as HTMLElement;
let description = document.getElementById('description') as HTMLElement;

let accordion_btn_item1 = document.getElementById('accordion-btn-item1') as HTMLElement;
let accordion_btn_item2 = document.getElementById('accordion-btn-item2') as HTMLElement;

let write_item1_review = document.getElementById('enable-review-item1-btn') as HTMLElement;
let item1_review_input = document.getElementById('item1-review-input') as HTMLElement;
let review_item1_btn = document.getElementById('review-item1-btn') as HTMLElement;

let write_item2_review = document.getElementById('enable-review-item2-btn') as HTMLElement;
let item2_review_input = document.getElementById('item2-review-input') as HTMLElement;
let review_item2_btn = document.getElementById('review-item2-btn') as HTMLElement;

let reviews_title_item1 = document.getElementById('reviews-title-item1') as HTMLElement;
let reviews_title_item2 = document.getElementById('reviews-title-item2') as HTMLElement;

let item1_reviews = document.getElementById('carousel-reviews-item1') as HTMLElement;
let item2_reviews = document.getElementById('carousel-reviews-item2') as HTMLElement;
var response;
var reservedBook: ILibraryBook;
var selected_library_Book: ILibraryBook;
var selected_bookstore_Book: IBookstoreBook;
var selected_reservation: IDibs;
var selected_borrow: IBorrow;
var selected_workshop: IWorkshop;
var selected_enrollment: IEnrollment;
var selected_event: IEvents;

review_item1_btn.onclick = async (e) => {
  // prevents refreshing
  e.preventDefault();

  switch (source) {
    case 'library books':

      break;
    case 'bookstore books':

      break;
    case 'workshops':

      break;
    case 'enrollments':

      break;
  }
  if (response.status == 400) {
    // show error messsage above the reserve button
  }
}

reserveButton.onclick = async (e) => {
  // prevents refreshing
  e.preventDefault();
  response = await fetch("/calldibs", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ isbn: selected_library_Book.isbn })
  })

  if (response.status == 400) {
    // show error messsage above the reserve button
  }
}

async function GetEntities() {

  switch (source) {
    case 'library books':
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
      totalBorrows = borrows
      displayedBorrows = totalBorrows;

      break;

    case 'workshops':

      response = await fetch("/workshops", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const { availableWorkshops } = await response.json();
      totalWorkshops = availableWorkshops;
      displayedWorkshops = totalWorkshops;

      break;

    case 'enrollments':

      response = await fetch("/myenrollments", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const { enrollments } = await response.json();

      totalEnrollments = enrollments;
      displayedEnrollments = totalEnrollments;


      break;

    case 'upcoming events':

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

function displayReviews() {
  if (item1Reviews.length === 0) return;

  item1_reviews.innerHTML += '<div class="carousel-item active"><div class="reviews__card"><p class="lh-lg"><i class="fas fa-quote-left"></i>' + item1Reviews[0].comment + '<i class="fas fa-quote-right"></i><div class="ratings p-1" id="ratings0-item1"></div></p></div><div class="reviews__name"><h3>' + item1Reviews[0].member_name + '</h3><p class="fw-light">' + item1Reviews[0].review_time + '</p></div></div>';
  var current_rating_section = document.getElementById('ratings0-item1') as HTMLElement;
  var i;
  var j;
  for (i = 1; i < item1Reviews[0].rating + 0.1; i++) {
    current_rating_section.innerHTML += '<i class="fas fa-star"></i>';
  }
  if (item1Reviews[0].rating - i + 1 > 0.3) current_rating_section.innerHTML += '<i class="fas fa-star-half"></i>';

  for (i = 1; i < item1Reviews.length; i++) {
    item1_reviews.innerHTML += '<div class="carousel-item"><div class="reviews__card"><p class="lh-lg"><i class="fas fa-quote-left"></i>' + item1Reviews[i].comment + '<i class="fas fa-quote-right"></i><div class="ratings p-1" id="ratings' + i.toString() + '-item1"></div></p></div><div class="reviews__name"><h3>' + item1Reviews[i].member_name + '</h3><p class="fw-light">' + item1Reviews[i].review_time + '</p></div></div>';
    var current_rating_section = document.getElementById('ratings' + i.toString() + '-item1') as HTMLElement;
    for (j = 1; j < item1Reviews[i].rating; j++) {
      current_rating_section.innerHTML += '<i class="fas fa-star"></i>';
    }
    if (item1Reviews[i].rating - j + 1 > 0.3) current_rating_section.innerHTML += '<i class="fas fa-star-half"></i>';
  }

  if (item2Reviews.length === 0) return;

  item2_reviews.innerHTML += '<div class="carousel-item active"><div class="reviews__card"><p class="lh-lg"><i class="fas fa-quote-left"></i>' + item2Reviews[0].comment + '<i class="fas fa-quote-right"></i><div class="ratings p-1" id="ratings0-item2"></div></p></div><div class="reviews__name"><h3>' + item2Reviews[0].member_name + '</h3><p class="fw-light">' + item2Reviews[0].review_time + '</p></div></div>';
  var current_rating_section = document.getElementById('ratings0-item2') as HTMLElement;
  for (i = 1; i < item2Reviews[0].rating; i++) {
    current_rating_section.innerHTML += '<i class="fas fa-star"></i>';
  }
  if (item2Reviews[0].rating - i + 1 > 0.3) current_rating_section.innerHTML += '<i class="fas fa-star-half"></i>';

  for (i = 1; i < item2Reviews.length; i++) {
    item2_reviews.innerHTML += '<div class="carousel-item"><div class="reviews__card"><p class="lh-lg"><i class="fas fa-quote-left"></i>' + item2Reviews[i].comment + '<i class="fas fa-quote-right"></i><div class="ratings p-1" id="ratings' + i.toString() + '-item2"></div></p></div><div class="reviews__name"><h3>' + item2Reviews[i].member_name + '</h3><p class="fw-light">' + item2Reviews[i].review_time + '</p></div></div>';
    var current_rating_section = document.getElementById('ratings' + i.toString() + '-item2') as HTMLElement;
    for (j = 1; j < item2Reviews[i].rating; j++) {
      current_rating_section.innerHTML += '<i class="fas fa-star"></i>';
    }
    if (item2Reviews[i].rating - i + 1 > 0.3) current_rating_section.innerHTML += '<i class="fas fa-star-half"></i>';
  }
}

function PrepareSelectedItemEvents() {
  rows = document.querySelectorAll('tr');
  rows.forEach(row => {
    row?.addEventListener('click', async function handleRowPress(event) {
      selected_item?.scrollIntoView();

      switch (source) {

        case 'library books':
          item1_reviews.innerHTML = "";
          item2_reviews.innerHTML = "";
          selected_library_Book = displayedLibraryBooks[row.rowIndex - 1];

          selected_item_name.innerHTML = "Book Name: " + selected_library_Book.book_name;
          selected_item_1.innerHTML = "Author: " + selected_library_Book.firstname + " " + selected_library_Book.lastname;
          selected_item_2.innerHTML = "ISBN: " + selected_library_Book.isbn;
          selected_item_3.innerHTML = "Average Rating: " + selected_library_Book.avg_rating.toString() + " (" + selected_library_Book.reviews_count + ")";
          description.innerHTML = selected_library_Book.book_description;

          response = await fetch("/reviews/book?isbn=" + selected_library_Book.isbn, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          var { reviews } = await response.json();
          item1Reviews = reviews;

          response = await fetch("/reviews/author?author_id=" + selected_library_Book.author_id, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          var { reviews } = await response.json();
          item2Reviews = reviews;

          displayReviews();

          description_header.innerHTML = "Book Description";
          accordion_selection.style.display = 'block';
          reserve_div.style.display = 'block';
          break;

        case 'bookstore books':
          item1_reviews.innerHTML = "";
          item2_reviews.innerHTML = "";
          selected_bookstore_Book = displayedBookstoreBooks[row.rowIndex - 1];

          selected_item_name.innerHTML = "Book Name: " + selected_bookstore_Book.book_name;
          selected_item_1.innerHTML = "Author: " + selected_bookstore_Book.firstname + " " + selected_bookstore_Book.lastname;
          selected_item_2.innerHTML = "ISBN: " + selected_bookstore_Book.isbn;
          selected_item_3.innerHTML = "Average Rating: " + selected_bookstore_Book.avg_rating.toString() + " (" + selected_bookstore_Book.reviews_count + ")";
          selected_item_4.innerHTML = "Selling Price: $" + selected_bookstore_Book.price;
          description.innerHTML = selected_bookstore_Book.book_description;

          response = await fetch("/reviews/book?isbn=" + selected_bookstore_Book.isbn, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          var { reviews } = await response.json();
          item1Reviews = reviews;

          response = await fetch("/reviews/author?author_id=" + selected_bookstore_Book.author_id, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          var { reviews } = await response.json();
          item2Reviews = reviews;

          displayReviews();

          description_header.innerHTML = "Book Description";
          accordion_selection.style.display = 'block';
          break;

        case 'reservations':

          selected_reservation = displayedDibs[row.rowIndex - 1];

          selected_item_name.innerHTML = "Reserved Book Name: " + selected_reservation.book_name;
          selected_item_1.innerHTML = "Reserved On " + selected_reservation.reservation_date + " at " + selected_reservation.reservation_time;
          selected_item_2.innerHTML = "To be picked up before " + selected_reservation.pick_up_before_date + " at " + selected_reservation.pick_up_before_time;

          break;

        case 'borrows':

          selected_borrow = displayedBorrows[row.rowIndex - 1];

          selected_item_name.innerHTML = "Borrowed Book Name: " + selected_borrow.book_name;
          selected_item_1.innerHTML = "Borrowed On " + selected_borrow.borrow_date + " at " + selected_borrow.borrow_time;
          selected_item_2.innerHTML = "To be returned before " + selected_borrow.return_before_date + " at " + selected_borrow.return_before_time;

          break;

        case 'workshops':
          // item1_reviews.innerHTML = "";
          // item2_reviews.innerHTML = "";
          selected_workshop = displayedWorkshops[row.rowIndex - 1];

          selected_item_name.innerHTML = "Workshop Name: " + selected_workshop.workshop_title;
          selected_item_1.innerHTML = "Taught By: " + selected_workshop.instructor + ", Whose Email is " + selected_workshop.instructor_email;
          selected_item_2.innerHTML = "Sponsored By: " + selected_workshop.sponsor;
          selected_item_3.innerHTML = "Average Rating: " + selected_workshop.avg_rating.toString() + " (" + selected_workshop.reviews_count + ")";
          selected_item_4.innerHTML = "Enrollment Price: $" + selected_workshop.price;
          selected_item_5.innerHTML = "Hosted On " + selected_workshop.workshop_date + " From " + selected_workshop.workshop_start_time + " To " + selected_workshop.workshop_end_time;

          response = await fetch("/reviews/workshop?workshop_title=" + selected_workshop.workshop_title, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          var { reviews } = await response.json();
          item1Reviews = reviews;

          response = await fetch("/reviews/instructor?instructor_id=" + selected_workshop.instructor_id, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          var { reviews } = await response.json();
          item2Reviews = reviews;

          displayReviews();

          description_header.innerHTML = "Workshop Description";
          accordion_selection.style.display = 'block';

        case 'enrollments':
          // item1_reviews.innerHTML = "";
          // item2_reviews.innerHTML = "";
          selected_enrollment = displayedEnrollments[row.rowIndex - 1];

          selected_item_name.innerHTML = "Workshop Name: " + selected_enrollment.workshop_title;
          selected_item_1.innerHTML = "Taught By: " + selected_enrollment.instructor + ", Whose Email is " + selected_enrollment.instructor_email;
          selected_item_2.innerHTML = "Sponsored By: " + selected_enrollment.sponsor;
          selected_item_3.innerHTML = "Average Rating: " + selected_enrollment.avg_rating.toString() + " (" + selected_enrollment.reviews_count + ")";
          selected_item_4.innerHTML = "Enrollment Price: $" + selected_enrollment.price;
          selected_item_5.innerHTML = "Hosted On " + selected_enrollment.workshop_date + " From " + selected_enrollment.workshop_start_time + " To " + selected_enrollment.workshop_end_time;

          response = await fetch("/reviews/workshop?workshop_title=" + selected_workshop.workshop_title, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          var { reviews } = await response.json();
          item1Reviews = reviews;

          response = await fetch("/reviews/instructor?instructor_id=" + selected_workshop.instructor_id, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          var { reviews } = await response.json();
          item2Reviews = reviews;

          description_header.innerHTML = "Workshop Description";
          accordion_selection.style.display = 'block';

          break;

        case 'upcoming events':

          selected_event = displayedEvents[row.rowIndex - 1];

          selected_item_name.innerHTML = "Attending Author: " + selected_event.author_firstname + " " + selected_event.author_lastname;
          selected_item_1.innerHTML = "To Be Hosted On " + selected_event.event_date + " From " + selected_event.event_start_time + " To " + selected_event.event_end_time;
          selected_item_2.innerHTML = "Author Email: " + selected_event.author_email;
          selected_item_3.innerHTML = "Author Average Rating: " + selected_event.author_avg_rating.toString() + " (" + selected_event.author_reviews_count + ")";

          break;

        case 'previous events':

          selected_event = displayedAttendedEvents[row.rowIndex - 1];

          selected_item_name.innerHTML = "Attending Author: " + selected_event.author_firstname + " " + selected_event.author_lastname;
          selected_item_1.innerHTML = "Was Hosted On " + selected_event.event_date + " From " + selected_event.event_start_time + " To " + selected_event.event_end_time;
          selected_item_2.innerHTML = "Author Email: " + selected_event.author_email;
          selected_item_3.innerHTML = "Author Average Rating: " + selected_event.author_avg_rating.toString() + " (" + selected_event.author_reviews_count + ")";
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

  if (source === 'library books' || source === 'bookstore books') {
    accordion_btn_item1.innerHTML = "Book Reviews";
    accordion_btn_item2.innerHTML = "Author Reviews";
    reviews_title_item1.innerHTML = "What Readers Are Saying";
    reviews_title_item2.innerHTML = reviews_title_item1.innerHTML;
    review_item1_btn.innerHTML = "Review Book"
    review_item2_btn.innerHTML = "Review Author"
  } else if (source === "workshops" || source === "enrollments") {
    accordion_btn_item1.innerHTML = "Workshop Reviews";
    accordion_btn_item2.innerHTML = "Instructor Reviews";
    reviews_title_item1.innerHTML = "What Learners Are Saying"
    reviews_title_item2.innerHTML = reviews_title_item1.innerHTML;
    review_item1_btn.innerHTML = "Review Workshop";
    review_item2_btn.innerHTML = "Review Instructor";
  };

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
  var i = 0;

  switch (source) {

    case 'library books':

      displayedLibraryBooks = [];
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

      displayedDibs = [];
      for (var dib of totalDibs) {
        if (name.toLowerCase() === dib.book_name.toLowerCase()) {
          displayedDibs[i] = dib;
          i++;
        }
      }


      if (i == 0) {
        displayedDibs = []
        card_body.innerHTML = '<div class="card-body"><i>You Did Not Reserve Any Book With This Name. Please Check Your Spelling and Try Again.</i></div>';
      }

      break;

    case 'borrows':

      displayedBorrows = [];
      for (var borrow of totalBorrows) {
        if (name.toLowerCase() === borrow.book_name.toLowerCase()) {
          displayedBorrows[i] = borrow;
          i++;
        }
      }

      if (i == 0) {
        displayedBorrows = []
        card_body.innerHTML = '<div class="card-body"><i>You Did Not Borrow Any Book With This Name. Please Check Your Spelling and Try Again.</i></div>';
      }

      break;

    case 'workshops':

      displayedWorkshops = [];
      for (var workshop of totalWorkshops) {
        if (name.toLowerCase() === workshop.workshop_title.toLowerCase()) {
          displayedWorkshops[i] = workshop;
          i++;
        }
      }

      if (i == 0) {
        displayedWorkshops = []
        card_body.innerHTML = '<div class="card-body"><i>No Workshops Exist With This Title. Please Check Your Spelling and Try Again.</i></div>';
      }

      break;

    case 'enrollments':

      displayedEnrollments = [];
      for (var enrollment of totalEnrollments) {
        if (name.toLowerCase() === enrollment.workshop_title.toLowerCase()) {
          displayedEnrollments[i] = enrollment;
          i++;
        }
      }

      if (i == 0) {
        displayedEnrollments = []
        card_body.innerHTML = '<div class="card-body"><i>You Did Not Enroll In Any Workshops With This Title. Please Check Your Spelling and Try Again.</i></div>';
      }

      break;

    case 'upcoming events':

      displayedEvents = [];
      for (var current_event of totalEvents) {
        if (name.toLowerCase() === current_event.author_firstname.toLowerCase()
          || name.toLowerCase() === current_event.author_lastname.toLowerCase()
          || name.toLowerCase() === (current_event.author_firstname.toLowerCase() + current_event.author_lastname.toLowerCase())) {

          displayedEvents[i] = current_event;
          i++;
        }
      }

      if (i == 0) {
        displayedEvents = []
        card_body.innerHTML = '<div class="card-body"><i>No Signing Events Exist For The Selected Author. Please Check Your Spelling and Try Again.</i></div>';
      }

      break;

    case 'previous events':

      displayedAttendedEvents = [];
      for (var current_attended_event of totalAttendedEvents) {
        if (name.toLowerCase() === current_attended_event.author_firstname.toLowerCase()
          || name.toLowerCase() === current_attended_event.author_lastname.toLowerCase()
          || name.toLowerCase() === (current_attended_event.author_firstname.toLowerCase() + current_attended_event.author_lastname.toLowerCase())) {

          displayedAttendedEvents[i] = current_attended_event;
          i++;
        }
      }

      if (i == 0) {
        displayedAttendedEvents = []
        card_body.innerHTML = '<div class="card-body"><i>You Did Not Attend Any Signing Evenets For The Selected Author. Please Check Your Spelling and Try Again.</i></div>';
      }

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
  selected_item_1.innerHTML = "";
  selected_item_2.innerHTML = "";
  selected_item_3.innerHTML = "";
  selected_item_4.innerHTML = "";
  selected_item_5.innerHTML = "";

  reserve_div.style.display = 'none';
  accordion_selection.style.display = 'none';

  Show();

});

write_item1_review?.addEventListener('click', function handlePress(event) {

  item1_review_input.style.display = 'block';

  Show();

});

write_item2_review?.addEventListener('click', function handlePress(event) {

  item2_review_input.style.display = 'block';

  Show();

});