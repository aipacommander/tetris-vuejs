# vue.js入門＆テトリスを作る

## 概要

タイトル通り

## 参考URL

* https://qiita.com/sekiyaeiji/items/f1df5d9d4c8a147eed77
* https://qiita.com/rururu3/items/3a90858844e7b2a90e42
* vimのシンタックスハイライト http://www.tomcky.net/entry/2018/03/01/013548

## やったこと


```sh
$ npm install --save react react-dom
$ npm install --save-dev babel-preset-react babel-preset-env parcel-bundler
$ npm install --save-dev babel-preset-env parcel-bundler babel-preset-vue vue
```


## Usage

```sh
$ docker build -t vue_app_image .
$ docker run --rm -v $(pwd):/app -p 9000:9000 --name vue_app -it vue_app_image
```

