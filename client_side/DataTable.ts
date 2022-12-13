import { IBook } from "../src/db/interfaces/Book"

let totalBooks: IBook[];
let displayedBooks: IBook[];

function Show() {
  let element = document.getElementById("MyTable") as HTMLElement;
  element.innerHTML = "";
  for (let i = 0; i < displayedBooks.length; i++) {
    element.innerHTML += "<tr> <th scope=\"row\">" + (i + 1) + "</th>" + "<td>" + displayedBooks[i].book_name + "</td>" + "<td>" + displayedBooks[i].genre + "</td>" + "<td>" + displayedBooks[i].author + "</td>" + "<td>" + displayedBooks[i].avg_rating + "</td>" + "<td>" + displayedBooks[i].book_description + "</td>" + "</tr>";
  }
}

const search = document.getElementById('search-a');
search?.addEventListener('click', function handleClick(event) {
  var element = document.getElementById("search") as HTMLInputElement;
  var name = element.value;
  displayedBooks = [];
  var i = 0;
  for (var book of totalBooks) {
    if (name == book.book_name) {
      displayedBooks[i] = book;
      i++;
    }
  }


  if (i == 0) {
    window.alert("No Book with this name");
    displayedBooks = totalBooks
  }

  Show();
});


async function GetEntities() {
  const request = await fetch("/books");
  totalBooks = await request.json();
}


window.onload = async function () {
  await GetEntities();
  displayedBooks = totalBooks;
  Show();
}

