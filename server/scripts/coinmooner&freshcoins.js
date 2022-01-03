const axios = require('axios');
const request = require('superagent');
require('superagent-proxy')(request);

// 参考资料
// [Bent - 又一个JS HTTP Request Client - 轶哥](https://www.wyr.me/post/637)
// [如何使用 Node.js 执行多线程 - 掘金](https://juejin.cn/post/6915255619926622222)
// [50行实现Node.js多进程分页爬虫 - 掘金](https://juejin.cn/post/6844904117547057165)
// [node多进程的创建与守护 - 掘金](https://juejin.cn/post/6844904068301717511)
const getProxy = async () => {
    const api = "http://list.rola.info:8088/user_get_ip_list?token=pYcwDW3uwxHP6eiF1637064570485&&qty=5&time=3&country=&format=json&protocol=http&filter=1"
    return await axios.get(api).then(resp => resp.data.code === 0 ? resp.data.data : console.log(resp.data.msg));
}

const post = (proxies) => {
    proxies.forEach(proxy => {
        request
            .post('https://coinmooner.com/api/voting/')
            .send({ "operationName": "UpvoteCoin", "variables": { "coinId": "6856" }, "query": "mutation UpvoteCoin($coinId: String!, $captcha: String) {\n  upvoteCoin(coinId: $coinId, captcha: $captcha)\n}\n" })
            .set({
                'Accept': '*/*',
                'Accept-language': 'en-US,en;q=0.5',
                'Content-type': 'application/json; charset=utf-8',
                'Origin': 'https://coinmooner.com',
                'Referer': 'https://coinmooner.com/coin/6856',
                'Connection': 'keep-alive',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0'
            })
            .proxy('http://' + proxy)
            .end((err, res) => {
                console.log(err ? err : res.body);
            });
        request
            .post("https://api.freshcoins.io/votes/3c96dfea-4f82-44aa-9db6-db2742590389")
            .send({ "operationName": "UpvoteCoin", "variables": { "coinId": "6856" }, "query": "mutation UpvoteCoin($coinId: String!, $captcha: String) {\n  upvoteCoin(coinId: $coinId, captcha: $captcha)\n}\n" })
            .set({
                'Accept': '*/*',
                'Accept-language': 'en-US,en;q=0.5',
                'Content-type': 'application/json; charset=utf-8',
                'Origin': 'https://api.freshcoins.io',
                'Referer': 'https://api.freshcoins.io',
                'Connection': 'keep-alive',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0',
            })
            .proxy('http://' + proxy)
            .end((err, res) => {
                console.log(err ? err : res.body);
            });
    });
}

getProxy().then(proxies => post(proxies))