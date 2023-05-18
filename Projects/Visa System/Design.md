### Requirements

Public

User inputs data application form data
User uploads attachments
User can add multiple applications

Admin

Database Prune
Export Attachments
View Application Forms as data tables
Export Application Forms using data tables

### Forms

Use AJAX for posting data then the server validates the data and return default laravel framework validation rules.

### Attachements

File uploads shouldn't be done synchronously as default form submissions since we are dealing with almost 50MB of data for a single entry.  To fix this we can use AJAX but since this is a public facing form everytime a user uploads and don't submit the form are making unnecessary file storeage requests to the server. 

The solution - use a hidden input field to submit a random attachment id for each attachement upload field.

### Application Architecture

![[code-pattern.png]]