const library_btn = document.getElementById("btn-books-library");
const bookstore_btn = document.getElementById("btn-books-bookstore");
const reservations_btn = document.getElementById("btn-reservations");
const borrows_btn = document.getElementById("btn-borrows");
const workshops_btn = document.getElementById("btn-available-workshops");
const enrollments_btn = document.getElementById("btn-enrollments");
const upcoming_events_btn = document.getElementById("btn-upcoming-events");
const prev_events_btn = document.getElementById("btn-prev-events");
const warnings_notification= document.getElementById("Warnings");
const logo= document.getElementById("logo");


library_btn?.addEventListener('click', function handleClick(event) {
    localStorage.setItem('target-entity', 'library books');
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
warnings_notification?.addEventListener('click', function handleClick(event) {
   
    location.href = "warnings.html";
})


window.onload =  function () {
    logo.innerText="10";   //we should here call fetch function that will return count of warnings


    for(let i=0;i<employee.length;i++){
        Warnings_List.innerHTML+="<a  href=\"#\" class=\"list-group-item list-group-item-action\"><div class=\"d-flex w-100 justify-content-between\"> <h5 class=\"mb-1\">"+employee[i].emp_name+"</h5><small class=\"text-muted\">"+employee[i].emp_desg+"</small></div><p class=\"mb-1\">"+"warning description"+"</p><small class=\"text-muted\">"+employee[i].emp_id+"</small></a>"
    }
      
   
  }

  let Warnings_List=document.getElementById("Warninglist") as HTMLElement;
let employee: { emp_id: number, emp_name: string, emp_desg: string }[] = [
    { "emp_id": 0, "emp_name": "Saideep", "emp_desg": "Tech Lead" },
    { "emp_id": 1, "emp_name": "Karthik", "emp_desg": "Manager" },
    { "emp_id": 2, "emp_name": "Kiran", "emp_desg": "Senior Systems Engineer" }
];//this is for testing only but will be changed with an array containing the warnings


