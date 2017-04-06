define([], function(){

    return window.app.screenMode.attendance = {
        o : {
        	PICKER : null,
            selected : 0,
            queue : []
        }, /*-- o --*/

        initialize : function(){
            this.setTileMode();
            app.simulation.tileInteraction.init();
        	this.selection();
        }, /*-- initialize --*/

        setTileMode : function(){
            $('[data-tile-mode]').each(function(){
                $(this).off('click');
                $(this).attr('data-tile-mode', 'attendance');
                $(this).data({'selected' : false});
                $(this).find('[data-student-selection=multiple]').addClass('fa-square-o').removeClass('fa-check-square-o');
            });
        },

        selection : function( self, studentIndex ){
            self = this;

            $('[data-tile-mode=attendance]')
            .on('click', function(){
                if( $(this).data('selected') ){
                    $(this).find('[data-student-selection=multiple]').addClass('fa-square-o').removeClass('fa-check-square-o');
                    $(this).data({'selected': false});
                    self.o.selected = ( self.o.selected <= 0 ) ? 0 : self.o.selected -= 1 ;
                }else{
                    $(this).find('[data-student-selection=multiple]').addClass('fa-check-square-o').removeClass('fa-square-o');    
                    $(this).data({'selected': true});
                    self.o.selected += 1;
                }

                self.actionButton.interface();
            });
        }, /*-- main --*/

        actionButton : {
            interface : function(self){
                self = app.screenMode.attendance;
                if( self.o.selected > 0 ){
                    TweenLite.to($('[data-sub-attendance]'), 0.3, {
                        autoAlpha : 1,
                        onStart : function(){
                            self.actionButton.submit();
                        }
                    });
                }else{
                    TweenLite.to($('[data-sub-attendance]'), 0.3, {
                        autoAlpha : 0
                    });
                }
            },

            submit : function(){
                $('[data-sub-attendance]').on('click', function(e){
                    
                    $('[data-tile-mode=attendance]').each(function(){
                        if( $(this).data('selected') == true ){
                            $(this).off('click');

                            $(this).find('[data-student-selection=multiple]').remove();

                            $(this).attr({'data-absent' : true});
                            $(this).data({'selected': false});
                            app.screenMode.attendance.o.selected = 0;

                            TweenLite.to($('[data-sub-attendance]'), 0.3, {
                                autoAlpha : 0
                            });

                            app.screenMode.attendance.o.queue.push( JSON.stringify( $(this).data('student-index') ) );
                        }
                    });

                    app.screenMode.attendance.cache.__set();

                    e.stopImmediatePropagation();
                    e.preventDefault();
                });
            }
        },

        cache : {
            __set : function( batch ){
                (app.simulation.o.klass['attendance'][app.simulation.o.session]) = app.screenMode.attendance.o.queue;
                //this.__save();
            },

            __save : function(){
                for(var key in localStorage){
                    if( key == localStorage['--active-class'] ){
                        localStorage[key] = JSON.stringify( app.simulation.o.klass );
                    }
                }
            }
        },

        __reset : function(self){
            self = this;
            $('[data-sub-attendance]').off('click');
            $('[data-tile-mode=attendance]').each(function(){
                //$(this).data('selected', );
            });

            //-->
            TweenLite.to($('[data-sub-attendance]'), 0.1, {
                autoAlpha : 0,
                onStart : function(){
                    self.o.selected = 0;
                }
            });
        },

        __data : {
            init : function( ref ){
                this.getInstance( ref );
            },

            getInstance : function( studentIndex, klass ){
                klass = app.simulation.o.klass;

                console.log(studentIndex);

                for( var a = 0; a < klass.students.length; a+=1 ){
                    if( studentIndex == klass.students[a]['index'] ){
                        $('[data-student-expanded=student-name]').html( '<i class="fa fa-fw fa-user"></i> '+klass.students[a]['meta']['name']['firstName'] +'&nbsp;'+ klass.students[a]['meta']['name']['lastName'] );
                    }
                }

            }
        }

    }; /*-- screenMode.attendance --*/

});
