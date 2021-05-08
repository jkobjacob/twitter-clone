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

const tweets = [
    {
        posted_by: 'sherin',
        liked_by: ['karthik', 'foo', 'bar'],
        tweet_content: "Just a random tweet",
        timestamp: "1604255400000"

    },
    {
        posted_by: 'jacob',
        liked_by: ['karthik', 'foo', 'bar'],
        tweet_content: "Just a random tweet",
        timestamp: "1606847400000"
    },
    {
        posted_by: 'foo',
        liked_by: ['karthik', 'sherin', 'bar'],
        tweet_content: "Just a random tweet",
        timestamp: "1609525800000"
    },
    {
        posted_by: 'bar',
        liked_by: ['karthik', 'foo', 'jacob'],
        tweet_content: "Just a random tweet",
        timestamp: "1612204200000"
    },
    {
        posted_by: 'karthik',
        liked_by: ['karthik', 'foo', 'jacob'],
        tweet_content: "Just a random tweet",
        timestamp: "1614623400000"
    }
];

localStorage.setItem('users',JSON.stringify(users));

document.title = window.user + '- profile';


class ProfileModel {
    constructor() {
        this.activeUser = localStorage.getItem('activeUser');
        this.tweets = JSON.parse(localStorage.getItem('tweets'));
        this.user = JSON.parse(localStorage.getItem('users'))[this.activeUser];
        this.tweetsByYou = tweets.filter(tweet => tweet.posted_by === this.activeUser);
        this.likedTweets = tweets.filter(tweet => tweet.liked_by.includes(this.activeUser));
    }


    
}

class ProfileView {
    constructor() {
        this.root = document.querySelector('#profile');
        this.tweets = document.querySelector('#tweets');
        this.likedTweets = document.querySelector('#liked-tweets');
    }
    
    createElement(tag) {
        const element = document.createElement(tag);
        return element;
    }

    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }

    displayTweet(tweets) {

        let root = document.createDocumentFragment();

        tweets.forEach(tweet => {
            const div = this.createElement('div');
            div.id = tweet.timestamp;

            const name = this.createElement('h3');
            name.textContent = tweet.posted_by;
            div.appendChild(name);
            
            const tweetContent = this.createElement('p');
            tweetContent.textContent = tweet.tweet_content;
            div.appendChild(tweetContent);

            const span = this.createElement('span');
            span.textContent = tweet.liked_by.length;
            div.appendChild(span); 

            const likeBtn = this.createElement('button');
            likeBtn.textContent = 'Like';
            likeBtn.classList.add('like-btn');
            div.appendChild(likeBtn);

            root.appendChild(div);
        });

        return root;
        
    }
        
    displayUser(user){
        const userName = this.createElement('h3');
        userName.textContent = user.userName;
        this.root.appendChild(userName);

        const span_1 = this.createElement('span');
        span_1.textContent = user.followers.length;
        this.root.appendChild(span_1);

        const followers = this.createElement('a');
        followers.textContent = 'Followers';
        this.root.appendChild(followers);

        const span_2 = this.createElement('span');
        span_2.textContent = user.following.length;
        this.root.appendChild(span_2);

        const following = this.createElement('a');
        following.textContent = 'Following';
        this.root.appendChild(following);

    }


    displayProfile(user,tweets,likedTweets) {
        this.displayUser(user);
        
        this.tweets.appendChild(this.displayTweet(tweets));
        this.likedTweets.appendChild(this.displayTweet(likedTweets));
    }


}

class ProfileController {
    constructor(m,v) {
        this.model = m;
        this.view = v;

        this.displayProfile(this.model.user,this.model.tweetsByYou,this.model.likedTweets);
    }

    displayProfile = (user,tweets,likedTweets) => {
        this.view.displayProfile(user,tweets,likedTweets);
    }
}

const app = new ProfileController(new ProfileModel(), new ProfileView());

