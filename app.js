//....setting up requirements............

var Twitter = require('twitter');
var config = require('./config.js');

//....Our main objecj..............

var T = new Twitter(config);

//...setting out our parameters............

var params = {
    q: '#nodejs',
    count: 10,
    result_type: 'recent',
    lang: 'en'
}

//............Get/Post request............................

T.get('search/tweets', params, function(err, data, response) {

    if (!err) {
        for (var i = 0; i < data.statuses.length; i++) {
            let id = { id: data.statuses[i].id_str }
            T.post('favorites/create', id, function(err, response) {
                if (err) {
                    console.log(err[0].message);
                } else {
                    let username = response.user.screen_name;
                    let tweetId = response.id_str;
                    console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
                }
            })
            
            })
            T.post('friendships/create', { screen_name }, function(err, response) {
                if (err) {
                    console.log(err);
                } else {
                    console.log({ screen_name }, 'has been followed')
                }
            })
            T.post('statuses/retweet', id, function(err, response) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(id + 'has been retweeted')
                }
            })
        }
    } else {
        console.log(err);
    }
})
