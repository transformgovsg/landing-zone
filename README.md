# Landing Zone

## 🛠️ Setup

1. Install `pnpm` if you have not done it so.

```sh
brew install pnpm
```

2. Install dependencies.

```sh
pnpm install
```

3. Generate a GitHub fine-grained personal access token for blog with public repo read permission, put it in `.env`

4. Start development server.

```sh
pnpm dev
```

## 🚀 Project Structure

Inside of Landing Zone, you'll see the following folders and files:

```text
/
├── .husky
├── public/
│   ├── fonts/
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   ├── layouts/
│   └── pages/
├── .lintstagedrc.mjs
├── .prettierrc.mjs
├── package.json
└── tailwind.config.mjs

```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro components. React/Vue/Svelte/Preact components can be added too but we did not setup the integration.

Any static assets, like images, can be placed in the `public/` directory. However, we placed images in `src/assets/images` directory to make use of the `Image` component from Astro to do some pre-optimisation to the images during build time.

Configuration files such as `.lintstagedrc.mjs` and `.prettierrc.mjs` are used to enforce code consistency across the project.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command             | Action                                           |
| :------------------ | :----------------------------------------------- |
| `pnpm install`      | Installs dependencies                            |
| `pnpm dev`          | Starts local dev server at `localhost:4321`      |
| `pnpm build`        | Build your production site to `./build/`         |
| `pnpm preview`      | Preview your build locally                       |
| `pnpm format`       | Format your code                                 |
| `pnpm astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [Astro's documentation](https://docs.astro.build).
