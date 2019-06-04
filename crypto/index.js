const request = require('request');
const {issuer, creator, user, createTokenHash, issueTokenHash} = require('../config');
const { issueToken, createToken, transferToken, ownerOf, tokensOf, getToken, getTokenCount } = require('./requests');
const _ = require('lodash');

export const createHandler = (functionName, callback) => {
  return function testHandler(error, response, body) {
    callback = callback || console.log
    if (error) {
      callback({success: false, data: error})
    }
    callback({succss: true, data: body})
  }
};

function testHandler(error, response, body) {
  if (error) {
    return console.error('upload failed:', error);
  }
  console.log(`successful!  Server responded with:`, body);
}

/** TODO move these code into test **/

// request(issueToken(issuer.address, creator.address, issuer.secret), createHandler('issueToken));
//
// request(createToken(creator.address, user.address, creator.secret), createHandler('createToken'));
//
// request(transferToken(user.address, creator.address, user.secret, createTokenHash), createHandler('transferToken'));
//
// request(ownerOf(createTokenHash), createHandler('ownerOf'));
//
// request(tokensOf(creator.address), createHandler('tokensOf'));
//
// request(getToken(createTokenHash), createHandler('getToken'));

// request(getTokenCount(issueTokenHash), createHandler('getTokenCount'));
