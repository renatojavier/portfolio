window.app = {
	initialize : function(){
		var _ = null;
		this.updateCount();
		this.router();
		this.stickyNavigation();
		this.filteredGrid();
		this.slidingNavigation();
	},

	router : function( self ){
		self = this;

		var $page = $('#main')
		,	options = {
				debug: true,
				prefetch: true,
				cacheLength: 2,
					onStart: {
					duration: 250,
					render: function ($container) {
						$container.addClass('is-exiting');
						smoothState.restartCSSAnimations();
					}
				},
				onReady: {
					duration: 0,
					render: function ($container, $newContent) {
						$container.removeClass('is-exiting');
						$container.html($newContent);
						self.updateCount();
						self.stickyNavigation();
						self.filteredGrid();
						self.slidingNavigation();
					}
				}
			},

		smoothState = $page.smoothState(options).data('smoothState');
	},

	filteredGrid : function( self ){
		self = this;

		var grid = $('.grid');

		grid.isotope({
			itemSelector: '.portfolio-item',
			stagger: 30,
  			masonry: {
				columnWidth: '.portfolio-item'
			}
		});

		$('[data-filter]').on('click', function(){
			var filter = $(this).data('filter');
			grid.isotope({ filter: filter });

			if( ! $(this).hasClass('active') ){
				$(this).addClass('active').siblings().removeClass('active');
			}

			return false;
		});

		grid.on( 'arrangeComplete', function( event, filteredItems ) {
  			$('.item-counter-shown').html( filteredItems.length );
  		});

	},

	stickyNavigation : function(){
		$('#sticky-nav').sticky({ topSpacing: 0 });
	},

	updateCount : function(){
		$('.item-counter-shown').html( $('.portfolio-item').length );
		$('.item-counter-total').html( $('.portfolio-item').length );
	},

	slidingNavigation : function(){
		return;
		 var swiper = new Swiper('.swiper-container', {
	        slidesPerView: 2,
	        freeMode: false,
	        preventClicksPropagation: true,
	        preventClicks: true
	    });
	}

};

window.addEventListener( 'load', function(){
	this.app.initialize();
} , false );