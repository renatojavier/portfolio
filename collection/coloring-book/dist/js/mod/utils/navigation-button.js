define([], function( __a ){
    
    //__a = window.app.mod.utils.navigationButton;
    window.app.mod.utils.navigationButton = null;
    window.app.mod.utils.navigationButton = {
        
        get : function(){
            var navigation = $('#navigation');
            
            console.log( navigation.length );
            
            navigation.find('.nav-button')
            .on('click', function( e ){
                if( e.originalEvent ){
                    var page = $(this).data('navigate');
                    page = 'js/mod/screen/' + page;
                    
                    console.log( page );
                    
                    define([ page ], function( arg ){
                        arg.activate();
                     });

                 }
                
                e.preventDefault();
                e.stopImmediatePropagation();
             });
            
            return this;
         }
        
     };
    
    return window.app.mod.utils.navigationButton;
});