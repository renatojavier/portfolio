var wrap = $('#runtime-animation')
,   left_panel = $('.panel').eq(0)
,   right_panel = $('.panel').eq(1)
,   tick_panel = $('.panel').eq(2)
,   time = 0.7
,   face_interval = 1.0
,   currentLocation = 'front'
,   initial = {}
,   front = {}
,   inner = {}
,   back = {}
,   outer = {}
,   rest = {};

paper.mod.contentDirection.detach('enabled').attach();
paper.mod.contentDirection.defaultFace = function(){
    var isRTL = (paper.const.cache.getItem('RTL')).match(/true/)
    ,   timeline = new TimelineMax({
        onComplete : function(){
            paper.mod.modal.hide(0.5, function(){
                TweenLite.to(wrap, 0.1, { autoAlpha: 1, zoom : 1 });
                currentLocation = 'front';
             });
         }
     });
    
    paper.mod.modal.show({
        icon : ((!isRTL)?'align-left':'align-right'),
        msg : 'Converting card to <h2>' + ((!isRTL)?'LTR':'RTL') + '</h2>',
        bg : '#36607b'
     });
    
    timeline
    .set(wrap, {
        rotationY: 0,
        x : '0%',
        y : '0%',
        autoAlpha: 0,
        zoom : 0.3
     })
    .set(left_panel, {
        rotationY: (!isRTL) ? 155 : 180
     })
    .set(tick_panel, {
        rotationY: (!isRTL) ? -180 : -155
     });
};

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
    ,   isRTL = (paper.const.cache.getItem('RTL')).match(/true/);

    // invoke again for replay control
    paper.mod.activeFaceControlState(0);
    paper.mod.hideControl();
    
    paper.public.dimension({
        width : 300,
        height: 200
     }, paper.mod.dimension.responsive());
    
    paper.mod.shortFront.disabled = true;

    initial = {
        wrap: {
            autoAlpha: 1,
            rotationX: 0,
            rotationY: 0,
            x : '0%',
            y: '0%'
         },
        left: {
            rotationY: (!isRTL) ? 155 : 180,
         },
        right: {
            z : -2
         },
        tick: {
            rotationY: (!isRTL) ? -180 : -155
         }
     };

    front = {
        wrap : {
            rotationX: 80,
            rotationY: 0,
            y: '-100%',
            ease: Bounce.easeOut
         }
     };

    inner = {
        wrap : {
            delay: face_interval,
            rotationX: 45
         },
        left : {
            delay: face_interval,
            rotationY: 25
         },
        tick : {
            delay: face_interval,
            rotationY: -25
         }
     };

    back = {
        wrap : {
            delay: face_interval,
            rotationY: (!isRTL) ? -155 : 155,
            x: 0
         }, 
        left : {
            delay: face_interval,
            rotationY: (!isRTL) ? 155 : 180
         },
        tick : {
            delay: face_interval,
            rotationY: (!isRTL) ? -180 : -155
         }
     };

    outer = {
        wrap : {
            delay : face_interval,
            rotationY: (!isRTL) ? -180 : 180
        },  
        left : {
            delay : face_interval,
            rotationY : 25
         },
        tick : {
            delay: face_interval,
            rotationY : -25
         }
     };

    rest = {
        wrap : {
            delay: face_interval,
            rotationY: 0,
         },
        left : {
            delay : face_interval,
            rotationY : (!isRTL) ? 155 : 180
         },
        tick : {
            delay : face_interval,
            rotationY : (!isRTL) ? -180 : -155
         }
     };

    timeline
    .set(wrap, initial.wrap)

    .set(left_panel, initial.left)

    .set(right_panel, initial.right)

    .set(tick_panel, initial.tick)
    
    .from(wrap, 1.2, front.wrap , 'front')
    
    .to(wrap, time, inner.wrap, 'inner')

    .to(left_panel, time, inner.left, ((!isRTL)? 'inner' : 'inner+=0.8' ))

    .to(tick_panel, time, inner.tick, ((!isRTL)? 'inner+=0.8' : 'inner' ))
    
    .to(wrap, time, {
        delay: face_interval,
        rotationX: 0
     }, 'inner+=1.0')
    
    .to(tick_panel, time, back.tick, ((!isRTL) ? 'back' : 'back+=0.5'))

    .to(left_panel, time, back.left, ((!isRTL) ? 'back+=0.5' : 'back'))

    .to(wrap, time, back.wrap, 'back+=0.5')
    
    .to(left_panel, time, outer.left, ((!isRTL) ? 'outer' : 'outer+=0.3'))

    .to(tick_panel, time, outer.tick, ((!isRTL) ? 'outer+=0.3' : 'outer'))

    .to(wrap, time, outer.wrap, 'outer+=0.3')
    
    .to(tick_panel, time, rest.tick, ((!isRTL) ? 'rest' : 'rest+=0.3'))

    .to(left_panel, time, rest.left, ((!isRTL) ? 'rest+=0.3' : 'rest'))

    .to(wrap, time, rest.wrap, 'rest+=0.5')
    
     /* */
    ;
    
    return timeline;
};

