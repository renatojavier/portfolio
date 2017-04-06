define([], function(){

    return window.app.studentCreate = {
        o : {}, /*-- o --*/

        initialize : function(){
            this.displayClassName();
            this.__back();
            this.submission.init();
        }, /*-- initialize --*/

        __back : function(){
            $('[data-back-of=student-create]')
            .on('click', function(){
                //app.global.router.init('class-overview');
                requirejs(['js/mod/router'], function(router){
                    router.initialize('class-overview');
                });
            });
        },

        displayClassName : function( name, klass){
            for(var key in localStorage){
                if( key == localStorage['--active-class'] ){
                    klass = localStorage[key];
                    name = (JSON.parse(klass)).meta.name;
                }
            }

            $('[data-dom=class-name]').html( name );
        }, /*-- displayClassName --*/

        submission : {
            init : function(){
                this.event();
            }, /*-- submission.init --*/

            event : function( self ){
                self = this;

                $('[data-create-button=list]')
                .on('click', function( e ){

                    var nfields = $('[data-field]').length
                    ,   fields = 0;

                    $('[data-field]').each(function(){
                        if( $(this).val() !== '' )
                            fields+=1;
                    });

                    if( fields == nfields ){
                        app.studentCreate.submission.cache.init();
                        $(this).off('click');
                    }else{
                        if( $('.notifications').length ) $('.notifications').remove();

                        app.global.f7.o.app.addNotification({
                            message : 'Please fill in all *required fields.'
                        });

                        window.setTimeout(function(){
                            app.global.f7.o.dom('.close-notification').trigger('click');
                        }, 5000);
                    }

                    e.stopImmediatePropagation();
                    e.preventDefault();
                });

                return;
            }, /*-- submission.event --*/

            cache : {
                init : function(){
                    this.dismissWarningNotice();
                    this.setup();
                }, /*-- submission.cache.init --*/

                dismissWarningNotice : function(){
                    app.global.f7.o.app.closeNotification('.notifications');
                }, /*-- submission.cache.dismissWarningNotice --*/

                __student : {
                    index : null,
                    meta : {
                        name : {
                            lastName : null,
                            middleName : null,
                            firstName : null
                        },
                        studentID : null,
                        gender : null
                    }
                }, /*-- submission.cache.__student --*/

                setup : function( klass, self ){
                    self = this;

                    var index = JSON.stringify( Date.now() )
                    ,   firstName = $('[data-field=first-name]').val()
                    ,   middleName = $('[data-field=middle-name]').val()
                    ,   lastName = $('[data-field=last-name]').val()
                    ,   studentID = $('[data-field=student-id]').val()
                    ,   gender = $('[data-field=gender]:checked').val();

                    this.__student.index = index;
                    this.__student.meta.name.firstName = firstName;
                    this.__student.meta.name.middleName = middleName;
                    this.__student.meta.name.lastName = lastName;
                    this.__student.meta.studentID = studentID;
                    this.__student.meta.gender = gender;

                    klass = this.__get();

                    klass.students.push( self.__student );

                    this.__set( klass );

                    app.studentCreate.redirect();

                    return;
                }, /*-- submission.cache.setup --*/

                __get : function( klass ){
                    for(var key in localStorage){
                        if( key == localStorage['--active-class'] ){
                            klass = JSON.parse( localStorage[key] );
                        }
                    }
                    return klass;
                }, /*-- submission.cache.__get --*/

                __set : function( klass ){
                    for(var key in localStorage){
                        if( key == localStorage['--active-class'] ){
                            localStorage[key] = JSON.stringify( klass );
                        }
                    }
                } /*-- submission.cache.__set --*/

            }, /*-- submission.cache --*/

        }, /*-- submission --*/

        redirect : function( page ){
            if( $('[name=keep-list-student]').is(':checked') ){
                page = 'student-create';
            }else{
                page = 'class-overview';
            }

            //app.global.router.init( page );
            requirejs(['js/mod/router'], function(router){
                router.initialize(page);
            });

            return;
        } /*-- redirect --*/

    }; /*-- app.studentCreate --*/

});
