define([ window.app.__c__.pageShift ],  function( pageShift,  __a ){
    
    window.app.mod.utils.screenPreloader = null;
    __a = window.app.mod.utils.screenPreloader;
    
    return __a = {
        
        activate : function( param ){
            var self = this;
            
            param.screen = param.screen || 'canvas-list';
            param.duration = param.duration || 0.1;
            
            pageShift.set({
                name : 'screen-preloader',
                data : function(){
                    TweenMax.to( $('[data-canvas]'), 0.3, {
                        delay : param.duration,
                        autoAlpha : 0,
                        onStart : self.ready,
                        onStartParams : [ param.screen ]
                     });
                 }
             });
            
         }, /*-- end activate --*/
                
        ready : function( screen ){
            requirejs([ 'js/mod/screen/'+ screen ], function( obj ){
                obj.activate();
             });
            
            return;
         } /*-- end ready --*/
    };
    
});