define([], function(){

    return window.app.router = {
		dom : './pages/router.html',
		page : null,
		ref : null,
		callback : null,
		delay : 500,

		initialize : function( page, test, callback ){
			this.page = page;
			test = test || false;
			this.callback = callback;
			//( !test ) ? this.interface() : this.test();
            this.interface();
		}, /*-- app.router.initialize --*/

		test : function(){
			self = this;

			(app.global.f7.o.view).router.load({
				url : './pages/'+ self.page +'.html'
			});

			app.global.f7.o.dom(document).on(
				'pageAfterAnimation',
				'.page[data-page='+self.page+']',
				function(){
					requirejs(['js/mod/'+self.page], function(obj){
						$('[data-page=router]').remove();
						obj.initialize();
					});
				}
			);
		}, /*-- app.router.test --*/

		interface : function( self, ref ){
			self = this;
			self.ref = app.global.f7.o.view.activePage.name;

            this.neutralizeBackPage();

			(app.global.f7.o.view).router.load({
				url : self.dom
			});

			window.setTimeout(function(){
				self.terminal();
			}, self.delay );

			return;
		}, /*-- app.router.interface --*/

		terminal : function( self ){
			self = this;
			//console.log('to: '+ self.page);

			self.page = ( localStorage['--manual-redirect'] == undefined ) ? self.page : localStorage['--manual-redirect'];

			(app.global.f7.o.view).router.load({
				url : './pages/'+ self.page +'.html'
			});

			app.global.f7.o.dom(document).on(
				'pageAfterAnimation',
				'.page[data-page='+self.page+']',
				function(){
					requirejs(['js/mod/'+self.page], function(obj){
						//self.neutralizeRouter();
                        ( typeof self.callback === 'function' ) ? self.callback() : null;
						obj.initialize();
					});
				}
			);
			return;
		}, /*-- app.router.terminal --*/

        neutralizeRouter : function(){
            require.undef('js/mod/router');
            delete window.app.router;
            $('[data-page=router]').remove();
        }, /*-- app.router.reset --*/

		neutralizeBackPage : function( self, obj ){
			self = this; //return;
			obj = ( (self.ref).split('-')[1] == undefined ) ? self.ref : (self.ref).replace( /\-+\w/g, ((self.ref).match(/\-+\w/g)[0]).charAt(1).toUpperCase() );

			//console.log('neutralized: '+ obj);
			require.undef('js/mod/'+self.ref);
			delete window.app[obj];
			//$('[data-page='+self.ref+']').remove();

		} /*-- router.neutralizeBackPage --*/

	}; /*-- app.router --*/

});
