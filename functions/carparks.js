import fetch from "node-fetch";
import dotenv from 'dotenv';

const API_ENDPOINT = `http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2`;

exports.handler = async (event, context) => {
  return fetch(API_ENDPOINT, {
    method: 'GET',
    headers: {
    'AccountKey': process.env.LTA_API_KEY
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(typeof data.value);
      return {
        statusCode: 200,
        body: JSON.stringify(data.value.slice(0,100))
      };
    })
    .catch(error => ({ statusCode: 422, body: String(error) }));
};
