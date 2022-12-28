import { io } from "socket.io-client";

import { INotification } from "../src/db/interfaces/Notifications"

const socket = io({
    auth: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiM2VhOTNlNTctYjg1Ni00OGYyLTkwMmMtM2Y2Njg5MWMzODk3IiwiaWF0IjoxNjcxODYyNzU5fQ.S6ONCS-PwaJqyHXeDyuN4OmblNglSdraHu8yWdpF9oI" // b3d kda htgebo ml local storage bas 5aleeh kda 3shan l testing
    }
});

socket.on("ping", (time) => {
    socket.emit("pong", time);
});



const warnings_notification = document.getElementById("Warnings");

const all = document.getElementById("WarPen");
const War = document.getElementById("War");
const Pen = document.getElementById("Pen");
const Mytitle = document.getElementById("Mytitle");
const Menu = document.getElementById("Menu");


all?.addEventListener('click', function handleClick(event) {
    if (Mytitle != null)
        Mytitle.innerText = "Notifications: "
    if (Menu)
        Menu.innerText = "All";

})
War?.addEventListener('click', function handleClick(event) {
    if (Mytitle != null)
        Mytitle.innerText = "Your Warnings: "
    if (Menu)
        Menu.innerText = "Warnings";
})
Pen?.addEventListener('click', function handleClick(event) {
    if (Mytitle != null)
        Mytitle.innerText = "Your Penalties: "
    if (Menu)
        Menu.innerText = "Penalties";
})

window.onload = function () {
    

    for (let i = 0; i < employee.length; i++) {
        Warnings_List.insertAdjacentHTML("afterbegin", "<a  href=\"#\" class=\"list-group-item list-group-item-action\"><div class=\"d-flex w-100 justify-content-between\"> <h5 class=\"mb-1\">" + employee[i].emp_name + "</h5><small class=\"text-muted\">" + employee[i].emp_desg + "</small></div><p class=\"mb-1\">" + "warning description" + "</p><small class=\"text-muted\">" + employee[i].emp_id + "</small></a>")
    }

}

let Warnings_List = document.getElementById("Warninglist") as HTMLElement;

let employee: { emp_id: number, emp_name: string, emp_desg: string }[] = [
    { "emp_id": 0, "emp_name": "Saideep", "emp_desg": "Tech Lead" },
    { "emp_id": 1, "emp_name": "Karthik", "emp_desg": "Manager" },
    { "emp_id": 2, "emp_name": "Kiran", "emp_desg": "Senior Systems Engineer" }
];//this is for testing only but will be changed with an array containing the warnings
window.onbeforeunload = () => {
    // save notifications
}

// after exactly 10 seconds 2 warnings will appear
socket.on("warnings", (warning_notifications: INotification[]) => {
    console.log(warning_notifications);

    // ht-update l list hena ya hamadaa
    
    for (let i = 0; i < warning_notifications.length; i++) {
        // baddelha hena be7eeth tst5dm kol l hagat ely fl data (shoof INotifications w IWarnings)
        // nafs l kalam fl penalties ba2a
        const { data, type:notificationType, notification_time }= warning_notifications[i]
        const { book_name, book_isbn, reservation_time, pick_up_before, verification_code } = data;
        Warnings_List.insertAdjacentHTML("afterbegin", "<a  href=\"#\" class=\"list-group-item list-group-item-action\"><div class=\"d-flex w-100 justify-content-between\"> <h5 class=\"mb-1\">" + book_name + "</h5><small class=\"text-muted\">" + book_isbn + "</small></div><p class=\"mb-1\">" + "warning description" + "</p><small class=\"text-muted\">" + notification_time + "</small></a>")
    }
})
