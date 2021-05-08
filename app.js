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

localStorage.setItem('users', JSON.stringify(users));
localStorage.setItem('tweets',JSON.stringify(tweets));