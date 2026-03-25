## 📹 𝗦𝗲𝘁𝘂𝗽 𝗧𝘂𝘁𝗼𝗿𝗶𝗮𝗹

[![Watch Tutorial](https://img.youtube.com/vi/QiQG__QRpoM/hqdefault.jpg)](https://youtu.be/QiQG__QRpoM?si=dTFDVRzAGQtmO7EE)

Click thumbnail to watch full tutorial

<p align="center">
  <a href="####"><img src="http://readme-typing-svg.herokuapp.com?color=cyan&center=true&vCenter=true&multiline=false&lines=`🔰mukul_Boss🔰`" alt=""></a>
</p>

<a><img src='https://i.imgur.com/LyHic3i.gif'/></a>

<br />
<p align="center">
    <a href="https://github.com/Xrahat1">
        <img src="https://i.imgur.com/9pBmbf3.gif" alt="Logo">
    </a>
</p>

<p align="center">
  <!-- GitHub -->
  <a href="https://github.com/Xrahat1/Xrahat.git" target="_blank">
    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      width="40"
      height="39"
      style="border-radius:100%; margin-right:50px;"
      alt="GitHub">
  </a>
 <!-- Facebook -->
  <a href="https://www.facebook.com/share/1AWBvSfV1P/" target="_blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
      width="33"
      height="33"
      style="border-radius:100%;"
      alt="Facebook">
  </a>
</p>

### <br>   ❖ DEPLOY_WORKFLOWS ❖
<a><img       
src='https://i.imgur.com/LyHic3i.gif'/></a>
```
name: Node.js CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
    # Step to check out the repository code
    - uses: actions/checkout@v2

    # Step to set up the specified Node.js version
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}

    # Step to install dependencies
    - name: Install dependencies
      run: npm install

    # Step to run the bot with the correct port
    - name: Start the bot
      env:
        PORT: 8080
      run: npm start
```
<a><img       
src='https://i.imgur.com/LyHic3i.gif'/></a>

## 📢 𝗝𝗼𝗶𝗻 𝗔𝗹𝗹 𝗖𝗵𝗮𝗻𝗻𝗲𝗹👇
<a><img       
src='https://i.imgur.com/LyHgic3i.gif'/></a>
<p align="center">
  <a href="https://t.me/rahat_bot_community" target="_blank">
    <img src="https://logo.svgcdn.com/logos/telegram.png" width="120" alt="Fork on GitHub" style="border-radius: 50%;">
 </a>
</p>

## Render Node👇🏼 
```
Xrahat.js
```
<a><img       
src='https://i.imgur.com/LyHic3i.gif'/></a>

<!-- TABLE OF CONTENTS -->
<details open="open">
    <summary>Table of Contents</summary>
    <ol>
        <li><a href="#contributing">Contributing</a></li> 
        <li><a href="#license">License</a></li>
      <li><a href="#credits">Credits</a></li>
    </ol>
</details>

<!-- LICENSE -->
## License

This project is licensed under the GNU General Public License v3.0 License - see the [LICENSE](LICENSE) file.

<!-- CONTRIBUTING -->
## Contributing

Sự đóng góp của bạn sẽ khiến cho project ngày càng tốt hơn, các bước để bạn có thể đóng góp

1. Fork project này
2. Tạo một branch mới chứa tính năng của bạn (`git checkout -b feature/AmazingFeature`)
3. Commit những gì bạn muốn đóng góp (`git commit -m 'Add some AmazingFeature'`)
4. Đẩy branch chứa tính năng của bạn lên (`git push origin feature/AmazingFeature`)
5. Tạo một pull request mới và sự đóng góp của bạn đã sẵn sàng để có thể đóng góp!

## Credits

This repository is a modified/customized version of:
https://github.com/m1raibot/miraiv2

The original project and license belong to their respective developers.
I only made modifications and customization for learning purposes.

Full credit goes to the original authors.
