import { connect, set } from 'mongoose';
// import { MONGODB_ADDRESS } from "@/config";

set('strictQuery', true);

connect(process.env.MONGODB_ADDRESS ?? '')
  .then((e) => {
    console.log('connect mongodb success!');
    return e;
  })
  .catch((error) => {
    console.log(error);
  });
