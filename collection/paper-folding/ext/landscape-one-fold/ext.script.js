// horizontal fold
var wrap = $('#runtime-animation')
,   top_panel = $('.panel').eq(0)
,   bottom_panel = $('.panel').eq(1)
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
    ,   rest = {}
    ;
    
    paper.public.dimension({ 
        width : 450,
        height: 600
    });
    
    // invoke again for replay control
    paper.mod.activeFaceControlState(0);
    paper.mod.hideControl();
    paper.mod.dimension.responsive('landscape');
    
    paper.mod.shortFront.disabled = false;
    paper.mod.shortFront.orientation = 'landscape';
    
    /* #timeline-object */
    timeline
    .set(wrap, {
        autoAlpha : 1,
        rotationX : 0,
        rotationY : 0,
        x : '0%',
        y : '-100%'
        
    })
    
    .set(top_panel, {
        rotationX : -75,
        rotationY : 0
    })
    
    .set(bottom_panel, {
        rotationX : 75,
        rotationY: 0
    })
    
    // [front] wrap rtX 80 rtY 20
    .to(wrap, 0.2, {
        autoAlpha : 1,
        ease : Expo.easeOut
    }, 'front')
    
    .to(wrap, 1.2, {
        rotationX : -75,
        y : '-25%',
        ease : Bounce.easeOut 
    }, 'front')
    
    .to(wrap, time, {
        delay : face_interval,
        rotationX : 0,
        y: '0%'
    }, 'inner')
    
    .to(top_panel, time, {
        delay : face_interval,
        rotationX : -25
    }, 'inner')
    
    .to(bottom_panel, time, {
        delay : face_interval,
        rotationX : 25
    }, 'inner')
    
    .to(wrap, time, {
        delay : face_interval,
        rotationX : 75,
        y : '25%'
    }, 'back')
    
    .to(top_panel, time, {
        delay : face_interval,
        rotationX : -75
    }, 'back')
    
    .to(bottom_panel, time, {
        delay : face_interval,
        rotationX : 75
    }, 'back')
    
    .to(wrap, time, {
        delay : face_interval,
        rotationX : 180,
        y : '0%'
    }, 'outer-1')
    
    .to(top_panel, time, {
        delay : face_interval,
        rotationX : -25
    }, 'outer-1')
    
    .to(bottom_panel, time, {
        delay : face_interval,
        rotationX : 25
    }, 'outer-1')
    
    .to(wrap, time, {
        delay : face_interval,
        rotationX : -75,
        y : '-25%'
    }, 'return-front')
    
    .to(top_panel, time, {
        delay : face_interval,
        rotationX : -75
    }, 'return-front')
    
    .to(bottom_panel, time, {
        delay : face_interval,
        rotationX : 75
    }, 'return-front')
    /* */
    ;
    
    return timeline;
};

window.paper.extend.controller = function(face){
    
    $('[data-role="control"]')
    .off('click')
    .each(function(index){
        $(this).on('click', function(){
            ((paper.const.cache.getItem('device')).match(/mobile/)) ? $('#demo-toggler').trigger('click') : null;
            TweenLite.to($('#user-details-runtime'), 0.3, {
                autoAlpha: 0
             });
            
            var timeline = new TimelineMax({}); // create new instance on click
            paper.mod.activeFaceControlState(index); // button flagship
            
            switch( $(this).attr('data-animate-to') ){
                
                case 'front':
                    timeline
                    .to(wrap, time, {
                        rotationX : -75,
                        x : '0%',
                        y : '-25%'
                    }, 0)
                    .to(top_panel, time, {
                        rotationX: -75
                    }, 0)
                    .to(bottom_panel, time, {
                        rotationX: 75
                    }, 0);
                    
                    currentLocation = 'front';
                break;
                    
                case 'inner' :
                    timeline
                    .to(wrap, time, {
                        rotationX : 0,
                        x : '0%',
                        y : '0%'
                    }, 0)
                    .to(top_panel, time, {
                        rotationX: -25
                    }, 0)
                    .to(bottom_panel, time, {
                        rotationX: 25
                    }, 0);
                    
                    currentLocation = 'inner';
                break;
                    
                case 'back' :
                    timeline
                    .to(wrap, time, {
                        rotationX : 75,
                        x : '0%',
                        y : '25%'
                    }, 0)
                    .to(top_panel, time, {
                        rotationX: -75
                    }, 0)
                    .to(bottom_panel, time, {
                        rotationX: 75
                    }, 0);
                    
                    currentLocation = 'back';
                break;
                   
                case 'outer' :
                    timeline
                    .to(wrap, time, {
                        rotationX : 180,
                        x : '0%',
                        y : '0%'
                    }, 0)
                    .to(top_panel, time, {
                        rotationX: -25
                    }, 0)
                    .to(bottom_panel, time, {
                        rotationX: 25
                    }, 0);
                    
                    currentLocation = 'outer';
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




