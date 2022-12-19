---
title: 'JetBrains GatewayでローカルのdevContainerを利用する'
subTitle: ''
description: ''
cover: ''
date: 2022-12-20
tags: []
---

こんにちは、おーびるです。

Visual Studio CodeのdevContainerを利用していますか？　開発環境を丸々Dockerコンテナとして作成して、ローカルの開発環境を汚さずに開発できるので、とても便利です。

ただ、DevContainerを利用する場合、基本的にVisual Studio Codeでコードを編集することになります。

Visual Studio Codeは優秀なテキストエディタなのですが、JetBrains社が開発している各種IDE(IntelliJ IDEA, Goland, Clion, PyCharm)などで開発したいと思っていまいます。

ということで、JetBrainsでDevContainerを利用する方法を探っていこうと思います。

なお、本記事はWSL, Linux, Macでの動作を前提としています。ネイティブWindowsから利用する場合、若干修正が必要となることをご了承ください。

## 前提知識:

### devContainer 

Dockerで作った開発環境。VSCodeは`.devcontainer.json`や`.devcontainer/devcontainer.json`と書かれたファイルを発見すると、開発コンテナをビルドし、`Remote Development`の拡張機能によってコンテナの中でVSCodeを動かせる。

 ### JetBrains Gateway: 

JetBrains社が開発しているリモート開発ソフト。SSH接続を利用して、サーバーにJetBrains社のIDEを動かし、描画だけローカルで行う。

## 方法1: GitHub CodeSpace を利用する

GitHub CodeSpaceがdevContainerに対応しています。CodeSpace上に開発環境を構築し、JetBrains GatewayでSSH接続すれば快適な開発環境が構築できます。

デメリットは無料枠を使い切ってしまうとコストがかかることです。JetBrains GatewayをCodeSpaceで利用する場合、4コア以上の環境が推奨されていますので無料枠は30時間ほどで使い切るでしょう。

## 方法2: ローカルのDevContainerにSSHサーバーを建てて、JetBrains Gatewayで

ローカルにdevContainerにSSHサーバーを建てて、JetBrains Gatewayを利用する方法です。

`.devcontainer.json`の設定はこんな感じ。

```json
{
	"name": "Ubuntu",
	"image": "mcr.microsoft.com/devcontainers/base:jammy"
	"features": {
        "ghcr.io/devcontainers/features/sshd:1": {},
    },
	"forwardPorts": [2222],
}
```

これをプロジェクトルートに配置し、[Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)をインストールしたVSCodeでdevContainerを起動した後、`localhost:2222`にJetBrains GatewayでSSH接続します。

ただこれにはいくつか問題があります。

- いちいちVSCodeを起動しなければならない
- ssh接続するとき、パスワードを設定しなければならない
- JetBrains Gatewayで接続するとき、IDEの本体2GB～3GBほどがダウンロードされる

これらの問題を解決していきましょう。

### いちいちVSCodeを起動しなければならない

