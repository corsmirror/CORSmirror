<p align="center">
  <a href="https://corsmirror.onrender.com">
    <img src="https://github.com/CORSmirror.png?size=300" alt="CORSmirror">
  </a>
</p>

## What is CORSmirror?

CORSmirror is a RESTful API that provides a proxy to websites with [CORS](https://developer.mozilla.org/docs/Web/HTTP/CORS) enabled.

The web service is built with:

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [cors](https://github.com/expressjs/cors)
- [request](https://github.com/request/request)

For more information, check out the [site](https://corsmirror.onrender.com/), [Replit](https://replit.com/@remarkablemark/CORSmirror), or the [repository](https://github.com/CORSmirror/CORSmirror).

## Usage

The RESTful API is as follows:

```
https://corsmirror.onrender.com/v1/cors?url=<url>
```

So if you want to [fetch](https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch) [http://example.com](http://example.com), you can:

```javascript
fetch('https://corsmirror.onrender.com/v1/cors?url=http://example.com')
  .then((response) => response.text())
  .then((data) => console.log(data));
```

You can also pass additional query strings that sets or overrides the [response header fields](https://wikipedia.org/wiki/List_of_HTTP_header_fields):

```javascript
fetch(
  'https://corsmirror.onrender.com/v1/cors?url=http://example.com&content-type=text/plain'
)
  .then((response) => response.headers.get('content-type'))
  .then((data) => console.log(data));
```

> There are certain fields like `Content-Length` that cannot be overridden.

## Development

### Installation

Clone the repository:

```bash
git clone https://github.com/CORSmirror/CORSmirror.git
cd CORSmirror
```

Install the dependencies:

```bash
npm install
```

### Run

Start the development server:

```bash
npm run dev
```

Start the production server:

```bash
npm start
```

### Testing

Run tests:

```bash
npm test
```

Run lint:

```bash
npm run lint
```

## Contributions

This is an open source project so feel free to fork the [repository](https://github.com/CORSmirror/CORSmirror/fork). Contributions are welcome!

## License

[MIT](https://github.com/CORSmirror/CORSmirror/blob/master/LICENSE)
