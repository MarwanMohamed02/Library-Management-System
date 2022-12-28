const signup_button=document.getElementById("signup-button") as HTMLButtonElement;

signup_button.onclick = async () =>{
    const firstname=document.getElementById("firstname") as HTMLInputElement;
    const lastname=document.getElementById("lastname") as HTMLInputElement;
    const username=document.getElementById("username") as HTMLInputElement;
    const email=document.getElementById("email") as HTMLInputElement;
    const password=document.getElementById("pass") as HTMLInputElement;
    const phone=document.getElementById("phonenumber") as HTMLInputElement;
     
     
    const signupData= {
        firstname: firstname.value,
        lastname:  lastname.value,
        email:email.value,
        phone_number:phone.value,
        username:username.value,
        pass:password.value
    }
    const response = await fetch("/members/signup", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
    })
    const { token, error } = await response.json();

    if (error) {
        const msg = document.getElementById("error-msg") as HTMLElement;
        msg.innerText= error;
    } else {
        localStorage.setItem("token", token);
        location.href = "./home";
    }






}