# Vanilla Chatbot UI

**Development Status**: I am currently engaged with other projects. At the moment I am writing engine code in C/C++ meant to be called from Python for a local tech talk.

The initial motivation for this vanilla frontend project was to spearhead the development of the UI for a conversational, web-based, chatbot powered by a local LLM. At the time
I was collaborating in a team comprised by computational chemistry researchers, ML/AI engineers, and systems engineering students to develop a LLM powered research assistant especialized in computational chemistry&mdash;codenamed [dynamate](https://github.com/omendibleba/DynaMate_V2).

This is the initial solution that I presented for the UI however we decided to narrow down the scope of the project to a personal chatbot that could be run on a laptop in order to focus more on the core engineering rather than having a web application that could be hosted on a server.

Nevertheless, I decided to keep the repository as a reference point to go back to what I learned about building vanilla web applications. It is worth mentioning that the [trend](https://talent500.com/blog/developers-ditching-frameworks-for-vanilla-javascript/) is to replace heavy JavaScript frameworks with vanilla code for SEO and for frontend engineers to focus on building engaging and blazingly fast user interfaces faster. I think that the most notorious migration was that by [Netflix](https://medium.com/@kruthish18/why-netflix-moved-from-react-to-vanilla-javascript-and-what-it-means-for-developers-2b8eb087d44f), it replaced its heavy landing page with a leaner one written with vanilla code.

## Backend Code

The backend code is written in Node.js and it can be found [here](https://github.com/misael-diaz/NodeAPI.git).

## Installing Docker

Installing Docker on Linux is straightforward, on Debian-based distros you may use:

```sh
sudo apt install docker
```

If you wish to use docker as a regular user you will need to perform two additional steps.

Create the group `docker`:

```sh
sudo groupadd docker
```

and add your user to that group:

```sh
sudo usermod -aG docker $USER
```

You are encouraged to consult the official docker documentation for
[installing](https://docs.docker.com/engine/install/) docker in other operative systems.

## Network

You will need a network for the docker containers to communicate with one another. To
create a network use the following command:

```sh
docker network create webnetwork
```

where `webnetwork` is the name of the network that the docker containers will use

## Dockerize

The first step is to clone this repository.

Then, use the following command to build the docker image:

```sh
docker image build . -t frontend-image
```

note that we have tagged the image as `frontend-image for convenience.

## Execute

To execute the vanilla web app use the following command:

```sh
docker container run -it -p 8443:443 --hostname frontend --network webnetwork --name frontend frontend-image 
```

We are mapping the reserved HTTPS port 443 to 8443, we are defining the hostname of our container to be `frontend`, we are adding the container to the network `webnetwork`, we are naming the container as `frontend`, and we are referencing the image `frontend-image` that we have just built.

Note that for the signin and login pages to be functional the backend needs to be up as well.

Behind the scenes we have the Apache HTTPS server responding to the user requests.
