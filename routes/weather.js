import express from 'express';
// const express = require("express");

import { speechRecognition } from '../controllers/SpeechRecognitionController.js';

const routerWeather = express.Router();

routerBook.get('/', book_ep.getAllBook);
routerBook.get('/addBook', book_ep.form);
routerBook.post('/search', book_ep.searchByOption);
routerBook.post('/addBookAction', book_ep.addBook);

// routerHome.get('/', book.index);
export default routerBook;
