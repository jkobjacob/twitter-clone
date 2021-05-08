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

localStorage.setItem('tweets',JSON.stringify(tweets));

class TweetModel {
    constructor() {
        this.tweets = JSON.parse(localStorage.getItem('tweets'));
    }

    _commit() {
        localStorage.setItem('tweets',JSON.stringify(this.tweets));
    }


    updateLike(user,timestamp) {
        let tweetIdx = this.tweets.findIndex(tweet => tweet.timestamp === timestamp);
        this.tweets[tweetIdx].liked_by.push(user);
        this._commit();
        this.onTweetChange(this.tweets);
        // console.log(this.tweets);
        // console.log(tweetIdx);
    }

    addPost(tweet,user) {
        this.tweets.push({
            posted_by: user,
            liked_by: [],
            tweet_content: tweet,
            timestamp: new Date().getTime().toString()
        });
        this._commit();
        this.onTweetChange(this.tweets);
    }

    bindModelUpdated(callback) {
        this.onTweetChange = callback;
    }
}

class TweetView {
    constructor () {
        this.tweetInput = this.getElement('#tweet');
        this.postBtn = this.getElement('#tweet-post');
        this.container = this.getElement('#feed-container');
    }

    _resetInput() {
        this.tweetInput.value = '';
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
        this.container.innerHTML = "";

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

            this.container.appendChild(div);
        });
        
    }

    bindUpdateLike(handler) {
        
        this.container.addEventListener('click', event => {
            console.log(event);
            if (event.target.nodeName === 'BUTTON') {
                const parent = event.target.parentNode;
                handler(parent.id)
            }
        });
    }

    bindUpdatePost(handler) {
        this.postBtn.addEventListener('click', event => {
            const value = this.tweetInput.value;
            this._resetInput();
            handler(value,window.user);
        });
    }
}

class TweetController {
    constructor(m,v) {
        this.model = m;
        this.view = v;


        this.onModelUpdated(this.model.tweets);

        
        this.view.bindUpdatePost(this.handleTweetPost);
        this.view.bindUpdateLike(this.handleUpdateLike);

        this.model.bindModelUpdated(this.onModelUpdated);
    }

    onTweetUpdated = (tweets) => {
        this.view.displayTweet(tweets);

    }

    handleUpdateLike = (timestamp) => {
        this.model.updateLike(window.user,timestamp);
    }

    handleTweetPost = (tweet) => {
        this.model.addPost(tweet,window.user);
    }

    onModelUpdated = (tweets) => {
        this.view.displayTweet(tweets);
    }
    
}

window.user = window.location.hash.split('#')[1];
localStorage.setItem('activeUser',window.user);

const activeUser = localStorage.getItem('activeUser');
document
  .getElementById('profile')
  .setAttribute('href',"file:///home/jkobjacob/Desktop/twitter-clone/profile/profile.html#" + activeUser);


const app = new TweetController(new TweetModel(), new TweetView());

