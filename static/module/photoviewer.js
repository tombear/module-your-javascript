define('photoviewer', ['jquery'], function($) {
    var module = $('#prefix-pv');

    /* customer Event binded on this JQuery module object as publick Method */
    module.on('setImg', function(event, src) {
        var src = src.split('_s');
        src = src[0] + src[1];
        $('.bd', module[0]).html('<img src="' + src +'">');
    })
    module.click(function() {
        /* call customer event "nextImg" as public Method of module "photolist"*/
        $('#prefix-pl').trigger('nextImg')
    });
});

