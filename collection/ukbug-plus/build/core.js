window.hero = window.hero || new Object;

;(function($, timeline, _){
    'use strict';
    
    /*- development purposes -*/
    var log = function(param){
        return console.log(param);
     };
    
    _.globale = {
        activeSite        : 0,
        cache           : localStorage,
        rollerCount     : 5,
        errors          : []
     };
    
    _.app = {
        
        initialize: function(){
            this.featureDetect();
            this.util.init();
            this.timeline.logo();
            
            this.dimension();
            
            this.prompter.init({ mode: 'open' });
         },
        
        util: {
            init: function(){
                this.roller.boot();
             },
            
            siteName: {
                boot: function(){
                    this.appendText();
                    this.letterize();
                    this.animate();
                 },
                
                appendText: function(){
                    $('#active-site-name')
                    .html('')
                    .append( $('.wp-item-icon')
                    .eq(_.globale.activeSite).data('site-name') );
                 },
                
                letterize: function(){
                    $('#active-site-name')
                    .lettering();
                 },
                
                animate: function(){
                    _.app.timeline.siteName();
                 }
             },
            
            roller: {
                boot: function(){
                   this.setIconHeight(); 
                 },
                
                setIconHeight: function(){
                    $('#roller').find('figure')
                    .each(function(i,e){
                        $(this).css({ height: ($('#roller').innerHeight() - 10) });
                     });
                 },
                
                controlState: function(bool){
                    
                    $('.r-controller').each(function(){
                        if(bool)
                            $(this).removeClass('__disabled_control');
                         else
                            $(this).addClass('__disabled_control');
                     });
                    
                 },
                
                toggle: function(){
                    var self = this
                    ,   tunnel = $('#item-tunnel')
                    ,   controller = $('.r-controller')
                    ,   max = $('.wp-item-icon').length
                    ,   round = 1
                    ,   step = 0;
                    
                    controller.each(function(i,e){
                        $(this).on('click', function(x){
                            if(x.originalEvent){
                                
                                switch(i){
                                    case 0: /*- toggle up -*/
                                        if(round > 1){
                                            round-=1;
                                            step+=($('.wp-item-icon').outerHeight());
                                            self.controlState(false);
                                            _.globale.activeSite = (round - 1);
                                            _.app.site.contents.load( 
                                                $('.wp-item-icon').eq(_.globale.activeSite).data('site-id') 
                                            );
                                         }
                                    break;
                                    
                                    case 1: /*- toggle down -*/
                                        if(round < $('.wp-item-icon').length){
                                            round+=1;
                                            step-=($('.wp-item-icon').outerHeight());
                                            self.controlState(false);
                                            _.globale.activeSite = (round - 1);
                                            _.app.site.contents.load( 
                                                $('.wp-item-icon').eq(_.globale.activeSite).data('site-id') 
                                            );
                                         }
                                    break;
                                 }
                                
                                /*- animate toggling -*/
                                TweenMax.to(tunnel, 1.3, { marginTop: step, ease: Elastic.easeOut });
                                /*- event[click]: show active site on ui -*/
                                _.app.util.siteName.boot();
                             }
                            
                            return false;
                         }); /*- eo this click -*/
                     }); /*- eo loop -*/
                 },
             },
            
            products: {
                
                populate: function(ref){
                    var self = this
                    ,   roller = $('#product-roller')
                    ,   prompt = $('#tp-data')
                    ,   obj = {}
                    ,   dom = ''
                    ,   c = 0;
                    
                    
                    //--> create all five slots
                    for(var i=0; i<_.globale.rollerCount; i++){
                        dom+='<div class="casing">';
                        dom+='<div class="reel">';
                        dom+='</div>';
                        dom+='</div>';
                     }

                    roller.html(dom).promise()
                    .done(function(){
                        
                        if(_.app.site.contents.filter(ref)){
                            obj = JSON.parse( ref );
                            TweenMax.set(roller, { opacity: 1});
                            TweenMax.set(prompt.parent(), { autoAlpha: 0});
                            
                            //--> only fill what is/are present from the site
                            for(var key in obj){
                                $('.casing').eq(c)
                                .find('.reel')
                                .html('<a href="'+obj[key]["link"]+'"><div class="segment segment-main"><img class="sg-img" src="dist/img/tmp/vr-icon-bug.png"> <div class="sg-label">'+obj[key]["name"]+'</div></div></a>');
                                c+=1;    
                             }
                            
                            _.app.timeline.productRoll(c);

                         }else{
                             TweenMax.set(prompt.parent(), {
                                 autoAlpha: 1,
                                 onComplete: function(){
                                    TweenMax.set(roller, { oapcity: 0.15});
                                    prompt.html('<i class="fa fa-fw fa-exclamation-circle"></i>&nbsp;No available item or product for this network.');   
                                  }
                             });
                          }
                        
                     });
                 }
             }
         },
        
        site : {
            
            load : function(){
                var self = this;
                
                $.ajax({
                    url: 'http://ukbugplus.co.uk/wp-admin/admin-ajax.php',
                    type: 'post',
                    beforeSend: function(){
                        $('#throbber').html('<i class="fa fa-fw fa-hourglass-start"></i>&nbsp;Loading sites and networks...');
                     },
                    data: {'action' : 'homepage_ajax', 'type' : 'sites'},
                    success: function(response){
                        self.populateRollerItems(JSON.parse(response));
                        //*-- first key onload
                        self.contents.load( 
                            $('.wp-item-icon').eq(0).data('site-id'), 
                            function(){ 
                                // first-run callback
                                _.app.site.ready();
                             }
                         );
                     },
                    error: function(x,y){
                        $('#throbber').html('There was a problem loading the products.');
                     }
                 });
                
             },
            
            populateRollerItems: function(obj){
                var self = this
                ,   tunnel = $('#item-tunnel')
                ,   item_dom = '';
                
                for(var key in obj){
                    if(!(tunnel.children('figure').length)){
                        item_dom+='<figure class="wp-item-icon" data-site-id="'+key+'" data-site-name="'+obj[key]+'">';
                        item_dom+='<span class="item-icon"></span>';
                        item_dom+='</figure>';
                     }else{
                        tunnel.children('figure').remove();
                      }
                 }
                
                tunnel.append(item_dom);
                
                return this;
             },
            
            ready: function(){
                setTimeout(function(){
                    _.app.timeline.throbber(true);
                    /*- event[load]: show active site on ui -*/
                    _.app.util.siteName.boot();
                    /*- load roller toggle function -*/
                    _.app.util.roller.toggle();
                 }, 10);
                
                return this;
             },
            
            contents: {
                
                load: function(id,frcb){
                    var self = this;
                        
                    $.ajax({
                        url: 'http://ukbugplus.co.uk/wp-admin/admin-ajax.php',
                        type: 'post',
                        beforeSend: function(){
                            _.app.timeline.contentPreloader(true);
                         },
                        data: {
                            'action':'homepage_ajax',
                            'type':'cats',
                            'site': id
                         },
                        success: function(response){
                            _.app.util.roller.controlState(true);
                            _.app.timeline.contentPreloader(false);
                            _.app.util.products.populate(response);
                            
                            (typeof frcb === 'function') ? frcb():null;
                         },
                        error(x,y){
                            $('#tp-data').html('We have encountered an error while loading contents. Please try again.');
                         }
                     });
                    
                    return this;
                 },
                
                filter: function(param){
                    
                    if(param.match(/error/) || param == 'null' || param == '0' || param == ''){
                        return false;
                     }else{
                        return true;
                      }
                 }
                
                
             }
         },
        
        timeline: {
            logo: function(){
                var self = this
                ,   timeline = new TimelineMax({
                        onComplete: function(){
                            //--> init throbber ui
                            self.throbber();
                            //--> init products or sites
                            _.app.site.load();
                         }    
                     })
                ,   _svg = $('#embed-logo').contents()
                ,   _svg_paths = _svg.find('path:not(#__path_plus)');
                
                //*--> set dynamic dash arrays and offsets per path
                _svg.find('path').each(function(a,b){
                    var self = $(this)
                    ,   path_length = $(this).get(0).getTotalLength();
                    TweenLite.set(self, {
                        strokeDasharray: path_length,
                        strokeDashoffset: path_length
                     });
                 });
                
                timeline
                //*--> settings that is compliant to its css initial attr's
                
                //--> hide poster image
                .set(_svg.find('#__img-poster'), {
                    autoAlpha: 0
                 })
                .set(_svg_paths, {
                    autoAlpha: 0
                 })
                //--> animation proper
                
                /*--dev-skip-|--dev-skip -*/
                
                //* svg path: write-on
                .to(_svg_paths, 2.0, {
                    autoAlpha: 1,
                    strokeDashoffset: 0
                 }, 'write-lines')
                
                //* shooting horizontal line 
                .to(_svg.find('#__rect-hrt'), 0.9, {
                    attr: {
                        width: 378.04218
                     },
                    ease: Expo.easeInOut
                 },'write-lines-=0.2')
                .to(_svg.find('#__rect-hrt'), 0.4, {
                    attr: {
                        width: 2,
                        x: 378.04218
                     },
                 },'trx-hrt-=1.5')
                
                //* shooting vertical line I
                .to(_svg.find('#__rect-vrt-1'), 0.5, {
                    attr: {
                        height: 60.5886
                     },
                 },'trx-vrt-=1.4')
                .to(_svg.find('#__rect-vrt-1'), 0.5, {
                    attr: {
                        height: 0,
                        y: (60.5886 + 75.572197)
                     },
                 },'trx-vrt-=1.0')
                
                //* shooting vertical line II
                .to(_svg.find('#__rect-hrt'), 0.5, {
                    attr: {
                        x: 378.04218,
                        y: (48.852341 - 26.719858),
                        width: 2,
                        height: 26.719858
                     },
                 },'trx-vrt-=1.1')
                .to(_svg.find('#__rect-hrt'), 0.3, {
                    attr: {
                        height: 0
                     },
                 },'trx-vrt-=0.9')
                
                //* draw `plus` path
                .to(_svg.find('#__path_plus'), 0.7, {
                    autoAlpha: 1,
                    strokeDashoffset: 0
                 }, 'write-plus-path-=0.5')
                 
                 
                 
                //* show poster and at the same time hide paths
                .to(_svg.find('#__img-poster'), 0.5, {
                    autoAlpha: 1
                 }, 'expose-poster')
                .to(_svg.find('path'), 0.5, {
                    autoAlpha: 0
                 }, 'expose-poster')
                ;
             },
            
            productRoll: function(c){
                
                var self = this
                ,   roller = $('#product-roller')
                ,   segment = $('.segment-main')
                ,   p = 0
                ,   r = 10
                ,   i = 0
                ,   timeline = [];
                
                for(i=0; i<c; i++){
                    
                    timeline[i] = new TimelineMax({
                        repeat: r,
                        onComplete: function(){
                            
                            TweenMax.to(segment.eq(p), 0.7, {
                                y:'0%',
                                autoAlpha: 1,
                                ease: Elastic.easeInOut
                             }, 0.2);
                            
                            p+=1;
                         }
                     });
                    
                    timeline[i]
                    .to(segment.eq(i), 0.1, {
                        y: '100%',
                        autoAlpha:1,
                        ease: Linear.easeNone
                     }, 'roll')
                    .set(segment.eq(i), {
                        y: '-100%',
                        autoAlpha: 0
                     }, 'return');
                    
                    r+=5;
                  }
                
             },
            
            contentPreloader: function(vis){
                var timeline = new TimelineMax({repeat:-1, yoyo:true});
                
                if(vis){
                    TweenMax.to('#preloader-prompt', 0.3, {
                        autoAlpha: 1,
                        onComplete: function(){
                            TweenMax.set('.pp-circ', {autoAlpha:0});
                            TweenMax.staggerTo('.pp-circ', 0.2, {
                                autoAlpha: 1,
                                repeat: -1,
                                yoyo: true    
                             }, 0.2);    
                         }
                    });
                    
                    TweenMax.set('#product-roller', { opacity: 0.3});
                    TweenMax.set('#textual-prompt', { autoAlpha: 0});
                 }else{
                    TweenMax.to('#preloader-prompt', 0.3, {
                        autoAlpha: 0
                     });
                  }
             },
            
            throbber: function(complete){
                complete = complete || false;
                
                var self = this
                ,   throbber = $('#throbber')
                ,   initial = {
                        autoAlpha: 1,
                        repeat: -1,
                        yoyo: true
                     }
                ,   param = {
                        autoAlpha: 0,
                        x: '100%',
                        repeat: 0,
                        onStart: function(){
                            TweenLite
                            .to('#wp-logo', 0.3, { x:'0%', left:75 });
                         },
                        onComplete: function(){
                            self.roller();
                         }
                     }
                ,   mod = $.extend({}, initial, ( (complete == true) ? param:{} ));
                
                TweenMax
                .to(throbber, ((complete == true) ? 0.3 : 0.7), mod);
                
             },
            
            roller: function(){
                var timeline = new TimelineMax({})
                ,   roller = $('#roller');
                
                timeline
                .set(roller, {
                    autoAlpha: 0,
                    scale: 0
                 })
                .set($('#r-controller-up'), {
                    top: '20%'
                 })
                .set($('#r-controller-down'), {
                    bottom: '20%'
                 })
                
                .to(roller, 0.8, {
                    autoAlpha: 1,
                    scale: 1,
                    ease: Elastic.easeInOut
                 }, 'bounce-up')
                .to($('#r-controller-up'), 0.8, {
                    top: 0,
                    ease: Elastic.easeInOut
                 }, 'slide-in-controls-=0.5')
                .to($('#r-controller-down'), 0.8, {
                    bottom: -4,
                    ease: Elastic.easeInOut
                 }, 'slide-in-controls-=0.5')
                ;
                
             },
            
            siteName: function(){
                var timeline = new TimelineMax()
                ,   char = $('#active-site-name').find('span');
                
                timeline
                .set(char, {
                    autoAlpha: 0,
                 })
                .staggerTo(char, 0.1, {
                    autoAlpha: 1,
                    ease: Elastic.easeOut
                 }, 0.1, 'letterize');
             }
         },
        
        prompter: {
            arg: {
                mode: 'close',
                note: 'Default text',
             },
            
            init: function(param){
                var self = this
                ,   config = $.extend({}, self.arg, param);
                
                if((config.mode).match(/close/)){
                    this.close();
                 }else{
                    this.open(config);
                  }
             },
            
            open: function(obj){
                _.globale.errors.forEach(function(i,g){
                    alert(i);
                 });
             },
            
            close: function(){
                if((_.globale.errors).length <= 0){
                    console.log('No errors.');
                 }
             }
         },
        
        featureDetect: function(){
            var req = [ 'draganddrop', 'borderimage', 'inlinesvg', 'svg', 'opacity', 'rgba', 'localstorage', 'cssanimations', 'csstransitions', 'fontface', 'csstransforms', 'csstransforms3d', 'audio']
            ,   avb = $('html').attr('class')
            ,   error = 'Browser feature(s) missing:'
            ,   m = 0;
            
            try{
                if(Modernizr){
                    req.forEach(function(e,f){
                        if((avb.split(' ')).indexOf(e) == -1){
                            f+=1;
                            error+='\n'+f+'. '+e;
                            m = f;
                         }
                     });
                    
                    (m > 0) ? _.globale.errors.push(error) : null;
                 }
            }catch(e){
                _.globale.errors.push('Missing plugin: Modernizr');
             }
         },
        
        dimension: function(){
            $(window).on(
                'resize',
            function(){
                var scale = 0
                ,   max = 960;
                if( $(this).outerWidth() <= max ){
                    
                    scale = $(this).outerWidth() / max;
                    TweenMax.set('.deck-center-block', { 
                        //scale: scale,
                        //marginLeft: -1*( ($(this).outerWidth() * 72.5) / 815 )
                    });
                    
                    console.log(-1*(scale*max));
                 }
                
             })
            .trigger('resize');
         },
        
     };
    
    // initialize on window load
    window.addEventListener(
        'load', 
    function() {
        _.app.initialize();
     }, false);
    
})(jQuery, (new TimelineMax), window.hero);
