<p align="center">
  <a href="https://corsmirror.herokuapp.com">
    <img src="https://github.com/CORSmirror.png?s=300">
  </a>
</p>

## What is CORSmirror?

CORSmirror is a RESTful API that provides a proxy to websites with [CORS](https://www.maxcdn.com/one/visual-glossary/cors/) enabled.

The web service is built with:

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [cors](https://github.com/expressjs/cors)
- [request](https://github.com/request/request)

For more information, check out the [repository](https://github.com/CORSmirror/CORSmirror).

## Usage

The RESTful API is as follows:

```
https://corsmirror.herokuapp.com/v1/cors?url=<url>
```

Thus, if you want to make a [jQuery AJAX request](http://api.jquery.com/jquery.ajax/) to `http://example.com`, you can do the following:

```js
const url = 'http://example.com';
$.ajax({
  method: 'GET',
  url: 'https://corsmirror.herokuapp.com/v1/cors?url=' + url,
}).done(function (data) {
  console.log(data);
});
```

You can pass additional query strings that sets or overrides the [response header fields](https://wikipedia.org/wiki/List_of_HTTP_header_fields):

```js
$.get(
  'https://corsmirror.herokuapp.com/v1/cors' +
    '?url=http://example.com' +
    '&content-type=text/plain'
).done(function (data, status, xhr) {
  console.log(xhr.getResponseHeader('content-type'));
});
```

> There are certain fields like `Content-Length` that cannot be overridden.

## Development

This is an open-source project so feel free to fork the [repository](https://github.com/CORSmirror/CORSmirror) and play with the server.

Contributions are welcome!

#### Installation

```sh
git clone https://github.com/CORSmirror/CORSmirror.git
cd CORSmirror
npm install
```

#### Run

```sh
npm run dev # development
npm start   # production
```

#### Testing

```sh
npm test
npm run lint
```

## License

[MIT](https://github.com/CORSmirror/CORSmirror/blob/master/LICENSE)
