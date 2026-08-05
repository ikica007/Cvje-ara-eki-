const Vibrant = require('node-vibrant');
const url = "https://res.cloudinary.com/de7gefkxl/image/upload/v1783358055/20250913_093906_sc3vuy.jpg";
Vibrant.from(url).getPalette()
  .then((palette) => console.log(palette))
  .catch(err => console.error(err));