VSCodeからdevContainerの機能だけ切り出した、[Dev Container CLI](https://github.com/devcontainers/cli)を利用しましょう。

```bash
npm install -g @devcontainers/cli
```

ただ触ってみた感じ、使い勝手がやや悪かったです。

VSCodeでコンテナ起動するほうが簡単だったので、私は利用していません。

### SSH接続するとき、パスワードを設定しなければならない。

devContainerを初回起動時、SSHのパスワードを設定する必要があります。

```bash
sudo passwd $(whoami)
```

コンテナをビルドするたびにパスワードを設定するのは面倒です。公開鍵認証で接続するように設定します。

devContainerに接続するためのSSHキーを作成します。

```bash
ssh-keygen -t rsa -b 4096 -C "jetbrains@devcontainer" -f ~/.ssh/jetbrains
```

生成した公開鍵をdevContainerの`/home/vscode/.ssh/authorized_keys`にマウントするように`.devcontainer.json`を設定します。

```json
{
    "name": "Ubuntu",
	"image": "mcr.microsoft.com/devcontainers/base:jammy"
    "features": {
        "ghcr.io/devcontainers/features/sshd:1": {},
    },
    "forwardPorts": [
        2222
    ],
    "mounts": [
        // 追記
        "source=${localEnv:HOME}${localEnv:USERPROFILE}/.ssh/jetbrains.pub,target=/home/vscode/.ssh/authorized_keys,type=bind,consistency=cached,readonly"
    ]
}
```

### JetBrains Gatewayで接続するとき、IDEの本体2GB～3GBほどがダウンロードされる

IDE本体はコンテナに直接保存せず、`docker volume`を作成し、そちらに保存するように設定しましょう。各種コンテナに共通の`docker volume`をマウントするようにすれば、IDEをコンテナごとにダウンロードしなくなり、起動も早くなり、使用するファイル容量も少なくなります。

JetBrains GatewayはIDEを`$USER/.cache/JetBrains/RemoteDev/dist`に保存します。

```bash
docker volume create jetbrains
```

`jetbrains`volumeをdevContainerにマウントするように`.devcontainer.json`を追記

```json
{
    "name": "Ubuntu",
	"image": "mcr.microsoft.com/devcontainers/base:jammy"
    "features": {
        "ghcr.io/devcontainers/features/sshd:1": {},
    },
    "forwardPorts": [
        2222
    ],
    "mounts": [
        // 追記
        "source=jetbrains,target=/home/vscode/.cache/JetBrains/RemoteDev/dist,type=volume",
        "source=${localEnv:HOME}${localEnv:USERPROFILE}/.ssh/jetbrains.pub,target=/home/vscode/.ssh/authorized_keys,type=bind,consistency=cached,readonly"
    ]
}
```

ただdevContainerは`/home/vscode/.cache`以下のフォルダが存在しないので、dockerは`/home/vscode/.cache/JetBrains/RemoteDev/dist`までをroot権限で作成してしまいます。
あらかじめマウントポイントのフォルダを作成するように`.devcontainer.json`を修正します。`ghcr.io/ouvill/devcontainers_features/jetbrains`は私の自作の`Feature`です。

```json
{
    "name": "Ubuntu",
	"image": "mcr.microsoft.com/devcontainers/base:jammy"
    "features": {
        "ghcr.io/devcontainers/features/sshd:1": {},
        // 追記
        "ghcr.io/ouvill/devcontainers_features/jetbrains:0": {}
    },
    "forwardPorts": [
        2222
    ],
    "mounts": [
        "source=jetbrains,target=/home/vscode/.cache/JetBrains/RemoteDev/dist,type=volume",
        "source=${localEnv:HOME}${localEnv:USERPROFILE}/.ssh/jetbrains.pub,target=/home/vscode/.ssh/authorized_keys,type=bind,consistency=cached,readonly"
    ]
}
```

以上でJetBrainsのIDEを快適に起動させる準備が整いました。

あとはJetBrains Gatewayで`localhost:2222`に接続するだけです。

- ユーザー名:`vscode`
- 認証タイプ:キーペア
- 秘密鍵ファイル: 
    - WSLの場合: \\wsl$\\Ubuntu\\home\\\<user\>\.ssh\jetbrains
    - Linux,Macの場合: ~/.ssh/jetbrains
- 厳密なホストチェック:しない

で接続してください。

## まとめ

`.devcontainer.json`に以下を追記する

```json
{
    "features": {
        "ghcr.io/devcontainers/features/sshd:1": {},
        "ghcr.io/ouvill/devcontainers_features/jetbrains:latest": {}
    },
    "forwardPorts": [
        2222
    ],
    "mounts": [
        "source=jetbrains,target=/home/vscode/.cache/JetBrains/RemoteDev/dist,type=volume",
        "source=${localEnv:HOME}${localEnv:USERPROFILE}/.ssh/jetbrains.pub,target=/home/vscode/.ssh/authorized_keys,type=bind,consistency=cached,readonly"
    ]
}
```

sshキーを保存する

```bash
ssh-keygen -t rsa -b 4096 -C "jetbrains@devcontainer" -f ~/.ssh/jetbrains
```

dockerボリュームを用意

```bash
docker volume create jetbrains
```
