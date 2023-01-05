import { CreatePagesArgs } from "gatsby"

const redirectList = [
  {
    from: "/blog/2018-03-10--agreement_github_personal/agreement_github_personal/",
    to: "/blog/2018-03-10-agreement_github_personal/agreement_github_personal/",
  },
  {
    from: "/blog/2018-03-11--simplenote_shortcut/",
    to: "/blog/2018-03-11-simplenote_shortcut/",
  },
  {
    from: "/blog/2018-03-11--use_google_domains/use_google_domains/",
    to: "/blog/2018-03-11-use_google_domains/use_google_domains/",
  },
  {
    from: "/blog/2018-05-19--hiyokonitsuduke/hiyokonitsuduke/",
    to: "/blog/2018-05-19-hiyokonitsuduke/hiyokonitsuduke/",
  },
  {
    from: "/blog/2018-05-19--myskill/myskill/",
    to: "/blog/2018-05-19-myskill/myskill/",
  },
  {
    from: "/blog/2018-05-20--dont_alone/dont_alone/",
    to: "/blog/2018-05-20-dont_alone/dont_alone/",
  },
  {
    from: "/blog/2018-05-22--jsonkeytolowercamel/-jsonkeytolowercamel/",
    to: "/blog/2018-05-22-jsonkeytolowercamel/-jsonkeytolowercamel/",
  },
  {
    from: "/blog/2018-10-23--lets_signal/lets_signal/",
    to: "/blog/2018-10-23-lets_signal/lets_signal/",
  },
  {
    from: "/blog/2018-11-23--discord-slack/discord-slack/",
    to: "/blog/2018-11-23-discord-slack/discord-slack/",
  },
  {
    from: "/blog/2018-11-23--start-blog/start-blog/",
    to: "/blog/2018-11-23-start-blog/start-blog/",
  },
  {
    from: "/blog/2018-11-27--gitlab_gitbook/gitlab_gitbook/",
    to: "/blog/2018-11-27-gitlab_gitbook/gitlab_gitbook/",
  },
  {
    from: "/blog/2018-11-28--speed_up/speed_up/",
    to: "/blog/2018-11-28-speed_up/speed_up/",
  },
  {
    from: "/blog/2018-11-29--disable_fb_comment/disable_fb_comment/",
    to: "/blog/2018-11-29-disable_fb_comment/disable_fb_comment/",
  },
  {
    from: "/blog/2018-11-30--typora/typora/",
    to: "/blog/2018-11-30-typora/typora/",
  },
  {
    from: "/blog/2018-12-02--vuepress/vuepress/",
    to: "/blog/2018-12-02-vuepress/vuepress/",
  },
  {
    from: "/blog/2018-12-03--tls_mail/tls_mail/",
    to: "/blog/2018-12-03-tls_mail/tls_mail/",
  },
  {
    from: "/blog/2018-12-04--tutanota/tutanota/",
    to: "/blog/2018-12-04-tutanota/tutanota/",
  },
  {
    from: "/blog/2019-01-11--set_cmd_chemes/set_cmd_chemes/",
    to: "/blog/2019-01-11-set_cmd_chemes/set_cmd_chemes/",
  },
  {
    from: "/blog/2019-01-28--discord_rss/discord_rss/",
    to: "/blog/2019-01-28-discord_rss/discord_rss/",
  },
  {
    from: "/blog/2019-01-29--firefox_send_tresorit_send/firefox_send_tresorit_send/",
    to: "/blog/2019-01-29-firefox_send_tresorit_send/firefox_send_tresorit_send/",
  },
  {
    from: "/blog/2019-03-04--complain_blog_system/complain_blog_system/",
    to: "/blog/2019-03-04-complain_blog_system/complain_blog_system/",
  },
  {
    from: "/blog/2019-03-29--change_blog_system/change_blog_system/",
    to: "/blog/2019-03-29-change_blog_system/change_blog_system/",
  },
  {
    from: "/blog/2019-03-30--vuepress_blog/make_vuepress_blog/",
    to: "/blog/2019-03-30-vuepress_blog/make_vuepress_blog/",
  },
  {
    from: "/blog/2019-04-02--tree_command/tree_command/",
    to: "/blog/2019-04-02-tree_command/tree_command/",
  },
  {
    from: "/blog/2019-04-04--yubikey_guide/yubikey_guide/",
    to: "/blog/2019-04-04-yubikey_guide/yubikey_guide/",
  },
  {
    from: "/blog/2019-04-10--microk8s-install-error-utils/microk8s-install-error-utils/",
    to: "/blog/2019-04-10-microk8s-install-error-utils/microk8s-install-error-utils/",
  },
  {
    from: "/blog/2019-04-14--start-react-with-typescript/start-react-with-typescript/",
    to: "/blog/2019-04-14-start-react-with-typescript/start-react-with-typescript/",
  },
  {
    from: "/blog/2019-04-14--learn-typescript/learn-typescript/",
    to: "/blog/2019-04-14-learn-typescript/learn-typescript/",
  },
  {
    from: "/blog/2019-04-15--create-webpack-environment/create-webpack-environment/",
    to: "/blog/2019-04-15-create-webpack-environment/create-webpack-environment/",
  },
  {
    from: "/blog/2019-04-15--learn-webpack/learn-webpack/",
    to: "/blog/2019-04-15-learn-webpack/learn-webpack/",
  },
  {
    from: "/blog/2019-04-15--learn-sass/learn-sass/",
    to: "/blog/2019-04-15-learn-sass/learn-sass/",
  },
  {
    from: "/blog/2019-04-15--webpack-scss/webpack-scss/",
    to: "/blog/2019-04-15-webpack-scss/webpack-scss/",
  },
  {
    from: "/blog/2019-04-16--learn-react/learn-react/",
    to: "/blog/2019-04-16-learn-react/learn-react/",
  },
  {
    from: "/blog/2019-04-17--webpack-sass-typescript/webpack-sass-typescript/",
    to: "/blog/2019-04-17-webpack-sass-typescript/webpack-sass-typescript/",
  },
  {
    from: "/blog/2019-04-17--web-design-practice-1/web-design-practice-1/",
    to: "/blog/2019-04-17-web-design-practice-1/web-design-practice-1/",
  },
  {
    from: "/blog/2019-04-19--apple-store-google-store-link/apple-store-google-store-link/",
    to: "/blog/2019-04-19-apple-store-google-store-link/apple-store-google-store-link/",
  },
  {
    from: "/blog/2019-04-29--nextjs-with-typescript/nextjs-with-typescript/",
    to: "/blog/2019-04-29-nextjs-with-typescript/nextjs-with-typescript/",
  },
  {
    from: "/blog/2019-05-15--kazam-screencaster/kazam-screencaster/",
    to: "/blog/2019-05-15-kazam-screencaster/kazam-screencaster/",
  },
  {
    from: "/blog/2019-05-18--svg-object-move/svg-object-move/",
    to: "/blog/2019-05-18-svg-object-move/svg-object-move/",
  },
  {
    from: "/blog/2019-06-06--ubuntu-19-04/ubuntu-19-04/",
    to: "/blog/2019-06-06-ubuntu-19-04/ubuntu-19-04/",
  },
  {
    from: "/blog/2019-06-14--npm-sharp/cant-install-npm-sharp/",
    to: "/blog/2019-06-14-npm-sharp/cant-install-npm-sharp/",
  },
  {
    from: "/blog/2019-06-17--gatsbyjs-react-pose/gatsbyjs-react-pose/",
    to: "/blog/2019-06-17-gatsbyjs-react-pose/gatsbyjs-react-pose/",
  },
  {
    from: "/blog/2019-06-28--change_blog_vewpress_to_gatsbyjs/",
    to: "/blog/2019-06-28-change_blog_vewpress_to_gatsbyjs/",
  },
  {
    from: "/blog/2020-01-06--start-php/",
    to: "/blog/2020-01-06-start-php/",
  },
  {
    from: "/blog/2020-01-07--start-php2/",
    to: "/blog/2020-01-07-start-php2/",
  },
  {
    from: "/blog/2020-01-07--start-php3/",
    to: "/blog/2020-01-07-start-php3/",
  },
  {
    from: "/blog/2020-01-08--Kubernetes-start/",
    to: "/blog/2020-01-08-Kubernetes-start/",
  },
  {
    from: "/blog/2020-01-08--start-php4/",
    to: "/blog/2020-01-08-start-php4/",
  },
  {
    from: "/blog/2020-02-04--ubuntu-switch-window/",
    to: "/blog/2020-02-04-ubuntu-switch-window/",
  },
  {
    from: "/blog/2020-02-05--change-japanese-shortcut/",
    to: "/blog/2020-02-05-change-japanese-shortcut/",
  },
  {
    from: "/blog/2020-02-11--design-tools/",
    to: "/blog/2020-02-11-design-tools/",
  },
  {
    from: "/blog/2021-04-02--use-yubikey-on-wsl/",
    to: "/blog/2021-04-02-use-yubikey-on-wsl/",
  },
  {
    from: "/blog/2021-04-04--kubernetes--ingress/",
    to: "/blog/2021-04-04-kubernetes-ingress/",
  },
  {
    from: "/blog/2021-06-13--rename-lvm-volume/",
    to: "/blog/2021-06-13-rename-lvm-volume/",
  },
  {
    from: "/blog/2021-06-15--flutter-linux-build/",
    to: "/blog/2021-06-15-flutter-linux-build/",
  },
  {
    from: "/blog/2021-12-22--change-keyboard-swicth-Boba-U4/",
    to: "/blog/2021-12-22-change-keyboard-swicth-Boba-U4/",
  },
  {
    from: "/blog/2022-05-11--create_microk8s_cluster_on_raspberry_pi/",
    to: "/blog/2022-05-11-create_microk8s_cluster_on_raspberry_pi/",
  },
  {
    from: "/blog/2022-05-20--react-native-webview/",
    to: "/blog/2022-05-20-react-native-webview/",
  },
  {
    from: "/blog/2022-07-04--study-for-riss/",
    to: "/blog/2022-07-04-study-for-riss/",
  },
  {
    from: "/blog/2022-10-13--category-variable/",
    to: "/blog/2022-10-13-category-variable/",
  },
  {
    from: "/blog/2022-10-18--change_windows_11_taskbar_position/",
    to: "/blog/2022-10-18-change_windows_11_taskbar_position/",
  },
  {
    from: "/blog/2022-12-20--jetbrains_devcontainer/",
    to: "/blog/2022-12-20-jetbrains_devcontainer/",
  },
]

export const createRedirects = async ({
  createRedirect,
}: {
  createRedirect: CreatePagesArgs["actions"]["createRedirect"]
}) => {
  redirectList.forEach(({ from, to }) => {
    createRedirect({
      fromPath: from,
      toPath: to,
      isPermanent: true,
    })
  })
}
