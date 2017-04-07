requirejs([ 'js/mod/screen/canvas-list' ], function( canvasList ){
    window.app.audio = {
        background  : null,
        gameSucceed : null,
        gameFailed  : null
    };

    //--> Load screen modules
    window.app.mod.bootstrap = {
        init : function(){
            this.audio.init();
            this.modules();
        }, /*- end bootstrap.init -*/
        
        audio : {
            init : function(self){
                self = this;
                document.addEventListener("deviceready", function(){
                    self.background();
                    self.game.init();
                }, false);
            },

            background : function(path){
                path = '/android_asset/www/dist/audio/effects/sfx.mp3';
                app.audio.background = new Media(path, function(e) {}, 
                function(err) {
                    alert('Audio error!');
                });

                app.audio.background.play({ numberOfLoops : 30 });
            },

            game : {
                init : function(){
                    this.succeed();
                    this.failed();
                },

                succeed : function(path){
                    path = '/android_asset/www/dist/audio/effects/game-succeed.mp3';
                    app.audio.gameSucceed = new Media(path, function(e) {}, 
                    function(err) {
                        alert('Audio error!');
                    });
                },

                failed : function(path){
                    path = '/android_asset/www/dist/audio/effects/game-failed.mp3';
                    app.audio.gameFailed = new Media(path, function(e) {}, 
                    function(err) {
                        alert('Audio error!');
                    });
                }
            }
        },

        modules : function(){
            // mark the progress on list first-run, default
            // window.app.cache({ tracker : 1 });
            
            // activate canvas list screen
            requirejs([window.app.__c__.preloader], function( obj ){
                obj.activate({
                    screen : 'canvas-list'
                 });
             });
            
         }, /*- end bootstrap._canvas -*/
    };
    
    /*-- start bootstrap --*/
    window.app.mod.bootstrap.init();
 });