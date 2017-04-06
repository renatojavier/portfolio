define([], function(){

    return window.app.classCreate = {
        o : {}, /*-- o --*/

        initialize : function(){
            this.pickerInstance.init();
            this.__back();
            this.submission.init();
        }, /*-- initialize --*/

        __back : function(){
            $('[data-back-of=class-create]')
            .on('click', function(){
                //app.global.router.init('class-overview');
                requirejs(['js/mod/router'], function(router){
                    router.initialize('class-list');
                });
            });
        },

        submission : {
            init : function(){
                this.event();
            }, /*-- submission.init --*/

            event : function( self ){
                self = this;

                $('[data-create-button=save]')
                .on('click', function( e ){

                    var nfields = $('[data-field]').length
                    ,   fields = 0;

                    $('[data-field]').each(function(){
                        if( $(this).val() !== '' )
                            fields+=1;
                    });

                    if( fields == nfields ){
                        console.log('Saved.');
                        app.classCreate.submission.cache.init();
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
                    this.build.setup();
                }, /*-- submission.cache.init --*/

                dismissWarningNotice : function(){
                    app.global.f7.o.app.closeNotification('.notifications');
                }, /*-- submission.cache.dismissWarningNotice --*/

                build : {
                    __class : {
                        index : null,
                        meta : {
                            name : null,
                            schedule : null,
                            sorting : {
                                mode : null,
                                type : null
                            }
                        },
                        attendance : {},
                        recitation : {},
                        students : []
                    }, /*-- submission.cache.build.__class --*/

                    setup : function( self  ){
                        self = this;

                        var key = app.classCreate.submission.cache.tokenize()
                        ,   cName = $('[data-field=name]').val()
                        ,   cSchedule = $('[data-field=schedule]').val()
                        ,   cSortingMode = $('[data-field=sorting-mode]').val()
                        ,   cSortingType = $('[data-field=sorting-type]').val();

                        this.__class.index = key;
                        this.__class.meta.name = cName;
                        this.__class.meta.schedule = cSchedule;
                        this.__class.meta.sorting.mode = 'automatic'; //cSortingMode.toLowerCase();
                        this.__class.meta.sorting.type = cSortingType.toLowerCase();

                        window.localStorage[key] = JSON.stringify( self.__class );

                        app.classCreate.redirect( key );

                        return;
                    }, /*-- submission.cache.build.setup --*/

                    checkDuplicate : {
                        klass : function(){},
                        name : function(){}
                    } /*-- submission.cache.build.checkDuplicate --*/

                }, /*-- submission.cache.build --*/

                tokenize : function(token){
                    token = ('now' in window.Date ) ? Date.now() : ( new Date ).getTime();
                    return '--class-'+token;
                } /*-- submission.cache.tokenize --*/

            } /*-- submission.cache --*/

        }, /*-- submission --*/

        redirect : function( key, page ){

            if( $('[name=proceed-list-student]').is(':checked') ){
                window.localStorage['--active-class'] = key;
                page = 'student-create';
            }else{
                page = 'class-list';
            }

            //app.global.router.init( page );
            requirejs(['js/mod/router'], function(router){
                router.initialize(page);
            });

            return;
        }, /*-- redirect --*/

        pickerInstance : {
            o : {},

            init : function(){
                this.set();
            },

            set : function(){

                this.o['sorting-mode'] = app.global.f7.o.app.picker({
                    input : $('[data-field=sorting-mode]'),
                    cols : [ { textAlign : 'center', values : ['Automatic', 'Manual'] } ]
                });

                this.o['sorting-type'] = app.global.f7.o.app.picker({
                    input : $('[data-field=sorting-type]'),
                    cols : [
                        {
                            textAlign : 'center',
                            values : ['Name', 'Name-Gender', 'Male-Right-Block', 'Female-Right-Block']
                        }
                        /*-- { textAlign : 'right', values : ['Ascending', 'Descending'] } --*/
                    ]
                });

            }
        }, /*-- pickerInstance --*/


    };

});
