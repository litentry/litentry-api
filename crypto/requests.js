const _ = require('lodash');
const {rpcAddress, issueTokenHash, createTokenHash} = require('../config');

const defaultParams = {};

const generateRequest = (jsonData) => ({
  method: 'POST',
  uri: rpcAddress,
  json: _.merge(jsonData, defaultParams),
});

const issueTokenGenerator = (from, to, secret, tokenDefinition = {
  name:"access",
  symbol:"acc",
  total_supply:100,
  items:[
    {
      type: "number",
      name:"duration",
      desc:"the duration of the token (minutes)"
    },
  ]
}) => {
  return {
    "method":"litentry_issueToken",
    "params":[
      { from, to, secret,
        "token_info": tokenDefinition
      }
    ],
  }
};

const createTokenGenerator = (from, to, secret, tokenDetail) => {
  return {
    method: 'litentry_createToken',
    params: [
      {
        from, to, secret,
        token: _.merge({
          info: issueTokenHash,
          uri: 'http://www.litentry.com',
          items: [
            {
              name: 'duration',
              value: 100,
            }
          ]
        }, tokenDetail)
      }
    ]
  }
};

const transferTokenGenerator = (from, to, secret, token) => {
  return {
    method: 'litentry_transferToken',
    params: [
      {
        from, to, secret, token
      }
    ]
  }
};

const ownerOfGenerator = tokenHash => ({
  method: 'litentry_ownerOf',
  params: [ tokenHash ]
});

//info in return is token definition hash
const tokensOfGenerator = address => ({
  method: 'litentry_tokensOf',
  params: [ address ]
});

const getTokenGenerator = address => ({
  method: 'litentry_getTokenByHash',
  params: [ address ]
});

const getInfoByTransactionHashGenerator = address => ({
  method: 'litentry_getDataByTransactionHash',
  params: [ address ]
});

const getTokenCountGenerator = tokenDefinition => ({
  method: 'litentry_getTokenCount',
  params: [tokenDefinition]
});

export const issueToken = _.flow([issueTokenGenerator, generateRequest])
export const createToken = _.flow([createTokenGenerator, generateRequest])
export const transferToken = _.flow([transferTokenGenerator, generateRequest])
export const  ownerOf = _.flow([ownerOfGenerator, generateRequest])
export const tokensOf = _.flow([tokensOfGenerator, generateRequest])
export const getToken = _.flow([getTokenGenerator, generateRequest])
export const getInfoByTransactionHash = _.flow([getInfoByTransactionHashGenerator, generateRequest])
export const getTokenCount = _.flow([getTokenCountGenerator, generateRequest])