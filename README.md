# Library-Management-System

In this project, we are going to build a web application that is going to serve as
a library management system. The mini-world we are considering consists of
a single library, one that allows its members to borrow books and to enroll in
workshops hosted within the library. To manage and organize the relevant
tasks, we will build a database that will contain records of the books’ and
members’ details, borrowings and reservations, available workshops and
instructors, warnings, and many other details that will be specified in the
upcoming sections of this report.

In order for members to borrow books through our system, they will first use
our web application to reserve a book, which they can later pick up from the
library, provided that they do so before a set deadline which depends on their
membership status. Once they pick it up, the admin will change the status of the
book from “reserved” to “borrowed”. Furthermore, members will be able to
quickly enroll in available workshops through our application. More complex
features would involve more intricate privileges for different membership types
(different borrow limits, borrow/reservation periods, …etc.).
