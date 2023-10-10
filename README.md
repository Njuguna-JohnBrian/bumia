
## API SETUP

Install Bumia with ```npm```

```bash
  cd backend
  npm i
```

```bash
  cd backend/config
  touch config.env
```
Then paste the following into the just created file i.e  ```config.env```

```env
PORT=5050
NODE_ENV=dev
DB_LOCAL_URI=mongodb://127.0.0.1:27017/bumia
JWT_SECRET=YouCannotHackMe!123JWT
JWT_EXPIRES_TIME=24h
COOKIE_EXPIRES_TIME=24h
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_PASSWORD=55f35883f59496
SMTP_FROM_EMAIL=devjohnbrian@gmail.com
SMTP_FROM_NAME=Bumia
SMTP_USER=88f246835166cd
```

## DATABASE SETUP

1. [✔️] Get The MongoDB Community Version and Install

 - While downloading ensure you select the ```Complete``` installation
 - Do not uncheck the ```Install MongoDb Compass``` checkbox as MongoDb Compass will be    the database client to be used


## RUN THE PROJECT

```bash
  cd backend
  npm run start
```

