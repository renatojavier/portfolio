window.app = {
	initialize : function(){
		var _ = null;

		this.f7.init();
	},

	f7 : {
		o : null,

		init : function(){
			this.o = new Framework7();
			_ = Dom7;
		}
	}
};

window.addEventListener( 'load', function(){
	this.app.initialize();
} , false );