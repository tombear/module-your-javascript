requirejs.config({
    baseUrl: 'static/module', /* set js module path */
    /* enforceDefine: true, */
    paths: {
        'jquery': 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min'/* jquery 2.0 does not support IE6, 7 and 8*/
        /*'jquery': ['http://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min', 'lib/jquery/']  backup path*/
        
    },
    /* packages: ['cart', 'store'], sub folder for other main js*/
    callback: function() {
        /* console.log('all script loaded');
        /* 這邊是所有scirpt load完後直接callback function
        require(['jquery'], function($) {
            $('body').html('test');
        })*/
    },
    urlArgs: 's=' + (new Date()).getTime() /* all js will be with this url args*/
});
/* init 偵測有需要執行JS的模組*/
require(['jquery'], function($) {
    var aModules = [];
    var jsmodules = $('.js-module');
    jsmodules.each(function(index) {
        var sId = $(jsmodules[index]).attr('model');
        aModules.push(sId);
    });
    require(aModules, function() {
    });
});
/* sub folders for main js
require(['cart', 'store', 'store/util'], function(cart, store, util) {
});
*/

/*  分version方式 
var reqOne = require.config({
    context: 'version1',
    baseUrl: 'version1'
});
reqOne(['require', 'alpha', 'beta'], function(require, alpha, beta) {
    console.log('alpha version is:' + alpha.version);
    console.log('beta version is:' + beta.version);
});
*/
