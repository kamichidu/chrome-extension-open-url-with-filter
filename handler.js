(function(){
    'use strict';

    var filter= function(url){
        // github.com/xxx => xxx.github.io
        url= url.replace(/\b(?:github\.com)\/([^\/]+)/, '$1.github.io');
        // remove /blob/master/
        url= url.replace('/blob/master/', '/');
        return url;
    };

    chrome.contextMenus.create({
        id: 'open-current',
        title: 'Open link with filter',
        contexts: ['link'],
    });
    chrome.contextMenus.create({
        id: 'open-tab',
        title: 'Open link with filter in new tab',
        contexts: ['link'],
    });
    // chrome.contextMenus.create({
    //     id: 'open-window',
    //     title: 'Open link with filter in new window',
    //     contexts: ['link'],
    // });
    // chrome.contextMenus.create({
    //     id: 'open-incognito',
    //     title: 'Open link with filter in incognito window',
    //     contexts: ['link'],
    // });

    chrome.contextMenus.onClicked.addListener(function(info, tab){
        var url= filter(info.linkUrl);

        if(info.menuItemId === 'open-current')
        {
            chrome.tabs.update(this.id, {
                url: url
            });
        }
        else if(info.menuItemId === 'open-tab')
        {
            chrome.tabs.create({
                url: url
            });
        }
        else if(info.menuItemId === 'open-window')
        {
            alert('Oops');
        }
        else if(info.menuItemId === 'open-incognito')
        {
            alert('Oops');
        }
    });
})();
