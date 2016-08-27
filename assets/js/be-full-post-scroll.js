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

	$(window).scroll(function(){
		if( ! loading && scrollHandling.allow && next_url ) {
		
			// Start the timer so we don't run this code too often
			scrollHandling.allow = false;
			setTimeout(scrollHandling.reallow, scrollHandling.delay);
			
			// Change URL if viewing a new post
			var State = History.getState(); 
			$( args.post ).each(function(){
			    var top = window.pageYOffset;
			    var distance = top - $(this).offset().top;
			    var height = $(this).outerHeight();
			    var url = $(this).attr('data-url');
			    var title = $(this).attr('data-title');
			    
			    var atTop = distance < 150 && distance > -150;
			    var atBottom = ( distance - height ) < -300 && ( distance - height ) > -600;
			    
			    if ( ( atTop || atBottom ) && State.url != url) {
			    	if( args.debug ) {
			    		console.log( 'Changing URL' );
			    	}
			       History.pushState(null, null, url );
					window.document.title = title;
			    }
			});
			
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
					$(args.container).append( content );
					$(args.container).append( button );
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