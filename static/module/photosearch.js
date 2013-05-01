define('photosearch', ['jquery', 'photolist'], function($) {
    var module = $('#prefix-ps');

    /* call customer event "setImg" as public Method of module "photoviewer"*/
    var formSubmit = function(event) {
        event.preventDefault();
        var sQuery = $('form input[name=keyword]', module[0]).val();
        $('#prefix-pl').triggerHandler('callFlickrApi', [sQuery]);
    }
    var init = function() {
        $('form', module[0]).submit(formSubmit); /* bind  formSubmit Event as customer Event */
        $('form', module[0]).trigger('submit');  /* Each Event can be used as customer Event */
    }
    init();
});
