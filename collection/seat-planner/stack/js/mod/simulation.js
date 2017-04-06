define([], function(){

    return window.app.simulation = {
        o : {
            session : null,
            klass : null,
            sortMode : null,
            sortType : null,
            packery : null,
            __colorize : true,
            autoSave : null
        }, /*-- o --*/

        initialize : function(){
            localStorage['--manual-redirect'] = 'class-overview';

            this.o.session = JSON.stringify( Date.now() );
            this.klass();
            this.displayClassName();
            this.__back();
            this.evaluate.init();
            this.sortType.init();
        }, /*-- initialize --*/

        colorizeBlock : function( self ){
            self = this;

            if( ! this.o.__colorize ) return;

            var min = 0
            ,   max = 0
            ,   block = null
            ,   row = Math.ceil( self.o.klass.students.length / 10 ) * 10;

            for( var d = 0; d < self.o.klass.students.length; d+=1 ){
                
                for( var x = 5; x < row + 1; x += 5 ){
                    max = x;
                    min = (max - 5) + 1; // inclusive

                    if( (d+1) >= min && (d+1) <= max ){
                        block = ( min % 2 == 1 || max % 2 == 1 ) ? 'left' : 'right';
                    }

                    $('[data-dom=tile]').eq(d).attr({
                        'data-block-position' : block
                    });
                }
            }
        }, /*-- colorizeBlock --*/

        tileInteraction : {
            init : function(){
                this.click();
            },

            click : function(){
                $('[data-dom=tile]')
                .on('touchstart', function(){
                    var $this = $(this);
                    TweenLite.to( $this, 0.3, {
                        opacity: 0.4
                    });
                })
                .on('touchend', function(){
                    var $this = $(this);
                    TweenLite.to( $this, 0.3, {
                        opacity: 1.0
                    });
                })
            }
        }, /*-- tileInteraction --*/

        screenMode : {
            PICKER : null,
            firstRun : false,

            init : function(){
                window.app.screenMode = new Object;
                this.__default();
                this.onClick();
            },

            __default : function(){
                if( ! this.firstRun ){
                    requirejs( [ 'js/mod/screen-mode/details' ], function( obj ){
                        obj.initialize();
                    });
                }

                this.firstRun = true;
            },

            onClick : function( self, template ){
                self = this;

                template =  '<div class="toolbar">';
                template +=     '<div class="toolbar-inner">';
                template +=         '<div class="left">';
                template +=             '<label>Screen mode for touch event</label>';
                template +=         '</div>';
                template +=         '<div class="right">';
                template +=             '<a href="#" class="link close-picker"><i class="fa fa-fw fa-2x fa-check"></i></a>';
                template +=         '</div>';
                template +=     '</div>';
                template += '</div> ';

                self.PICKER = app.global.f7.o.app.picker({
                    input : $('[data-toggle-focus="dom"]'),
                    cols : [ { textAlign : 'center', values : [ 'Details', 'Attendance',/*, 'Attendance', 'Rearrange', 'Viewport'*/ ] } ],
                    toolbarTemplate : template,
                    onClose : function( p ){
                        $('[data-active-control=label]').html( p.value[0] );
                        requirejs( [ 'js/mod/screen-mode/'+(p.value[0]).toLowerCase() ], function( obj ){
                            obj.initialize();
                        });
                    }
                });

                $('[data-toggle-focus="trigger"]').on('click', function(){
                    self.PICKER.open();
                    return false;
                });

            }

        }, /*-- screenMode --*/

        fitToViewport : {
            scale : null,

            init : function(){
                this.height();
            },/*-- fitToViewport.init --*/

            height : function( self, genderBlockHeight, tileInner, tileInnerDim ){
                self = this;
                genderBlockHeight = 0;
                tileInner = $('[data-dom=tile-inner]');

                if( $('[data-gender-alias').length )
                    genderBlockHeight = ( $('[data-dom=tile-right-block]').height() > $('[data-dom=tile-left-block]').height() ) ? $('[data-dom=tile-right-block]').height() : $('[data-dom=tile-left-block]').height() ;
                
                tileInnerDim = {
                    width : 0,
                    height : ( $('[data-gender-alias').length ) ? genderBlockHeight : tileInner.height()
                };

                TweenLite.set( '[data-dom=tile-inner]', {
                    height :  (tileInnerDim.height + 5),
                    onComplete : function(){
                        self.scale();
                    }
                });
            }, /*-- fitToViewport.height --*/

            scale : function(self, tileContainer, tileInner, verticalOffset ){
                self = this;

                tileContainer = $('[data-dom=tile-container]');
                tileInner = $('[data-dom=tile-inner]');

                self.scale = tileContainer.height() / tileInner.height();
                verticalOffset = ( tileInner.height() - ( tileInner.height() * self.scale ) ) / 2;

                TweenLite.set( tileInner, {
                    scale : ( tileContainer.height() < tileInner.height() ) ? self.scale : 1,
                    bottom : ( tileContainer.height() < tileInner.height() ) ? -1 * verticalOffset : 0,
                    onComplete : function(){
                        self.touch();
                    }
                });
            },/*-- fitToViewport.scale --*/

            touch : function(){
                new IScroll('[data-dom=tile-container]', {
                    zoom: true,
                    scrollX: true,
                    scrollY: true,
                    mouseWheel: true,
                    wheelAction: 'zoom',
                    click : true
                });
            }/*-- fitToViewport.touch --*/
        }, /*-- fitToViewport --*/

        showClassDetails : {
            addon : null,

            size : function( size ){
                size = klass.students.length;
                $('[data-dom=class-size-data]').html(size);
            }, /*-- showClassDetails.size --*/

            init : function( addon ){
                this.size();
                this.sorting();
                this.addon = addon || null;
                if( typeof this.addon === 'function' ) this.addon();
            }, /*-- showClassDetails.init --*/

            sorting : function(){
                $('[data-dom-disp=sorting-mode]').children('span').html(app.simulation.o.sortMode);
                $('[data-dom-disp=sorting-type]').children('span').html(app.simulation.o.sortType);
            } /*-- showClassDetails.sorting --*/
        }, /*-- showClassDetails --*/

        klass : function(){
            this.o.klass = null;
            for(var key in localStorage){
                if( key == localStorage['--active-class']){
                    this.o.klass = JSON.parse( localStorage[key] );
                }
            }
            return;
        }, /*-- klass --*/

        evaluate : {
            init : function(){
                this.checkMode();
                this.checkType();
            }, /*-- evaluate.init --*/

            checkMode : function(){
                app.simulation.o.sortMode = app.simulation.o.klass.meta.sorting.mode;
            }, /*-- evaluate.checkMode --*/

            checkType : function(){
                app.simulation.o.sortType = app.simulation.o.klass.meta.sorting.type;
            } /*-- evaluate.checkType --*/
        }, /*-- evaluate --*/

        autoSave : function( interval ){
            interval = 1000;

            this.o.autoSave = window.setInterval(function(){
                for(var key in localStorage){
                    if( key == localStorage['--active-class'] ){
                        localStorage[key] = JSON.stringify( app.simulation.o.klass );
                    }
                }
                //console.log('saving...');
            }, interval);

            $('[data-dom=class-name]').on('click', function(){
                window.clearInterval(app.simulation.o.autoSave);
                return false;
            });
        },

        sortMode : {
            set : function( feed ){
                feed = feed || null;

                app.simulation.o.klass['attendance'][app.simulation.o.session] = {};
                app.simulation.o.klass['recitation'][app.simulation.o.session] = [];

                this.automatic.init();
                
                app.simulation.showClassDetails.init( (typeof feed.addon === 'function') ? feed.addon : null );
                
                app.simulation.fitToViewport.init();
                app.simulation.screenMode.init();
                app.simulation.autoSave();
            }, /*-- sortMode.set --*/

            automatic : {
                init : function(){
                    app.simulation.colorizeBlock();
                } /*-- sortMode.automatic.init --*/
            }, /*-- sortMode.automatic --*/

            manual : {
                init : function(){
                    this.DRAGGABILLY.init();
                } /*-- manual.init --*/

            } /*-- sortMode.manual --*/
        }, /*-- sortMode --*/

        sortType : {
            init : function(){
                window.app.sortType = new Object;
                this.evaluate();
            }, /*-- sortType.init --*/

            evaluate : function( sortType ){
                switch ( app.simulation.o.sortType ) {
                    case 'name':
                        sortType = 'sort-by-name'
                    break;

                    case 'name-gender':
                        sortType = 'sort-by-name-gender'
                    break;

                    case 'male-right-block':
                        sortType = 'sort-by-male-right-block'
                    break;

                    case 'female-right-block':
                        sortType = 'sort-by-female-right-block'
                    break;
                }
                //--> call to a file
                requirejs(['js/mod/sort-type/'+sortType], function(obj){
                    obj.initialize();
                });

                return;
            } /*-- sortType.evaluate --*/
        }, /*-- sortType --*/

        displayClassName : function( self ){
            klass = this.o.klass;
            $('[data-dom=class-name]').html( klass.meta.name );
        }, /*-- displayClassName --*/

        __back : function(){
            $('[data-back-of=simulation]')
            .on('click', function(e){

                localStorage['--manual-redirect'] = 'class-overview';
                window.clearInterval( app.simulation.o.autoSave );
                window.location.reload();

                e.stopImmediatePropagation();
                e.preventDefault();
            });
        }

    } /*-- simulation --*/

});
