define([], function(){

    return window.app.studentUpdate = {
        o : {
            klass : null
        }, /*-- o --*/

        initialize : function(){
            this.displayClassName();
            this.default.init();
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

        default : {
            init : function(){
                this.assign();
            }, /*-- default.init --*/

            assign : function( klass, student ){
                klass = JSON.parse( localStorage[localStorage['--active-class']] );
                
                for( var s = 0; s < klass.students.length; s+=1 ){
                    if( klass.students[s].index == localStorage['--active-student'] ){
                        student = klass.students[s];
                        console.log( student.meta.name.firstName );

                        //--> student ID
                        $('[data-field=student-id]').val(student.meta.studentID);
                        //--> first name
                        $('[data-field=first-name]').val(student.meta.name.firstName);
                        //--> middle name
                        $('[data-field=middle-name]').val(student.meta.name.middleName);
                        //--> last name
                        $('[data-field=last-name]').val(student.meta.name.lastName);
                        //--> gender
                        $('[data-field=gender][value='+student.meta.gender+']').trigger('click');
                    }
                }

            }, /*-- default.fetch --*/

        }, /*-- default --*/

        submission : {
            init : function(){
                this.event();
            }, /*-- submission.init --*/

            event : function( self ){
                self = this;

                $('[data-update-button=list]')
                .on('click', function( e ){

                    var nfields = $('[data-field]').length - 1
                    ,   fields = 0;

                    $('[data-field]').each(function(){
                        if( $(this).val() !== '' && $(this).data('field') !== 'middle-name' )
                            fields+=1;
                    });

                    if( fields == nfields ){
                        console.log('hey');
                        app.studentUpdate.submission.cache.init();
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

                setup : function( klass, student, self ){
                    self = this;
                    klass = JSON.parse( localStorage[localStorage['--active-class']] );

                    var firstName = $('[data-field=first-name]').val()
                    ,   middleName = $('[data-field=middle-name]').val()
                    ,   lastName = $('[data-field=last-name]').val()
                    ,   studentID = $('[data-field=student-id]').val()
                    ,   gender = $('[data-field=gender]:checked').val();
                
                    for( var s = 0; s < klass.students.length; s+=1 ){
                        if( klass.students[s].index == localStorage['--active-student'] ){
                            student = klass.students[s];

                            student.meta.name.firstName = firstName;
                            student.meta.name.middleName = middleName;
                            student.meta.name.lastName = lastName;
                            student.meta.studentID = studentID;
                            student.meta.gender = gender;
                        }
                    }

                    localStorage[klass.index] = JSON.stringify( klass );

                    app.studentUpdate.redirect();

                    return;
                } /*-- submission.cache.setup --*/

            }, /*-- submission.cache --*/

        }, /*-- submission --*/

        redirect : function( page ){
            requirejs(['js/mod/router'], function(router){
                router.initialize('class-overview');
            });

            return;
        } /*-- redirect --*/

    }; /*-- app.studentCreate --*/

});
