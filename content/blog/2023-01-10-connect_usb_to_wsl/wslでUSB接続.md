---
title: WslでUSB接続 - Yubikey
date: 2023-01-10
cover: ""
tags:
  - wsl
  - yubikey
---

[GitHub - dorssel/usbipd-win: Windows software for sharing locally connected USB devices to other machines, including Hyper-V guests and WSL 2.](https://github.com/dorssel/usbipd-win)

上記ソフトを利用すると、WSL2でUSBを接続することができる。

## インストール

Windows側

```powershell
winget install --interactive --exact dorssel.usbipd-win 
```

WSL側

```bash
sudo apt install linux-tools-virtual hwdata
sudo update-alternatives --install /usr/local/bin/usbip usbip `ls /usr/lib/linux-tools/*/usbip | tail -n1` 20
```

## USBデバイスの確認

```powershell
usbip wsl list 
```

## USBデバイスの接続

```powershell
 usbipd wsl attach --busid <bus-id>
```

## Yubikey を転送してみる

YubikeyをWSLに転送してみた。

```powershell
usbipd wsl attach --busid 2-1
```

WSL側

```console
$ lsusb
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 001 Device 003: ID 1050:0407 Yubico.com Yubikey 4 OTP+U2F+CCID
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

で、YubikeyがUSBとして認識されていることが確認できた。しかし`gpg --card-status`と入力しても、動作しない。

エラーメッセージを見ると、`scdaemon`がないと出ている。インストールする

```bash
 sudo apt install scdaemon
```

だが、`gpg --card-status`を実行しても、動作しない。


[Yubikey · Discussion #127 · dorssel/usbipd-win · GitHub](https://github.com/dorssel/usbipd-win/discussions/127#discussioncomment-1817105)

上記リンクを参考に、`pcscd`をインストールする。

```bash
sudo apt install pcscd
```

そして有効化する。

```bash
sudo service pcscd start
```

`gpg --card-status`でYubikeyが認識されることが確認できた。

再起動するたびに`pcscd`は停止するので都度コマンド入力する必要がありそう。

それかbashrc等に仕込むか。

## 参考

[USB デバイスを接続する | Microsoft Learn](https://learn.microsoft.com/ja-jp/windows/wsl/connect-usb)
