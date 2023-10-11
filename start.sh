cd backend || exit
npx kill-port 2345
start http://localhost:2345/bumia/v1/swagger/#/
npm run prod

