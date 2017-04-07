define([ window.app.__c__.pageShift ],  function( pageShift,  __a ){
    
    window.app.mod.screen.canvasMain = null;
    __a = window.app.mod.screen.canvasMain;
    
    return __a = {
        
        activate : function( self ){
            self = this;
            
            pageShift.set({
                name : 'canvas-main',
                data : function(){
                    
                    window.app.navigation.init();
                    
                    self.AMD.init();
                    
                    self.parseData.init();
                    
                    self.splashGuide.init();
                    
                    /*- temporarily delay initialization -*/
                    window.setTimeout(function(){
                        self.artwork.init();
                     }, 100 );
                 }
             });
            
         }, /*-- end activate --*/
        
        resetMarkers : function(){},
        
        parseData : {
            
            init : function(){
                this.canvas();
             },
            
            canvas : function( data, self ){
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
                            
                            if( canvasArrayL2[L2]['index'] == ( localStorage.getItem('active-canvas-specs') ).split('--')[2] ){
                                
                                //--> [UI] label canvas name
                                self.headerLabel( canvasArrayL2[L2].name, 'name' );
                                //--> [UI] fill reference image
                                self.image( canvasArrayL2[L2].source );
                                
                             } /*-! end active canvas filter -*/
                            
                         } /*-! end category item (canvas) loop -*/
                        
                     } /*-! end active category filter -*/
                    
                 } /*-! end category loop -*/
                
             },
            
            image : function( source, reference, canvas){
                
                reference = $('#canvas-pattern-wrap').children('section');
                canvas = $('#canvas-cardboard-wrap');

                requirejs(['text!'+source], function(svg){
                    reference.html( svg );
                    
                    svg = svg.replace(/fill:(\w*);/g, 'fill:#EAEAEA; ');
                    canvas.html( svg );
                    canvas.children('svg').attr({ id : 'canvas-cardboard' });

                    window.setTimeout( function(){
                        new IScroll('#canvas-cardboard-wrap', {
                            zoom: true,
                            scrollX: true,
                            scrollY: true,
                            mouseWheel: true,
                            wheelAction: 'zoom',
                            click : true
                        });
                    }, 100);

                 });

                return this;
                
             },
            
            theme : function( color ){
                
                $('#navigation').find('#canvas-category').css({ color : color });
                $('#navigation').find('[data-navigate="canvas-list"]').children('.fa').css({ backgroundColor : color });
                
             },
            
            headerLabel : function( param, handle ){
                var element = $('#canvas-'+handle);
                
                if( element.length )
                    element.html( param );
                else
                    console.warn(handle+' does not exist!');
                
                return;
             }
            
         }, /*-- end parseData --*/
        
        splashGuide : {
            
            init : function(){
                //this.config.check();
             },

            animate : function(){
                var self = this
                ,   splash = $('#splash-guide');

                (new TimelineMax({
                    delay: 0.5,
                    onComplete : self.dismissal
                 }))
                .set(splash, {
                    display : 'block'   
                 }, 'display')
                .to(splash, 0.7, {
                    autoAlpha : 1,
                    scale : 1,
                    ease : Expo.easeInOut
                 })

                return this;
             },

            dismissal : function(){
                var self = this
                ,   button = $('#dismiss-splash-guide');

                button.on('click', function(){
                    TweenMax.to( $('#splash-guide'), 0.7, {
                        autoAlpha : 0,
                        scale : 0,
                        ease : Expo.easeInOut
                     });
                 });

                return this;
             },

            config : {
                check : function(){
                    
                    if( true )
                        __a.splashGuide.animate();

                    return this;
                 }
             }
            
         }, /*-- end splashGuide --*/
        
        AMD : {
            
            init : function( dependencies ){
                var self = this;
                
                dependencies = [ 'js/lib/iscroll' ];
                requirejs( dependencies, function(){
                    self.__iscroll();
                    self.__interact();
                 });
             },
            
            __iscroll : function(){
                new IScroll('#colour', {
                    mouseWheel : true,
                    click : true
                 });
                document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
             }, /*-- AMD.__iscroll --*/
            
            __interact : function(){
                
                /*-- 1. pattern image: resize + drag actions --*/
                interact( '#canvas-pattern-wrap' )
                .draggable({
                    restrict : { restriction : 'parent' },
                    inertia : true,
                    autoScroll: true,
                    onmove: function(event){
                        var target = event.target,
                        // keep the dragged position in the data-x/data-y attributes
                        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                        // translate the element
                        target.style.webkitTransform =
                        target.style.transform =
                          'translate(' + x + 'px, ' + y + 'px)';

                        // update the posiion attributes
                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                     }
                 })
                .resizable({
                    preserveAspectRatio: true,
                    edges: { left: false, right: true, bottom: false, top: false }
                })
                .on('resizemove', function (event) {
                    var target = event.target,
                        x = (parseFloat(target.getAttribute('data-x')) || 0),
                        y = (parseFloat(target.getAttribute('data-y')) || 0);

                    // update the element's style
                    target.style.width  = event.rect.width + 'px';
                    target.style.height = event.rect.height + 'px';

                  });
                
             } /*-- AMD.__interact --*/
        
            
         }, /*-- end AMD --*/
        
        artwork : {
            init : function(){
                this.defaultActiveTool( true );
                this._process.boot();
                //this._process.rate.ratingOverlay.cache();
             }, /*-- artwork.init --*/

            defaultActiveTool : function( bool ){
                window.localStorage.setItem('coloring-attempts', $('#canvas-cardboard-wrap').find('[data-segment]').length );
                return ( !bool ) ? window.localStorage.removeItem('active-tool') : window.localStorage.setItem( 'active-tool', 'red' );
             }, /*-- artwork.defaultActiveTool --*/

            _process : {
                boot : function(){
                    this.paletteSelection().segment();
                    this.rate.filter();
                 },

                o : { 
                    clear : '__clear__',
                    save  : '__save__',
                    rating : {
                        star : 3,
                        percentage: 0.8,
                        precision: 0.2
                     }
                 },

                rate : {
                    filter : function( save, segmentCount, filledCount ){
                        var self = this;

                        segmentCount = $('#canvas-cardboard-wrap').find('[data-segment]').length;
                        filledCount  = 0;
                        save = $('[data-palette-misc=save]');

                        save.on('click', function( e ){
                            filledCount = $('[data-segment-fill]').length;

                            /*--
                             - Rating is only allowed for completed work
                             --*/
                            ( segmentCount == filledCount ) ? self.proceed( filledCount ) : self.unfilledSegmentAlert( filledCount, segmentCount );

                            e.preventDefault();
                            e.stopImmediatePropagation();
                         });

                        return this;
                     },

                    unfilledSegmentAlert : function( f, t ){
                        var self = this
                        ,   wrap = $('#save-alert')
                        ,   dom = ''
                        ,   left = t - f;

                        wrap.html('');
                        dom += ( (left > 1) ? left + ' segments left' : left + ' segment left' );
                        wrap.html( dom );

                        ( new TimelineMax )
                        .set( wrap, { autoAlpha : 0 })
                        .to( wrap, 0.3, { autoAlpha : 1 })
                        .to( wrap, 0.3, { delay: 1, autoAlpha : 0 });

                        return this;
                     },

                    proceed : function( total ){
                        var self = this
                        ,   percentage = ( $('[data-segment-fill=true]').length / total ) * __a.artwork._process.o.rating.percentage
                        ,   precision = ( total / window.localStorage.getItem('coloring-attempts') ) * __a.artwork._process.o.rating.precision
                        ,   actual = percentage + precision
                        ,   star =  ( actual ) * __a.artwork._process.o.rating.star
                        ,   saved_to_id = (localStorage.getItem('active-canvas-specs')).split('--')[2]
                        ;

                        //console.log( star );
                        //--* level clears @ 1+ star rewards
                        this.ratingOverlay.init( star, self.ratingOverlay.cache(saved_to_id, star) );

                        return this;
                     },

                    ratingOverlay : {
                        index : 0,

                        init : function( star, callback ){
                            var self = this
                            ,   ac = parseInt( (localStorage.getItem('active-canvas-specs')).split('--')[3] ) + 1;
                            
                            if( ac > 2 ){
                                star = Math.ceil( star );
                             }else{
                                star = Math.round( star );
                              }
                            
                            //star = Math.round( star );
                            //star = Math.ceil( star );

                            (new TimelineLite({
                                onStart : self.evaluate,
                                onStartParams : [ star, callback ],
                                onComplete : ( star > 0 ) ? self.animateStars : null,
                                onCompleteParams : ( star > 0 ) ? [ star, callback ] : null
                             }))
                            .set('#rating-overlay', { display : 'block' })
                            .set('.ro-box', { autoAlpha : 0 })
                            .to('#rating-overlay', 0.5, { autoAlpha:1 })
                            .to('.ro-box', 0.5, { autoAlpha : 1 })
                            ;

                            return this;
                         },
                        
                        cache : function( index, star ){
                            this.index = index;
                            
                            star = Math.round(star);
                            var self = this;
                            
                            self.controls.set();
                            
                            if( star < 1 )
                                return;
                            
                            var pattern = '{"code":"\\d+\\d+\\d+","name":"\\w+","index":'+index+',"locked":(true|false),"source":"img\/canvas\/\\w+\/\\w+\\.svg","best-score":[0-3]}'
                            ,   regex = new RegExp(pattern, 'g')
                            ,   str = localStorage.getItem('canvas')
                            ,   token = regex.exec(str)[0]
                            ,   modified = token.replace(/"best-score":\d/g, '"best-score":'+star)
                            ,   merged = str.replace(regex, modified);
                            
                            window.app.cache({
                                canvas : merged,
                                callback : function( index ){
                                    
                                    index = parseInt(self.index) + 1;
                                    
                                    if(index > 20) return;
                                    
                                    var pattern = '{"code":"\\d+\\d+\\d+","name":"\\w+","index":'+index+',"locked":(true|false),"source":"img\/canvas\/\\w+\/\\w+\\.svg","best-score":[0-3]}'
                                    ,   regex = new RegExp(pattern, 'g')
                                    ,   str = localStorage.getItem('canvas')
                                    ,   token = regex.exec(str)[0]
                                    ,   modified = token.replace(/"locked":(true|false)/g, '"locked":false')
                                    ,   merged = str.replace(regex, modified);
                                    
                                    window.app.cache({ canvas : merged });
                                    
                                 }
                             });
                            
                         },

                        evaluate : function( star, cb ){

                            $('#rating-overlay').removeAttr('class')
                            .addClass( (star > 0) ? 'passed-rating' : 'failed-rating' );

                            if( star > 0 ){
                                app.audio.gameSucceed.play();
                            }else{
                                app.audio.gameFailed.play();
                            }

                            if( star < 1 )
                                ( typeof cb == 'function' ) ? cb() : null;

                            return this;
                         },

                        animateStars : function( star, cb ){

                            if( star > 0 ){
                                var starsDOM = $('#rating-overlay').find('.fa-star-o')
                                               .filter(function(index){
                                                   return ( index + 1 ) <= star;
                                                });

                                ( new TimelineLite({ 
                                    delay : 0.2,
                                    onCompleteScope : ( typeof cb == 'function' ) ? cb() : null
                                }) )
                                .staggerTo( starsDOM, 1, {
                                    attr : { 'class' : 'fa fa-fw fa-star' }
                                 }, 0.5);

                             }

                            return this;
                         },
                        
                        controls : {
                            set : function( nav, self ){
                                self = this;
                                
                                nav = $('#rating-overlay-control').find('[data-rating-control]');

                                TweenMax.to( $('#rating-overlay-control'), 0.3, {
                                    autoAlpha : 1
                                 });

                                nav.each(function(){
                                    $(this).on('click',  ( ( $(this).data('rating-control') === 'retry' ) ? self.retry : self.next ) );
                                 });

                                return this;
                              },
                            
                            retry : function(){
                                requirejs([ window.app.__c__.preloader ], function( obj ){
                                    obj.activate({
                                        screen : 'canvas-main'
                                     });
                                 });
                                
                                return;
                             },
                            
                            /*-- to be integrated --*/
                            next : function( self ){
                                self = this;
                                
                                var handler = window.localStorage.getItem('active-canvas-specs')
                                ,   tileIndex = parseInt(handler.split('--')[2])
                                ,   obj = JSON.parse( window.localStorage.getItem('canvas') )
                                ,   cache = '';
                                
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

                                            if( canvasArrayL2[L2]['index'] == ( localStorage.getItem('active-canvas-specs') ).split('--')[2] ){

                                                //--> [UI] label canvas name
                                                self.headerLabel( canvasArrayL2[L2].name, 'name' );
                                                //--> [UI] fill reference image
                                                self.image( canvasArrayL2[L2].source );

                                             } /*-! end active canvas filter -*/

                                         } /*-! end category item (canvas) loop -*/

                                     } /*-! end active category filter -*/

                                 } /*-! end category loop -*/
                                
                                window.app.cache({
                                    'active-canvas-specs' : cache,
                                    callback : function(){
                                        requirejs([ window.app.__c__.preloader ], function( obj ){
                                            obj.activate({
                                                screen : 'canvas-main'
                                             });
                                         });
                                     }
                                  });
                                
                                return;
                             }
                            
                         }

                     }

                 }, /*-- _process.rate --*/

                paletteSelection : function(){
                    var self = this
                    ,   color = $('[data-palette-color]')
                    ,   clear = $('[data-palette-misc=clear]')
                    ;

                    //--> color palettes
                    color.on('click', function(){
                        $(this).addClass('active-palette').siblings('[data-palette-color]').removeClass('active-palette');
                        clear.removeClass('active-palette');

                        window.localStorage.setItem( 'active-tool', $(this).data('palette-color') );
                     });

                    //--> clear palettes
                    clear.on('click', function(){
                        $(this).addClass('active-palette');
                        color.each(function(){
                            $(this).removeClass('active-palette');    
                         });

                        window.localStorage.setItem( 'active-tool', self.o.clear );
                     });

                    return this;
                 }, /*-- _process.paletteSelection --*/

                segment : function( cardboard ){
                    cardboard = $('#canvas-cardboard-wrap');

                    var self = this
                    ,   segment = cardboard.find('[data-segment]')
                    ;

                    segment.each(function(){ // Loop through segment

                        $(this).on('click', function(e){ // this clicked segment
                            var evaluation = null;

                            switch( window.localStorage.getItem('active-tool') ){

                                case self.o.clear:
                                    //--* decolorize
                                    $(this).css({
                                        fill: 'transparent'
                                     });

                                    //--* remove label
                                    $(this).removeAttr('data-segment-fill');
                                break;

                                default:
                                    //--* colorize
                                    $(this).css({
                                        fill: window.localStorage.getItem('active-tool')
                                     });

                                    //--* evaluate user fill against segment's set fill
                                    if( $(this).data('segment-color') == window.localStorage.getItem('active-tool') ){
                                        evaluation = true;
                                     }else{
                                        evaluation = false;
                                      }

                                    //--* prevent multiple attempt markings for same color on clipboard
                                    if( !evaluation && $(this).attr('data-segment-fill-drop') !== window.localStorage.getItem('active-tool') ){
                                        var attempts = window.localStorage.getItem('coloring-attempts');
                                        attempts = parseInt( attempts ) + 1;
                                        window.localStorage.setItem( 'coloring-attempts', attempts );
                                     }

                                    //--* label evaulation
                                    $(this).attr({
                                        'data-segment-fill' : evaluation,
                                        'data-segment-fill-drop' : window.localStorage.getItem('active-tool')
                                     });

                                break;

                            } /*- end switch -*/

                         });
                     });

                    return this;
                 } /*-- _process.segment --*/

             } /*-- artwork._process --*/ 

        } /*-- end artwork --*/
        
    }; /*-- end __a --*/
    
});