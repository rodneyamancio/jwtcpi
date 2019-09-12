var request = require('request');
var jwt = require('jsonwebtoken');

var getAccessToken = function() {
	return new Promise(function(resolve, reject) {
      var GOOGLE_APPLICATION_CREDENTIALS = {
        client_email: "pubsub-publish@bc-os-logistica20-dev-i775.iam.gserviceaccount.com"
      };
      
      GOOGLE_APPLICATION_CREDENTIALS.private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDa9aUYuWrn1Kxq\nlzUFXGphyXXMJ0ImvxfT0y3fudl4wF2jndrUH2enKUVIXO2FMcb/QfrSpXYnM55f\nXm0s2osvlQfG2j/aPGdtWIOa+OTwHxNvF6zdagYxu4MjfJNMKF3pBfq7JrojfOyY\nxs1QHzG0KZ/eFtCePKYCYTmLJa1r1ytsecpywZucKxz0qe3BEUqTpzFeqgcSIX9e\nxmhpfdwIY7ZJbIKYCxlqXtE2Ny4kZKWLNMN/gYI/E6LIgZp0uki3RvE8Nh4bcL5X\ny6JmnnI3wYG/YDJh4xywPKAIzKMcZVJwXXRDSfsFEgecWZToPNbslEcVfIhhkTGr\nZjluQa9jAgMBAAECggEAIzz3oigrsNNfdii54zrRchsH3AsQuzHzezyC0afUJySf\noqEud7H1hAer0JldWRtpi74KHal8VOhv8Kg+iMKZNiyqsObXR4ouGQEZmQYSY3nq\nLkL7UoeUJ0p8Bejavx3F/fu03ja9gSWYjCkpH1+4fOawBaraoy9ehjEwdMOOX+As\n++f0ttAUHE8WgLsgX+5WZEF+coPAngN8EMRpU10+X9fq7gdWfhaAhfHtXn6QVoAr\nJjmawg3aRFVF2P+hL/vUHr27LPVk8rHm3zPlONA8PL2wNY5UmWjuoOUjzWcRJUEl\nAEWHXtl9d+mEx9mCJ+nWS9Id0aiDx2oj/nduyyzqFQKBgQD2ejszAO49nzzEX0rO\ns0iLnyz1BMJYGm++YvqkXi8mT7PFhf6JzVKeiiMheNwI0HsmNHlrOKuPUTMGwczj\naB+tqqiL0+hqHfZpgOqggkMmL0axceycyfM/H/mCs+bb2fWZTVmbpSWUjbNTFm6b\nFeHp4RyxqpPMKevbWNq1zQkK7wKBgQDjaz/kKWIPQKxWzMLQztBIWRVVGrM7kX61\nRCnK/92YzrLoO62mEig1gxhLYI7aZhdz4Yhg1S8PPvkTQmxpnXEzBKUdBiJQtCTW\nAxJVdIZYmCvbu5SQ7W4VJG+MMU5UF/UivOPjg8YtUgckwXEZK7hz5VBUGnGS4USg\nwPSnYTLyzQKBgGzhrDsowxXXvUlmay6KhpafN4X5lzzCWPC62sw3iw6akOjF+562\nZDQDA+fqcxE1v+EttyGFhEwoa6klfbRLsArQ4+n5L6eJGuyadYt4X9+DbPBASm0s\nzVbqcheqD2a5j0QsplQajVJlkn024J+D+CuQNVPK7cV4E2fvhZZgQAljAoGAAv+G\n+BsTj9/qZbqNVvNjC5EhFt4jPsXMRdeANYzp/vm6ohUnVOkoXow75cKAH6D47i4q\n/hvRYwIRho95nmrU8zc8dgV+rlGxqqCfvUCsBL781QjEDKUUrnKshcygm7s1ICAd\nYQJ7ul06euGR/CL3a4+6X2F53dXaccQZdZtycIECgYEAqCKXk+nPZ9ZsFRwnO7ZH\nE4K5mfeEvErpD8rtq++D3PAB7PmR+VMZgo0cCH/ZkgTlQDuu3gi1IlFikrQOJdaq\nvpIX1UTiM3zXfA8xRvrGN8Z4RV0W1HMo6sX+6EkTrzY3I52ZdyIRQwmZj6Q8OP7G\nKaTcJKc/9ubMzVOPE8JFp6c=\n-----END PRIVATE KEY-----\n";
      
      var jwtObject = {
        iss: GOOGLE_APPLICATION_CREDENTIALS.client_email,
        scope: "https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/pubsub",
        aud: "https://oauth2.googleapis.com/token"
      };
      var grant_type = 'urn:ietf:params:oauth:grant-type:jwt-bearer';
      var cert = GOOGLE_APPLICATION_CREDENTIALS.private_key;
      var token = jwt.sign(jwtObject, cert, {
        algorithm: 'RS256',
        expiresIn: '1h'
      });
      request.post({
        url: 'https://oauth2.googleapis.com/token',
        form: {
          grant_type: grant_type,
          assertion: token
        }
      }, function(error, response, body) {
        if (response.statusCode == 200) {
          resolve(JSON.parse(body));
        } else {
          reject(JSON.parse(error));
        }
      });           
      
	});
};

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {	

	console.log("PROCESS - getAccessToken");
	
	getAccessToken().then(function(result) {
    	console.log("INSIDE - getAccessToken");
      console.log('Bearer ' + result.access_token);
    }, function(err) {
		console.log("ERROR - getAccessToken");
        console.log(err);

    });
	  
 	let message = req.query.message || req.body.message;
	res.status(200).send(message);
};
