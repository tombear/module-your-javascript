define('photolist', ['jquery'], function($) {
    /* private paramater */
    var module = $('#prefix-pl'),
    lastImgList, 
    moduleBody = $('.bd', module[0]),
    imgsrc = '';

    /* private Method*/
    var _updateUI = function(data) {
        if (data.stat !== 'ok') {
            return;
        }
        var photoitems = data.photos,
            item = null,
            img = '',
            link ='',
            photohtml = [];
        moduleBody.removeClass('loading');
        if (!parseInt(photoitems.total, 10)) {
            moduleBody.html('<ul></ul>');
            return;
        } else {
            items = photoitems.photo;
            photohtml.push('<ul class="yui3-g">');
            for (i in items) {
                item = items[i];
                img = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_s.jpg';
                link = 'http://www.flickr.com/photos/' + item.owner + '/' + item.id;
                photohtml.push('<li class="yui3-u"><a target="_blank" href="' + link + '" title="' + item.title + '"><img src="' + img + '"></a></li>');
            }
            photohtml.push('</ul>');
            moduleBody.html(photohtml.join(''));
            var initImgList = $('li:first', moduleBody[0]);
            initImgList.addClass('selected');
            lastImgList = initImgList;
            imgsrc = $('img', initImgList ).attr('src');

            /* call customer event "setImg" as public Method of module "photoviewer"*/
            $('#prefix-pv').trigger('setImg', [imgsrc]);
        }
    } 

    module.delegate('li', 'click', function(event) {
        event.preventDefault();
        var thisImgList = $(event.currentTarget);
        if (thisImgList.is('.selected')) {
            return;
        }
        thisImgList.addClass('selected');

        /* call customer event "setImg" as public Method of module "photoviewer"*/
        $('#prefix-pv').trigger('setImg', [$('img', thisImgList[0]).attr('src')]);

        window.scrollTo(0, 0)
        lastImgList.removeClass('selected');
        lastImgList = thisImgList;
    })
    
    /* customer Event binded on this JQuery module object as publick Method */
    module.on('callFlickrApi', function(event, query) {
        var API_URL = 'http://api.flickr.com/services/rest/',
        API_METHOD  = 'flickr.photos.search',    
        API_KEY     = 'd498ec869768ecea276a7cb3906241d9',
        API_FORMAT  = 'json';
        moduleBody.html('<ul></ul>').addClass('loading');
        $.getJSON(API_URL + '?jsoncallback=?', {
            method: API_METHOD,
            api_key: API_KEY,
            tags: encodeURIComponent(query),
            per_page: 100,
            page: 1,
            sort: 'interestingness-desc',
            format: API_FORMAT
        }, function(data) {
            _updateUI(data);  /* call private method of this module "photolist"*/
        })
    })

    /* customer Event binded on this JQuery module object as publick Method */
    module.on('nextImg', function(event) {
        lastImgList.removeClass('selected');
        var thisImgList = lastImgList.next();
        thisImgList = (thisImgList[0]) ? thisImgList : $('li:first', module[0]); 

        /* call customer event "setImg" as public Method of module "photoviewer"*/
        $('#prefix-pv').trigger('setImg', [$('img', thisImgList[0]).attr('src')]);

        thisImgList.addClass('selected');
        lastImgList = thisImgList;
    })
});

