<p align="center">
  <a href="https://corsmirror.onrender.com">
    <img src="https://github.com/CORSmirror.png?s=300">
  </a>
</p>

## What is CORSmirror?

CORSmirror is a RESTful API that provides a proxy to websites with [CORS](https://developer.mozilla.org/docs/Web/HTTP/CORS) enabled.

The web service is built with:

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [cors](https://github.com/expressjs/cors)
- [request](https://github.com/request/request)

For more information, check out the [repository](https://github.com/CORSmirror/CORSmirror).

## Usage

The RESTful API is as follows:

```
https://corsmirror.onrender.com/v1/cors?url=<url>
```

So if you want to [fetch](https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch) [https://example.com](https://example.com), you can:

```javascript
fetch('https://corsmirror.onrender.com/v1/cors?url=https://example.com')
  .then((response) => response.text())
  .then((data) => console.log(data));
```

You can pass additional query strings that sets or overrides the [response header fields](https://wikipedia.org/wiki/List_of_HTTP_header_fields):

```javascript
fetch(
  'https://corsmirror.onrender.com/v1/cors?url=https://example.com&content-type=text/plain'
)
  .then((response) => response.headers.get('content-type'))
  .then((data) => console.log(data));
```

> There are certain fields like `Content-Length` that cannot be overridden.

## Development

This is an open-source project so feel free to fork the [repository](https://github.com/CORSmirror/CORSmirror) and play with the server.

Contributions are welcome!

### Installation

```bash
git clone https://github.com/CORSmirror/CORSmirror.git
cd CORSmirror
npm install
```

### Run

```bash
npm run dev # development
npm start   # production
```

### Testing

```bash
npm test
npm run lint
```

## License

[MIT](https://github.com/CORSmirror/CORSmirror/blob/master/LICENSE)
