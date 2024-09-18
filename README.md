# MCModpackMaker

This is a small project made to showcase the use of react, docker containers, nest.js, nginx, redis and mongoDB to create a web application.

Currently this project is a simple feature slice with a search system, a basic log-In system, a redis cache system, a mongoDB database and nginx configuration.

## Requirements
 * NodeJS (development)
 * Docker

## Building

Just run the following command on the home directory of the project.
```
    docker-compose up -d --build
```

## Features
- [x] Caching with Redis and NestJS
- [x] Backends subdomains with Nginx (backend/modrinth/curseforge)
- [x] MongoDB database for the backend
- [x] Searching mods from the modrinth API
- [ ] Searching mods from the curseforge API
- [ ] Creating modpacks and saving to your account
- [ ] Idividual mods download proxy and caching
- [ ] Modpack download
- [x] Sharing system for modpacks (share link)
- [x] Basic log-In backend


