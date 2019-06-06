# litentry-api

The Litentry API behavior as a middle layer connects the runtime module and frontend applications for users.

![Middle Layer Architecture](https://static.wixstatic.com/media/760d3a_a76187e13b1f48968070104d7450b340~mv2.png/v1/fill/w_967,h_616,al_c,q_90/760d3a_a76187e13b1f48968070104d7450b340~mv2.webp)

It mainly includes:

* Event listener and off-chain caching server:  With cached data it reduces the query load on the blockchain, furthermore, it saves the caching data on the centralized database in order to improve the speed of application-based blockchain query, like Infura for Ethereum. A relay script server is also built here, to automatically trigger an event on periodically regarding block generation.

* IPFS caching server: especially for the large data from IPFS, the server will caching the data to the server.

* GraphQL validation and query server: validate the authorization tokens with HTTPS request for IoT devices or application.

* Javascript binding library: The javascript binding library will directly connect the front-end applications with Blockchain, for example, React or React Native applications.

**This repository is now focused on the GraphQL server.**
