

export function checkForToken() {
    const { token } = localStorage;

    console.log("hanyyyyy")
    console.log(token)

    if (!token)
        location.href = "/";
}
checkForToken();