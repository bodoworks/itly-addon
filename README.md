# Itly Addon

# Developer setup

## 🍺 Prerequisites

-   [Homebrew](https://brew.sh/)

## 💻 Initial Setup

```
# Install nvm and follow setup post-install instructions
brew install nvm

# Install the version of node we need
nvm install
```

## 🎢 Dev loop

```
# Activate the version of node in the shell
nvm use
npm install
npm run start # This will continuously watch the repo for changes
```

1. Open Chrome and navigate to [Extensions](chrome://extensions/)
2. Click on 'Load unpacked' and navigate to the `./dist` folder

You should now see an additional panel inside Chrome devtools.

**Note:** The `background` script does not reload automatically. If you make any changes that's used by
`src/views/background/*` you'll need to hit the 🔄 button next to the extension listed in
[Extensions](chrome://extensions/).

## 🧪 Testing

```
npm run test
npm run lint
```

## 🚀 Building and deploy

Remember to bump up `version` inside `package.json`.

```
npm run build
```

Upload the `*.zip` file to Chrome Extension Store
