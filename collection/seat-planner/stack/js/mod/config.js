define(function( require ){
	'use strict';

	//require('jQuery');
	require('TweenMax');
	require('Framework7');

	return window.app.config = {

		initialize : function(){
			app.global.f7.init();
			app.global.moment.init();
			app.global.physicalButtons.init(function(){ return false; });

			if( localStorage['--manual-redirect'] != undefined ){
				app.config.__route.init();
				return;
			}
			this.preload.init();
		}, /*-- initialize --*/

		preload : {
			o : {
				status : false,
				log    : null,
				tween  : null,
				rAF	   : null,
				steps  : 0
			}, //--; preload.o

			init : function(){
				( this.o.status ) ? this.done() : this.start.init();
			}, //--;preload.init

			start : {
				init : function( self, delay ){
					self = this;
					delay = 3;

					app.config.preload.done();
					//--! do all checks here
					window.setTimeout(function(){
						self.checkAndroidOS();
						self.checkCacheSystem();
					}, ( delay * 1000 ) );
				},

				frontendFramework : function(){
					// activate theme framework
					//app.global.f7.init();
				},

				checkAndroidOS : function( self, min, ua ){
					self = this;
					min = 4.2;
					ua = window.navigator.userAgent;

					if( false ){ //parseFloat( ua.match(/Android\s+([\d\.]+)/)[1] ) < min ){
						app.config.preload.failed({
							notice : 'Android OS version is not supported. KitKat 4.4+ required.'
						});
						return;
					}

					app.config.preload.o.steps += 1;
				},

				checkCacheSystem : function(){
					if( ! 'localStorage' in window ){
						app.config.preload.failed({
							notice : 'Working cache system is not supported by the device.'
						});
						return;
					}
					app.config.preload.o.steps += 1;
				}

			}, //--; preload.start

			accessLog : function(){
				return this;
			}, //--; preload.accessLog

			done : function( rAF, self ){
				self = this;

				function checkValidity(){
					//console.log('check at step'+app.config.preload.o.steps);
					app.config.preload.o.rAF = window.requestAnimationFrame(checkValidity);
					if( app.config.preload.o.steps == 2 ){
						self.initServices.init();
						window.cancelAnimationFrame( app.config.preload.o.rAF );
					}
				}
				checkValidity();
				return;
			}, //--; preload.done

			failed : function( param ){
				param = param || {
					notice : 'Error unknown'
				};

				window.cancelAnimationFrame( app.config.preload.o.rAF );
				app.config.preload.o.status = false;

				( new TimelineLite )
				.to('.app-name-word', 0.3, {
					marginLeft: 0,
					marginRight: 0
				})
				.to('.preloader', 0.3, { autoAlpha : 0 });

				app.global.f7.o.app.addNotification({
					message : param.notice,
					button : {
						text: 'Exit',
						color : 'white'
					},
					onClose : function(){
						navigator.app.exitApp();
					}
				});
			}, //--; preload.failed

			initServices : {
 				init : function(){
					app.config.preload.offview.init();
 				},

 				protocols : {
 					checkUser : function(){
						app.config.user.init();
						//console.log('checking user...');
					},

					checkInternetConnection : function(){
						//console.log('checking net...');
					}
					//... & network connection etc
 				}

 			}, /*--; preload.initServices --*/

			 offview : {
				init : function(){
					this.animation();
				},

				animation : function( self, delay ){
					self = this;
					delay = 0.0;

					( new TimelineLite({
						onComplete : function(){
							//--> clearing
							self.clear();
							//--> start protocols
							self.startProtocols();
						 }
					}) )
					.to('.app-name-word', 0.3, {
						delay : delay,
						marginLeft: 0,
						marginRight: 0
					})
					.to('.preloader', 0.3, { autoAlpha : 0 }, 'fade-off')
					.staggerTo('.app-name-word', 0.3, {
						autoAlpha : 0
					}, 0.1, 'fade-off')
					.to('#preparatory-wrap', 0.5, {
						y : '100%',
						autoAlpha : 0,
						ease : Expo.easeInOut
					}, 'fade-off+=0.2');

					 return;
				},

				clear : function(){
					app.config.preload.o.status = true;
					if( $('#preparatory-wrap').length )
						$('#preparatory-wrap').remove();

					return;
				},

				startProtocols : function( obj ){
					obj = app.config.preload.initServices.protocols;
					//app.config.preload.initServices.protocols
					for( var protocols in obj ){
						( obj[protocols] ).call([]);
					}

					return;
				}

			} /*--; preload.offview --*/
		}, /*-- preload --*/

		user : {
			o : {
				index	: '--user',
				fname : null,
				lname : null,
				new	  : true
			},

			callback : null,

			init : function( callback ){
				this.callback = callback;
				this.checkExisting();
			}, /*--; user.init --*/

			checkExisting : function( self ){
				self = this;

				if( window.localStorage.getItem( self.o.index ) != undefined ){
					self.o.new = false;
					app.config.__route.init();
					return;
				}else{
					self.o.new = true;
					this.createNew.init();
				}

			}, /*--; user.checkExisting --*/

			createNew : {
				o : {
					userFormWrap : $('#user-form-wrap'),
					userFormHeader : $('.user-form-header'),
					userFormField : $('[data-user-field]'),
					userFormSave : $('[data-user-button=save]'),
					tween : new TimelineLite
				},

				init : function(){
					( this.showForm() ).play();
				}, /*--; user.createNew.init --*/

				showForm : function( self, n ){
					self = this;
					n = 1;

					self.o.tween
					.to( self.o.userFormWrap, 0.7, {
						autoAlpha : 1
					 }, 'show-form-wrap')
					.staggerTo('.user-form-anim-prop', 0.3, {
						y : '0%',
						autoAlpha : 1,
						onComplete: function(){
							if( n == 3 ) self.data.saving();
								//app.config.bootstrap.init();
							n+=1;
						}
					}, 0.2, 'show-form-wrap')
					.pause();

					return self.o.tween;
				}, /*--; user.createNew.showForm --*/

				error : function(){
					app.global.f7.o.app.addNotification({
						message : 'Please complete the form field',
						button : {
							text : 'Dismiss'
						}
					});

					window.setTimeout(function(){
						app.global.f7.o.dom('.close-notification').trigger('click');
					}, 5000);
				},

				data : {
					
					item  : 0,
					token : [],
					regex : new RegExp('\w', 'ig'),

					saving : function( self ){
						self = this;

						( app.config.user.createNew.o.userFormSave )
						.on('click', function( e ){

							if(! e.originalEvent )  return;

							self.input();

							if ( self.token.length == self.item ) {
								localStorage.setItem(
									'--user',
									self.token[0] + '+' + self.token[1]
								);

								app.config.user.offview();
							} else {
								app.config.user.createNew.error();
							 }

							e.stopImmediatePropagation();
							e.preventDefault();
						});

						return;
					},

					input : function( self ){
						self = this;
						self.item = 0;
						self.token = [];

						( app.config.user.createNew.o.userFormField )
						.each(function(){
							if( typeof $(this).val() != 'undefined' && $(this).val() !== '' ){
								self.token.push( $(this).val() );
							}
							self.item += 1;
						});

						return;
					}

				} /*--; user.createNew.data --*/

			}, /*--; user.createNew --*/

			offview : function(){
				( new TimelineLite({
					onComplete : function(){
						app.config.__route.init();
					}
				}) )
				.staggerTo('.user-form-anim-prop', 0.3, {
					y : '100%',
					autoAlpha : 0
				}, 0.2, 'hide-form-wrap')
				.to( '#user-form-wrap', 0.7, {
 					autoAlpha : 0
				}, 'hide-form-wrap');

				return
			} /*--; user.offview --*/

		}, /*-- user --*/

		__route : {
			init : function(){
				//if( localStorage['--temp-db-init'] == null ){
					//app.global.router.init('class-list', true);
					requirejs(['js/mod/router'], function(router){
                        router.initialize('class-list', false);
                    });
				//}else{
					//app.global.router.init('class-overview');
				//	requirejs(['js/mod/router'], function(router){
                //       router.initialize('class-overview');
                //    });
				//}

			} /*--; route.init --*/
		} /*-- __route --*/

	}; /*-- app.config --*/

});
