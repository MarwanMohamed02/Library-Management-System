import { io } from "socket.io-client";

import { INotification } from "../src/db/interfaces/Notifications"



var { token, notifications } = localStorage;
notifications = JSON.parse(notifications)
let notifications_array: INotification[] = [];
for (let i = 0; i < notifications.length; i++) {
    notifications_array.push(notifications[i])
}

console.log(notifications_array)


console.log(notifications_array);


let reset = 0;
localStorage.setItem("unseen_notifications_count", JSON.stringify(reset))



let Warnings_List = document.getElementById("Warninglist") as HTMLElement;
let bell = document.getElementById("Warnings") as HTMLElement;
const all = document.getElementById("WarPen");
const War = document.getElementById("War");
const Pen = document.getElementById("Pen");
const Con = document.getElementById("Con");
const Mytitle = document.getElementById("Mytitle");
const Menu = document.getElementById("Menu");
let logo = document.getElementById("logo") as HTMLElement;

bell.innerHTML = `  <span class="material-icons">
                        notification_important
                    </span> `;

const socket = io({
    auth: {
        token
    }
});

socket.on("ping", (time) => {
    socket.emit("pong", time);
});

function warning_notification(data: any, notification_time: string): string {
    const { book_name, reservation_time, pick_up_before, verification_code } = data;
    let [ time, date ] = notification_time.split("$")
    return `<a  href="#" class="list-group-item list-group-item-action" aria-current="true">
                <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">Warning</h4>
                <small color=>${time}</small>
                </div>
                <small style="color: rgb(202, 119, 10);margin-left: 8px;">  ${date}</small>
                <p class="mb-1" style="margin-left: 10px;"> </p>
                <p class="mb-1" style="margin-left: 10px;">Kindly pickup your reservation of "${book_name}" using the verification code (${verification_code})</p>
                <p class="mb-1" style="margin-left: 10px;">You reserved this book at: ${reservation_time},  and pick up time was before: ${pick_up_before}</p>
                <small style="color: rgb(202, 10, 10);margin-left: 10px;">Note: 5 warnings will prohibit online reservation </small>
            </a>`
}

function confirmation_notification(data: any, notification_time: string): string {
    const { book_name, pick_up_before, verification_code } = data;
    let [ time, date ] = notification_time.split("$")
    return `<a  href="#" class="list-group-item list-group-item-action" aria-current="true">
                <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">Confirmed!</h4>
                <small color=>${time}</small>
                </div>
                <small style="color: rgb(202, 119, 10);margin-left: 8px;">  ${date}</small>
                <p class="mb-1" style="margin-left: 10px;"> </p>
                <p class="mb-1" style="margin-left: 10px;">Your reservation of "${book_name}" was successful! </p>
                <p class="mb-1" style="margin-left: 10px;">Use the verification code (${verification_code}) to pick it up before: ${pick_up_before}</p>
            </a>`
}
function rsrv_penalty_notification(data: any, notification_time: string): string {
    const { book_name, reservation_time, pick_up_before, fee } = data;
    let [ time, date ] = notification_time.split("$")
    return `<a  href="#" class="list-group-item list-group-item-action" aria-current="true">
                <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">Reservation Penalty</h4>
                <small color=>${time}</small>
                </div>
                <small style="color: rgb(202, 119, 10);margin-left: 8px;">  ${date}</small>
                <p class="mb-1" style="margin-left: 10px;"> </p>
                <p class="mb-1" style="margin-left: 10px;">You have reached 5 warnings, to enable online reservation stop by the library and pay the fee of $${fee}</p>
                <p class="mb-1" style="margin-left: 10px;"> </p>
                <p class="mb-1" style="color: rgb(202, 119, 10);margin-left: 10px;">Last Reservation Details </p>
                <p class="mb-1" style="margin-left: 20px;">Book: ${book_name} </p>
                <p class="mb-1" style="margin-left: 20px;">Reserved At: ${reservation_time} </p>
                <p class="mb-1" style="margin-left: 20px;">Pickup Deadline: ${pick_up_before} </p>
            </a>`
}
function borrow_penalty_notification(data: any, notification_time: string): string {
    const { book_name, borrow_time, return_before, fee } = data;
    let [ time, date ] = notification_time.split("$")
    return `<a  href="#" class="list-group-item list-group-item-action" aria-current="true">
                <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">Borrow Penalty</h4>
                <small color=>${time}</small>
                </div>
                <small style="color: rgb(202, 119, 10);margin-left: 8px;">  ${date}</small>
                <p class="mb-1" style="margin-left: 10px;">You are temporarily banned from our services. Please pay the fee of $${fee} to continue using our services</p>
                <p class="mb-1" style="margin-left: 10px;"> </p>
                <p class="mb-1" style="color: rgb(202, 119, 10);margin-left: 10px;">Last Borrow Details </p>
                <p class="mb-1" style="margin-left: 20px;">Book: ${book_name} </p>
                <p class="mb-1" style="margin-left: 20px;">Borrowed At: ${borrow_time} </p>
                <p class="mb-1" style="margin-left: 20px;">Return Deadline: ${return_before} </p>
                <small style="color: rgb(202, 10, 10);margin-left: 10px;">Note: You cannot borrow/reserve before paying the penalty fee </small>
            </a>`
}
const testWarningNotification: INotification = {

    data: {
        book_name: 'A Tale of Two Cities',
        book_isbn: '978-3-16-148410-2',
        reservation_time: '2:08:06 AM 12/26/2022',
        pick_up_before: '2:10:13 AM 12/26/2022',
        verification_code: 550050,
        fee: 5
    },
    notification_time : "6:09:02 PM$12/28/2022",
    type: "no pickup warning"
}
const testConfirmationNotification: INotification = {

    data: {
        isbn: '978-3-16-148410-3',
        book_name: 'Quantum Physics',
        pick_up_before: '7:22:27 PM 12/28/2022',
        verification_code: '525550'
    },
    notification_time: "7:22:18 PM$12/28/2022",
    type: "confirmation"
}
const testPickupPenaltyNotification: INotification = {

    data: {
        book_name: 'Quantum Physics',
        book_isbn: '978-3-16-148410-3', 
        reservation_time: '1:18:06 PM 12/26/2022', 
        pick_up_before: '2:10:13 AM 12/26/2022',
        fee: 5
    },
    notification_time: "7:30:43 PM$12/28/2022",
    type: "no pickup penalty"
}
const testBorrowPenaltyNotification: INotification = {
    data: {
        book_name: 'A Tale of Two Cities',
        book_isbn: '978-3-16-148410-2',
        borrow_time: '3:54:46 PM 1/6/2023',
        return_before: '2:10:13 AM 12/26/2022',
        fee: 20
    },
    type: 'late return penalty',
    notification_time: '7:51:35 PM$12/28/2022'
}

