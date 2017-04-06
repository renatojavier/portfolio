define([], function(){

    return window.app.sortType.sortByFemaleRightBlock = {
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
                    if( app.simulation.o.klass.students.length == ( $('[data-dom=tile-right-block]').find('[data-dom=tile]').length + $('[data-dom=tile-left-block]').find('[data-dom=tile]').length ) ){
                        self.instance();
                        window.cancelAnimationFrame( self.__raf__ );
                    }
                }

                $('[data-dom=class-name]').click(function(){
                    window.cancelAnimationFrame( self.__raf__ );
                });

                iterator();
            }, /*-- PACKERY.ready --*/

            instance : function( self, options ){
                self = this;
                options = {
                    itemSelector: '.grid-item',
                    columnWidth: '.grid-item',
                    isFitWidth: true,
                    containerStyle: null,
                    originTop : false,
                    initLayout : true
                };

                app.simulation.o.packery = {
                    'male-block' : null,
                    'female-block' : null
                };

                app.simulation.o.packery['male-block'] = $('[data-dom=tile-right-block]').packery( options );
                app.simulation.o.packery['female-block'] = $('[data-dom=tile-left-block]').packery( options );

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
                    addon : function(){
                        $('[data-dom-disp=addon-wrapper]').show()
                        $('[data-dom-disp=addon-column]').children('label').eq(0).html('Male');
                        $('[data-dom-disp=addon-column]').children('label').eq(1).html('Female');

                        $('[data-dom-disp=addon-column]').children('span').eq(0).html(app.sortType.sortByFemaleRightBlock.build.gender.male.length);
                        $('[data-dom-disp=addon-column]').children('span').eq(1).html(app.sortType.sortByFemaleRightBlock.build.gender.female.length);
                    }
                };

                app.simulation.o.__colorize = false;
                app.simulation.sortMode.set( param );
            } /*-- PACKERY.complete --*/
        }, /*-- PACKERY --*/

        build : {
            init : function(){
                this.structure();
            }, /*-- build.init --*/

            gender : {
                male : [],
                female : [],
                merged : null
            },

            structure : function( self, klass, tmp, placed ){
                self = this;
                klass = app.simulation.o.klass;
                tmp = [];
                placed = {
                    male : [],
                    female : []
                };

                for( var s = 0; s < klass.students.length; s+=1 ){
                    tmp.push( klass.students[s].meta.name.lastName);
                }

                tmp = tmp.sort();

                for( var d = 0; d < tmp.length; d+=1 ){
                    for( var e = 0; e < klass.students.length; e+=1 ){
                        //if( tmp[d] ==  klass.students[e].meta.name.lastName ){

                        if( tmp[d] ==  klass.students[e].meta.name.lastName && klass.students[e].meta.gender === 'male' && placed.male[d] == undefined ){
                            (self.gender.male).push( klass.students[e] );
                            placed.male.push(e);
                        }
                        if( tmp[d] ==  klass.students[e].meta.name.lastName && klass.students[e].meta.gender === 'female' && placed.female[d] == undefined ){
                            (self.gender.female).push( klass.students[e] );
                            placed.female.push(e);
                        }

                        //}
                    } /*-- end loop unsorted students --*/
                } /*-- end loop sorted students --*/

                $('[data-dom=tile-inner]').html('<div data-dom="tile-left-block" data-gender-alias="female"></div><div data-dom="tile-right-block" data-gender-alias="male"></div>');
                
                for( var g = 0; g < self.gender.male.length; g+=1 ){
                    $('[data-dom=tile-left-block]').append(
                        self.dom({
                            index  : self.gender.male[g].index,
                            lastName : self.gender.male[g].meta.name.lastName,
                            firstName : self.gender.male[g].meta.name.firstName,
                            gender : self.gender.male[g].meta.gender,
                        })
                    );
                }

                for( var h = 0; h < self.gender.female.length; h+=1 ){
                    $('[data-dom=tile-right-block]').append(
                        self.dom({
                            index  : self.gender.female[h].index,
                            lastName : self.gender.female[h].meta.name.lastName,
                            firstName : self.gender.female[h].meta.name.firstName,
                            gender : self.gender.female[h].meta.gender,
                        })
                    );
                } 

            }, /*-- build.structure --*/

            dom : function( o ){
                o = o || {
                    blockPosition : null,
                    index  : null,
                    lastName : null,
                    firstName : null,
                    gender : null
                };

                dom  = '<div id="--tile-'+o.index+'" data-dom="tile" data-tile-mode class="grid-item" data-student-index="'+o.index+'">';
                dom += '    <div data-dom="tile-data">';
                dom += '        <i data-student-selection="multiple" class="fa fa-fw fa-square-o"></i>';
                dom += '        <span data-student-lastname>'+o.lastName+'</span>';
                dom += '        <span data-student-firstname>'+o.firstName+'</span>';
                dom += '        <i class="fa fa-fw fa-'+o.gender+'" data-student-gender></i>';
                dom += '    </div>';
                dom += '</div>';

                return dom;
            } /*-- build.dom --*/
        } /*-- build --*/
        
    }; /*-- app.sortType.sortByName --*/

});
