import { addNewContact, getContacts, getContactByID, updateContact, deleteContact } from '../controllers/contact';

const routes = app => {
  app.route('/contact')
    .get((req, res, next) => {
      // middware
      console.log(`Request from: ${req.originalUrl}`)
      console.log(`Request type: ${req.method}`)
      next();
    }, getContacts)

    // POST endpoint
    .post(addNewContact);

    app.route('/contact/:contactId')
      // get specific contact
      .get(getContactByID)

      // update contact
      .put(updateContact)

      // delete request
      .delete(deleteContact);

}

export default routes;