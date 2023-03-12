# Web Bomberman Webpage

This is the frontend for the Web Bomberman project.

## Getting started

Clone the repository on your machine and install dependencies.

```
git clone git@github.com:web-bomberman/html.git
cd html
npm install
```

Then, create your `.env` file with a `VITE_API_URL` variable, just like the
`.env.example` file containing the URL to the
[API](https://github.com/web-bomberman/api) you intend to run locally.

## Running locally

On the folder you downloaded the project, run this on your terminal:

```
npm run dev
```

This will put a server up that you can only access on your computer. If you
want other devices to access it, run in host mode with the following command:

```
npm run dev:host
```

In order for other devices to reach your machine, they must be connected to
the same router your machine is connected to.

## Credits

[Rafael Bordoni](https://github.com/eldskald)

## License

Licensed under MIT.