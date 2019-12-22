# pdf-to-images
RESTful API that converts PDF files into PNG images

### Install Instructions
* `git clone https://github.com/aveliz1999/pdf-to-images`
* `cd pdf-to-images`
* `npm install`

### Usage
Start the server with `npm start`

The API is exposed in port 3000 (or whatever PORT variable is specified in the environment).

A POST request to `/` with a pdf file with field name `pdf` will return a JSON object with the request ID as the field `requestId`.

To retrieve the images, use a GET request to `/requestId/index` where requestID is the returned request ID from the POST request, and index is the index of the image.