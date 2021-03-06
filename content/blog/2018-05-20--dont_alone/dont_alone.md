---
title: "何でもできる必要はない。ウェブ開発を一人でしてみて"
subTitle: "専門家集団のほうがつよい"
date: 2018-05-20
category: "develop"
---

ウェブサービスの構築をフロントからインフラまで何でも一人で開発しているくせに、「何でも一人でやる必要ないよね」という思いが最近ふつふつと湧いてきました。

一人で何でもするのではなく、自分の考えていることをわかりやすく多くの人に伝えて、共感する人を見つけて、一緒に作業していけるようにするべきなのだと、最近考えるようになりました。

どういう思考回路でそう考えるようになったのか整理がてら、つらつらと記事にしていきます。

<!-- more -->

## まずはどんなことを一人でやってきたのか

最近 私一人だけでウェブサービスを開発しています。昔はデスクトップアプリやAndroidアプリを作っていました。

これまで作成したウェブサービスは以下の3つです。(この記事を閲覧して頂いた時には、サービスを終了しているものもあるかもしれません。)
すべて4月中に制作してリリースしていますね。

* [https://flashgif.ouvill.net](https://flashgif.ouvill.net) : フラッシュGIFメーカー。添付Gifのようなものが作れます
* ~~[https://zeneditor.ouvill.net](https://zeneditor.ouvill.net) : ブラウザ動作の縦書きエディタ（Firefoxくらいしか安定動作しません……）~~ アクセス数がそれほど稼げなかったので停止
* ~~[https://word2vec.ouvill.net](https://word2vec.ouvil.net)~~:重たいので公開停止。機械学習を用いた類語検索。文章作成の言い換えを探す用途などにどうぞ。「女」と検索すると「細君」と出てきたりする点が気に入っています。

![](https://flashgif.ouvill.net/images/sample.gif)

そして現在もあらたにウェブサービスを開発中です。（ただ途中で開発中止しそう……もっと面白そうなサービスを思いついたので）

使用している技術としては以下のようなものです。サービスによっては使用していない技術もあります（ちょっと粒度がバラバラですみません。）

* VPS
* Linux
* Docker
* HTML
* CSS
* JavaScript
* SQL
* Python
* 自然言語処理
* 機械学習（DeepLearning , Word2Vec）
* Oauth認証
* JWT
* Ajax
* Nodejs
* React + Redux
* SSL通信

サービス自体も自分で考えて、自分でロジックを作成し、自分でデザインし、自分でリリースしています。

なんだか気がつけば簡単なウェブサービスならば、一人でサクッと作ってしまうくらいの技術力がついてしまっていました。

## それでどうなったか

こういうサービスあったら便利そうとアイデアが出てくれば、そのサービスを一人で作成できるようにはなりましたが、サービスのクオリティはそこそこです。

ウェブサイトのデザインはデザイナーさんが作成したほうがクオリティは高くなるでしょうし、フロントエンジニアの方がクライアントサイドを構築したほうがよりインタラクティブなサイトを構築できるでしょう。サーバーエンジニアの方のほうがよりセキュリティ性が高く高速応答のサーバーを作成できるでしょうし、インフラエンジニアの方のほうが障害耐性が高く大量アクセスを捌けるサーバー環境を用意できるでしょう。機械学習はデータサイエンティストにやってもらったほうが良い結果が得られるでしょう。

専門を極めた方々に比べると自分の技能なんてまだまだと感じてしまうわけです。

一人でできることなんてたかが知れています。

## 対策

それならばどうするかと対策を考えると、よりたくさん経験してより知識を身に着けていくしかないでしょう。

しかしながらすべての領域に対して、同じようなアプローチをとっていると身に付けるべき知識は膨大なものになってしまいます。なので、自分は何に興味を持っているのかを明確にし、特定の分野に特化して知識を身に着けていくべきだと思われます。

すると特化していない他の知識は段々と古びていき使い物にならなくなってきます。

じゃあ、今度はどうするかと考えると、自分の苦手なところは、得意な人にやってもらうという方法が考えられます。

そう分業です。

「私はこれをするから、君はこれをしてくれ」と分業していくことで、個人個人の専門性を高めて、サービスのクオリティを上げていくことができるでしょう。

……一人でできることなんてたかが知れているんです。

何でも一人でする必要なんてないんです。頑張れば何でもできるかもしれないけど、専門の人に敵うわけないです。頑張って作っても中途半端なものが生み出されるだけです。それか高品質だけど超時間がかかってしまうことが多いと思います。（ごくまれに才能溢れる方が一人で短時間のうちに高品質の物を作ってしまうこともありますか、例外ケースとして除外しても良いでしょう）

一人だけで何でも頑張ってせっせと作るより、自分の考えを広めて、協力者を募ったほうがより良いサービスを作れると思います。

（……自分へのブーメランが痛い）

コミュ症の自分にはとても難しい仕事なのですが、最近はそうも言っていられないなと考えを改めました。

## コミュニケーション能力の必要性

一人でウェブサービス開発していたけど、段々と辛いってことがわかってきて、どうしようかなという思いです。

より良いサービス、モノを作るにはコミュニケーション能力が非常に大事です。自身の専門領域以外のことは誰か他の人に頼ったほうが良いのです。

頼ると言っても、自分の作りたいものは自分にしかわかりません。

しっかりと自分の考えを言語化して、または、視覚化して相手に伝える、そして巻き込んでいく、そういうコミュニケーション能力が必要なのだと思います。

最近そう考えるようになりました。

## 恩返しも忘れずに

自分のことばかり手伝ってもらっていては、「クレクレ君」になってしまいます。

だから自分のことに巻き込むだけではなく、協力してくれた人にもメリットになるような仕組みづくりも必要でしょう。恩返しの仕組みです。恩返しの方法としては、固定の報酬をわたしたり、収入が上がった時に売上の何%を渡すという取り決めや、困っているときに助ける「お手伝い券」を渡すという感じでしょうか。そのへんは当事者同士が納得いく方法を決めていければと思います。

もっとも一番いいのは、一つの熱き思いに賛同者が自然に集まってくれることなのでしょうけど。

## まとめ

一人でできることなんてたかが知れているので、得意な人も巻き込んでいこうという記事でした。私も、もっともっと自分の考えていることを発信して、共感してくれる味方を増やしていこうと思います。

そしてその第一歩としてこの記事を書いています。

## 最後にちょこっと宣伝

現在就職活動中です。採用したいという会社があれば声かけいただけると幸いです。

わたしのITスキル的なものを簡単にですがブログに[まとめた](../2018-05-19--myskill/myskill.md)ので興味のある方は御覧ください。