// notifications_array.push(testWarningNotification);
// notifications_array.push(testConfirmationNotification);
// notifications_array.push(testPickupPenaltyNotification);
// notifications_array.push(testBorrowPenaltyNotification);

function displayAllNotifications() {
    notifications_array.forEach(notification => {
        const { type, data, notification_time } = notification
        let html: string = "";
        switch (type) {
            case 'no pickup warning':
                html = warning_notification(data, notification_time);
                break;
            case 'confirmation':
                html = confirmation_notification(data, notification_time)
                break;
            case 'no pickup penalty':
                html = rsrv_penalty_notification(data, notification_time)
                break;
            case 'late return penalty':
                html = borrow_penalty_notification(data, notification_time)
                break;
        }

        Warnings_List.insertAdjacentHTML("afterbegin", html)

    });
}

displayAllNotifications();









all?.addEventListener('click', function handleClick(event) {
    if (Mytitle != null)
        Mytitle.innerText = "Notifications: "
    if (Menu)
        Menu.innerText = "All";

    displayAllNotifications();
})
War?.addEventListener('click', function handleClick(event) {
    if (Mytitle != null)
        Mytitle.innerText = "Your Warnings: "
    if (Menu)
        Menu.innerText = "Warnings";
    
    Warnings_List.innerHTML = "";
    let html: string = "";
    notifications_array.forEach(notification => {
        if (notification.type == "no pickup warning") {
            html = warning_notification(notification.data, notification.notification_time);
            Warnings_List.insertAdjacentHTML("afterbegin", html)
        }
    })
})
Pen?.addEventListener('click', function handleClick(event) {
    if (Mytitle != null)
        Mytitle.innerText = "Your Penalties: "
    if (Menu)
        Menu.innerText = "Penalties";
    
    Warnings_List.innerHTML = "";
    let html: string;
    notifications_array.forEach(notification => {
        if (notification.type == "no pickup penalty") {
            html = rsrv_penalty_notification(notification.data, notification.notification_time);
            Warnings_List.insertAdjacentHTML("afterbegin", html)
        }
        else if (notification.type == "late return penalty") {
            html = borrow_penalty_notification(notification.data, notification.notification_time);
            Warnings_List.insertAdjacentHTML("afterbegin", html)
            
        }
    })
})
Con?.addEventListener('click', function handleClick(event) {
    if (Mytitle != null)
        Mytitle.innerText = "Your Confirmations: "
    if (Menu)
        Menu.innerText = "Confirmations";
    
    Warnings_List.innerHTML = "";
    let html: string;
    notifications_array.forEach(notification => {
        if (notification.type == "confirmation") {
            html = confirmation_notification(notification.data, notification.notification_time);
            Warnings_List.insertAdjacentHTML("afterbegin", html)
        }
    })
})




let employee: { emp_id: number, emp_name: string, emp_desg: string }[] = [
    { "emp_id": 0, "emp_name": "Saideep", "emp_desg": "Tech Lead" },
    { "emp_id": 1, "emp_name": "Karthik", "emp_desg": "Manager" },
    { "emp_id": 2, "emp_name": "Kiran", "emp_desg": "Senior Systems Engineer" }
];//this is for testing only but will be changed with an array containing the warnings



// after exactly 10 seconds 2 warnings will appear
socket.on("warnings", (warning_notifications: INotification[]) => {
    console.log(warning_notifications);


    let html: string;
    warning_notifications.forEach((warning) => {
        notifications_array.push(warning)
        const { data, notification_time, type } = warning
        html = type == "no pickup penalty" ? rsrv_penalty_notification(data, notification_time) : warning_notification(data, notification_time);
        console.log(html);
        Warnings_List.insertAdjacentHTML("afterbegin", html);
    })
})

socket.on("penalties", (penalty_notifications: INotification[]) => {
    console.log(penalty_notifications);

    
    
    let html: string;
    penalty_notifications.forEach((penalty) => {
        notifications_array.push(penalty)
        const { data, notification_time } = penalty
        html = borrow_penalty_notification(data, notification_time);
        Warnings_List.insertAdjacentHTML("afterbegin", html );
    })
})

socket.on("confirmation-notification", (confirmation: INotification) => {
    console.log(confirmation);

    notifications_array.push(confirmation)

    let html: string;
    
    const { data, notification_time } = confirmation
    html = confirmation_notification(data, notification_time);

    Warnings_List.insertAdjacentHTML("afterbegin", html );

})

window.onbeforeunload = () => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
}
