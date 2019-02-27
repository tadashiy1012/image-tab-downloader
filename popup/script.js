function getDt() {
    const dt = new Date(Date.now());
    const y = dt.getFullYear();
    const M = dt.getMonth() + 1 > 9 ? (dt.getMonth() + 1).toString() : '0' + (dt.getMonth() + 1);
    const d = dt.getDate() > 9 ? dt.getDate().toString() : '0' + dt.getDate();
    const h = dt.getHours() > 9 ? dt.getHours().toString() : '0' + dt.getHours();
    const m = dt.getMinutes() > 9 ? dt.getMinutes().toString() : '0' + dt.getMinutes();
    const s = dt.getSeconds() > 9 ? dt.getSeconds().toString() : '0' + dt.getSeconds();
    return `${y}-${M}-${d}-${h}${m}${s}`;
}
{
    const btn = document.querySelector('#btn');
    const inClose = document.querySelector('#close');
    btn.addEventListener('click', () => {
        const close = inClose.checked;
        browser.tabs.query({currentWindow: true}).then((tabs) =>{
            let names = [];
            const dir = `images-${getDt()}/`;
            tabs.forEach(e => {
                const file = e.url.substring(e.url.lastIndexOf('/') + 1);
                const name = file.substring(0, file.lastIndexOf('.'));
                const ext = file.substring(file.lastIndexOf('.'));
                if (ext === '.jpg' || ext === '.png') {
                    for (let i = 0, n = name;; i += 1) {
                        if (names.find(e => e === n)) {
                            n = name + '(' + i + ')'; 
                        } else {
                            names.push(n);
                            break;
                        }
                    }
                    const filePath = dir + names[names.length - 1] + ext;
                    console.log(filePath);
                    browser.downloads.download({
                        url: e.url,
                        filename: filePath
                    }).then((resp) => {
                        if (close) {
                            browser.tabs.remove(e.id)
                        }
                    });
                }
            });
        });
    });
}