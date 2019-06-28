---
title: "ブログを VuePress から GatsbyJS に変更"
subTitle: ""
description: ""
date: 2019-06-28
category: 'it'
tags:
  - React
  - GatsbyJS
cover: ./images/cover.png
---

本サイトのブログシステムを VuePress から GatsbyJS に変更しました。

自力でサイトデザインして構成しています。

## VuePress から GatsbyJS に変更したわけ

個人的に Vue よりも React のほうが好きだからです。

TypeScript を利用して書いているのですが、TypeScript と React の組み合わせは補完がよく聞いて気持ちがいいです。

## 旧デザインと新デザインの比較

旧デザイン

![旧デザイン](./images/old.png)

新デザイン

![新デザイン](./images/new.png)

旧デザインは VuePress と [vuepress-theme-meteorlxy](https://github.com/meteorlxy/vuepress-theme-meteorlxy) というテーマを利用していました。

今回は GatsbyJS と独自デザインでサイトを構築しています。

比較してみると、旧デザインよりもかなりシンプルになっていています。

今回はデザインを自作したため、すべてのサイトページのHTML,CSS, JS の構成をばっちり把握できています。

今後も自分で自由にサイトのデザイン、機能を拡張していけるのは自作のメリットだと思います。

## デザインコンセプト − 桜

今回のデザインコンセプトは桜です。作成したのは6月なのでもう夏になりかけなのですが……。

桜のアイコンイラストも今回のために自作しました。

![](./images/cherry-blossom-large.svg)

解像度が高いディスプレイでは、画面左部分にほんのりと桜の花が表示されるようにデザインしています。
