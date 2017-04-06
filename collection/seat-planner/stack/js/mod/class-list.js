define([], function(){

    return window.app.classList = {
        o : {
            rAF : null
        }, /*-- o --*/

        initialize : function(){
            this.clearFlags();
            this.showUtils.init();
            this.operation.init();
            this.search.init();
        }, /*-- initialize --*/

        clearFlags : function(){
            //localStorage.removeItem('--active-class');
            //localStorage.removeItem('--active-student');
            localStorage.removeItem('--manual-redirect');
        },

        temp : function(){
            if( localStorage['--temp-db-init'] === 'false' || localStorage['--temp-db-init'] == null ){
                if( localStorage['--class-1459289730499'] == null )
                    localStorage['--class-1459289730499'] = '{"index":"--class-1459289730499","recitation":{},"attendance":{},"meta":{"name":"My Class 1","schedule":"MWF 8am to 9am","sorting":{"mode":"automatic","type":"name"}},"students":[{"index":"1459289759848","absences":[],"recitations":[],"meta":{"name":{"lastName":"Javier","middleName":"Crd","firstName":"Reo"},"studentID":"10LN1534","gender":"male"}},{"index":"1459289781190","absences":[],"recitations":[],"meta":{"name":{"lastName":"Sommer","middleName":"Soth","firstName":"Ruth"},"studentID":"11LN1567","gender":"female"}},{"index":"1459289799909","absences":[],"recitations":[],"meta":{"name":{"lastName":"Sanders","middleName":"Korg","firstName":"Chelle"},"studentID":"17LN1890","gender":"female"}},{"index":"1459290001975","absences":[],"recitations":[],"meta":{"name":{"lastName":"Doe","middleName":"Donut","firstName":"John"},"studentID":"10lN90890","gender":"male"}},{"index":"1459290036590","absences":[],"recitations":[],"meta":{"name":{"lastName":"Nald","middleName":"Doe","firstName":"Mac"},"studentID":"18LN789","gender":"male"}},{"index":"1459290058412","absences":[],"recitations":[],"meta":{"name":{"lastName":"Skin","middleName":"Still","firstName":"Rumple"},"studentID":"18393746d","gender":"male"}},{"index":"1459290096574","absences":[],"recitations":[],"meta":{"name":{"lastName":"Roose","middleName":"Enact","firstName":"Theodore"},"studentID":"789ddK9","gender":"male"}},{"index":"1459290133878","absences":[],"recitations":[],"meta":{"name":{"lastName":"Hazzir","middleName":"Azzaz","firstName":"Aalam"},"studentID":"6578GHaz","gender":"male"}},{"index":"1459290431271","absences":[],"recitations":[],"meta":{"name":{"lastName":"Libertad","middleName":"Kurd","firstName":"Santiago"},"studentID":"Hw7800","gender":"male"}},{"index":"1459290449014","absences":[],"recitations":[],"meta":{"name":{"lastName":"Steward","middleName":"Sick","firstName":"Rod"},"studentID":"755847r","gender":"male"}},{"index":"1459290644940","absences":[],"recitations":[],"meta":{"name":{"lastName":"Tracker","middleName":"Reigh","firstName":"Sabina"},"studentID":"888909R","gender":"female"}},{"index":"1459290662327","absences":[],"recitations":[],"meta":{"name":{"lastName":"Stalk","middleName":"Bean","firstName":"Jack"},"studentID":"87890h7","gender":"male"}},{"index":"1459290691414","absences":[],"recitations":[],"meta":{"name":{"lastName":"Time","middleName":"Ovg","firstName":"Nick"},"studentID":"89665tY","gender":"male"}},{"index":"1459290746655","absences":[],"recitations":[],"meta":{"name":{"lastName":"YoPoop","middleName":"Case","firstName":"Justin"},"studentID":"19887dh","gender":"male"}},{"index":"1459290793974","absences":[],"recitations":[],"meta":{"name":{"lastName":"Gorgo","middleName":"Apee","firstName":"Crypto"},"studentID":"9908gYR2","gender":"male"}},{"index":"1459290827511","absences":[],"recitations":[],"meta":{"name":{"lastName":"Istanbul","middleName":"Frankfurt","firstName":"Athene"},"studentID":"diufiui8984","gender":"female"}},{"index":"1459290868501","absences":[],"recitations":[],"meta":{"name":{"lastName":"Great","middleName":"Rover","firstName":"Eric"},"studentID":"9087654Tr","gender":"male"}},{"index":"1459290893086","absences":[],"recitations":[],"meta":{"name":{"lastName":"Let","middleName":"Banjo","firstName":"Barney"},"studentID":"90766tu","gender":"male"}},{"index":"1459290921141","absences":[],"recitations":[],"meta":{"name":{"lastName":"Machegne","middleName":"Copier","firstName":"Franco"},"studentID":"8990916tY","gender":"male"}},{"index":"1459290961014","absences":[],"recitations":[],"meta":{"name":{"lastName":"Motore","middleName":"Kee","firstName":"Suzu"},"studentID":"kopo752","gender":"male"}},{"index":"1459291013038","absences":[],"recitations":[],"meta":{"name":{"lastName":"S","middleName":"Booted","firstName":"Dexter"},"studentID":"909876gUo","gender":"male"}},{"index":"1459291049878","absences":[],"recitations":[],"meta":{"name":{"lastName":"Sanches","middleName":"Obama","firstName":"Peru"},"studentID":"90peirur5","gender":"male"}},{"index":"1459291085372","absences":[],"recitations":[],"meta":{"name":{"lastName":"Green","middleName":"Joseph","firstName":"Saint"},"studentID":"uuioe895R","gender":"male"}},{"index":"1459291121323","absences":[],"recitations":[],"meta":{"name":{"lastName":"Shitzou","middleName":"Bull","firstName":"Dirty"},"studentID":"uyuhhss80","gender":"female"}},{"index":"1459291140445","absences":[],"recitations":[],"meta":{"name":{"lastName":"Runner","middleName":"Grunt","firstName":"Keiv"},"studentID":"67989gY","gender":"male"}},{"index":"1459291165957","absences":[],"recitations":[],"meta":{"name":{"lastName":"Jasmine","middleName":"Murphy","firstName":"Alex"},"studentID":"9898dg9","gender":"female"}},{"index":"1459291214204","absences":[],"recitations":[],"meta":{"name":{"lastName":"Etrershka","middleName":"Danzou","firstName":"Olga"},"studentID":"90tryrurh","gender":"female"}},{"index":"1459291241332","absences":[],"recitations":[],"meta":{"name":{"lastName":"Jeffersonn","middleName":"Aladeen","firstName":"Rachelle"},"studentID":"909sd7dg","gender":"female"}},{"index":"1459291281525","absences":[],"recitations":[],"meta":{"name":{"lastName":"Job","middleName":"No","firstName":"Steve"},"studentID":"9we7eehd","gender":"male"}},{"index":"1459291314086","absences":[],"recitations":[],"meta":{"name":{"lastName":"Legorphic","middleName":"Scream","firstName":"Harem"},"studentID":"shdgd778g","gender":"male"}}]}';

                if( localStorage['--class-1460081498960'] == null )
                    localStorage['--class-1460081498960'] = '{"index":"--class-1460081498960","recitation":{},"attendance":{},"meta":{"name":"Alternate Gender Class","schedule":"MWF 8am to 9am","sorting":{"mode":"automatic","type":"name-gender"}},"students":[{"index":"1459289759848","absences":[],"recitations":[],"meta":{"name":{"lastName":"Javier","middleName":"Crd","firstName":"Reo"},"studentID":"10LN1534","gender":"male"}},{"index":"1459289781190","absences":[],"recitations":[],"meta":{"name":{"lastName":"Sommer","middleName":"Soth","firstName":"Ruth"},"studentID":"11LN1567","gender":"female"}},{"index":"1459289799909","absences":[],"recitations":[],"meta":{"name":{"lastName":"Sanders","middleName":"Korg","firstName":"Chelle"},"studentID":"17LN1890","gender":"female"}},{"index":"1459290001975","absences":[],"recitations":[],"meta":{"name":{"lastName":"Doe","middleName":"Donut","firstName":"John"},"studentID":"10lN90890","gender":"male"}},{"index":"1459290036590","absences":[],"recitations":[],"meta":{"name":{"lastName":"Nald","middleName":"Doe","firstName":"Mac"},"studentID":"18LN789","gender":"male"}},{"index":"1459290058412","absences":[],"recitations":[],"meta":{"name":{"lastName":"Skin","middleName":"Still","firstName":"Rumple"},"studentID":"18393746d","gender":"male"}},{"index":"1459290096574","absences":[],"recitations":[],"meta":{"name":{"lastName":"Roose","middleName":"Enact","firstName":"Theodore"},"studentID":"789ddK9","gender":"male"}},{"index":"1459290133878","absences":[],"recitations":[],"meta":{"name":{"lastName":"Hazzir","middleName":"Azzaz","firstName":"Aalam"},"studentID":"6578GHaz","gender":"male"}},{"index":"1459290431271","absences":[],"recitations":[],"meta":{"name":{"lastName":"Libertad","middleName":"Kurd","firstName":"Santiago"},"studentID":"Hw7800","gender":"male"}},{"index":"1459290449014","absences":[],"recitations":[],"meta":{"name":{"lastName":"Steward","middleName":"Sick","firstName":"Rod"},"studentID":"755847r","gender":"male"}},{"index":"1459290644940","absences":[],"recitations":[],"meta":{"name":{"lastName":"Tracker","middleName":"Reigh","firstName":"Sabina"},"studentID":"888909R","gender":"female"}},{"index":"1459290662327","absences":[],"recitations":[],"meta":{"name":{"lastName":"Stalk","middleName":"Bean","firstName":"Jack"},"studentID":"87890h7","gender":"male"}},{"index":"1459290691414","absences":[],"recitations":[],"meta":{"name":{"lastName":"Time","middleName":"Ovg","firstName":"Nick"},"studentID":"89665tY","gender":"male"}},{"index":"1459290746655","absences":[],"recitations":[],"meta":{"name":{"lastName":"YoPoop","middleName":"Case","firstName":"Justin"},"studentID":"19887dh","gender":"male"}},{"index":"1459290793974","absences":[],"recitations":[],"meta":{"name":{"lastName":"Gorgo","middleName":"Apee","firstName":"Crypto"},"studentID":"9908gYR2","gender":"male"}},{"index":"1459290827511","absences":[],"recitations":[],"meta":{"name":{"lastName":"Istanbul","middleName":"Frankfurt","firstName":"Athene"},"studentID":"diufiui8984","gender":"female"}},{"index":"1459290868501","absences":[],"recitations":[],"meta":{"name":{"lastName":"Great","middleName":"Rover","firstName":"Eric"},"studentID":"9087654Tr","gender":"male"}},{"index":"1459290893086","absences":[],"recitations":[],"meta":{"name":{"lastName":"Let","middleName":"Banjo","firstName":"Barney"},"studentID":"90766tu","gender":"male"}},{"index":"1459290921141","absences":[],"recitations":[],"meta":{"name":{"lastName":"Machegne","middleName":"Copier","firstName":"Franco"},"studentID":"8990916tY","gender":"male"}},{"index":"1459290961014","absences":[],"recitations":[],"meta":{"name":{"lastName":"Motore","middleName":"Kee","firstName":"Suzu"},"studentID":"kopo752","gender":"male"}},{"index":"1459291013038","absences":[],"recitations":[],"meta":{"name":{"lastName":"S","middleName":"Booted","firstName":"Dexter"},"studentID":"909876gUo","gender":"male"}},{"index":"1459291049878","absences":[],"recitations":[],"meta":{"name":{"lastName":"Sanches","middleName":"Obama","firstName":"Peru"},"studentID":"90peirur5","gender":"male"}},{"index":"1459291085372","absences":[],"recitations":[],"meta":{"name":{"lastName":"Green","middleName":"Joseph","firstName":"Saint"},"studentID":"uuioe895R","gender":"male"}},{"index":"1459291121323","absences":[],"recitations":[],"meta":{"name":{"lastName":"Shitzou","middleName":"Bull","firstName":"Dirty"},"studentID":"uyuhhss80","gender":"female"}},{"index":"1459291140445","absences":[],"recitations":[],"meta":{"name":{"lastName":"Runner","middleName":"Grunt","firstName":"Keiv"},"studentID":"67989gY","gender":"male"}},{"index":"1459291165957","absences":[],"recitations":[],"meta":{"name":{"lastName":"Jasmine","middleName":"Murphy","firstName":"Alex"},"studentID":"9898dg9","gender":"female"}},{"index":"1459291214204","absences":[],"recitations":[],"meta":{"name":{"lastName":"Etrershka","middleName":"Danzou","firstName":"Olga"},"studentID":"90tryrurh","gender":"female"}},{"index":"1459291241332","absences":[],"recitations":[],"meta":{"name":{"lastName":"Jeffersonn","middleName":"Aladeen","firstName":"Rachelle"},"studentID":"909sd7dg","gender":"female"}},{"index":"1459291281525","absences":[],"recitations":[],"meta":{"name":{"lastName":"Job","middleName":"No","firstName":"Steve"},"studentID":"9we7eehd","gender":"male"}},{"index":"1459291314086","absences":[],"recitations":[],"meta":{"name":{"lastName":"Legorphic","middleName":"Scream","firstName":"Harem"},"studentID":"shdgd778g","gender":"male"}}]}';

                if( localStorage['--class-1460600133575'] == null )
                    localStorage['--class-1460600133575'] = '{"index":"--class-1460600133575","recitation":{},"attendance":{},"meta":{"name":"Male Right Block","schedule":"MWF 8am to 9am","sorting":{"mode":"automatic","type":"male-right-block"}},"students":[{"index":"1459289759848","absences":[],"recitations":[],"meta":{"name":{"lastName":"Javier","middleName":"Crd","firstName":"Reo"},"studentID":"10LN1534","gender":"male"}},{"index":"1459289781190","absences":[],"recitations":[],"meta":{"name":{"lastName":"Sommer","middleName":"Soth","firstName":"Ruth"},"studentID":"11LN1567","gender":"female"}},{"index":"1459289799909","absences":[],"recitations":[],"meta":{"name":{"lastName":"Sanders","middleName":"Korg","firstName":"Chelle"},"studentID":"17LN1890","gender":"female"}},{"index":"1459290001975","absences":[],"recitations":[],"meta":{"name":{"lastName":"Doe","middleName":"Donut","firstName":"John"},"studentID":"10lN90890","gender":"male"}},{"index":"1459290036590","absences":[],"recitations":[],"meta":{"name":{"lastName":"Nald","middleName":"Doe","firstName":"Mac"},"studentID":"18LN789","gender":"male"}},{"index":"1459290058412","absences":[],"recitations":[],"meta":{"name":{"lastName":"Skin","middleName":"Still","firstName":"Rumple"},"studentID":"18393746d","gender":"male"}},{"index":"1459290096574","absences":[],"recitations":[],"meta":{"name":{"lastName":"Roose","middleName":"Enact","firstName":"Theodore"},"studentID":"789ddK9","gender":"male"}},{"index":"1459290133878","absences":[],"recitations":[],"meta":{"name":{"lastName":"Hazzir","middleName":"Azzaz","firstName":"Aalam"},"studentID":"6578GHaz","gender":"male"}},{"index":"1459290431271","absences":[],"recitations":[],"meta":{"name":{"lastName":"Libertad","middleName":"Kurd","firstName":"Santiago"},"studentID":"Hw7800","gender":"male"}},{"index":"1459290449014","absences":[],"recitations":[],"meta":{"name":{"lastName":"Steward","middleName":"Sick","firstName":"Rod"},"studentID":"755847r","gender":"male"}},{"index":"1459290644940","absences":[],"recitations":[],"meta":{"name":{"lastName":"Tracker","middleName":"Reigh","firstName":"Sabina"},"studentID":"888909R","gender":"female"}},{"index":"1459290662327","absences":[],"recitations":[],"meta":{"name":{"lastName":"Stalk","middleName":"Bean","firstName":"Jack"},"studentID":"87890h7","gender":"male"}},{"index":"1459290691414","absences":[],"recitations":[],"meta":{"name":{"lastName":"Time","middleName":"Ovg","firstName":"Nick"},"studentID":"89665tY","gender":"male"}},{"index":"1459290746655","absences":[],"recitations":[],"meta":{"name":{"lastName":"YoPoop","middleName":"Case","firstName":"Justin"},"studentID":"19887dh","gender":"male"}},{"index":"1459290793974","absences":[],"recitations":[],"meta":{"name":{"lastName":"Gorgo","middleName":"Apee","firstName":"Crypto"},"studentID":"9908gYR2","gender":"male"}},{"index":"1459290827511","absences":[],"recitations":[],"meta":{"name":{"lastName":"Istanbul","middleName":"Frankfurt","firstName":"Athene"},"studentID":"diufiui8984","gender":"female"}},{"index":"1459290868501","absences":[],"recitations":[],"meta":{"name":{"lastName":"Great","middleName":"Rover","firstName":"Eric"},"studentID":"9087654Tr","gender":"male"}},{"index":"1459290893086","absences":[],"recitations":[],"meta":{"name":{"lastName":"Let","middleName":"Banjo","firstName":"Barney"},"studentID":"90766tu","gender":"male"}},{"index":"1459290921141","absences":[],"recitations":[],"meta":{"name":{"lastName":"Machegne","middleName":"Copier","firstName":"Franco"},"studentID":"8990916tY","gender":"male"}},{"index":"1459290961014","absences":[],"recitations":[],"meta":{"name":{"lastName":"Motore","middleName":"Kee","firstName":"Suzu"},"studentID":"kopo752","gender":"male"}},{"index":"1459291013038","absences":[],"recitations":[],"meta":{"name":{"lastName":"S","middleName":"Booted","firstName":"Dexter"},"studentID":"909876gUo","gender":"male"}},{"index":"1459291049878","absences":[],"recitations":[],"meta":{"name":{"lastName":"Sanches","middleName":"Obama","firstName":"Peru"},"studentID":"90peirur5","gender":"male"}},{"index":"1459291085372","absences":[],"recitations":[],"meta":{"name":{"lastName":"Green","middleName":"Joseph","firstName":"Saint"},"studentID":"uuioe895R","gender":"male"}},{"index":"1459291121323","absences":[],"recitations":[],"meta":{"name":{"lastName":"Shitzou","middleName":"Bull","firstName":"Dirty"},"studentID":"uyuhhss80","gender":"female"}},{"index":"1459291140445","absences":[],"recitations":[],"meta":{"name":{"lastName":"Runner","middleName":"Grunt","firstName":"Keiv"},"studentID":"67989gY","gender":"male"}},{"index":"1459291165957","absences":[],"recitations":[],"meta":{"name":{"lastName":"Jasmine","middleName":"Murphy","firstName":"Alex"},"studentID":"9898dg9","gender":"female"}},{"index":"1459291214204","absences":[],"recitations":[],"meta":{"name":{"lastName":"Etrershka","middleName":"Danzou","firstName":"Olga"},"studentID":"90tryrurh","gender":"female"}},{"index":"1459291241332","absences":[],"recitations":[],"meta":{"name":{"lastName":"Jeffersonn","middleName":"Aladeen","firstName":"Rachelle"},"studentID":"909sd7dg","gender":"female"}},{"index":"1459291281525","absences":[],"recitations":[],"meta":{"name":{"lastName":"Job","middleName":"No","firstName":"Steve"},"studentID":"9we7eehd","gender":"male"}},{"index":"1459291314086","absences":[],"recitations":[],"meta":{"name":{"lastName":"Legorphic","middleName":"Scream","firstName":"Harem"},"studentID":"shdgd778g","gender":"male"}}]}';

                localStorage['--active-class'] = '--class-1459289730499';
                localStorage['--temp-db-init'] = true;
            }
        }, /*-- temp --*/

        showUtils : {
            init : function(){
                this.navbar();
                this.addClassButton();
                this.pageContent();
            },

            navbar : function(){
                TweenLite.to('[data-page=class-list] .navbar', 0.3, {
                    y : '0',
                     autoAlpha : 1
                });
                return;
            },

            addClassButton : function(){
                TweenLite.to('#add-class-wrap', 0.3, {
                    scale : 1,
                    autoAlpha : 1
                });
                return;
            },

            pageContent : function(){
                TweenLite.to('[data-page=class-list] .page-content', 0.3, {
                    autoAlpha : 1
                });
            }
        }, /*-- showUtils --*/

        dom : function( o, dom ){
            o = o || {
                index : null,
                offset : null,
                className : null,
                sorting : null,
                studentCount : null,
                schedule : null
            };

            dom =  '<li data-dom="class" class="swipeout" data-class-index="'+ o.index +'">';
            dom += '    <div class="swipeout-content">';
            dom += '        <a class="item-content item-link" href="#">';
            dom += '            <div class="item-inner">';
            dom += '                <div class="item-title-row">';
            dom += '                    <div class="item-title" data-dom="class-name"><span>'+o.offset+'</span>'+ o.className +'</div>';
            dom += '                    <div class="item-after class-meta-wrap">';
            dom += '                        <span class="class-meta class-meta-schedule"><span class="class-meta-overflow">'+ o.schedule +'</span></span>';
            dom += '                        <span class="class-meta class-meta-student">'+ o.studentCount +'</span>';
            dom += '                        <span class="class-meta class-meta-sort-type">'+ o.sorting +'</span>';
            dom += '                    </div>';
            dom += '                </div>';
            dom += '            </div>';
            dom += '        </a>';
            dom += '    </div>';

            dom += '    <div class="swipeout-actions-right">';
            dom += '        <a class="bg-yellow link" href="#" data-class-action="simulate">';
            dom += '            <i class="fa fa-fw fa-sitemap"></i>';
            dom += '        </a>';
            dom += '        <a class="bg-orange link" href="#" data-class-action="add-student">';
            dom += '            <i class="fa fa-fw fa-user-plus"></i>';
            dom += '        </a>';
            dom += '        <a class="bg-green link" href="#" data-class-action="export">';
            dom += '            <i class="fa fa-fw fa-file-excel-o"></i>';
            dom += '        </a>';
            dom += '        <a class="swipeout-delete link" href="#" data-class-action="delete">';
            dom += '            <i class="fa fa-fw fa-trash"></i>';
            dom += '        </a>';
            dom += '    </div>';
            dom += '</li><!--/ eo class -->';

            return dom;
        }, /*-- dom --*/

        operation : {
            init : function(){
                app.classList.temp();
                this.add.init();
                this.list.init();
                this.perClass.init();
            }, /*--; operation.init --*/

            list : {
                init : function(){
                    this.__load();
                }, /*-- operation.list.init --*/

                __load : function(){
                    var x = 0
                    ,   klass = null;

                    $('[data-dom=class-list]').html('');

                    for(var key in localStorage){
                        if( key.match(/\-\-class\-/) ){ //--> per class
                            klass = JSON.parse( localStorage[key] );

                            $('[data-dom=class-list]').append(
                                app.classList.dom({
                                    index : klass.index,
                                    offset : ( x + 1 ),
                                    className : klass.meta.name,
                                    sorting : klass.meta.sorting.type,
                                    studentCount : klass.students.length,
                                    schedule : klass.meta.schedule
                                })
                            );
                            x += 1;
                        }
                    }

                    if( x < 1 ){
                        $('.no-class-alert').show();
                        return;
                    }

                    app.classList.operation.redirect.init();

                    return;
                } /*-- operation.list.__load --*/

            }, /*-- operation.list --*/

            redirect : {
                init : function(){
                    this.userEvent();
                },

                userEvent : function( self ){
                    self = this;

                    $('[data-dom=class]').on('click', function( e ){
                        localStorage['--active-class'] = $(this).data('class-index');

                        self.__route();

                        e.stopImmediatePropagation();
                        e.preventDefault();
                    });
                },

                __route : function(){
                    //app.global.router.init('class-overview');
                    requirejs(['js/mod/router'], function(router){
                        router.initialize('class-overview');
                    });
                }
            }, /*-- operation.redirect --*/

            add : {
                init : function( self ){
                    this.media();
                }, /*--; operation.add.init --*/

                media : function( self ){
                    self = this;
                    $('[data-add-class]').on('click', function( e ){
                        ( ( $(this).data('add-class') ).match(/method-file-feed/) ) ? self.feedMedia.init() : self.formMedia.init();

                        e.stopImmediatePropagation();
                        e.preventDefault();
                    });

                    return;
                }, /*--; operation.add.media --*/

                formMedia : {
                    init : function(){
                        
                        //app.global.router.init('class-create');
                        requirejs(['js/mod/router'], function(router){
                            router.initialize('class-create');
                        });
                    } /*--; operation.add.formMedia.init --*/
                }, /*--; operation.add.formMedia --*/

                feedMedia : {
                    init : function(){
                        requirejs(['js/mod/router'], function(router){
                            router.initialize('class-import');
                        });
                    }
                } /*--; operation.add.feedMedia --*/

            }, /*--; operation.add --*/

            perClass : {
                init : function(){
                    this.addStudent();
                    this.simulateClass();
                    this.export();
                    this.deleteClass();
                }, /*-- operation.perClass.init --*/

                addStudent : function(){
                    $('[data-class-action=add-student]').on('click', function(){
                        localStorage['--active-class'] = $(this).closest('[data-dom]').data('class-index');
                        //app.global.router.init('student-create');
                        requirejs(['js/mod/router'], function(router){
                            router.initialize('student-create');
                        });
                        return false;
                    });
                }, /*-- operation.perClass.addStudent --*/

                simulateClass : function(){
                    $('[data-class-action=simulate]').on('click', function(){
                        localStorage['--active-class'] = $(this).closest('[data-dom]').data('class-index');
                        localStorage['--manual-redirect'] = 'simulation';
                        window.location.reload();
                        
                        return false;
                    });
                }, /*-- operation.perClass.simulateClass --*/

                export : function(){
                    $('[data-class-action=export]').on('click', function(){
                        localStorage['--active-class'] = $(this).closest('[data-dom]').data('class-index');
                        location.href = 'export.html';
                        return false;
                    });
                }, /*-- operation.perClass.export --*/

                deleteClass : function(){
                    $('[data-class-action=delete]').on('click', function(){
                        var e = $(this).closest('.swipeout');

                        app.global.f7.o.app.swipeoutDelete( e, function(){
                            localStorage.removeItem( $(this).closest('[data-dom]').data('class-index') );

                            window.setTimeout(function(){
                                if( ! $('[data-dom=class]').length ){
                                    console.log('empty now');
                                    //app.global.router.init('class-list');
                                    requirejs(['js/mod/router'], function(router){
                                        router.initialize('class-list');
                                    });
                                }
                            }, 50);

                        });

                        return false;
                    });
                } /*-- operation.perClass.deleteClass --*/

            } /*-- operation.perClass --*/

        }, /*-- operation --*/

        search : {
            init : function(){
              this.event();
            }, /*--; search.init --*/

            event : function( self ){
                self = this;

                $('#search-trigger')
                .on('click', function(e){
                    TweenLite.to('.searchbar', 0.3, {
                        autoAlpha : 1,
                        y : '0%',
                        onCompleteParams : [ '{self}' ],
                        onComplete : function( tween ){
                            self.on();
                            self.off( tween );
                        }
                    });

                    e.stopImmediatePropagation();
                    e.preventDefault();
                });

              return;
            }, /*--; search.event --*/

            on : function(){
                (app.global.f7.o.app).searchbar('.searchbar', {
                    searchList : '.list-block-search',
                    searchIn : '.item-title'
                });
               return;
            },

            off : function( tween ){
                $('#search-off').on('click', function(){
                    $('input[type=search]').val('');
                    tween.reverse();
                });
            }
        } /*-- search --*/

    }; /*-- classList --*/
});
