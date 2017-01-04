<h1>Project 1</h1>
  <hr />
 <h3>Skateboard Version</h3>
 <p>Have a user submit a positive moment that occurred with relevant categories and an optional location tag</p>
 <h3>Overview</h3>
 <p>In a world where the news is terrible, people are questionable, and the world seems to be in utter disarray, we'd like to shift perspective on humanity on focus on the greatness we can achieve.</p>
  <h3>User Stories:</h3>
 <p>A user can share a moment or experience that happened to them for the purpose of inspiring, motivating, or generally help someone else.</p>
 <p>Data is rendered in a moments feed, displayed on a map, or both.</p>
  <h5>Sharing a moment</h5>
  <ul>
   <li>Make a form that takes user text input and validates content is there.</li>
   <li>Have several categories selectable based on relevance of moment.</li>
   <li>Optional location tag (research sessions).</li>
   <li>Make a form that takes user text input and validates required content is there.</li>
   <li>Have several categories selectable based on relevance of moment.</li>
   <li>Optional location tag.</li>
  </ul>
  <h5>Consuming a moment</h5>
  <ul>
    <li>Users can read a random experience from someone else based on our stored data.</li>
  </ul>
  <h3>Data to data relationship</h3>
  <ul>
   <li>Moment to Category Schema.</li>
   <li>Many to Many structure.</li>
 </ul>
 <h3>Technical Requirements</h3>
  <ul>
    <li><b>Express API </b>- Build an Express server that has both HTML and JSON endpoints.</li>    
    <li><b>RESTful Routes</b> - Design your CRUD routes using the RESTful routing convention.</li>
    <li><b>AJAX </b>- Leverage AJAX to make requests asynchronously.</li>
    <li><b>jQuery</b> - Use jQuery to add interactivity and display data on the client side.</li>
    <li><b>Templating</b> - Render JSON data on the front end using handlebars templates.</li>
    <li><b>MongoDB</b> - Persist at least two resources to a MongoDB database. One resource must have full CRUD.</li>
    <li><b>Visual Design</b> - Make your front-end snazzy by adding custom styling. First impressions matter!</li>
    <li><b>Code Style</b> - Write professional-looking code. Use a consistent style. Consider following the Airbnb Javascript ES5 Styleguide.</li>
    <li><b>Git</b> - 40+ commits, with a significant number from each teammate. Commit early, commit often. Each commit message should give a clear idea what you changed. (And don't expose any secret keys/tokens on GitHub!) You can reference our GitHub collaboration workshop and the in-depth GitHub collaboration writeup.</li>
    <li><b>Heroku</b> - Deploy your app with Heroku.</li>
    <li><b>Documentation</b> - Write a README that would make an employer excited to hire you.</li>    
  </ul>
<h3>Flex Technical Requirements</h3>
   <ul>
    <li><b>Data Validation</b> - On the client side, give users a visible error message if they try to submit blank forms (or other validation failures), explaining why they weren't allowed to submit. Also, in your database, use mongoose's validations for at least one attribute for each of your schemas (see mongoose validation docs). You can meet this requirement with just mongoose's built-in validations, but you could also take it further with custom validations.</li>
    <li><b>Bootstrap</b> - Use Twitter Bootstrap, Foundation, Skeleton, or another CSS framework throughout your site to create a unified baseline style.</li>
    <li><b>Model Relationship</b> - Create a one-to-many or many-to-many relationship between two models using either embedded or referenced data.</li>    
   </ul>
<h3>RESTful Routes</h3>
  <ul>
    <li>GET /api/moments</li>
    <li>POST /api/moments</li>
    <li>PUT /api/moments/:id</li>
    <li>DELETE /api/moments/:id</li>
  </ul>
