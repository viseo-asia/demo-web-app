# demo-web-app

## Overview

Demo Web App

## Prerequisites

- Docker
- Docker Compose

## Developer setup

1. Git clone the repo
2. `cd demo-web-app`

**Build and start WITH Docker**

1. `docker-compose up`
2. open [http://localhost:5001](http://localhost:5001)
3. *Note:* Use `docker-compose build` to force new builds.

**Build and start WITHOUT Docker**

1. `npm install`
2. `npm start`
3. Open [http://127.0.0.1:3001](http://127.0.0.1:3001) (use IP address not localhost)

## Deployment

## Create demo-web-app Application Secrets

These two we'll use the command line

<!-- - `echo "dbuser" | docker secret create database_username -` -->
<!-- - `echo "abc123xyz" | docker secret create database_password -` -->
- `echo '{ "database": {"dbusername": "dbusr-prod"} }' | docker secret create dbusername.json -`
- `echo '{ "database": {"dbpassword": "dbpwd-prod"} }' | docker secret create dbpassword.json -`

## Create Docker Stack:

- SSH onto the virtual machine
- Download the docker-compose.prod.yml file
- `curl -o docker-compose-demo-web-app.yml https://raw.githubusercontent.com/viseo-asia/demo-web-app/master/docker-compose.prod.yml`
- Deploy the stack
- `docker stack deploy -c docker-compose-demo-web-app.yml demo`

The stack will be created, but the deployment will fail as we need to build and create the docker image and push it to the Docker Trusted Registry.

We'll do this is our Continuous Integration server - Jenkins

- [install_continuous_integration_jobs.md](doc/install_continuous_integration_jobs.md)

## Notes

## Update Secrets (example)

You cannot update the secret itself, but you can update the service that's using it, and add a different secret.

```
echo foo | docker secret create secret-1 -

docker service create \
  --secret src=secret-1,target=db-password \
  --name web \
  nginx:alpine

echo foo2 | docker secret create secret-2 -

docker service update \
  --secret-rm secret-1 \
  --secret-add src=secret-2,target=db-password \
  web
```
