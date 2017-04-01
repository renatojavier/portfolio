var wrap = $('#runtime-animation')
,   panel = $('.panel')
,   sub_card = $('#wp-sub-card')
,   sub_card_front = sub_card.children('.front-card')
,   sub_card_back= sub_card.children('.back-card')
,   time = 0.7
,   face_interval = 1.0
,   currentLocation = 'front';

// NOTE: RTL disabled
window.paper.mod.contentDirection.detach('disabled');

// Extension for basic landscape animation
window.paper.extend.timeline = function(){
    /*--------------------------*
     | Timeline for autoplay    |
     *--------------------------*/
     var timeline = new TimelineMax({
            onStart : function(){
                paper.mod.playbackState(false);
             },
            onComplete : function(){
                paper.mod.playbackState(true);
             }
         })
    ,   initial = {}
    ,   front = {}
    ,   back = {}
    ,   rest = {};
    
    // invoke again for replay control
    paper.mod.activeFaceControlState(0);
    paper.mod.hideControl();
    paper.mod.hideControl([1,3]);
    paper.public.dimension({
        width : 550,
        height: 320
     });
    paper.mod.dimension.responsive();
    paper.mod.shortFront.disabled = true;
    
    timeline
    /*---------------------------*
     | I. Presets                |
     *---------------------------*/
    //--> A. Card group
    .set('#wp-sub-card', {
        autoAlpha: 0,
        css : {
            transform: 'rotateZ(-60deg) rotateX(45deg) rotateY(50deg)'
         },
        onComplete: function(){
            var z = 0;
            $('#wp-sub-card')
            .find('.card')
            .each(function(){
                var self = $(this);
                TweenMax.set(self, {
                    z: z,
                    width : $('#runtime-animation').outerWidth(),
                    height: $('#runtime-animation').outerHeight()
                });
                z+=paper.mod.meta.stackGap;
             })
         }
     })
    
    //--> B. Runtime card
    .set(wrap, {
        css : {
            transform: 'rotateZ(-60deg) rotateX(45deg) rotateY(50deg) translateZ('+paper.mod.meta.cardCount*paper.mod.meta.stackGap+'px)'
         }
     })
    
    .set(wrap, { 
        autoAlpha: 0,
        boxShadow: '-8px 8px 20px #777'
     })
    
    /*---------------------------*
     | II. Animation proper      |
     *---------------------------*/
    //--> A. Card group
    .to('.card', 0.5, {
        autoAlpha: 1
     }, 'drop-cards')
    
    .staggerFrom('.card', 0.5, {
        z    : 1000,
        ease : Expo.easeOut 
     }, 0.1, 'drop-cards')
    
    .staggerFrom($('.card:even'), 0.5, {
        x: 50
     }, 0.1, 'drop-cards+=1.0')
    
    //--> B. Runtime card
    .to(wrap, 0.3, {
        autoAlpha: 1,
     }, 'drop-runtime')
    
    .from(wrap, 0.3, {
        top: -1000,
        ease: Expo.easeOut
     }, 'drop-runtime')
    
    .to(wrap, 0.85, {
        top: -240
     }, 'face-front+=0.65')
    
    .to(wrap, 0.70, {
        top: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        boxShadow: 'none'
     }, 'face-front+=0.75')
    
    .to(wrap, 0.85, {
        rotationY: 180,
        ease: Expo.easeIn
     }, 'face-back+=0.8')
    
    .to(wrap, 1.0, {
        css : {
            transform: 'rotateZ(-34deg) rotateX(25deg) rotateY(31deg) translateX(150px) translateY(85px)'
         }
     }, 'runtime-final+=1.5')
    
    .to(wrap, 0.2, {
        boxShadow: '-5px 8px 15px #777'
     }, 'runtime-final+=1.7')
    ;
    
    return timeline;
};

window.paper.extend.controller = function(face){
    
    $('[data-role="control"]')
    .off('click')
    .each(function(index){
        $(this).on('click', function(){
            var timeline = new TimelineMax({}); // create new instance on click
            paper.mod.activeFaceControlState(index); // button flagship
            
            switch( $(this).attr('data-animate-to') ){
                case 'front':
                    timeline
                    .set(wrap, {
                        boxShadow: 'none'
                     })
                    .to(wrap, 0.3, {
                        rotationX : 0,
                        rotationY : 0,
                        rotationZ : 0,
                        x: 0,
                        y: 0
                     }, 0)
                    .to(panel, time, {
                        rotationY: 0
                     }, 0);    
                    
                    currentLocation = 'front';
                break;
                    
                case 'back' :
                    timeline
                    .set(wrap, {
                        boxShadow: 'none'
                     })
                    .to(wrap, 0.3, {
                        rotationX : 0,
                        rotationY : 0,
                        rotationZ : 0,
                        x: 0,
                        y: 0
                     })
                    .to(panel, time, {
                        rotationY: -180    
                     }, 0);    
                    
                    currentLocation = 'back';
                break;
                   
            }
            return false;
         });
        
        if(face!==''){
            $('[data-animate-to="'+face+'"]').trigger('click');
         }
     });
};

window.paper.extend.rightPanel = function(){
    var toggler = $('#demo-toggler')
    ,   vsb = true;

    toggler.on('click', function(e){
        if(vsb){
            (new TimelineLite)
            .to($('#animation-config'), 0.5, {
                x : '100%',
                ease : Expo.easeOut
             }, 0)
            .to(toggler, 0.5, {
                rotation : 360,
                color: '#444 !important',
                left : ((paper.const.cache.getItem('device')).match(/mobile/)) ? '-14%' : -45
             }, 0);

            vsb = false;
         }else{
             if(e.originalEvent){
                 (new TimelineLite)
                 .to($('#animation-config'), 0.5, {
                    x : '0%',
                    ease : Expo.easeIn
                  }, 0)
                 .to(toggler, 0.5, {
                    rotation : 0,
                    color: '#E0645C',
                    left : ((paper.const.cache.getItem('device')).match(/mobile/)) ? '86%' : -45
                  }, 0);

                  vsb = true;
              }
          }
     });
};
