/*--
 - Debug notice:
 - 1. finish animation line 301
 - 2. set progress greater than or equal to 100 line 113
 - 3. auto click started line 101
 --*/

require( ['require.domReady'], function(domReady){
    
    /*- param function [callback] -*/
    domReady( function(){
        /*- strict mode -*/
        'use strict';
        
        /*- Build Application main namespace object -*/
        window.app = window.app || new Object;
        
        /*- Create path constants -*/
        window.app.__c__ = window.app.__c__ || { pageShift : 'js/mod/utils/page-shift', preloader : 'js/mod/utils/screen-preloader' };
        
        window.app.startup = {
            
            init : function(){
                var self = this;
                
                this._require_base_config();
                
                this.preload.intro( function(){
                    TweenMax.to('#home-preloader', 0.2, {
                        autoAlpha : 1,
                        onComplete : function(){
                            self.preload.process.isRequired();
                         }
                     });
                 });
                
             }, /*- end startup.init -*/
            
            _require_base_config : function(){
                requirejs.config({
                    baseUrl : 'dist',
                    paths : {
                        text  : '../core/require.text',
                        image : '../core/require.image'
                     }
                 });
             },
            
            preload : {
                dom : $('#home-progress'),
                
                progress : {
                    step : 0,
                    text : ''
                 },
                
                done : {
                    init : function(){
                        //--* create module object
                        window.app.mod = window.app.mod || { screen : new Object, utils  : new Object };
                        this.animate( this.userEvent() );
                     },
                    
                    animate : function( cb){
                        var self = this
                        ,   tm = new TimelineMax({
                                onComplete : ( typeof cb == 'function' ) ? cb() : null
                             })
                        ;
                        
                        requirejs(['js/lib/jquery.lettering'], function(){
                            
                            // animate `start-app` button
                            $('[data-button=initiate-app]').lettering();
                            
                            // slide-out preloader container
                            tm
                            .to( $('#home-header').children('h2').children('span').eq(0), 0.7, {
                                marginTop: 20
                             }, 'btn-app-in')
                            .to( $('#home-header').children('h2').children('span').not(':first'), 0.7, {
                                margin: '-15px 0',
                                ease: Expo.easeInOut
                             }, 'btn-app-in')
                            .to( $('#home-preloader'), 0.7, {
                                y : '100%',
                                autoAlpha: 0,
                                ease: Expo.easeInOut
                             }, 'btn-app-in')
                            .to( $('[data-button=initiate-app]'), 0.3, {
                                autoAlpha: 1
                             }, 'btn-app-in+=0.3')
                            .staggerTo( $('[data-button=initiate-app]').children('span'), 0.2, {
                                scale: 1
                             }, 0.1, 'btn-app-in+=0.3')
                            ;
                            
                         });
                        
                        return this;
                     },
                    
                    userEvent : function(){
                        /*-- temp auto initiate 
                        requirejs(['js/initialize']);--*/
                        
                        /*-- user starts --*/
                        $('[data-button=initiate-app]')
                        .on('click', function( e ){
                            ( e.originalEvent ) ? requirejs(['js/initialize']) : null ;
                         });
                     }
                 },
                
                /*- 5-second preload rule -*/
                process : {
                    isRequired : function(){
                        if( app.startup.preload.progress.step <= 100 ){
                            this._sysRequirements();
                         }else{
                             app.startup.preload.progress.step = 100;
                             app.startup.preload.done.init();
                          }    
                     },
                    
                    _sysRequirements : function(){ /*- 1.5 out of 5 sec -*/
                        var self = this
                        ,   ua = window.navigator.userAgent
                        ;
                        
                        //*--> update node #1
                        this.updateProgress({
                            s : 18, 
                            t : 'Checking system requirements...',
                            d : 0.899, // 1.5 * (18/30)
                            f : function(){
                                
                                if( parseFloat( ua.match(/Android\s+([\d\.]+)/)[1] ) >= 4.4 || true){ /*- passed sys android ver -*/
                                    //*--> update node #2
                                    self.updateProgress({
                                        s : 30, 
                                        t : 'Checking LAN connection...',
                                        d : 0.4, // 1.5 * (12/30)
                                        f : function(){
                                            self._screens();
                                         }
                                     });
                                    
                                 }else{ /*- failed -*/
                                    self.updateProgress({
                                        t : 'Error: minimum Android KitKat version required.',
                                        e : true
                                     });
                                  }
                             }
                         });
                        
                        return this;
                     },
                    
                    _screens : function(){
                        var self = this
                        ,   list = [
                                'text!screen/settings.html',
                                'text!screen/about.html'
                            ];
                        
                        requirejs(list, 
                        function(){
                            //*--> update node #3
                            self.updateProgress({
                                s : app.startup.preload.progress.step + 25,
                                t : 'Loading screen templates...',
                                d : (0.25 * 5),
                                f : function(){
                                    self._media();
                                 }
                             });
                         },
                        function(error){
                            self.updateProgress({
                                t : 'Error: Missing screen materials.',
                                e : true
                             });
                            
                         });
                            
                        return this;
                     },
                    
                    _media : function(){
                        var self = this
                        ,   list = [
                                'image!dist/img/home/color-stripe.jpg!bust',
                                'image!dist/img/home/color-stripe-blue.jpg!bust',
                                'image!dist/img/home/color-stripe-blue2.jpg!bust'
                            ]
                        ;
                        
                        requirejs(list, 
                        function(){
                            //*--> update node #4
                            self.updateProgress({
                                s : app.startup.preload.progress.step + 20,
                                t : 'Loading media files...',
                                d : (0.20 * 5),
                                f : function(){
                                    self._database();
                                 }
                             });
                         },
                        function(error){
                            self.updateProgress({
                                t : 'Error: Missing media files.',
                                e : true
                             });
                         });
                                  
                        return this;
                     },
                    
                    _database : function(){
                        var self = this;
                        
                        if( 'cache' in window.app ){
                            //*--> update node #5
                            self.updateProgress({
                                s : app.startup.preload.progress.step + 25,
                                t : 'Loading cache system...',
                                d : (0.25 * 5),
                                f : function(){
                                    app.startup.preload.done.init();
                                 }
                             });
                         }else{
                            self.updateProgress({
                                t : 'Error: cache system not recognized.',
                                e : true
                             });
                          }
                        
                        return this;
                     },
                    
                    updateProgress : function( p ){
                        var o = $('#home-preloader');
                        
                        p.s = p.s || 0;
                        p.t = p.t || '';
                        p.d = p.d || 1;
                        p.f = p.f || null;
                        p.e = p.e || false;
                        
                        app.startup.preload.progress.step = p.s;
                        app.startup.preload.progress.text = p.t;
                        
                        if( p.e )
                            TweenLite.to( o, 0.2, {
                                backgroundColor: 'rgba(222, 31, 31, 0.75)'
                             });
                        
                        setTimeout(function(){
                            TweenMax.to( o.find('#preloader-progress'), p.d, {
                                width : p.s+'%',
                                ease : Linear.easeNone,
                                onStart : function(){
                                    o.find('#preloader-text').html( p.t );
                                 },
                                onComplete : function(){
                                    if( ( typeof p.f ).match(/function/) ){
                                        p.f();
                                        //console.log('callback...');
                                     }  
                                 }
                             });
                        }, 10);
                        
                        return this;
                     }
                 }, /*- end this.preload.process -*/
                
                intro : function( cb ){
                    var stagger_bg = 0.2
                    ,   timeline = new TimelineMax({
                            onComplete : function(){
                                if( typeof cb == 'function' )
                                    cb();
                             }
                         });
                    
                    timeline
                    /*- elasticize logo -*/
                    .to( $('#home-header').children('h2'), 0.7, {
                        autoAlpha : 1
                     }, 'fade-in-hero')
                    /*- stagger stripes */
                    .staggerTo( $('#home-wallpaper').children('span'), 0.5, {
                        delay: 0.3,
                        autoAlpha : 0,
                        y : '-100%'
                     }, 0.1, 'stagger-stripes')
                    ;
                    
                    /*- temp 
                    timeline.progress(1);-*/
                    
                    
                 } /*- end startup.preload.intro -*/
             } /*- end startup.preload -*/
         }; /*- end window.app.startup -*/
        
        window.app.navigation = {
            init : function(){
                this.stage();
             },

            stage : function( buttons ){
                buttons = $('[data-navigate]');

                buttons.each(function(){
                    $(this).on('click', function( e ){
                        var navigate = $(this).data('navigate')
                        ,   __path__ = 'js/mod/screen/' + navigate;

                        //require.undef( window.app.__c__.pageShift );
                        require.undef(__path__);
                        
                        // activate canvas list screen
                        requirejs([window.app.__c__.preloader], function( obj ){
                            obj.activate({
                                screen : navigate,
                                duration : 0.1
                             });
                         });

                        $(this).off('click');

                        e.stopImmediatePropagation();
                        e.preventDefault();
                     });
                 });

                return this;
             },
         }; /*- end window.app.navigation -*/
        
        window.app.cache = function(p){
            if('localStorage' in window ){
                switch( typeof p ){
                    case 'object':
                        var key
                        ,   timeout = 0
                        ,   increment = 10;

                        for( key in p ){
                            if( key != 'callback' && key != '--remove' ){
                                window.localStorage.setItem(key, p[key]);
                                timeout += increment;
                             }
                         }

                        if( typeof p.callback == 'function' && p.callback !== undefined)
                            window.setTimeout( p.callback, timeout );

                        break;

                    case 'string':
                        if( p == '--all' ){
                            var i = 0
                            ,   obj = {};
                            for( i; i < localStorage.length; i++ ){
                                obj[localStorage.key(i)] = localStorage.getItem( localStorage.key(i) );
                                timeout += increment;
                             }

                            return obj;
                         }else{
                            if( window.localStorage.getItem( p ) != null){
                                 return window.localStorage.getItem( p );
                                timeout+=increment;
                             }else{
                                console.warn('LocalStorage: index not found for \''+p+'\'');
                                 timeout = 0;
                                return;
                              }
                         }

                        break;
                 }
             }else{
                 alert('Internal error: cache system failed');
                 return;
              }
         } /*- end window.app.cache -*/
        
        /*---
         - Initialize startup app 
         --*/
        window.app.startup.init();
        
     });
 });