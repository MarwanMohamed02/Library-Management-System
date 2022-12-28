import io from "socket.io-client"
import { INotification } from "../src/db/interfaces/Notifications";

var { token, notifications, unseen_notifications_count: stored_count } = localStorage;
notifications = JSON.parse(notifications)
let notifications_array: INotification[] = [];
for (let i = 0; i < notifications.length; i++) {
    notifications_array.push(notifications[i])
}
notifications_array.reverse();
console.log(notifications_array)

var unseen_notifications_count = JSON.parse(stored_count);

console.log(notifications_array);
console.log(unseen_notifications_count);

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
    updateNotificationCount();
})

socket.on("penalties", (penalties: INotification[]) => {
    penalties.forEach(penalty => {
        notifications_array.push(penalty);
        unseen_notifications_count++;
    })
    updateNotificationCount();
})

socket.on("confirmation-notification", (confirmation: INotification) => {
    
    notifications_array.push(confirmation);
    unseen_notifications_count++;
    
    updateNotificationCount();
})

window.onbeforeunload = () => {
    localStorage.setItem("unseen_notifications_count", JSON.stringify(unseen_notifications_count))
    localStorage.setItem("notifications", JSON.stringify(notifications_array));
}