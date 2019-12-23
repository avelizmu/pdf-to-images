# pdf-to-images
RESTful API that converts PDF files into PNG images

### Dependencies
This required `imagemagick`, `ghostscript`, and `poppler` installed in your system to run properly

### Install Instructions
* `git clone https://github.com/aveliz1999/pdf-to-images`
* `cd pdf-to-images`
* `npm install`

### Usage
Start the server with `npm start`

The API is exposed in port 3000 (or whatever PORT variable is specified in the environment).

A POST request to `/` with a pdf file with field name `pdf` will return a JSON object with the schema
```
{
    requestId: The request ID,
    pages: The number of pages
}
```

To retrieve the images, use a GET request to `/requestId/index` where requestID is the returned request ID from the POST request, and index is the index of the image (starting at 0).

### Cleanup

The cleanup task is run periodically to clean up files.

By default the cleanup runs once every hour, and cleans up files that are at least 1 hour old.

To change this, you can specify the following environment variables:

`CLEANUP_CRON`: A cron string to specify when the cleanup task is run

`TTL`: The cutoff age (in milliseconds) for files to be deleted