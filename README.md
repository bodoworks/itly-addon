# Itly Addon

![Build and Test](https://github.com/johnjiang/itly-addon/actions/workflows/nodejs.yml/badge.svg)

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

You should now see an additional panel inside devtools.

**Note:** The `background` and `content` scripts do not reload automatically. You'll need to hit the 🔄 button next to
the extension listed in [Extensions](chrome://extensions/) to trigger a reload.

## 🧪 Testing

```
npm run ci # linting, testing, and typechecking
```

## 🚀 Building and deploy

TBD
