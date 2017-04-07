define([ window.app.__c__.pageShift ], function(pageShift, __a){
    
    window.app.mod.screen.home = null;
    __a = window.app.mod.screen.home;
    
    __a = {
        activate : function( self ){
            self = this;
            
             pageShift.set({
                name : 'home',
                data : function(){ 
                    window.app.navigation.init();
                    console.log('Welcome to home page');   
                 }
             });
         },
     };
    
    return __a;
});