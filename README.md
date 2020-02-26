# vchat-core

vchat-core

## Installing

For the latest stable version:

```
npm install vchat-core
```

## using vchat-core

``` javascript
chat = new Chat(config, new ChatHandler());
```

Once the chat instance is created it can be initialized via

``` javascript
chat.init().then(result => {
    doSomething()
});
```
