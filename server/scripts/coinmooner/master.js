// 参考资料
// [node多进程的创建与守护 - 掘金](https://juejin.cn/post/6844904068301717511)

const { fork } = require('child_process');
const cpus = require('os').cpus();

const createInstance = () => {
    const worker = fork('./children.js');

    // worker.on('message', (msg) => {
    //     console.log(msg)
    // })

    worker.on('exit', () => {
        console.log('worker exit: ' + worker.pid);
        createInstance()
    });
}
for (let i = 0, len = cpus.length - 1; i < len; i++) {
    createInstance()
}
