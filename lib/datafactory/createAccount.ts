import {request, expect} from '@playwright/test';


const Url = process.env.URL;

export async function registerUser() {
  
const createRequestContext = await request.newContext();
const response = await createRequestContext.post(Url + '/sf/control/createUser', {
  data: 
  {
    CUSTOMER_EMAIL:"frant_ofis_test+mccd31543@outlook.com",
    repeat_email:"frant_ofis_test+mccd31543@outlook.com",
    PASSWORD:"Test12345!",
    CONFIRM_PASSWORD:"Test12345!",

  },
  
});
expect(response.status()).toBe(201);

}
