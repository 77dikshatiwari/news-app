import express from 'express';
const router = express.Router();
import apiController from '../controller/apiController.js';

router.get('/all-news', apiController.getAllNews);

router.get('/top-headlines', apiController.getTopHeadlines);

router.get('/country/:iso', apiController.getNewsByCountry);

router.get('/live-news', apiController.getLiveNews);

export default router;