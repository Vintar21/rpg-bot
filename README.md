![Maintained][maintained-badge]

# discord-typescript-bot

A template repo for you to get started building a Discord bot in TypeScript.

## Configuration

After cloning the repository run `npm install`.

Add your discord bot token to `src/config/config.ts`:

```ts
export let config = {
  token: "djigoj24gijo-dgj9wdfj", // Discord bot token.
  prefix: "!", // Command prefix, ex: !hello
};
```

Note that changes to this file should not be committed to the repository, `config.ts` is part of the .gitignore to prevent this.

## Key Commands

| Command          | Description                            |
| ---------------- | -------------------------------------- |
| `npm run start`  | Run the bot.                           |
| `npm run build`  | Build the typescript code.             |
| `npm run lint`   | Runs the linter on the code.           |
| `npm run format` | Fixes most lint errors using Prettier. |
| `npm run test`   | Run all tests.                         |

[maintained-badge]: https://img.shields.io/badge/maintained-yes-brightgreen
