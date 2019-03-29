const express = require('express')
const app = express();
 import { getUsersData } from "./initUsersData";

app.post("/orderPlace", async (req, res) => {
  let usersData =  getUsersData();
  const users = req.body;
 
  //trail
   const accountSid = 'ACd0ce3da253608126717d2e9996841dcf';
  const authToken = '0ac7fe84b761c231eebceeab4535245b';

  const client = require("twilio")(accountSid, authToken);
  users.forEach( async contact => {
    //const contactId = uuidv4();
    usersData.push({...contact , isConfirm: false});
    const res1 = await client.messages
    .create({
       body: `confirm your order https://9bb2d938.ngrok.io/confirmOrder?name=${contact.name}&id=${contact.id}`,
       from: '+972525907841',
       to: `${contact.phone}`
     })
    res.status(200).send(true);
  });
});

app.get("/confirmOrder", async (req, res) => {
  let usersData =  getUsersData();

  let user = usersData.find(user=> user.id == req.query.id);
  user.isConfirm = true;
  console.warn("userDataAfter", usersData);
  res.status(200).send(req.query.name + " order is confirm!!!!" );
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});


