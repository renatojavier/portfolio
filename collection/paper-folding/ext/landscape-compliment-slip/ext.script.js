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
        width : 3,
        height: 1.8
     });
    
    paper.mod.dimension.responsive();
    paper.mod.shortFront.disabled = true;
    
    (timeline)
    
    .set(wrap, {
        css: {
            transform: 'rotateX(50deg) rotateY(0deg) rotateZ(-25deg)',
            zIndex: 0,
            boxShadow: '5px 8px 20px #777'
         }
     })
    
    .set('#wp-sub-card', {
        autoAlpha: 1,
        x: 0,
        zIndex: 1,
        css: {
            // transform: 'rotateX(50deg) rotateY(0deg) rotateZ(-25deg)'
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
                    rotationX: 0,
                    rotationZ: 0,
                    width : $('#runtime-animation').outerWidth(),
                    height: $('#runtime-animation').outerHeight()
                 });
                
                z+=paper.mod.meta.cmpSlip_stackGap;
                
             });
         }
     })
    
    .staggerFrom('.card', 0.2, {
        x: '-200%',
        z: 500
     }, 0.4, 'ease-in-card')
    
    .to(wrap, 0.5, {
        autoAlpha: 1,
        y: '100%',
        ease: SlowMo.easeInOut,
        onStartParams: [timeline],
        onStart: function(tm){
            var rx = 0
            ,   rz = 0
            ,   y = 0;
            
            $('#wp-sub-card')
            .find('.card')
            .each(function(){
                var self = $(this); 
                
                tm.to(self, 0.5, {
                    y: y,
                    rotationX: rx,
                    rotationZ: rz,
                    ease: SlowMo.easeInOut
                 }, 'pull-out-wrap+=0.2')
                
                y-=20;
                rx+=2;
                rz+=3.5;
            });
         }
     }, 'pull-out-wrap+=0.2')
    
    .to(wrap, 0.3, {
        y: '0%',
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        boxShadow: '5px 8px 20px #777',
        onStart: function(){
            wrap.css('z-index',2);
         }
     }, 'project-front+=0.8')
    
    .to(wrap, 0.7, {
        rotationY: -180,
        boxShadow: '-5px 8px 20px #777',
     }, 'turn-back+=0.8')
    
    .to(wrap, 0.7, {
        css: {
            transform: 'rotateX(50deg) rotateY(0deg) rotateZ(0deg) translateY(-130px)',
            boxShadow: '5px 8px 20px #777',
        }
     }, 'rest-initial+=1.0')
    
    ;// end of timeline
    
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
                        boxShadow: '5px 8px 20px #777',
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
                        boxShadow: '-5px 8px 20px #777',
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
