import * as functions from 'firebase-functions';

// Web scraping deps
//import fetch from 'node-fetch';
//import * as cheerio from 'cheerio';
import { places } from "./places";

// Google Assitant deps
import {dialogflow,SimpleResponse, BasicCard, Button, Image } from 'actions-on-google';
const app = dialogflow({debug:true});

// Capture intent

app.intent('SEA_INIT', async (conv) => {
    conv.add(new SimpleResponse({
        text: 'Hola, ¿en qué te puedo ayudar?',
        speech : 'Hola soy Adam, estoy para resolver tus inquietudes, dime ¿en qué te puedo ayudar?'
    }));
});

app.intent('SEA_INFO_WHERE_PLACE', async (conv, params) => {
    //const data = await scrapePage();
    //console.log(params.places);

    let placeId = params.places;

    let place = places.filter(function(p){
        return p.id === placeId;
    }); 

    // console.log('Lista de lugares')
    // console.log(places)
    // console.log('Lugar encontrado')
    // console.log(place)

    conv.add(new SimpleResponse({
        //text: 'Estás buscando ' + place[0].name,
        speech : 'El salón que buscas es ' + place[0].nameSp +' ' + place[0].description
    }));
    conv.add(new BasicCard({
        title: place[0].name,
        text: place[0].location,
        image: new Image({
            url: 'http://forumtic.upc.edu/wp-content/uploads/2017/02/eve-ntt_logo_claim_p_rgb.png',
            alt: 'Logo everis'
        }),
        buttons: new Button({
            title: 'Reservar',
            url: 'http://everis.com'
        })
    }));
});

// async function scrapePage(){
//     const page = await fetch('https://angularfirebase.com/lessons');

//     const html = await page.text();

//     const $ = cheerio.load(html);

//     const lesson = $('.preview-content').first();

//     return {
//         title: lesson.find('h2').text(),
//         description: lesson.find('p').text(),
//         episode: lesson.find('ep-label').text()
//     }
// }




// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const fulfillment = functions.https.onRequest(app);