import { INotification } from "../src/db/interfaces/Notifications"
const login_button = document.getElementById("login-button") as HTMLButtonElement;

// localStorage.clear();


login_button.onclick = async () => {
    const username = document.getElementById("username") as HTMLInputElement;

    const password = document.getElementById("password") as HTMLInputElement;
    if (username.value == "" || password.value == "") {
        const msg = document.getElementById("error-msg") as HTMLElement;
        msg.innerText = "Please fill the two fields";
        return;
    }

    const loginData = {
        username: username.value,
        pass: password.value
    }

    const response = await fetch("/members/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })

    const { token, error } = await response.json();

    if (error) {
        const msg = document.getElementById("error-msg") as HTMLElement;
        msg.innerText = error;
    } else {
        localStorage.setItem("token", token);

        if (!localStorage.getItem("notifications")) {
            let notifications: INotification[] = [];
            localStorage.setItem("notifications", JSON.stringify(notifications));
        }
        
        if (!localStorage.getItem("unseen_notifications_count")) {
            let reset = 0
            localStorage.setItem("unseen_notifications_count", JSON.stringify(reset));
        }

        location.href = "./home";
    }

}
