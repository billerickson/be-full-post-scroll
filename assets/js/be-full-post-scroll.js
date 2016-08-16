jQuery(function($){

	// @todo make these customizable through wp_localize_script()
	var content_container = '.infinite-wrapper';
	var post_container = '.infinite-scroll-post';
	var next = '.post-navigation a[rel="prev"]';
	var offset = 2000;
	var delay = 400;
	var debug = false;

	// internal variables
	$(content_container).append( '<span class="load-more"></span>' );
	var button = $(content_container + ' .load-more');
	$(post_container).attr('data-title', document.title).attr('data-url', window.location.href );
	var next_url = $(next).attr('href');
	var loading = false;
	var scrollHandling = {
	    allow: true,
	    reallow: function() {
	        scrollHandling.allow = true;
	    },
	    delay: delay
	};
	
	if( debug ) {
		console.log( 'Next Post: ' + next_url );
		console.log( 'Will load when offset = ' + offset );
	}

	$(window).scroll(function(){
		if( ! loading && scrollHandling.allow && next_url ) {
		
			// Start the timer so we don't run this code too often
			scrollHandling.allow = false;
			setTimeout(scrollHandling.reallow, scrollHandling.delay);
			
			// Change URL if viewing a new post
			var State = History.getState(); 
			$( post_container ).each(function(){
			    var top = window.pageYOffset;
			    var distance = top - $(this).offset().top;
			    var url = $(this).attr('data-url');
			    var title = $(this).attr('data-title');
			
			    if (distance < 150 && distance > -150 && State.url != url) {
			    	if( debug ) {
			    		console.log( 'Changing URL' );
			    	}
			       History.pushState(null, null, url );
					window.document.title = title;
			    }
			});
			
			// Load more posts if close enough to end of page
			var current_offset = $(button).offset().top - $(window).scrollTop();
			if( debug ) {
				console.log( 'Current offset: ' + current_offset );
			}
			if( offset > current_offset ) {
				loading = true;
				
				if( debug ) {
					console.log( 'Loading next post' );
				}
				
				$(next).remove();
				$.get(next_url + '/partial/1', function(content) {
					$(content_container).append( content );
					$(content_container).append( button );
					next_url = $(next).attr('href');
					loading = false;
					
					if( debug ) {
						console.log( 'Next post: ' + next_url );
					}

				}).fail(function(xhr, textStatus, e) {
					if( debug ) {
						console.log(xhr.responseText);
					}
				});

			}
		}
	});
});

function be_check_current_post() {
	$('.hash').each(function () {
	    var top = window.pageYOffset;
	    var distance = top - $(this).offset().top;
	    var hash = $(this).attr('href');
	
	    if (distance < 30 && distance > -30 && currentHash != hash) {
	        alert(hash);
	        currentHash = hash;
	    }
	});
}