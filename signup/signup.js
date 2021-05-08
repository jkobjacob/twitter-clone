const signupForm = document.forms["signup"];



signupForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nameField = signupForm['name'].value;
    const emailField = signupForm['email'].value;  
    
    localStorage.setItem(nameField, JSON.stringify({
        name: nameField,
        email: emailField
    }));

    window.location.replace('file:///home/jkobjacob/Desktop/twitter-clone/login/login.html');
    
});