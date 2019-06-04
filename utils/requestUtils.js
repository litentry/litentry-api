const request = require('request')

export const asyncRequest = async (value) =>
  new Promise((resolve, reject) => {
    request(value, (error, response, data) => {
      if(error) reject(error)
      else resolve(data)
    })
  })

export const catchError = error => {
  console.log(error.toString())
}
