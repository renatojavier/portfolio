define([], function(){

    return window.app.classImport = {
        initialize : function(){
            this.__back();
            this.selection.init();
            this.state.disabled();
            this.displayFileResult('', false);
        }, /*-- initialize --*/

        selection : {

            init : function( self ){
                self = this;
                document.getElementById('fileinput').addEventListener('change', self.read , false);
            }, /*-- selection.init --*/

            read : function( event ){
                var self = this
                ,   file = null
                ,   reader = null;

                file = event.target.files[0]; 

                if( file ){
                    reader = new FileReader();
                    reader.onload = function(e){ 
                        app.classImport.cache( file, e.target.result );
                    };
                    reader.readAsText( file );
                }else{ 
                    app.classImport.state.disabled('Class import failed. File not loaded.');
                }
            } /*-- selection.read --*/

        }, /*-- selection --*/

        state : {
            NOTIFICATION : null,
            button : $('[data-create-button=import]'),
            buttonOverlay : $('[data-button-overlay=preloader]'),

            enabled : function( self ){
                self = this;

                TweenLite.to( self.buttonOverlay, 1.2, {
                    x : '100%',
                    onComplete : function(){
                        TweenLite.set( self.button, {
                            userSelect : 'initial',
                            pointerEvents : 'auto'
                        });
                    }
                });
            }, 

            disabled : function( message, self ){
                self = this;

                if( typeof message !== 'undefined' ) self.notification( message );

                TweenLite.to( self.buttonOverlay, 1.0, {
                    x : '0%',
                    ease : Expo.easeInOut,
                    onComplete : function(){
                        TweenLite.set( self.button, {
                            userSelect : 'none',
                            pointerEvents : 'none'
                        });
                    }
                });
            },

            notification : function( message, option ){
                option = option || {
                    timeout : 3000,
                    autoDismiss : true
                };

                $('.notifications').remove();
                this.NOTIFICATION = app.global.f7.o.app.addNotification({
                    message : message,
                    button : { text: '<i class="fa fa-fw fa-times"></i>', color : 'white' }
                });

                if(!option.autoDismiss) return;

                window.setTimeout(function(){
                    app.global.f7.o.dom('.close-notification').trigger('click');
                }, option.timeout );
            }

        }, /*-- state --*/

        cache : function( file, contents, classID ){
            var status = false;

            $('[data-create-button=import]').off('click');

            if( (file.name).substr(-4, 4) === '.apr' ){
                if( ! contents.match(/^\{\"index\"\:\"\-\-class-\d+\"/g) ){
                    status = false;
                    app.classImport.state.disabled('Class import failed. File content corrupted.');
                }else{
                    status = true;
                    app.classImport.state.enabled();

                    contents.replace(/--class-\d+/g, function( match ){
                        classID =  match;
                    });

                    for( var key in localStorage ){
                        if( localStorage.key( key ) == classID ){
                            app.classImport.state.notification('Duplicate class index. Overwriting might occur.', {
                                autoDismiss : false
                            });
                        }else{
                            $('.notifications').remove();
                        }
                    }

                    $('[data-create-button=import]').on('click', function(){
                        localStorage[ classID ] = contents;
                        localStorage['--active-class'] = localStorage.key( classID );

                        requirejs(['js/mod/router'], function(router){
                            router.initialize('class-overview');
                        });

                        $(this).off('click');
                        return false;
                    });
                }

            }else{
                status = false;
                app.classImport.state.disabled('Class import failed. File not supported.');
            }

            this.displayFileResult( file.name, status );

        }, /*-- cache --*/

        displayFileResult : function( filename, status ){
            var statusDOM = '';

            if( status ){
                statusDOM = 'Queued';
                $('[data-dom=queue-label-filename]').html( filename );
            }else{
                statusDOM = 'No file chosen.';
                $('[data-dom=queue-label-filename]').html('Tap <i class="fa fa-fw fa-download"></i>');
            }   

            $('[data-dom=queue-label-status]').html( statusDOM );
            
        }, /*-- displayFileResult --*/

        __back : function(){
            $('[data-back-of=class-import]')
            .on('click', function(){
                requirejs(['js/mod/router'], function(router){
                    router.initialize('class-list');
                });
            });
        }

    }; /*-- app.classImport --*/

});