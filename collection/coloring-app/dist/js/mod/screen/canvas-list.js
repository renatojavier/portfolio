define([ window.app.__c__.pageShift ], function( pageShift, __a ){
    
    __a = window.app.mod.screen.canvas;
    
    __a = {
        SWIPER : null,

        activate : function( self ){
            self = this;
            
            pageShift.set({
                name : 'canvas-list',
                data : function(){
                    window.app.navigation.init();
                    self.parseDatabase.init();
                 }
             });
            
         }, /*-- end activate --*/
        
        AMD : {
            
            init : function(){
                var self = this
                ,   dependencies = [ 'js/lib/swiper.min' ];
                
                requirejs( dependencies, function(){
                    self._swiper();
                 });
             },
            
            _swiper : function(){
                __a.SWIPER = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    spaceBetween: 0,
                    nextButton: '.btn-level-next',
                    prevButton: '.btn-level-prev'
                });

             }
            
         }, /*-- end AMD --*/
        
        list : {
            parse : function( self ){
                self = this;
                var canvasArrayL1 = JSON.parse( window.app.cache('canvas') );

                for( var L1 = 0; L1 < canvasArrayL1.length; L1++ ){

                    if( canvasArrayL1[L1].name == ( localStorage.getItem('active-canvas-specs') ).split('--')[0] ){

                        var canvasArrayL2 = canvasArrayL1[L1].items;

                        //--> [UI] label category name
                        self.headerLabel( canvasArrayL1[L1].alias, 'category' );
                        //--> [UI] colorize theme
                        self.theme( canvasArrayL1[L1].theme );

                        for( var L2 = 0; L2 < canvasArrayL2.length; L2++ ){

                            if( canvasArrayL2[L2]['code'] == ( localStorage.getItem('active-canvas-specs') ).split('--')[2] ){

                                //--> [UI] label canvas name
                                self.headerLabel( canvasArrayL2[L2].name, 'name' );
                                //--> [UI] fill reference image
                                self.image( canvasArrayL2[L2].source );

                             } /*-! end active canvas filter -*/

                         } /*-! end category item (canvas) loop -*/

                     } /*-! end active category filter -*/

                 } /*-! end category loop -*/

                return this;
             },
            
            
         }, /*-- end list --*/
        
        selection : {
            tap : function(){
                var self = this
                ,   categoryIndex = 0;
                
                // remove active canvas when displaying list
                localStorage.removeItem('active-canvas-specs');
                
                $('.canvas-tiles').each(function(){
                    
                    $(this).on('click', function( e ){
                        
                        categoryIndex = ($(this).parent().parent()).index();
                        
                        //console.log( categoryIndex );
                        
                        /*- check if locked or not -*/
                        if( $(this).hasClass('canvas-tiles-unlocked') ){ // unlocked tiles
                            
                            self.redirect( ( $(this).data('canvas-domain-level') + '--' + $(this).data('canvas-domain-alias') + '--' + $(this).data('canvas-code') + '--' + categoryIndex ) );
                            // disable multiple taps on same canvas instance
                            $(this).attr('disabled', 'disabled');
                            
                         }else{ // locked tiles
                            
                          }
                        
                        return false;
                     });
                    
                 });
                
                return this;
             },
            
            redirect : function( code ){
                var self = this;
                
                if( window.localStorage.getItem('canvas') != undefined )
                    window.localStorage.removeItem('active-canvas-specs');
                
                window.app.cache({
                    'active-canvas-specs' : code,
                    callback : function(){
                        requirejs([window.app.__c__.preloader], function( obj ){
                            obj.activate({
                                screen : 'canvas-main',
                                label  : 'canvas'
                             });
                         });
                     }
                 });
                
                return this;
             }
            
         }, /*-- end selection --*/
        
        parseDatabase : {
            
            init : function(){
                this.setup();
             },
            
            setup : function(){
                /*--
                 - First-time database setup for canvas,
                 - map from canvas.map.json then store to
                 - localStorage
                 --*/
                if( window.app.cache('canvas') == undefined){
                    requirejs(['text!js/config/canvas.map.json'], function(canvas){
                        for(var cv in ( JSON.parse(canvas) ) ){
                            window.localStorage[cv] = JSON.stringify( ( JSON.parse(canvas) )[cv] );
                         }
                     });
                 }
                
                this.onCached();
                
                return this;
             },
            
            onCached : function(){
                var self = this
                ,   canvas_db_raf = 0;
                
                if('requestAnimationFrame' in window){
                    
                    var i = function(){
                        canvas_db_raf = window.requestAnimationFrame( i );
                        if( window.localStorage.getItem('canvas') != undefined){
                            window.cancelAnimationFrame( canvas_db_raf );
                            self.read();
                         }
                     };
                    
                    i();
                    
                 }else{
                    window.setTimeout( self.read, 100 );
                  }
                
                return this;
             },
            
            read : function(canvasArray, container, dom){
                var self = this;
                
                canvasArray = JSON.parse( window.app.cache('canvas') );
                container = $('#canvas-container')
                dom = '';
                
                /*- loop through canvas level / names -*/
                for(var a=0; a<canvasArray.length; a++){
                    dom += '<div class="swiper-slide" data-canvas-level="'+ canvasArray[a].name +'" data-canvas-alias="'+ canvasArray[a].alias +'">';
                        dom += '<section class="canvas-level-name">';
                            dom += '<span>'+ canvasArray[a].alias +'</span>';
                            dom += '<span>'+ canvasArray[a].name +'</span>';
                        dom += '</section>';
                    
                        dom += '<section class="canvas-tiles-wrap">';
                        /*- loop through canvas level items -*/
                        for( var b=0; b<(canvasArray[a].items).length; b++ ){
                            dom += '<div data-canvas-domain-level="'+canvasArray[a].name+'" data-canvas-domain-alias="'+canvasArray[a].alias+'" data-canvas-code="'+(canvasArray[a].items)[b]['index']+'" class="canvas-tiles canvas-tiles-'+ ( ( (canvasArray[a].items)[b]['locked'] == true ) ? 'locked' : 'unlocked') +'">';
                                
                                if( ! (canvasArray[a].items)[b]['locked'] ){
                                    dom += '<div class="tile-pri-specs">';
                                        dom += '<span class="tps-name">' + (canvasArray[a].items)[b]['name'] + '</span>';
                                        dom += '<span class="tps-rating">'
                                        for( var x = 0; x < 3; x ++ ){
                                            dom += '<i class="fa fa-fw '+( ( (canvasArray[a].items)[b]['best-score'] <= x ) ? 'fa-star-o' : 'fa-star' )+'"></i>';
                                         }
                                        dom += '</span>';
                                    
                                    dom += '</div>';
                                 }
                            
                            dom += '</div>';
                         }
                        /*- end loop -*/
                        dom += '</section>';
                    dom += '</div>';
                 }
                /*- end loop -*/
                                
                container.html( dom );
                
                // allow AMD 
                __a.AMD.init();
                // allow user-interaction with
                __a.selection.tap();
                
                TweenMax.to('#canvas-list', 0.7, {
                    autoAlpha : 1,
                    onComplete : function(){
                        self.unlock();

                        var x = ( $('.canvas-tiles-unlocked').length == 5 || $('.canvas-tiles-unlocked').length == 10 || $('.canvas-tiles-unlocked').length == 15 || $('.canvas-tiles-unlocked').length == 20 ) ? $('.canvas-tiles-unlocked').length - 1 : $('.canvas-tiles-unlocked').length
                        ,   slideToIndex = Math.floor(x / 5);

                        __a.SWIPER.slideTo( slideToIndex );

                     }    
                 });
                
                return this;
             },
            
            unlock : function(){
                var self = this;
                
                
                
                return this;
             }
            
         } /*-- end parseDatabase --*/
     };
    
    return __a;
    
});