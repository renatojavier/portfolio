define([ window.app.__c__.pageShift ], function( pageShift, __a ){
    
    //--> window.app.mod.screen.developers = null;
    __a = window.app.mod.screen.developers;
    
    __a = {
        activate : function( self ){
            self = this;
            
            pageShift.set({
                name : 'developers',
                data : function(){
                    window.app.navigation.init();
                 }
             });
            
         }
     };
    
    return __a;
 });