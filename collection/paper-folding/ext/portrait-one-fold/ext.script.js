var wrap = $('#runtime-animation')
,   left_panel = $('.panel').eq(0)
,   right_panel = $('.panel').eq(1)
,   time = 0.7
,   face_interval = 1.0
,   currentLocation = 'front';

window.paper.mod.contentDirection.detach('enabled').attach();
window.paper.mod.contentDirection.defaultFace = function(){
    
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
        rotationY : (paper.const.cache.getItem('RTL') === 'false') ? 75 : -75,
        x : (paper.const.cache.getItem('RTL') === 'false') ? '-25%' : '25%',
        autoAlpha: 0,
        zoom : 0.3
     })
    .set(left_panel, {
        rotationY : 75
     })
    .set(right_panel, {
        rotationY : -75
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
    ,   initial = {}
    ,   front = {}
    ,   back = {}
    ,   rest = {};
    
    // invoke again for replay control
    paper.mod.activeFaceControlState(0);
    paper.mod.hideControl();
    
    paper.public.dimension({
        width : 300,
        height: 200
     }, paper.mod.dimension.responsive());
    
    paper.mod.shortFront.orientation = 'portrait';
    paper.public.shortFront({ cut: 100 });
    
    if(paper.const.cache.getItem('RTL') === 'false' || paper.const.cache.getItem('RTL') === null){ // RTL inactive
        initial = {
            wrap : {
                autoAlpha: 1,
                rotationX : 0,
                rotationY : '75deg',
                x : '-25%'
             },
            left : {
                rotationX : 0,
                rotationY : '75deg'
             },
            right : {
                rotationX : 0,
                rotationY : '-75deg'
             }
         };

        front = {
            wrap : {
                rotationX : '80deg',
                rotationY : '20deg',
                ease : Bounce.easeOut
             }
         };

        back = {
            wrap : {
                delay : face_interval,
                rotationY : '-75deg',
                x : '25%'
             }, 
            left : {
                delay : face_interval,
                rotationY : '75deg'
             },
            right : {
                delay : face_interval,
                rotationY : '-75deg'
             }
         };

        rest = {
            wrap : {
                delay : face_interval,
                rotationX : '0deg',
                rotationY : '75deg',
                x : '-25%'
             },
            left : {
                delay : face_interval,
                rotationY : '75deg'
             },
            right : {
                delay : face_interval,
                rotationY : '-75deg'
             }
         };
    }else{ // RTL active
        initial = {
            wrap : {
                autoAlpha: 1,
                rotationX : 0,
                rotationY : '-75deg',
                x : '25%'
             },
            left : {
                rotationX : 0,
                rotationY : '75deg'
             },
            right : {
                rotationX : 0,
                rotationY : '-75deg'
             }
         };

        front = {
            wrap : {
                rotationX : '80deg',
                rotationY : '-20deg',
                ease : Bounce.easeOut
             }
         };

        back = {
            wrap : {
                delay : face_interval,
                rotationY : '75deg',
                x : '-25%'
             }, 
            left : {
                delay : face_interval,
                rotationY : '75deg'
             },
            right : {
                delay : face_interval,
                rotationY : '-75deg'
             }
         };

        rest = {
            wrap : {
                delay : face_interval,
                rotationX : '0deg',
                rotationY : '-75deg',
                x : '25%'
             },
            left : {
                delay : face_interval,
                rotationY : '75deg'
             },
            right : {
                delay : face_interval,
                rotationY : '-75deg'
             }
         };
     }
    
    timeline
    .set(wrap, initial.wrap)
    
    .set(left_panel, initial.left)
    
    .set(right_panel, initial.right)
    
    .from(wrap, 1.2, front.wrap , 'front')
    /*
    .to(wrap, time, {
        delay : face_interval,
        rotationY : '0deg',
        x: '0%'
    }, 'inner')
    
    .to(left_panel, time, {
        delay : face_interval,
        rotationY : '25deg'
    }, 'inner')
    
    .to(right_panel, time, {
        delay : face_interval,
        rotationY : '-25deg'
    }, 'inner')
    
    .to(wrap, time, back.wrap, 'back')
    
    .to(left_panel, time, back.left, 'back')
    
    .to(right_panel, time, back.right, 'back')
    
    .to(wrap, time, {
        delay : face_interval,
        rotationX : '0deg',
        rotationY : '-180deg',
        x : '0%'
    }, 'outer-1')
    
    .to(left_panel, time, {
        delay : face_interval,
        rotationY : '25deg'
    }, 'outer-1')
    
    .to(right_panel, time, {
        delay : face_interval,
        rotationY : '-25deg'
    }, 'outer-1')
    
    .to(wrap, time, rest.wrap, 'return-front')
    
    .to(left_panel, time, rest.left, 'return-front')
    
    .to(right_panel, time, rest.right, 'return-front')
     */
    .to(wrap, 0.3, {
        x: '-25%'
     });
    
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
                    if(paper.const.cache.RTL === 'false'){
                        timeline.to(left_panel, time, {
                            rotationY : '75deg'
                         }, 0)
                        .to(right_panel, time, {
                            rotationY : '-75deg'
                         }, 0)
                        .to(wrap, time, {
                            rotationY : '75deg',
                            x : '-25%'
                         }, 0);    
                     }else{
                         timeline.to(wrap, time, {
                                rotationY : '-75deg',
                                x : '25%'
                            }, 0)
                            .to(left_panel, time, {
                                rotationY : '75deg'
                            }, 0)
                            .to(right_panel, time, {
                                rotationY : '-75deg'
                            }, 0);
                      }
                    
                    currentLocation = 'front';
                break;
                    
                case 'inner' :
                    timeline.to(wrap, time, {
                            rotationY : '0deg',
                            x : '0%'
                        }, 0)
                        .to(left_panel, time, {
                            rotationY : '25deg'
                        }, 0)
                        .to(right_panel, time, {
                            rotationY : '-25deg'
                        }, 0);
                    
                    currentLocation = 'inner';
                break;
                    
                case 'back' :
                    
                    if(paper.const.cache.RTL === 'true'){
                        timeline.to(left_panel, time, {
                            rotationY : '75deg'
                         }, 0)
                        .to(right_panel, time, {
                            rotationY : '-75deg'
                         }, 0)
                        .to(wrap, time, {
                            rotationY : '75deg',
                            x : '-25%'
                         }, 0);    
                     }else{
                         timeline.to(wrap, time, {
                                rotationY : '-75deg',
                                x : '25%'
                            }, 0)
                            .to(left_panel, time, {
                                rotationY : '75deg'
                            }, 0)
                            .to(right_panel, time, {
                                rotationY : '-75deg'
                            }, 0);
                      }
                    
                    currentLocation = 'back';
                break;
                   
                case 'outer' :
                    
                    timeline.to(wrap, time, {
                            rotationY : '-180deg',
                            x : '0%'
                        }, 0)
                        .to(left_panel, time, {
                            rotationY : '25deg'
                        }, 0)
                        .to(right_panel, time, {
                            rotationY : '-25deg'
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



