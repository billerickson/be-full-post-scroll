jQuery(function($){

	// filterable variables
	if( args.debug ) {
		console.log( 'Use `be_full_post_scroll_args` filter to customize these variables:' );
		console.log( args );
	}

	// internal variables
	$(args.container).append( '<span class="load-more"></span>' );
	var button = $(args.container + ' .load-more');
	$(args.post).attr('data-title', document.title).attr('data-url', window.location.href );
	var next_url = $(args.next).attr('href');
	var loading = false;
	var scrollHandling = {
	    allow: true,
	    reallow: function() {
	        scrollHandling.allow = true;
	    },
	    delay: args.delay
	};

	if( args.debug ) {
		console.log( 'Next Post: ' + next_url );
		console.log( 'Will load when offset = ' + args.offset );
	}

	// ScrollSpy
	function be_change_url_on_scroll() {
		$( args.post ).each( function(){
			var $this = $(this);
			var position = $(this).position();
			$this.scrollspy({
				min: position.top,
				max: position.top + $this.height(),
				onEnter: function onEnter(element){
					if( args.debug ) {
						console.log( 'Changing URL' );
					}
					History.pushState(null, null, $this.attr('data-url'));
					window.document.title = $this.attr('data-title');
					$(args.post).removeClass('section-active');
					$this.addClass('section-active');
				}
			});
		});
	}
	be_change_url_on_scroll();

	$(window).scroll(function(){
		if( ! loading && scrollHandling.allow && next_url ) {

			// Start the timer so we don't run this code too often
			scrollHandling.allow = false;
			setTimeout(scrollHandling.reallow, scrollHandling.delay);

			// Load more posts if close enough to end of page
			var current_offset = $(button).offset().top - $(window).scrollTop();
			if( args.debug ) {
				console.log( 'Current offset: ' + current_offset );
			}
			if( args.offset > current_offset ) {
				loading = true;

				if( args.debug ) {
					console.log( 'Loading next post' );
				}

				$(args.next).remove();
				$.get(next_url + '/partial/1', function(content) {
					$('body').addClass('infinite-scroll-active');
					$(args.container).append( content );
					$(args.container).append( button );
					be_change_url_on_scroll();
					next_url = $(args.next).attr('href');
					loading = false;

					if( args.debug ) {
						console.log( 'Next post: ' + next_url );
					}

				}).fail(function(xhr, textStatus, e) {
					if( args.debug ) {
						console.log(xhr.responseText);
					}
				});

			}
		}
	});
});
