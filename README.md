# NewBeLab-Vue
![vue](https://img.shields.io/badge/Vue-v3.2.45-brightgreen)  
[バックエンド](https://github.com/nyohoo/NewBeLab-Rails)
## サービス概要  
チーム開発に興味を持つ未経験エンジニアに   
チームメンバーとマッチングする機会を与える  
チーム開発支援サービスです  

## メインのターゲットユーザー
チーム開発に興味を持つRUNTEQ受講生  
（いずれは外部ユーザーに解放する可能性も？）  

## ユーザーが抱える課題
チーム開発に興味を持つRUNTEQ受講生は多いが、下記の理由などから実行に踏み出せない人が多い。  
- 自分の技術力に不安がある
- どの程度時間をとられるかわからない
- 他の受講生のステータス（チーム開発への関心度合い、技術力など）がわからない

## 解決方法
チーム開発に興味のあるユーザーと、お互いのステータスを確認した上でマッチングできる場を提供します。  
ユーザーは自らのコミット能力、モチベーション、学習フェーズなどがわかるプロフィールをサービス上で公開します。  
そして、他のユーザーのプロフィールを見て、一緒にチーム開発したいと思った場合は、「いいね」を押します。お相手からも「いいね」がきたらマッチング成功、以降は直接連絡をとってチーム開発を進めてもらいます。  
また、作りたいアプリのアイデアを投稿できる掲示板もあります。そこでアイデアを投稿してメンバーを募集したり、他のユーザーのアイデアを見て開発に応募することもできます。  

## 実装予定の機能（以下の例は実際のアプリの機能から一部省略しています）
- ユーザー
  - ログイン機能（GitHub連携）
  - プロフィール画像登録機能
  - ステータス登録機能
    - コミット（1日●時間、週●日）
    - ポジション（バックエンド、フロントエンド、レビュー、アドバイザー）
    - モチベーション（ガチ、エンジョイ）
    - 学習フェーズ（カリキュラム中、PF作成中、卒業生）
    - 自己紹介文（自由形式）
    - タグ
   - 他ユーザーと直接マッチングする機能
     - ユーザー一覧、検索
       - マッチング度合いが表示される機能
     - ユーザーに「いいね」機能
   - アイデアを通じて他ユーザーとマッチングする機能
     - アイデアの作成、編集、削除機能
       - サービス概要、募集文
       - タグ
     - アイデアの一覧、検索機能
       - マッチング度合いが表示される機能
     - アイデアに「いいね」機能
- 管理ユーザー

## なぜこのサービスを作りたいのか？
東京都ハッカソンの盛り上がりを受け、「RUNTEQ内でチーム開発したい！」という声をよく聞くものの、それを実現まで引き上げてくれる革新的なプロダクトは存在しませんでした。  
マッチングの場を提供することで、チーム開発市場の活性化につながればと考えました。

## 使用技術
**フロントエンド**
<ul>
  <li>Vue.js </li>
  <details>
    <summary>主要yarnパッケージ</summary>
    <ul>
      <li><a href="https://github.com/vuetifyjs/vuetify">vuetify</a></li>
      <li><a href="https://github.com/vuejs/pinia">pinia</a></li>
      <li><a href="https://github.com/vuejs/router">vue-router</a></li>
      <li><a href="https://github.com/imcvampire/vue-axios">vue-axios</a></li>
    </ul>
  </deatails>
</ul>

**バックエンド**
<ul>
  <li>Ruby 3.1.2</li>
  <li>Rails 6.1.6</li>
  <details>
    <summary>主要gem</summary>
    <ul>
      <li><a href="https://github.com/kpumuk/meta-tags">meta-tags</a></li>
    </ul>
  </deatails>
</ul>
  
**インフラ**
- Heroku
- PostgreSQL

## ■画面遷移図  
[画面遷移図](https://www.figma.com/file/4qNkWlpNYBCOanfeoda0Ek/team_matching?node-id=0%3A1)

## ■ ER図
  [![image.png](https://i.gyazo.com/3618bfea6db2bb3a950ee6075daf9e85.png)](https://gyazo.com/3618bfea6db2bb3a950ee6075daf9e85)
=======
## スケジュール
企画〜技術調査：　済  
README〜ER図作成：11/4  
メイン機能実装：11/5 - 12/15  
β版をRUNTEQ内リリース（MVP）：12/16  
本番リリース：12/23  
