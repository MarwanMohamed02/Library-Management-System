import io from "socket.io-client"
import { INotification } from "../src/db/interfaces/Notifications";

var { token, notifications, unseen_notifications_count: stored_count } = localStorage;
let notifications_array = JSON.parse(notifications) as INotification[];

const socket = io({
    auth: {
        token
    }
});

socket.on("ping", (time) => {
    socket.emit("pong", time);
});


var warnings = document.getElementById("Warnings") as HTMLButtonElement;
let logo = document.getElementById("logo") as HTMLElement;

let unseen_notifications_count = JSON.parse(stored_count);
console.log(unseen_notifications_count);

updateNotificationCount()

function updateNotificationCount() {
    if (unseen_notifications_count == 0) {
        warnings.innerHTML = `  <span class="material-icons">
                                notification_important
                            </span> `;
    }
    else
        warnings.innerHTML = `  <span class="material-icons">
                                notification_important
                            </span>
                            <span id="logo"class="icon-button__badge">${unseen_notifications_count}</span>`;
}

socket.on("warnings", (warnings: INotification[]) => {
    warnings.forEach(warning => {
        notifications_array.push(warning);
        unseen_notifications_count++;
    })
})

socket.on("penalties", (warnings: INotification[]) => {
    warnings.forEach(warning => {
        notifications_array.push(warning);
        unseen_notifications_count++;
    })
})