const users = {
    sherin: {
        username: 'sherin',
        followers: ['karthik','jacob','foo','bar'],
        following: ['karthik','jacob','foo','bar']
    },
    karthik: {
        username: 'karthik',
        followers: ['sherin','jacob','foo','bar'],
        following: ['sherin','jacob','foo','bar']
    },
    jacob: {
        username: 'jacob',
        followers: ['karthik','sherin','foo','bar'],
        following: ['karthik','sherin','foo','bar']
    },
    foo: {
        username: 'foo',
        followers: ['karthik','jacob','sherin','bar'],
        following: ['karthik','jacob','sherin','bar']
    },
    bar: {
        username: 'bar',
        followers: ['karthik','jacob','foo','sherin'],
        following: ['karthik','jacob','foo','sherin']
    },
};

window.user = window.location.hash.split('#')[1];


class ProfileModel {
    constructor() {
        this.user = JSON.parse(localStorage.getItem('users'))[window.user];
    }
}

class ProfileView {
    constructor() {
        this.root = document.querySelector('#root');
    }
    
    createElement(tag) {
        const element = document.createElement(tag);
        return element;
    }

    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }

    

}

class ProfileController {
    constructor(m,v) {
        this.model = m;
        this.view = v;
    }
}