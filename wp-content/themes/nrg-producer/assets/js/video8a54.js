jQuery(function(){
	"use strict";
	$ = jQuery;
	
	$(document).on('click', '.video-pause', function(){
	   var buttonVal = $(this).closest('.wpb_wrapper').find('.video-pause').index(this)-1;
	      var vid = $(this).closest('.wpb_wrapper').find('.bgvid').eq(buttonVal);
		    $('.hide-content').addClass('act');
			$('.close-full-video').addClass('act');
		    $('.main-wrapper').addClass('active');
		    vid.get(0).play();
	});
	
	$('.close-full-video').on('click', function(){
		var closeVal = $(this).closest('.wpb_wrapper').find('.close-full-video').index(this);
	      var pauseVid = $(this).closest('.wpb_wrapper').find('.bgvid').eq(closeVal);
	       $(this).removeClass('act');
		   $('.hide-content').removeClass('act');
		   $('.main-wrapper').removeClass('active');
		   pauseVid.get(0).pause();
	});
});

