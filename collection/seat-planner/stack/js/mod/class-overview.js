define([], function(){

    return window.app.classOverview = {
        o : {
            rAF : null,
            klass : null
        }, /*-- o --*/

        initialize : function(){
            localStorage.removeItem('--manual-redirect');
            this.__load.init();
            this.actions.init();
            this.update.init();
        }, /*-- initialize --*/

        actions : {
            init : function(){
                this.simulate();
                this.student.init();
                this.activity();
                this.export();
                this.deleteClass();
                this.__back();
            },

            simulate : function(){
                $('[data-class-action=simulate]').on('click', function(){
                    localStorage['--manual-redirect'] = 'simulation';
                    window.location.reload();
                    
                    //requirejs(['js/mod/router'], function(router){
                    //    router.initialize('simulation', true);
                    //});
                    $(this).off('click');
                    return false;
                });
            },

            deleteClass : function(){
                $('[data-class-action=delete]').on('click', function(){
                    localStorage.removeItem( localStorage['--active-class'] );
                    requirejs(['js/mod/router'], function(router){
                        router.initialize('class-list');
                    });
                    return false;
                });
            },

            activity : function(){
                $('[data-class-action=activity]').on('click', function(){
                    requirejs(['js/mod/router'], function(router){
                        router.initialize('class-activity');
                    });
                    return false;
                });
            },

            export : function(){
                $('[data-class-action=export]').on('click', function(){
                    location.href = 'export.html';
                    return false;
                });
            },

            student : {
                init : function(){
                    this._list();
                },

                _list : function(){
                    $('[data-student-action=enlist]').on('click', function(){
                        requirejs(['js/mod/router'], function(router){
                            router.initialize('student-create');
                        });
                    });
                },

                _update : function(){
                    $('[data-student-action=update]').on('click', function(){
                        localStorage['--active-student'] = $(this).closest('[data-student]').data('student');
                        //return;
                        requirejs(['js/mod/router'], function(router){
                            router.initialize('student-update');
                        });
                    });
                },

                _delete : function( klass, classID, studentID ){
                    classID = localStorage['--active-class'];

                    $('[data-student]').each(function(){

                        $(this).find('[data-student-action=remove]').on('click', function(){
                            studentID = $(this).closest('[data-student]').data('student');

                            for(var key in localStorage){

                                if(  key == classID ){

                                    klass = JSON.parse( localStorage[key] );
                                    for(var s = 0; s < klass.students.length; s+=1 ){

                                        if( studentID == klass.students[s].index ){
                                            console.log( klass.students[s].meta.name.lastName );
                                            klass.students.splice(s, 1);
                                            localStorage[classID] = JSON.stringify( klass );
                                            $('[data-class=student-count]').children('span').html( klass.students.length );
                                            app.classOverview.__load.studentData.init();

                                        } /*-- target student --*/

                                    } /*-- end loop of students --*/
                                }
                            } /*-- end loop class --*/

                            return false;
                        }); /*-- end of click per student --*/

                    }); /*-- per student --*/
                    return;
                }
            },

            __back : function(){
                $('[data-back-of=class-overview]')
                .on('click', function(){
                    requirejs(['js/mod/router'], function(router){
                        router.initialize('class-list', false, function(){
                            localStorage.removeItem( localStorage['--active-student'] );
                        });
                    });
                });
            }
        }, /*-- misc --*/

        __load : {
            init : function(){
                this.klass();
                this.classData();
                this.studentData.init();
            }, /*-- __load.init --*/

            klass : function(){
                for(var key in localStorage){
                    if( key == localStorage['--active-class']){
                        app.classOverview.o.klass = localStorage['--active-class'];
                    }
                }
            }, /*-- __load.klass --*/

            classData : function( klass ){
                klass = JSON.parse( localStorage[app.classOverview.o.klass] );

                $('[data-class=name]').html(klass.meta.name);
                $('[data-class=schedule]').children('span').html(klass.meta.schedule);
                $('[data-class=sorting-type]').children('span').html( klass.meta.sorting.type );
                $('[data-class=student-count]').children('span').html(klass.students.length);

                return;
            }, /*-- __load.classData --*/

            studentData : {
                init : function(){
                    this.preload();
                }, /*-- __load.studentData.init --*/

                preload : function( self ){
                    self = this;

                    ( new TimelineLite({
                        onStart : function(){
                            $('#main-col-student-list').scrollTop(0);
                            TweenLite.set($('[data-dom=student-list-preloader]'), {
                                autoAlpha : 1,
                                onComplete : function(){
                                    app.classOverview.__load.studentData.populate();
                                }
                            });
                        },
                        onComplete : function(){
                            TweenMax.to( $('[data-student]'), 0.3, {
                                autoAlpha : 1,
                                onComplete : function(){
                                    app.classOverview.actions.student._delete();
                                    app.classOverview.actions.student._update();
                                    app.classOverview.update.studentHighlight.init();
                                }
                            });
                        }
                    }) )
                    .to( $('[data-dom=student-list-preloader]'), 0.3, {
                        delay : 0.7,
                        autoAlpha : 0
                    });

                    return;
                },

                populate : function( self, klass ){
                    self = this;
                    $('[data-dom=student-list]').html('');

                    for(var key in localStorage){
                        if(  key == localStorage['--active-class'] ){
                            klass = JSON.parse( localStorage[key] );

                            for(var s = 0; s < klass.students.length; s+=1 ){
                                $('[data-dom=student-list]').append(
                                    self.dom({
                                        index  : klass.students[s].index,
                                        offset : ( s + 1 ),
                                        studentName : klass.students[s].meta.name.firstName + ' ' + klass.students[s].meta.name.middleName + ' ' + klass.students[s].meta.name.lastName
                                    })
                                );
                            }

                        }
                    }

                }, /*-- __load.studentData.populate --*/

                dom : function( o, dom ){
                    o = o || {
                        offset : null,
                        index  : null,
                        studentName : null
                    };

                    dom =  '<li data-student="'+ o.index +'" class="swipeout">';
                    dom += '    <div class="swipeout-content">';
                    dom += '        <div class="item-content">';
                    dom += '            <div class="item-media">';
                    dom += '                <div class="chip">';
                    dom += '                    <div class="chip-media bg-orange">'+ o.offset +'</div>';
                    dom += '                </div>';
                    dom += '            </div>';
                    dom += '            <div class="item-inner">'+ o.studentName +'</div>';
                    dom += '        </div>';
                    dom += '    </div>';

                    dom += '    <div class="swipeout-actions-right">';
                    dom += '        <a data-student-action="update" class="link" href="#">';
                    dom += '            <i class="fa fa-fw fa-pencil"></i>';
                    dom += '        </a>';
                    dom += '        <a data-student-action="remove" class="swipeout-delete link" href="#">';
                    dom += '            <i class="fa fa-fw fa-close"></i>';
                    dom += '        </a>';
                    dom += '    </div>';
                    dom += '</li>';

                    return dom;
                }, /*-- __load.studentData.dom --*/

            } /*-- __load.studentData --*/

        }, /*-- __load --*/

        update : {
            init : function(){
                this.sortingType.init();
            },

            studentHighlight : {
                init : function(){
                    this.updated();
                },

                updated : function(self, student){
                    student = $('[data-student='+localStorage['--active-student']+']');
                    //console.log((student.index()) * 50);

                    (new TimelineMax({
                        onStart : function(){
                            $('#main-col-student-list').scrollTop((student.index()) * 50);
                        }
                    }))
                    .to(student, 0.5, {
                        backgroundColor : 'white',
                        ease : Expo.easeIn
                    }, 'start')
                    .to(student, 0.5, {
                        delay : 5,
                        backgroundColor : 'rgba(0, 0, 0, 0.08)'
                    });
                }
            },

            sortingType : {
                init : function( PICKER, self ){
                    self = this;
                    PICKER = app.global.f7.o.app.picker({
                        input : $('[data-field=update-sorting-type]'),
                        cols : [
                            {
                                textAlign : 'center',
                                values : ['Name', 'Name-Gender', 'Male-Right-Block', 'Female-Right-Block']
                            }
                        ],
                        onClose : function( p ){
                            $('[data-class=sorting-type]').children('span').html( (p.value[0]).toLowerCase() );
                            self.cache( (p.value[0]).toLowerCase() );
                        }
                    });

                    $('[data-update-button=sorting-type]').on('click', function(){
                        PICKER.open();
                        return false;
                    });
                }, /*-- update.sortingType.init --*/

                cache : function( value, self, klass ){
                    klass = JSON.parse( localStorage[app.classOverview.o.klass] );
                    klass.meta.sorting.type = value;

                    localStorage[app.classOverview.o.klass] = JSON.stringify(klass);

                    //TODO: notification
                }

            } /*-- update.sortingType --*/

        } /*-- update --*/

    }; /*-- classOverview --*/

});
