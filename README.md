# gripper_app

## Setting up to use node and npm

### make sure all your packages are up to date

```
    sudo apt-get update        # Fetches the list of available updates
    sudo apt-get upgrade       # Strictly upgrades the current packages
    sudo apt-get dist-upgrade  # Installs updates (new ones)
```

### install npm package manager for 16.04 lts

```
    sudo apt install curl
    curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
    sudo apt-get install -y nodejs
```

### install Vue cli to manaage the electron project

```
    sudo npm install -g @vue/cli
```

### change permissions of node dir to user

```
    sudo chown -R luken /usr/lib/node_modules
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run electron:serve
```

### Compiles and minifies for production

```
npm run electron:build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```
