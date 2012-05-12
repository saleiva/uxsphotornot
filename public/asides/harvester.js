var twitter = require('ntwitter');
var http = require('http');

var cartodb_username = '' // your CartoDB username

var   sys         = require('sys')
, querystring = require('querystring');


var twit = new twitter({
	consumer_key: '',
	consumer_secret: '',
	access_token_key: '',
	access_token_secret: ''
});


		var t ="cacafuti";
		var d = "feha";

		var p = querystring.escape("/api/v2/sql?&q=INSERT%20INTO%20uxtweets%20(text,retweet_count,d)%20VALUES%20('"+t+"',2,'"+d+"')");
		console.log(p);

		var options = {
				host: 'http://saleiva.cartodb.com',
				port: 80,
				path: p
			};

			http.get(options, function(res) {
				console.log(res);
			}).on('error', function(e) {
				console.log(e);
			});

twit.stream('statuses/filter', {'track':'#uxsp, #uxspain'},
	function(stream){
		stream.on('data', function (data){

			console.log(data);
			console.log('txt '+ data.text);
			console.log('date '+ data.created_at);
			console.log('rts '+ data.retweet_count);

			t = escape(data.text);
			d = escape(data.created_at);
			r = data.retweet_count;

			// var options = {
			// 	host: 'http://saleiva.cartodb.com',
			// 	port: 80,
			// 	path: "/api/v2/sql?api_key=2b04229882853da9cc2a31f9228cc26e5ef8c8bb&q=INSERT%20INTO%20uxtweets%20(text,retweet_count,d)%20VALUES%20('caca',2,'caca2')"
			// };

			// http.get(options, function(res) {
			// 	console.log(res);
			// }).on('error', function(e) {
			// 	console.log("FAIL");
			// });
		});
		stream.on('error', function (e){
			console.log("error:"+e);
		})
	});






	 //    if(data.geo != null){
	 //    	cartodb_private_query = "INSERT INTO tw (lat, long, time) VALUES ('"+data.geo.coordinates[0]+"', '"+data.geo.coordinates[1]+"', '"+data.created_at+"');"
		//     oa.getOAuthRequestToken(function(error, request_key, request_secret, results){
		//     if(error){
		//     	sys.puts('error :' + error);
		//     }else{
		// 	    oa.post(cartodb_access_url, request_key, null, xauth, null, function(error, data) {
		// 	    	if(error) {
		//                 sys.puts(require('sys').inspect(error));
		//                 throw new Error("...XAuth failed. Please check your password and username.");
		//             } else {
		//                 sys.puts("...XAuth successful!");

		// 				// Parse access tokens from returned query string
		//                 var access_tokens = querystring.parse(data);
		//                 var access_key    = access_tokens['oauth_token'];
		//                 var access_secret = access_tokens['oauth_token_secret'];

		//                 var protected_request = cartodb_api_url + "?q=" + querystring.escape(cartodb_private_query);
		//                 oa.get(protected_request, access_key, access_secret,  function (error, data, response) {
		//                     sys.puts('\n== CartoDB result for GET "' + cartodb_private_query + '" ==');
		//                     sys.puts(data + '\n');
		//                 });
		//             }
		//         });
		//     }
		//     });
		// }