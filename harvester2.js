var twitter = require('ntwitter');
var http = require('http');

var   cartodb_username          = '' // your CartoDB username
    , cartodb_password          = '' // your CartoDB password
    , cartodb_consumer_key      = '' // Your CartoDB API Key ('YOUR KEY')
    , cartodb_consumer_secret   = '' // Your CartoDB API Secret ('YOUR SECRET')
    , cartodb_private_query     = '' // An SQL query to run eg. 'SELECT cartodb_id FROM cables LIMIT 20'
    , cartodb_request_url       = 'https://' + cartodb_username + '.cartodb.com/oauth/request_token'
    , cartodb_access_url        = 'https://' + cartodb_username + '.cartodb.com/oauth/access_token'
    , cartodb_api_url           = 'https://' + cartodb_username + '.cartodb.com/api/v1/sql';

    var   sys         = require('sys')
    , querystring = require('querystring')
    , OAuth = require('oauth').OAuth
    , oa = new OAuth(cartodb_request_url, cartodb_access_url, cartodb_consumer_key, cartodb_consumer_secret, "1.0", null, "HMAC-SHA1");

// Configure XAuth request
var xauth = {x_auth_mode:"client_auth", x_auth_username: cartodb_username, x_auth_password: cartodb_password };

var twit = new twitter({
	consumer_key: '',
	consumer_secret: '',
	access_token_key: '',
	access_token_secret: ''
});


twit.stream('statuses/filter', {'track':'#uxsp, #uxspain'},
	function(stream){
		stream.on('data', function (data){

			t = data.text;
			d = data.created_at;
			r = data.retweet_count;

			cartodb_private_query = "INSERT INTO uxtweets (text,retweet_count,d) VALUES ('"+t+"', '"+r+"', '"+d+"')"
			oa.getOAuthRequestToken(function(error, request_key, request_secret, results){
				if(error){
					sys.puts('error :' + error);
				}else{
					oa.post(cartodb_access_url, request_key, null, xauth, null, function(error, data) {
						if(error) {
							sys.puts(require('sys').inspect(error));
							throw new Error("...XAuth failed. Please check your password and username.");
						} else {
							sys.puts("...XAuth successful!");
							// Parse access tokens from returned query string
							var access_tokens = querystring.parse(data);
							var access_key    = access_tokens['oauth_token'];
							var access_secret = access_tokens['oauth_token_secret'];

							var protected_request = cartodb_api_url + "?q=" + querystring.escape(cartodb_private_query);
							oa.get(protected_request, access_key, access_secret,  function (error, data, response) {
								sys.puts('\n== CartoDB result for GET "' + cartodb_private_query + '" ==');
								sys.puts(data + '\n');
							});
						}
					});
				}
			});
		});
stream.on('error', function (e){
	console.log("error:"+e);
})
});
