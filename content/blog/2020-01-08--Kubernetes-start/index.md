---
title: "Kubernetes のお勉強"
subTitle: ""
description: ""
date: 2020-01-07
category: 'it'
tags:
  - インフラ
  - コンテナ
cover: ./images/cover.png
---

## kubenetes の環境構築

ubuntu が使えるなら、snap パッケージを利用するのが楽。

### kubectl のインストール

```
sudo snap install kubectl --classic
```

### 開発用に Kubernetes のクラスターを用意

ubuntu 環境を利用しているので microk8s を利用する。

https://microk8s.io/

```
sudo snap install microk8s --classic
sudo microk8s.status --wait-ready
sudo microk8s.enable dns dashboard registry
```

`kubectl` でアクセスできるように、microk8s の Config を `~/.kube/config` に書き出す。`~/.kube/config` はKubernetes の認証情報やクラスター情報を格納している。

```
microk8s.config > $HOME/.kube/config
```

## Kubernetes のダッシュボードにアクセスする

token を取得する

```bash
$ token=$(sudo microk8s.kubectl -n kube-system get secret | grep default-token | cut -d " " -f1)
$ sudo microk8s.kubectl -n kube-system describe secret $token
```

## Kubernetes でコンテナ作成

リソースファイルを作成

sample-pod.yml（nginx を立ち上げるだけの簡単なもの）

```yml
apiVersion: v1
kind: Pod
metadata:
  name: sample-pod
spec:
  containers:
    - name: nginx-container
      image: nginx:1.13
```

リソースファイルを元にコンテナを立ち上げる。

```
kubectl create -f sample-pod.yml
```

リソースファイルを変更した場合、起動中のPODに変更内容を適用する場合、`kubectl apply`を利用する

```
kubectl apply -f sample-pod.yml
```

もし、`kubectl apply` を行ったときに、クラスター内にリソースが存在しない場合、`kubectl create` を行ったときのように、リソースを作成してくれる。

なので、基本的にリソースを立ち上げる場合、`kubectl apply` を利用すればよい。

## Kuberntetes でコンテナ削除

`kubectl delete` を利用する。

```
kubectl delete -f sample-pod.yml
```

## まとめ

以上、Kubernates のインストールから、簡単なリソースの立ち上げまででした。