window.paper.extend.controller = function(face){
    
    $('[data-role="control"]')
    .off('click')
    .each(function(index){

        $(this).on('click', function(){
            
            var timeline = new TimelineMax({})
            ,   isRTL = (paper.const.cache.getItem('RTL')).match(/true/);
            
            paper.mod.activeFaceControlState(index); // button flagship

            switch( $(this).attr('data-animate-to') ){
                case 'front':
                    initial = {
                        wrap: {
                            rotationX: 0,
                            rotationY: 0,
                            x : '0%',
                            y: '0%'
                         },
                        left: {
                            delay: ((currentLocation.match(/outer/)) ? 0.7 : 0),
                            rotationY: (!isRTL) ? 155 : 180,
                         },
                        tick: {
                            delay: ((currentLocation.match(/outer/)) ? 0.7 : 0),
                            rotationY: (!isRTL) ? -180 : -155
                         }
                     };

                    timeline
                    .to(wrap, time, initial.wrap, 'front')
                    .to(tick_panel, time, initial.tick, ((!isRTL) ? 'front' :'front+=0.5'))
                    .to(left_panel, time, initial.left, ((!isRTL) ? 'front+=0.5' :'front'));
                    
                    currentLocation = 'front';
                break;

                case 'inner' :
                    inner = {
                        wrap : {
                            rotationY : 0,
                            x: '0%'
                         },
                        left : {
                            delay : (currentLocation.match(/back/)) ? 0.8 : 0,
                            rotationY: 25
                         },
                        tick : {
                            delay : (currentLocation.match(/back/)) ? 0.8 : 0,
                            rotationY: -25
                         }
                     };
                    
                    timeline
                    .to(wrap, time, inner.wrap, 'inner')
                    .to(left_panel, time, inner.left, ((!isRTL) ? 'inner' : 'inner+=0.8' ))
                    .to(tick_panel, time, inner.tick, ((!isRTL) ? 'inner+=0.8' : 'inner' ));
                    
                    currentLocation = 'inner';
                break;

                case 'back' :
                    back = {
                        wrap : {
                            rotationY: (!isRTL) ? -155 : 155,
                            x: '0%'
                         }, 
                        left : {
                            rotationY: (!isRTL) ? 155 : 180
                         },
                        tick : {
                            rotationY: (!isRTL) ? -180 : -155
                         }
                     };
                    
                    timeline
                    .to(tick_panel, time, back.tick, ((!isRTL) ? 'back' : 'back+=0.5'))
                    .to(left_panel, time, back.left, ((!isRTL) ? 'back+=0.5' : 'back'))
                    .to(wrap, time, back.wrap, ((!currentLocation.match(/front/)) ? 'back+=0.5' : 'back'));
                    
                    currentLocation = 'back';
                break;

                case 'outer' :
                    outer = {
                        wrap : {
                            delay: (currentLocation.match(/front/)) ? 0.8 : 0,
                            rotationY: (!isRTL) ? -180 : 180,
                            x: '0%'
                         },  
                        left : {
                            rotationY : 25
                         },
                        tick : {
                            rotationY : -25
                         }
                     };
                    
                    timeline
                    .to(left_panel, time, outer.left, ((!isRTL) ? 'outer' : 'outer+=0.5'))

                    .to(tick_panel, time, outer.tick, ((!isRTL) ? 'outer+=0.5' : 'outer'))

                    .to(wrap, time, outer.wrap, 'outer+=0.5')
                    
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
