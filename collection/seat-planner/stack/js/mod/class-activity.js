define(['js/lib/moment.min'], function(moment){

    return window.app.classActivity = {
        o : {
            klass : null,
            moment : moment
        }, /*-- o --*/

        initialize : function(){
            this.klass();
            this.__back();
            this.populate.init();
            this.displayClassName();
        }, /*-- initialize --*/

        populate : {
            init : function(){
                this.attendance.interface();
                this.recitation.interface();
            }, /*-- populate.init --*/

            attendance :  {
                interface : function( self, klass, index ){
                    self = this;
                    klass = app.classActivity.o.klass;
                    index = 1;
                    
                    console.log( $.map(klass.attendance, function(n, i) { return i; }).length );

                    if( $.map(klass.attendance, function(n, i) { return i; }).length < 1 ){
                        $('[data-dom=attendance-container]').html('<div data-no-record="notice">No class sessions yet</div>');
                        return;
                    }

                    $('[data-dom=attendance-container]').html(null);

                    for( var key in klass.attendance ){
                        $('[data-dom=attendance-container]')
                        .append(
                            self.dom({
                                index  : index,
                                key    : key,
                                date   : key,
                                schedule : klass.meta.schedule,
                                absent : (klass.attendance[key])
                            })
                        );

                        index += 1;
                    }
                }, /*-- populate.attendance.init --*/

                dom : function( option, dom ){
                    option = option || {
                        index : null,
                        key : null,
                        date : null,
                        schedule : null,
                        absent : []
                    };

                    dom = '<li data-dom="attendance-item">';
                    dom += '    <div class="item-content">';
                    dom += '        <div class="item-media">';
                    dom += '            <div class="chip">';
                    dom += '                <div class="chip-media bg-blue" data-dom="attendance-index">'+option.index+'</div>';
                    dom += '            </div>';
                    dom += '        </div>';
                    dom += '        <div class="item-inner">';
                    dom += '            <div class="item-title-row">';
                    dom += '                <div class="item-title" data-dom="attendance-date">'+app.classActivity.o.moment(parseInt(option.key)).format('MMMM Do YYYY, ddd h:mm:ss a')+'</span></div>';
                    dom += '                <div class="item-after" data-dom="attendance-schedule">'+ option.schedule +'</div>';
                    dom += '            </div>';
                        if( ! option.absent.length ){
                            dom += '            <div class="item-subtitle" data-dom="attendance-no-absent">All present</div>';
                        }
                    dom += '            <div data-dom="absent-container">';
                        if( option.absent.length ){

                            for( var a = 0; a < option.absent.length; a+=1 ){
                                var studentAbsent = option.absent[a];
                                for( var k = 0; k < app.classActivity.o.klass.students.length; k+=1 ){
                                    var studentList = app.classActivity.o.klass.students[k];

                                    if( studentAbsent == studentList['index'] )
                                        dom += '<div class="item-text" data-dom="attendance-absence" data-absent="">'+studentList.meta.name.firstName + ' ' + studentList.meta.name.lastName+'</div>';
                                }
                            }
                        }   

                    dom += '            </div>';
                    dom += '        </div>';
                    dom += '    </div>';
                    dom += '</li>';

                    return dom;
                } /*-- populate.attendance.dom --*/
                
            }, /*-- populate.attendance --*/

            recitation :  {
                interface : function( self, klass, index ){
                    self = this;
                    klass = app.classActivity.o.klass;
                    index = 1;
                    
                    if( $.map(klass.recitation, function(n, i) { return i; }).length < 1 ){
                        $('[data-dom=recitation-container]').html('<div data-no-record="notice">No recitations yet</div>');
                        return;
                    }

                    $('[data-dom=recitation-container]').html(null);

                    for( var key in klass.recitation ){
                        //console.log(klass.recitation[key]);
                        $('[data-dom=recitation-container]')
                        .append(
                            self.dom({
                                index  : index,
                                key    : key,
                                date   : key,
                                schedule : klass.meta.schedule,
                                recite : (klass.recitation[key])
                            })
                        );

                        index += 1;
                    }
                }, /*-- populate.recitation.init --*/

                dom : function( option, dom ){
                    option = option || {
                        index : null,
                        key : null,
                        date : null,
                        schedule : null,
                        recite : []
                    };

                    console.log(option.recite);

                    dom = '<li data-dom="recitation-item">';
                    dom += '    <div class="item-content">';
                    dom += '        <div class="item-media">';
                    dom += '            <div class="chip">';
                    dom += '                <div class="chip-media bg-orange" data-dom="recitation-index">'+option.index+'</div>';
                    dom += '            </div>';
                    dom += '        </div>';
                    dom += '        <div class="item-inner">';
                    dom += '            <div class="item-title-row">';
                    dom += '                <div class="item-title" data-dom="recitation-date">'+app.classActivity.o.moment(parseInt(option.key)).format('MMMM Do YYYY, ddd h:mm:ss a')+'</span></div>';
                    dom += '                <div class="item-after" data-dom="recitation-schedule">'+ option.schedule +'</div>';
                    dom += '            </div>';
                        if( ! option.recite.length ){
                            dom += '            <div class="item-subtitle" data-dom="recitation-no-recite">No recitation</div>';
                        }
                    dom += '            <div data-dom="recite-container">';
                        if( option.recite.length ){

                            for( var a = 0; a < option.recite.length; a+=1 ){
                                var studentRecited = option.recite[a];

                                for( var key in studentRecited ){
                                    console.log(key);

                                    for( var k = 0; k < app.classActivity.o.klass.students.length; k+=1 ){
                                        var studentList = app.classActivity.o.klass.students[k];

                                        if( key === studentList['index'] ){
                                            dom += '<div class="item-text" data-dom="recitation-absence" data-recite="">';
                                            dom += '<span style="color: #444;">'+studentList.meta.name.firstName+' '+studentList.meta.name.lastName+'</span>&emsp;';
                                            dom += '<strong style="color: #09c">'+studentRecited[key]+'</strong>';
                                            dom += '</div>';
                                        }
                                    }
                                }
                            }
                        }   

                    dom += '            </div>';
                    dom += '        </div>';
                    dom += '    </div>';
                    dom += '</li>';

                    return dom;
                } /*-- populate.recitation.dom --*/
                
            } /*-- populate.recitation --*/
        },

        klass : function(){
            this.o.klass = JSON.parse( localStorage[ localStorage['--active-class'] ] );
        },

        __back : function(){
            $('[data-back-of=student-create]')
            .on('click', function(){
                requirejs(['js/mod/router'], function(router){
                    router.initialize('class-overview');
                });
            });
        },

        displayClassName : function( name, klass){
            name = this.o.klass.meta.name;
            $('[data-dom=class-name]').html( name );
        } /*-- displayClassName --*/

    }; /*-- app.classActivity --*/

});


/*-
'MMMM Do YYYY, h:mm:ss a
requirejs(['js/lib/moment'], function( moment ){});
-*/