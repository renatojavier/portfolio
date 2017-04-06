//document.addEventListener('deviceready', function(){
	/*--
	 - Namespace initialized and reserved
	 --*/
	window.app = window.app || new Object;

	/*--
	 - Config setup
	 --*/
	require.config({
		baseUrl : './stack',
		paths : {
			Framework7 : 'js/lib/framework7.min',
			TweenMax : 'js/lib/TweenMax.min'
		}
	});

	/*--
	 - Non-module, global and static app.router
	 --*/
	window.app.global = {
		meta : {
			max_student : 70,
			os : {
				name : 'android',
				min_version : '4.4'
			}
		}, /*-- meta --*/

		f7 : {
			o : {
				app  : null,
				dom  : null,
				view : null
			},

			init : function(){
				this.o.app = new Framework7({ material : true });
				this.o.dom = Dom7;
				this.o.view = (this.o.app).addView('.main-view', {});
			}
		}, /*-- f7 --*/

		moment : {
			o : null,
			init : function( self ){
				self = this;
				requirejs(['js/lib/moment.min'], function(moment){
					app.global.moment = moment;
				});
				return;
			}
		}, /*-- app.global.moment --*/

		physicalButtons : {
			o : {},
			callback : null,

			init : function( callback ){
				if( typeof callback !== 'function') return;
				this.callback = callback;
				this.delegate.call([]);
			},

			delegate : function( self ){
				self = this;
				document.addEventListener('backbutton', function(){
					self.callback();
				});
			}
		} /*-- app.global.physicalButtons --*/

	}; /*-- app.global --*/

	/*--
	 - Start config module
	 --*/
	requirejs([ 'js/mod/config' ], function( obj ){
		document.addEventListener('deviceready',
			( 'app' in window ) ? obj.initialize() : null
		);
	});
	
//}, false);