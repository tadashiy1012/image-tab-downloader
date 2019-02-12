const out = document.querySelector('#out');
const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
    browser.tabs.query({currentWindow: true}, (tabs) =>{
        tabs.forEach(e => {
            const file = e.url.substring(e.url.lastIndexOf('/') + 1);
            const ext = file.substring(file.lastIndexOf('.') + 1);
            if (ext === 'jpg' || ext === 'png') {
                browser.downloads.download({url: e.url}).then(() => {
                    browser.tabs.remove(e.id);
                });
            }
        });
    });
});