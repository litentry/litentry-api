import {createToken, getToken, getTokenCount, issueToken, ownerOf, tokensOf, transferToken} from "../crypto/requests";
import {asyncRequest, catchError} from '../utils/requestUtils';
import {createHandler} from "../crypto";

const wrapRequest = async (requestOption) => {
  try {
    const response = await asyncRequest(requestOption)
    if(response.status === 'error'){
      catchError(response.result)
    }
    console.log('response is', response)
    return response
  }catch(e) {
    catchError(e)
  }
}

export const tokenResolver = {
  
  issue: async (root, {issuerAddress, creatorAddress, secret}) =>
    wrapRequest(issueToken(issuerAddress, creatorAddress, secret)),
  
  create: async (root, {creatorAddress, userAddress, secret}) =>
    wrapRequest(createToken(creatorAddress, userAddress, secret)),
  
  transfer: async (root, {userAddress, creatorAddress, secret, createTokenHash}) =>
    wrapRequest(transferToken(userAddress, creatorAddress, secret, createTokenHash)),
  
  ownerOf: async (root, {createTokenHash}) => wrapRequest(ownerOf(createTokenHash)),
  
  tokensOf: async (root, {issuerAddress}) => wrapRequest(tokensOf(issuerAddress)),
  
  getToken: async (root, {createTokenHash}) => wrapRequest(getToken(createTokenHash)),
  
  getTokenCount: async (root, {issueTokenHash}) => wrapRequest(getTokenCount(issueTokenHash)),
}