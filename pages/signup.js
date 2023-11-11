//TODO: Connect everything to the databases


function submitForm() {
    let isValid = formValidator();

    // Now you can use the isValid value as needed
    if (isValid) {
        // Perform actions when the form is valid
        console.log("Form is valid");
    } else {
        // Perform actions when the form is not valid
        event.preventDefault();
        console.log("Form is not valid");
    }
}


// Validate the form fields
function formValidator() {
    let firstName = document.getElementById('user_first_name').value;
    let lastName = document.getElementById('user_last_name').value;
    let email = document.getElementById('user_email').value;
    let userName = document.getElementById('username').value;
    let pw = document.getElementById('password').value;
    let pwConfirm = document.getElementById('password_confirm').value;
    let isValid = true;


    //Checks to see if first name is filled
    if (!firstName) {
        document.getElementById('firstNameMessage').innerHTML = 'First name is required <br>';
        document.getElementById('firstNameMessage').style.color = 'red';
        document.getElementById('user_first_name').style.borderColor = 'red';
        isValid = false;
    }

    else if (firstName) {
        document.getElementById('firstNameMessage').innerHTML = '';
        document.getElementById('user_first_name').style.borderColor = 'green';
    }

    //checks to see if last name is filled
    if (!lastName) {
        document.getElementById('lastNameMessage').innerHTML = 'Last name is required <br>';
        document.getElementById('lastNameMessage').style.color = 'red';
        document.getElementById('user_last_name').style.borderColor = 'red';
        isValid = false;
    }

    else if (lastName) {
        document.getElementById('lastNameMessage').innerHTML = '';
        document.getElementById('user_last_name').style.borderColor = 'green';
    }


    //checks to see if email is filled and valid
    if (!email) {
        document.getElementById('emailMessage').innerHTML = 'Email is required <br>';
        document.getElementById('emailMessage').style.color = 'red';
        document.getElementById('user_email').style.borderColor = 'red';
        isValid = false;
    }

    else if (!email.includes('@') || !email.includes('.')) {
        document.getElementById('emailMessage').innerHTML = 'Please enter a valid email address <br>';
        document.getElementById('emailMessage').style.color = 'red';
        document.getElementById('user_email').style.borderColor = 'red';
        isValid = false;
    }

    else if (email.includes('@') && email.includes('.')) {
        document.getElementById('emailMessage').innerHTML = '';
        document.getElementById('user_email').style.borderColor = 'green';
    }


    //checks to see if username is filled and valid
    if (!userName) {
        document.getElementById('userNameMessage').innerHTML = 'Username is required <br>';
        document.getElementById('userNameMessage').style.color = 'red';
        document.getElementById('username').style.borderColor = 'red';
        isValid = false;
    }

    //TODO: Check if username is already taken

    else if (userName) {
        document.getElementById('userNameMessage').innerHTML = '';
        document.getElementById('username').style.borderColor = 'green';
    }


    //checks to see if password is filled and valid
    if (!pw) {
        document.getElementById('pwMessage').innerHTML = 'Password is required <br>';
        document.getElementById('pwMessage').style.color = 'red';
        document.getElementById('password').style.borderColor = 'red';
        isValid = false;
    }

    else if (pw.length < 6) {
        document.getElementById('pwMessage').innerHTML = 'Password must be at least 6 characters long';
        document.getElementById('pwMessage').style.color = 'red';
        document.getElementById('password').style.borderColor = 'red';
        isValid = false;
    }

    else if (pw.length >= 6) {
        document.getElementById('pwMessage').innerHTML = '';
        document.getElementById('password').style.borderColor = 'green';
    }


    //checks to see if password confirmation matches password
    if (pw !== pwConfirm) {
        document.getElementById('pwConfirmMessage').innerHTML = 'Passwords do not match';
        document.getElementById('pwConfirmMessage').style.color = 'red';
        document.getElementById('password_confirm').style.borderColor = 'red';
        isValid = false;
    }

    else if (pwConfirm === pw) {
        document.getElementById('pwConfirmMessage').innerHTML = '';
        document.getElementById('password_confirm').style.borderColor = 'green';
    }


    return isValid;
}

// function enableSubmit(){
//     //Check to see if all fields are filled
//     let inputs = document.getElementsByClassName('required');
//     let btn = document.querySelector('input[type="submit"]');
//     let isFilled = true;
//     for (let i = 0; i < inputs.length; i++){
//         let changedInput = inputs[i];
//         if (changedInput.value.trim() === "" || changedInput.value === null){
//             isFilled = false;
//         }
//     }
//
//     //check for password match
//     let pwLength = 6;
//     let pw =    document.getElementById('password').value;
//     let pwConfirm = document.getElementById('password_confirm').value;
//     let isMatch = false;
//     let isValid = false;
//
//     if(pw.length < pwLength) {
//         isValid = false;
//         document.getElementById('pwMessage').innerHTML = 'Password must be at least 6 characters long';
//         document.getElementById('pwMessage').style.color = 'red';
//     }
//     else if(pw.length >= 6) {
//         document.getElementById('pwMessage').innerHTML = '';
//         isValid = true;
//     }
//     if(pw !== pwConfirm) {
//         isMatch = false;
//         document.getElementById('pwConfirmMessage').innerHTML = 'Passwords do not match';
//         document.getElementById('pwConfirmMessage').style.color = 'red';
//     }
//     else if (pwConfirm === pw) {
//         isMatch = true;
//         document.getElementById('pwMessage').innerHTML = '';
//         document.getElementById('pwConfirmMessage').innerHTML = '';
//     }
//
//     if(!isFilled || !isMatch || !isValid){
//         btn.disabled = true
//     }
//     else if(isFilled && isMatch && isValid){
//         btn.disabled = false;
//     }
//
// }