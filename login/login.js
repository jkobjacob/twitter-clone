const loginForm = document.forms['login'];
const errInfo = document.getElementById('err-info');

function validateCredentials(nameField,emailField,{name,email}) {
    if (nameField === name && emailField === email) {
        return true;
    }

    return false;
}

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nameField = loginForm['name'].value;
    const emailField = loginForm['email'].value;

    if (! localStorage.getItem(nameField)) {
        window.location.replace('file:///home/jkobjacob/Desktop/twitter-clone/signup/signup.html');
    }

    const credentials = JSON.parse(localStorage.getItem(nameField));
    
    if(validateCredentials(nameField,emailField,credentials)) {
        window.location.replace('file:///home/jkobjacob/Desktop/twitter-clone/feed/feed.html#'+nameField);
    } else {
        errInfo.textContent = 'Please Check your Credentials!!';
    }
});