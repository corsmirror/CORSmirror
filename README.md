<p align="center">
    <a href="http://www.corsmirror.com">
        <img src="https://avatars2.githubusercontent.com/u/21297312?s=300">
    </a>
</p>

## What is CORSmirror?

CORSmirror is a RESTful API that provides a mirror to websites with [CORS](https://www.maxcdn.com/one/visual-glossary/cors/) enabled.

The web application is built with:
- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [cors](https://github.com/expressjs/cors)
- [request](https://github.com/request/request)

You can find the repository [here](https://github.com/CORSmirror/CORSmirror).

## Usage

The RESTful API is as follows:
```
http://www.corsmirror.com/v1/cors?url=<url>
```

Thus, if you want to make a [jQuery AJAX request](http://api.jquery.com/jquery.ajax/) to `http://example.com`, you can do the following:
```js
var url = 'http://example.com';
$.ajax({
    method: 'GET',
    url: 'http://www.corsmirror.com/v1/cors?url=' + url
}).done(function(data) {
    console.log(data);
});
```

## Development

Feel free to fork and clone the [repository](https://github.com/CORSmirror/CORSmirror) and play around with the server. Contributions are welcome!

### Installation

```sh
$ git clone https://github.com/CORSmirror/CORSmirror.git
$ cd CORSmirror
$ npm install
```

### Testing

```sh
$ npm test
$ npm run lint
```

## License

[MIT](https://github.com/CORSmirror/CORSmirror/blob/master/LICENSE)
