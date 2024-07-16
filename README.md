# React + TypeScript + Vite

Made from baseline template with "HMR and some ESLint"

`npm run dev` - local
`npm run build` - static file host (or `npx serve`)


## Eslint 8 vs 9 issues
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported

--> all three from flat-cahce from file-entry-cache from eslint@8

npm warn deprecated @humanwhocodes/config-array@0.11.14: Use @eslint/config-array instead
npm warn deprecated @humanwhocodes/object-schema@2.0.3: Use @eslint/object-schema instead

--> also moved into eslint scope, so assuming 9 works

But react hooks are waiting for react 19, so mismash of peer-dep errors and lint changes
Ie leaving this "as is" from Vite baseline until late Q3


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
