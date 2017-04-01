window.paper = window.paper || new Object || {};

;(function($,_){
    'use strict';
    
    _.const = {
        spatial3D : $('#animation-wrapper'),
        wrap : {},
        fallback : true,
        cache : localStorage
     };
    
    _.public = {
        // runtime public functions, intended for controls & upload of images per panel and side
        animateTo : function(param){
            _.extend.controller(param, _.const.wrap);
            return this; 
         },
        dimension : function(param, cb){
            _.mod.dimension.setProp(param, cb);
            return this;
         },
        imgSRC : function(param){
            _.mod.imgSRC(param);
            return this;
         },
        shortFront : function(param){
            _.mod.shortFront.offset(param);
         }
      }; // end of public
    
    _.extend = {
        timeline : function(){},
        rightPanel : function(){},
        controller : function(param){}
      };
    
    _.mod = {
        
        init : function(cb){
            this.meta;
            this.shiftProduct.init();
            this.bootstrapPLUGIN.main();
            this.playbackState(false);
            this.playback.restart();
         },
        
        bootstrapPLUGIN : {
            items : [ 'mobile-version' ], 
            main : function(){
                var self = this, a = 0;
                for(a in this.items){
                    $.getScript('plugin/'+self.items[a]+'/plugin.init.js')
                    .error(function(xhr, err){
                        if(xhr.status == 404)
                            console.log('Missing plugin yet initiated: '+self.items[a]);
                     });
                    
                    if(self.items[a] == 'user-details'){
                        $.getScript('plugin/'+self.items[a]+'/plugin.timeline.js');
                     }
                 }
             }
         },
        
        shiftProduct : {
            trigger : $('#card-animation-selector'),
            init : function(){
                this.event();
             },
            
            event : function(){
                var self = this;
                self.manageData(_.mod.meta.product);
                self.markActiveSelector();
                
                // dispatched when onchange occur
                this.trigger.on('change', function(e){
                    if(e.originalEvent){
                        if(!($(this).val()).match(/null/))
                            self.manageData($(this).val());
                     }
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                 });
             },
            
            manageData : function(data){
                var self = this
                ,   orientation = data.split('-')[0];
                
                _.mod.modal.show({
                    icon : 'clock-o',
                    msg : 'Please wait. Loading product contents.'
                 });
                self._getDOM(data);
             },
            
            markActiveSelector : function(){
                // onload flagship on card animation selector
                var self = this
                ,   selector = $('#card-animation-selector');
                
                selector.find('option').each(function(){
                    $(this).removeAttr('selected');
                    var regex = new RegExp(_.mod.meta.product,'i');
                    if( ($(this).val()).match(regex) ){
                        $(this).attr('selected', true);
                     }
                 });
             },
            
            _getDOM : function(param){
                var self = this;
                setTimeout(function(){
                    $('#animation-wrapper').load('ext/'+param+'/ext.dom.html', function(res, status){
                        if(status.match(/success/)){
                            _.mod.modal.update({
                                icon : 'clock-o',
                                msg : 'Please wait. Loading product contents.',
                                delay : 0.7
                             });
                            
                            $('#runtime-animation').hide();
                            self._getCSS(param);
                        }else{
                            _.mod.modal.update({
                                icon : 'exclamation-triangle',
                                msg : 'Error loading component. (err#001)',
                                delay : 0.7
                            });
                         }
                     });
                }, 100);
             },
            
            _getCSS : function(param){
                var self = this;
                setTimeout(function(){
                    $('#extend-css').html('').load('ext/'+param+'/ext.style.css', function(res, status){
                        if(status.match(/success/)){
                            
                            _.mod.modal.update({
                                icon : 'clock-o',
                                msg : 'Please wait. Loading product contents.',
                                delay : 0.8
                             });
                            
                            $('#runtime-animation').show();
                            self._getJS(param);
                        }else{
                            _.mod.modal.update({
                                icon : 'exclamation-triangle',
                                msg : 'Error loading component. (err#002)',
                                delay : 0.7
                            });
                         }
                     });
                }, 100);
             },
            
            _getJS : function(param){
                var self = this;
                setTimeout(function(){
                    
                    $.getScript('ext/'+param+'/ext.script.js')
                    .done(function(){
                        _.mod.modal.update({
                            icon : 'rocket',
                            msg : 'Here we go now',
                            delay : 0.7
                         });

                        _.mod.modal.hide(1.0);

                        setTimeout(function(){
                            // cache in product code
                            _.mod.meta.product = param;
                            self.loadScript();
                         }, 1000);
                     })
                    .error(function(){
                        _.mod.modal.update({
                            icon : 'exclamation-triangle',
                            msg : 'Error loading component. (err#003)',
                            delay : 0.7
                        });

                     });
                }, 100);
             },
            
            // late binding scripts
            loadScript : function(){
                _.const.wrap = $('#runtime-animation');
                _.mod.renderActualImage(); // casting the natural image dimension before scaling it down
                _.public.dimension({});
                _.extend.timeline();
                _.extend.controller('', _.const.wrap);
                _.extend.rightPanel();
                _.mod.activeFaceControlState(0);
             }
          },
        
        modal : {
            defaults : function(param){
                var def = {
                        icon : 'clock-o',
                        msg : 'Please wait. Loading product contents.',
                        bg : '#222',
                        delay : 0
                    }
                ,   conf = $.extend({}, def, param);
                
                return conf;
             },
            
            struct : function(msg, icon, cb){
                var dom = '<div id="wp-preloader">';
                dom += '<div id="preloader-content"> <i class="fa fa-2x fa-'+icon+'"></i> <div>'+msg+'</div> </div>';
                dom += '</div>';
                
                ($('#wp-preloader')) ? $('body').append(dom) : null;
                
                if(typeof cb === 'function') cb();
                 
                return this;
             },
            show : function(param, cb){
                var self = this;
                
                this.struct(self.defaults(param).msg, self.defaults(param).icon, function(){
                    TweenLite.set('#wp-preloader', { background : self.defaults(param).bg });
                    TweenLite.to('#wp-preloader', 0.2, {
                        delay : self.defaults(param).delay,
                        autoAlpha : 1,
                        onComplete : function(){
                            (typeof cb === 'function') ? cb() : null;
                         } 
                     });
                 });
                
                return this;
             },
            update : function(param, cb){
                var self = this;
                setTimeout(function(){
                    if($('#wp-preloader').length){
                        $('#wp-preloader').find('#preloader-content').children('div').html(self.defaults(param).msg);
                        $('#wp-preloader').find('#preloader-content').children('i').removeAttr('class').addClass('fa fa-2x fa-'+self.defaults(param).icon);
                        $('#wp-preloader').css({ background: self.defaults(param).bg });
                     }
                    
                    setTimeout(function(){
                        (typeof cb === 'function') ? cb() : null;
                     }, 100);
                    
                }, (self.defaults(param).delay * 1000) );
                
                return this;
             },
            hide : function(delay, cb){
                delay = delay||0;
                
                TweenLite.to('#wp-preloader', 0.3, {
                    delay : delay,
                    autoAlpha : 0,
                    onComplete : function(){
                        (typeof cb === 'function') ? cb() : null;
                        $('#wp-preloader').remove();
                     }
                 });
                return this;
             }
         },
        
        dimension : {
            obj : {},
            
            setProp : function(param, cb){
                var defaults = {
                        width : 29,
                        height : 21
                    }
                ,   self = this
                ,   conf = $.extend({}, defaults, param)
                ,   base__wdt = 600
                ,   base__hgt = 450
                ,   obj = {};
                
                this.obj = conf;
                
                TweenMax.set(_.const.wrap, {
                    width : conf.width,
                    height: conf.height,
                    onComplete: function(){
                        
                        if(conf.width > conf.height){
                            obj = {
                                    width : base__wdt,
                                    height: (base__wdt * conf.height) / conf.width,
                                    onComplete:
                                    function(){
                                        (typeof cb === 'function') ? cb() : null;
                                     }
                                };
                         }else{
                            obj = {
                                    width : (base__hgt * conf.width) / conf.height,
                                    height: base__hgt,
                                    onComplete:
                                    function(){
                                        (typeof cb === 'function') ? cb() : null;
                                     }
                                };
                          }
                        
                        TweenMax.set($('#runtime-animation'), obj);
                     }
                 });
                
                this.respControl.onclick();
             },
            
            responsive: function(orientation){
                orientation = orientation || 'portrait';
                
                var obj = this.obj
                ,   refDOM = _.const.spatial3D.parent()
                ,   gutter = (orientation.match('portrait')) ? 50 : 100;
                
                $(window).bind('resize', function(){
                    
                    if(($('#runtime-animation').outerWidth()+gutter) >= refDOM.outerWidth()){
                        var sp = (refDOM.outerWidth() / ($('#runtime-animation').outerWidth()+gutter))
                        ,   op = ($('#runtime-animation').outerWidth() - refDOM.outerWidth()) / 2;

                        TweenMax.set(_.const.spatial3D, {
                            scale: sp,
                            onComplete: function(){
                                $('#runtime-animation').css({
                                    marginLeft : -1*op
                                 });
                             }
                         });

                     }else{
                        
                        TweenMax.set(_.const.spatial3D, {
                            scale: 1.0,
                            onComplete: function(){
                                $('#runtime-animation').css({
                                    marginLeft : 'auto'
                                 });
                             }
                         });
                         
                      } 
                    
                 }).trigger('resize');
                
             },
            
            respControl : {
                onclick : function(device){
                    var open = true;
                    
                    $('#animation-control').find('.toggler')
                    .on('click', function(){
                        if(open){
                            TweenLite.to('#animation-control', 0.3, {
                                x: '-100%'
                             });
                            open = false;
                         }else{
                            TweenLite.to('#animation-control', 0.3, {
                                x: '0%'
                             }); 
                            open = true;
                          }
                      });
                    
                    this.largeVP();
                    return this;
                 },
                
                largeVP : function(){
                    $(window).on('resize', function(){
                        if((_.const.spatial3D.parent()).outerWidth() > 805){
                            $('html').removeClass('sm-vp-control');
                            TweenMax.set('#animation-control', {
                                x: '0%',
                                onStart: function(){
                                    
                                 }
                             }); 
                         }else if((_.const.spatial3D.parent()).outerWidth() <= 805){
                             $('html').addClass('sm-vp-control');    
                            TweenMax.set('#animation-control', {
                                x: '-100%',
                                onStart: function(){
                                    
                                 }
                             });
                          }
                        
                        if((_.const.spatial3D.parent()).outerWidth() <= 1145){
                            TweenMax.set('#animation-config', {
                                top: 'auto',
                                bottom: 0,
                                width: '90%'
                             });
                         }else{
                            TweenMax.set('#animation-config', {
                                top: 0,
                                bottom: 'auto',
                                width: 350
                             });
                          }
                     }).trigger('resize');
                 }
             }
         },
        
        imgSRC : function(param){
            var defaults = {
                    selector : {},
                    source : ''
                }
            ,   conf = $.extend({}, defaults, param);
            
            return conf.selector.attr('src', conf.source);
         },
        
        playback : {
            restart : function(){
                var self = this;
                $('[data-playback=replay]').on('click' ,function(){
                    _.extend.timeline().play(0);
                 });
             }
         },
        
        featureSupport : {
            detect : function(){
                (!Modernizr.csstransforms3d && Modernizr.cssanimations && Modernizr.csstransitions && Modernizr.localstorage) ? _.const.fallback = true : _.const.fallback = false;
             }
         },
        
        renderActualImage : function(){
            $('.panel').each(function(){
                $(this).find('.image-holder').each(function(){
                    
                    $(this).find('img').each(function(){
                        
                        var w = $(this)[0].naturalWidth
                        ,   h = $(this)[0].naturalHeight;
                        
                        $(this).css({ width  : w, height : h });
                     });
                 });
             });
         },
        
        shortFront : {
            orientation : 'portrait',
            disabled : false,
            offset : function(param){
                var def = {
                        cut : 50,
                        panel : 2
                     }
                ,   conf = $.extend({}, def, param);
                
                this.attachEvent(conf);
                return this;
             },
            
            attachEvent : function(conf){
                var self = this
                ,   panelIndex = 0
                ,   offsetAmount = conf.cut
                ,   cssOBJ = {}
                ,   panel = 100 / conf.panel;
                
                panelIndex = (_.const.cache.RTL == 'false' || _.const.cache.RTL == null) ? 0 : 1;
                
                if((this.orientation).match(/portrait/)){
                    var ref = _.const.wrap.find('.panel').eq(panelIndex).siblings().outerWidth()
                    ,   perWidth = ((1 - (offsetAmount / ref) ) / 2) * 100;

                    cssOBJ = {
                        width : perWidth+'%',
                        left : ((_.const.cache.RTL).match(/false/)) ? (panel - perWidth) + '%' : '50%'
                     };

                 }else{
                    var ref = _.const.wrap.find('.panel').eq(panelIndex).siblings().outerHeight()
                    ,   perHeight = ((1 - (offsetAmount / ref) ) / 2) * 100; 

                    cssOBJ = {
                        height : perHeight+'%',
                        top : (panel - perHeight)+'%'
                     };
                  }
                
                _.const.wrap.find('.panel').eq(panelIndex).css(cssOBJ);    
                return this;
             },
            
            defaults : function(){ // applicable for portrait and enabled shortfront
                if(!this.disabled){
                    var panelIndex = (_.const.cache.RTL == 'false') ? 0 : 1;

                    _.const.wrap.find('.panel').eq(panelIndex).css({
                        width : '50%',
                        left : ((_.const.cache.RTL).match(/false/)) ? '0px' : '50%'
                     });
                    
                    _.const.wrap.find('.panel').eq(panelIndex).siblings().css({
                        width : '50%',
                        left : ((_.const.cache.RTL).match(/false/)) ? '50%' : '0px'
                     });
                 }
             }
         },
        
        contentDirection : {
            attach : function(){
                this.onload(true);
                this.onclick();
                return this;
             },
            
            detach : function(stat){
                stat = stat || 'enabled';
                
                if(stat.match('disabled')){
                    _.const.cache.removeItem('RTL');
                    $('[data-role=rtl]').off('click').hide();
                }else{
                    _.const.cache.setItem('RTL', false);
                    $('[data-role=rtl]').off('click').show();
                 }
                
                return this;
             },
            
            onclick : function(){
                var rtl_control = $('[data-role=rtl]')
                ,   $this = this;
                rtl_control.on('click', function(){
                    (_.const.cache.getItem('RTL') === 'false') ? _.const.cache.setItem('RTL', true) : _.const.cache.setItem('RTL', false);
                    $this.onload(false);
                    _.mod.shortFront.defaults();
                 });
             },
            
            onload : function(bool){
                var trigger = $('[data-role=rtl]')
                ,   trigger_icon = trigger.children('i')
                ,   trigger_label = trigger.children('span');
                
                if(_.const.cache.getItem('RTL') === 'false'){
                    trigger.css({color: '#444'});
                    trigger_icon.removeClass('fa-align-right').addClass('fa-align-left');
                    trigger_label.html('LTR mode');
                    _.const.wrap
                 }else{
                    trigger.css({color: '#E0645C' });
                    trigger_icon.removeClass('fa-align-left').addClass('fa-align-right');
                    trigger_label.html('RTL mode');
                  }
                
                (!bool) ? this.defaultFace() : null;
                _.mod.activeFaceControlState(0);
            },
            
            defaultFace : function(){}
         },
        
        hideControl : function(index){
            if(typeof index === 'undefined'){
                $('#animation-control')
                .find('[data-role=control]')
                .each(function(){
                    $(this).show();
                 });
             }else if(typeof index === 'object'){
                for(var x=0; x<index.length; x++){
                    $('#animation-control')
                    .find('[data-role=control]')
                    .eq(index[x])
                    .hide();
                 }
              }else if(typeof index === 'number'){
                $('#animation-control')
                .find('[data-role=control]')
                .eq(index)
                .hide();
               }
         },
        
        activeFaceControlState : function(param){
            $('[data-role=control]').eq(param).children('i').removeClass('fa-th-large').addClass('fa-check');
            $('[data-role=control]').eq(param).siblings().children('i').removeClass('fa-check').addClass('fa-th-large');
         },
        
        playbackState : function(bool){
            var tm = new TimelineMax()
            ,   panel_control = $('[data-role=control]')
            ,   playback_control = $('[data-playback=replay]')
            ,   rtl_control = $('[data-role=rtl]')
            ,   sf_control = $('[data-role=short-front]')
            ,   ovp_control = $('[data-role=off-view-pause]');
            
            /*-----------------------
             * auto-animation stopped
             *-----------------------*/
            if(bool){
                tm
                .to(panel_control.parent(), 0.3, {
                    x: '0%',
                    autoAlpha: 1
                 }, 'playback-not-active')
                .staggerTo(panel_control, 0.3, {
                    autoAlpha : 1,
                    marginLeft : 3,
                    ease: Expo.easeIn
                 }, 0.1, 'playback-not-active')
                .set(playback_control.children('span'), {
                    display: 'block'
                 })
                .to(playback_control, 0.3, {
                    rotation : -360,
                    autoAlpha : 1,
                    transformOrigin: 'center center'
                 }, 'playback-not-active')
                .to(rtl_control, 0.3, {
                    autoAlpha : 1
                 }, 'playback-not-active')
                .to(sf_control, 0.3, {
                    autoAlpha : 1
                 }, 'playback-not-active')
                .to(ovp_control, 0.3, {
                    autoAlpha : 1
                 }, 'playback-not-active')
                .to($('#animation-config'), 0.3, {
                    x : '0%'
                 }, 'playback-not-active')
                 .to($('#demo-toggler'), 0.3, {
                    rotation : 0,
                    color: '#E0645C',
                    cursor : 'pointer',
                    autoAlpha : 1,
                    left : ((paper.const.cache.getItem('device') || '').match(/mobile/)) ? '86%' : -45
                 }, 'playback-not-active');
             }
            /*------------------------
             * auto-animation playing
             *------------------------*/
              else{
                 tm
                 .to(panel_control.parent(), 0.3, {
                    x: '-100%',
                    autoAlpha: 0
                 }, 'playback-not-active')
                 .staggerTo(panel_control, 0.3, {
                    autoAlpha : 0,
                    marginLeft : 0,
                    ease: Expo.easeOut
                  }, 0.1, 'playback-active')
                 .set(playback_control.children('span'), {
                    display: 'none'
                  })
                 .to(playback_control, 0.3, {
                    rotation : 0,
                    autoAlpha : 0,
                    transformOrigin: 'center center'
                  }, 'playback-active')
                 .to(rtl_control, 0.3, {
                    autoAlpha : 0
                  }, 'playback-active')
                 .to(sf_control, 0.3, {
                    autoAlpha : 0
                  }, 'playback-active')
                 .to(ovp_control, 0.3, {
                    autoAlpha : 0
                  }, 'playback-active')
                 .to($('#animation-config'), 0.5, {
                    x : '100%',
                    ease : Expo.easeOut
                  }, 'playback-active')
                 .to($('#demo-toggler'), 0.5, {
                    rotation : 360,
                    color: '#444',
                    cursor : 'wait',
                    autoAlpha : 0.5,
                    left : ((paper.const.cache.getItem('device') || '').match(/mobile/)) ? '-14%' : -45
                  }, 'playback-active');
              }
          }
     }; // end of mod
    
})(jQuery, window.paper);