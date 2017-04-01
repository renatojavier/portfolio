var wrap = $('#runtime-animation')
,   panel = $('.panel')
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
        width: 2,
        height: 3
     });
    
    paper.mod.dimension.responsive();
    paper.mod.shortFront.disabled = true;
    
    timeline
    
    .set(wrap, {
        opacity: 0,
        visibility: 'visible',
        rotationX: 50,
        rotationY: 0,
        rotationZ: 0,
        boxShadow: '-5px 8px 20px #777',
        x: -700,
        y: 500
     })
    
    .set('#wp-sub-card', {
        autoAlpha: 1,
        x: 0,
        css: {
            transform: 'rotateX(50deg) rotateY(0deg) rotateZ(-25deg)'
         },
        onCompleteParams: [timeline],
        onComplete: function(tm){
            var z = 0;
            
            $('#wp-sub-card')
            .find('.card')
            .each(function(){
                var self = $(this);
                
                tm.set(self, {
                    x: 0,
                    y: 0,
                    z: z,
                    rotationZ: 0,
                    width : $('#runtime-animation').outerWidth(),
                    height: $('#runtime-animation').outerHeight()
                 });
                
                z+=paper.mod.meta.letterHead_stackGap;
                
             });
         }
     })
    
    .to(wrap, 0.5, {
        delay: 0.2,
        opacity: 1,
        visibility: 'visible',
        x: 0,
        y: 0,
        ease: Expo.easeInOut,
        onStartParams: [timeline],
        onStart: function(tm){
            var x = 0
            ,   y = 0;
            
            $('#wp-sub-card')
            .find('.card')
            .each(function(){
                var self = $(this);
                
                tm.to(self, 0.5, {
                    x: x,
                    y: y,
                    rotationZ: (y/2),
                    onStart: function(){
                        TweenMax.to('#wp-sub-card', 0.3, {
                            x: -1 * (paper.mod.meta.letterHead_cardCount*100)/2
                         });            
                     }
                 }, 'wrap-on+=0.5');
                
                x+=100;
                y+=50;
                
            });
            
         }
     }, 'wrap-on')
    
    .to(wrap, 0.6, {
        delay: 0.8,
        rotationX: 0,
        ease: SlowMo.easeIn
     }, 'project-up')
    
    .to(wrap, 0.6, {
        delay: 0.8,
        rotationY: -180,
        boxShadow: '5px 8px 20px #777',
        ease: SlowMo.easeIn
     }, 'turn-back')
    
    .to(wrap, 0.6, {
        delay: 1.0,
        rotationX: 50,
        rotationY: 0,
        boxShadow: '-5px 8px 20px #777',
        ease: SlowMo.easeIn
     }, 'turn-front-rest')
    
    ; // end of timeline
    
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
                    .to(wrap, 0.3, {
                        rotationX : 0,
                        rotationY : 0,
                        rotationZ : 0,
                        boxShadow: '-5px 8px 20px #777',
                        x: 0,
                        y: 0
                     }, 0);    
                    
                    currentLocation = 'front';
                break;
                    
                case 'back' :
                    timeline
                    .to(wrap, 0.3, {
                        rotationX : 0,
                        rotationY : -180,
                        rotationZ : 0,
                        boxShadow: '5px 8px 20px #777',
                        x: 0,
                        y: 0
                     });    
                    
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
