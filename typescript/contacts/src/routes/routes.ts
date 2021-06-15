import { addNewContact, getContacts } from '../controllers/contact';

const routes = app => {
  app.route('/contact')
    .get((req, res, next) => {
      // middware
      console.log(`Request from: ${req.originalUrl}`)
      console.log(`Request type: ${req.method}`)
      next();
    }, getContacts)
}