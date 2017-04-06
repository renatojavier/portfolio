define([], function(){

    return window.app.sortType.sortByName = {
        o : {

        }, /*-- o --*/

        initialize : function(){
            this.build.init();
            this.PACKERY.init();
        }, /*-- initialize --*/

        PACKERY : {
            __raf__ : null,

            init : function(){
                this.ready();
            }, /*-- PACKERY.init --*/

            ready : function( self ){
                self = this;

                function iterator(){
                    self.__raf__ = window.requestAnimationFrame( iterator );
                    if( app.simulation.o.klass.students.length == $('[data-dom=tile-inner]').children('[data-dom=tile]').length ){
                        self.instance();
                        window.cancelAnimationFrame( self.__raf__ );
                    }
                }

                $('[data-dom=class-name]').click(function(){
                    window.cancelAnimationFrame( self.__raf__ );
                });

                iterator();
            }, /*-- PACKERY.ready --*/

            instance : function( self ){
                self = this;

                app.simulation.o.packery = $('.grid').packery({
                    itemSelector: '.grid-item',
                    columnWidth: '.grid-item',
                    isFitWidth: true,
                    containerStyle: null,
                    originTop : false,
                    initLayout : true
                });

                TweenMax.to($('[data-dom=tile-inner]'), 0.3, {
                    delay : 0.3,
                    autoAlpha : 1,
                    onComplete : function(){
                        self.complete();
                    }
                });
            }, /*-- PACKERY.instance --*/

            complete : function( param ){
                param = {
                    addon : null
                };
                app.simulation.sortMode.set( param );
            } /*-- PACKERY.complete --*/
        }, /*-- PACKERY --*/

        build : {
            init : function(){
                this.structure();
            }, /*-- build.init --*/

            structure : function( self, klass, tmp, placed ){
                self = this;
                klass = app.simulation.o.klass;
                tmp = [];
                placed = [];

                for( var s = 0; s < klass.students.length; s+=1 ){
                    tmp.push( klass.students[s].meta.name.lastName);
                }

                tmp = tmp.sort();

                $('[data-dom=tile-inner]').html('');

                for( var d = 0; d < tmp.length; d+=1 ){
                    for( var e = 0; e < klass.students.length; e+=1 ){

                        if( tmp[d] ==  klass.students[e].meta.name.lastName && placed[d] == undefined ){
                            $('[data-dom=tile-inner]').append(
                                self.dom({
                                    blockPosition : '',
                                    index  : klass.students[e].index,
                                    offset : ( d + 1 ),
                                    lastName : klass.students[e].meta.name.lastName,
                                    firstName : klass.students[e].meta.name.firstName
                                })
                            );

                            placed.push(e);
                        } /*-- this student --*/

                    } /*-- end loop unsorted students --*/
                } /*-- end loop sorted students --*/

            }, /*-- build.structure --*/

            dom : function( o ){
                o = o || {
                    blockPosition : null,
                    index  : null,
                    offset : null,
                    lastName : null,
                    firstName : null
                };

                dom  = '<div id="--tile-'+o.index+'" data-dom="tile" data-tile-mode class="grid-item" data-student-index="'+o.index+'" data-block-position="'+o.blockPosition+'">';
                dom += '    <div data-dom="tile-data">';
                dom += '        <i data-student-selection="multiple" class="fa fa-fw fa-square-o"></i>';
                dom += '        <span data-student-offset>'+o.offset+'</span>';
                dom += '        <span data-student-lastname>'+o.lastName+'</span>';
                dom += '        <span data-student-firstname>'+o.firstName+'</span>';
                dom += '    </div>';
                dom += '</div>';

                return dom;
            } /*-- build.dom --*/
        } /*-- build --*/

    }; /*-- app.sortType.sortByName --*/

});
