---
category: develop
tags:
  - vue
  - web
  - adsense
date: 2019-03-30
title: Vuepress に Google アドセンスコードを埋め込む
vssue-title: vuepress_google_adsense
description: "Vuepress に google adsense コードを埋め込む"
---

Vuepress に google adsense を埋め込む方法です。

<!-- more -->

## google アドセンスを埋め込む方法

さっさと要件だけ掲載します。解説は下のほう。

`config.js` に以下を追加します。

```js
module.exports = {
  head: [
    ['script', { 'async src': "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" }],
    ['script', {},
      '(adsbygoogle = window.adsbygoogle || []).push({  google_ad_client: "アドセンスコード",  enable_page_level_ads: true });'],
  ],
}
```

ソース中の`"アドセンスコード"`をあなたのアドセンスコードに変更してください。

Google アドセンス の自動広告を有効にすることで、広告をサイトに表示します

::: warning

Google アドセンスの表示を有効にすることでサイトの読み込みが著しく低下します

:::

もし好きな場所に Google 広告を表示したい場合、テーマファイルの改造が必要になります。

## 解説

### Vuepress で `head` 要素を追加する

Vuepress で `<head>` 部分のタグを追加したい場合、`config.js` に `head` を追加することで実現できます。書式は `[tagName, { attrName: attrValue }, innerHTML?]` というようになります。例えば、favicon を追加したい場合、以下のように記述します。

```js
module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ]
}
```

### Google AdSense の場合

Google AdSense の広告タグは以下の書式です。

```html
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: "アドセンスコード",
          enable_page_level_ads: true
     });
</script>
```

上記ソースコードを、Vuepress の書き方に適応すると、サイトトップで書いたソースコードになります。

再掲

```js
module.exports = {
  head: [
    ['script', { 'async src': "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" }],
    ['script', {},
      '(adsbygoogle = window.adsbygoogle || []).push({  google_ad_client: "アドセンスコード",  enable_page_level_ads: true });'],
  ],
}
```

## 参考

https://v1.vuepress.vuejs.org/config/#head
