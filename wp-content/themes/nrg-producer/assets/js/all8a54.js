;(function($) {
  "use strict";

    /*============================*/
	/* SWIPER SLIDE */
	/*============================*/
	
	var swipers = [], winW, winH, winScr, _isresponsive, smPoint = 480, mdPoint = 992, lgPoint = 1200, addPoint = 1600, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

	function pageCalculations(){
		winW = $(window).width();
		winH = $(window).height();
	}

	if ($('.home-slider.anime-slide').length) {
		$('.home-slider.anime-slide').closest('.vc_row').addClass('nrg-prod-row-full-height');
	};
	if ($('.home-slider.arrow-center').length) {
		$('.home-slider.arrow-center').closest('.vc_row').addClass('nrg-prod-row-full-height');
	};

	pageCalculations();
	
	
	function updateSlidesPerView(swiperContainer){
		if(winW>=addPoint) return parseInt(swiperContainer.attr('data-add-slides'),10);
		else if(winW>=lgPoint) return parseInt(swiperContainer.attr('data-lg-slides'),10);
		else if(winW>=mdPoint) return parseInt(swiperContainer.attr('data-md-slides'),10);
		else if(winW>=smPoint) return parseInt(swiperContainer.attr('data-sm-slides'),10);
		else return parseInt(swiperContainer.attr('data-xs-slides'),10);
	}

	function resizeCall(){
		pageCalculations();

		$('.swiper-container.initialized[data-slides-per-view="responsive"]').each(function(){
			var thisSwiper = swipers['swiper-'+$(this).attr('id')], $t = $(this), slidesPerViewVar = updateSlidesPerView($t), centerVar = thisSwiper.params.centeredSlides;
			thisSwiper.params.slidesPerView = slidesPerViewVar;
			thisSwiper.reInit();
			if(!centerVar){
				var paginationSpan = $t.find('.pagination span');
				var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
				if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
				else $t.removeClass('pagination-hidden');
				paginationSlice.show();
			}
		});
	}
	if(!_ismobile){
		$(window).resize(function(){
			resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			resizeCall();
		}, false);
	}

	if ($('.video-iframe').length) {
		$('.video-iframe').html('<iframe class="box-size" src="#"></iframe>')
	};

	/*=====================*/
	/* 07 - swiper sliders */
	/*=====================*/
	function initSwiper(){
		var initIterator = 0;
		$('.swiper-container').each(function(){

			var $t = $(this);

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index + ' initialized').attr('id', index);
			$t.find('.pagination').addClass('pagination-'+index);

			var autoPlayVar = parseInt($t.attr('data-autoplay'),10);

			var slidesPerViewVar = $t.attr('data-slides-per-view');
			if(slidesPerViewVar == 'responsive'){
				slidesPerViewVar = updateSlidesPerView($t);
			}
			else slidesPerViewVar = parseInt(slidesPerViewVar,10);

			var directionVar = $t.attr('data-direction');
			if(!directionVar){ directionVar='horizontal'; }

			var loopVar = parseInt($t.attr('data-loop'),10);
			var speedVar = parseInt($t.attr('data-speed'),10);
            var centerVar = parseInt($t.attr('data-center'),10);
            var mousewheelControl = parseInt($t.attr('data-mousewheel-control'),10);
            if(!mousewheelControl){ mousewheelControl = 0;}
			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				speed: speedVar,
				pagination: '.pagination-'+index,
				loop: loopVar,
				mode: directionVar,
				paginationClickable: true,
				autoplay: autoPlayVar,
				slidesPerView: slidesPerViewVar,
				keyboardControl: true,
				calculateHeight: true, 
				simulateTouch: true,
				roundLengths: true,
				mousewheelControl: mousewheelControl,
				centeredSlides: centerVar,
				onInit: function(swiper){
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
					if($t.closest('.swiper-6').length) {
                     	  $('.prev-item').on('click', function(){
							var eqIndex = $(this).closest('.wpb_wrapper').find('.prev-item').index(this); 
                            $('.prev-item').removeClass('active');
                            $(this).addClass('active');
                            swiper.swipeTo(eqIndex);
                            swiper.stopAutoplay();
                            return false;
                        });
			       }
				},
				onSlideChangeStart: function(swiper) {
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
					$('.count span i').text(activeIndex+1);
					if($t.closest('.swiper-two-bg').length){
						$t.closest('.wpb_wrapper').find('.bg-wrapp .clip.active').removeClass('active');
						$t.closest('.wpb_wrapper').find('.bg-wrapp .clip').eq(activeIndex).addClass('active');
					}
					if($t.closest('.anime-slide').length){
					   $t.find('.swiper-slide.active').removeClass('active');
					}
				},
				onSlideChangeEnd: function(swiper){
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
					if($t.closest('.swiper-6').length){
					   var eqIndex = $('.prev-item').index(this); 
						$('.prev-item').removeClass('active');
                        $t.closest('.wpb_wrapper').find('.prev-item').eq(activeIndex).addClass('active');
				    }
					if($t.closest('.anime-slide').length){
					   var qVal = $t.find('.swiper-slide-active').attr('data-val');
					   $t.find('.swiper-slide[data-val="'+qVal+'"]').addClass('active');
					}
				},
				/*new start*/
				onFirstInit: function(swiper){
					centering();
				}
				/* new end*/
			});
			swipers['swiper-'+index].reInit();
				if($t.attr('data-slides-per-view')=='responsive'){
					var paginationSpan = $t.find('.pagination span');
					var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
					if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
					else $t.removeClass('pagination-hidden');
					paginationSlice.show();
				}
			initIterator++;
		});
		
       $('.swiper-container.connected-to-bottom-swiper').each(function(){
			var $t = $(this);
			if($t.closest('.testi-wrapper').find('.connected-to-top-swiper').length){
				swipers['swiper-'+$t.attr('id')].addCallback('SlideChangeStart', function(swiper){
					swipers['swiper-'+$t.closest('.testi-wrapper').find('.connected-to-top-swiper').attr('id')].swipeTo(swiper.activeIndex);
				});
			}
		});
	}

	$('.swiper-arrow-left').on('click', function(){
		swipers['swiper-'+$(this).closest('.arrows').find('.swiper-container').attr('id')].swipePrev();
	});
    
	$('.swiper-arrow-right').on('click', function(){
		swipers['swiper-'+$(this).closest('.arrows').find('.swiper-container').attr('id')].swipeNext();
	});

	
	/*============================*/
	/* DROPDOWN */
	/*============================*/
	
	$('.nav-menu-icon a').on('click', function() { 
	  if ($('nav').hasClass('slide-menu')){
		   $('nav').removeClass('slide-menu'); 
		   $(this).removeClass('active');
		   $('body').css({'overflow':'auto'});
	  }else {
		   $('nav').addClass('slide-menu');
		   $(this).addClass('active');
		   $('body').css({'overflow':'hidden'});
	  }
		return false;
	 });
	

	$('nav > ul > li').on('click', function(){
	   if ($(this).find('.dropmenu').hasClass('slidemenu')) {
		   $(this).find('.dropmenu').removeClass('slidemenu');
	   }else{
		   $('nav > ul > li').find('.dropmenu').removeClass('slidemenu');
		   $(this).find('.dropmenu').addClass('slidemenu');
	   }
	});
	
	
	/***********************************/
	/*VIDEO POPUP*/
	/**********************************/
	
	$(document).on('click', '.video-open', function(){
		$('.video-player').addClass('active');
		var videoSource = $(this).attr('data-src');
		
			$('.video-player iframe').attr('src', videoSource);
		
		$('body').css({'overflow':'hidden'});
	});

	$('.video-player .close-iframe').on('click', function(){
		$('.video-player iframe').attr('src', '');
		setTimeout(function(){$('.video-player').removeClass('active');}, 300);
		$('body').css({'overflow':'auto'});
	});
		
	/*============================*/
	/* WINDOW LOAD */
	/*============================*/

	function IsJsonString(str) {
	    try {
	        JSON.parse(str);
	    } catch (e) {
	        return false;
	    }
	    return true;
	}

	function get_content(data_query,callback){

		$.ajax({
			url: data_query.ajax_url,
			success: function(data){

				if (IsJsonString(data)) {
					data =  jQuery.parseJSON(data);
					data.post_url = data_query.post_url;
				} else {
					var data_r = {};
					data_r.status = 'ok';
					data_r.type = 'html';
					data_r.content = data;
					data = data_r;
				}
				callback(data);
		  },
		  error: function(error){

		  	$('#pop_up').find('.popup').html('<div class="team-desc"><div class="title"><h1>NO CONNECTION</h1></div></div>');

		  	console.log(error);
		  	$('.preload').fadeOut();
		  	$.fancybox( '#pop_up' );
		  }
		});

	}

	function render_content(data){

		if (data.status == 'ok') {

			var popup_cont = '';

			if (data.type == 'ajax') {

				if (data.thumbnail) popup_cont += data.thumbnail;
				popup_cont += '<div class="team-desc">';
				popup_cont += '	<div class="title">';
				popup_cont += '		<h4>' + data.time + '</h4>';
				popup_cont += '		<h2>' + data.title + '</h2>';
				popup_cont += data.content;
				if(data.comments) popup_cont += data.comments;
				popup_cont += '	</div>';
				popup_cont += '</div>';

			} else {
				popup_cont = data.content;
			}

			$('#pop_up').find('.popup .content').html(popup_cont);

			history.pushState(null, null, data.post_url);

			$.fancybox( '#pop_up' , {

					afterLoad: function () {
						if ( window.the_ID) {
							initSwiper();
						}
					},
					afterClose: function(){ 
						history.back();
						$("body").css("overflow","auto");
					},
					beforeShow: function(){
						var slides = $('.fancybox-placeholder').closest('.swiper-wrapper').find('.swiper-slide'),
							count_slide = slides.length,
							current_post_id = $('#pop_up').attr('data-post-id'),
							first_slide_id = slides.first().attr('data-post-id'),
							last_slide_id = slides.last().attr('data-post-id');

						$('.blog_arrow').show();
						
						if (count_slide <= 1) {
							$('.blog_arrow').hide();
						};

						if (current_post_id == first_slide_id)  $('.blog_arrow-prev').hide();
						if (current_post_id == last_slide_id)  $('.blog_arrow-next').hide();

					},
					afterShow: function(){
						$("body").css("overflow","hidden");
						$('.preload').fadeOut();
					},
					helpers: { 
						title : { type : 'inside' },
						overlay: {
							locked: false
						}
					}
			} );

		} else {

			$('#pop_up').find('.popup').html('<div class="team-desc"><div class="title"><h1>'+data.error+'</h1></div></div>');

			$('.preload').fadeOut();
			$.fancybox( '#pop_up');
		}

	}

	if ($(".fancybox").length){

		// open popup. use fancybox
		$(document).on('click','.fancybox', function(){ 

			$.fancybox.close();

			if (this.href.indexOf("#team") != '-1') {

				$.fancybox( '#'+this.hash , {
					afterLoad: function () {
						initSwiper();
					},
					helpers: { 
						title: { type : 'inside' }
					}

				 });
				return false;
			}; 

			var data_query= {};
			data_query.post_url = this.href;
			data_query.ajax_url  = $(this).attr('data-ajax-url');

			var active_post_id = $(this).closest('.swiper-slide').attr('data-post-id');

			$('#pop_up').attr('data-post-id', active_post_id );

			if (!$('.preload').is(':visible')) {
				$('.preload').css('background-color', 'rgba(26, 26, 26, 0.8)').fadeIn();
			}

			get_content(data_query,
				// callback
				function(data){
					render_content(data);
				}
			);

			return false; 
		});

		$(document).on('click',".blog_arrow",function(){ 

			var current_slide_id = $('#pop_up').attr('data-post-id'),
				current_slide = $('.swiper-slide[data-post-id='+current_slide_id+']');

			var second_slide =  ( $(this).hasClass('blog_arrow-prev')  ) ? current_slide.prev('.swiper-slide') : current_slide.next('.swiper-slide');
			
			if (second_slide.length) {
				second_slide.find('a.fancybox').trigger('click');
				$(this).show();
			} else {
				$(this).hide();
			}

		});

	}

	$(window).on('load', function(){

		// load popup content for single
		if (window.the_ID) {
			if ($('.swiper-slide[data-post-id='+the_ID()+']').length) {

				$('.swiper-slide[data-post-id='+the_ID()+']').find('a.fancybox').trigger('click');
				if (!$('.preload').is(':visible')) {
					$('.preload').fadeIn();
				}

			} else {

				$.fancybox.close();

				if (this.href.indexOf("#team") != '-1') {

					$.fancybox( '#'+this.hash , {
						afterLoad: function () {
							initSwiper();
						},
						helpers: { 
							title: { type : 'inside' }
						}

					 });
					return false;
				}; 

				var data_query= {};
				data_query.post_url = this.href;
				data_query.ajax_url  = $(this).attr('data-ajax-url');

				var active_post_id = $(this).closest('.swiper-slide').attr('data-post-id');

				$('#pop_up').attr('data-post-id', active_post_id );

				//$(this).addClass('active-fancy-slide');
				if (!$('.preload').is(':visible')) {
					$('.preload').css('background-color', 'rgba(26, 26, 26, 0.8)').fadeIn();
				}



				get_content(data_query,
					// callback
					function(data){
						render_content(data);
					}
				);
				
			}
			
		} else {
			if ($('body').hasClass('single')) {

			};
			initSwiper();
			$('.preload').fadeOut();
		}

	});

	//Sidebar
	$('.show-sidebar').click(function(){
		var sidebar = $('#tertiary');
		var button = $('.show-out');
		sidebar.toggleClass('open');
		button.toggleClass('open');
		button.find('i').toggleClass('fa-angle-left').toggleClass('fa-angle-right');
		if (sidebar.hasClass('open')){
			sidebar.animate({'right': 0});
			button.animate({'right': '320px'});
		} else {
			sidebar.animate({'right': '-320px'});
			button.animate({'right': 0});
		}
	});

	$('.menu-item-has-children .item_arrow, a.menu-item-has-children[href="#"]').on('touchstart click', function(){
		$(this).closest('li').find(' > .sub-menu').toggleClass('active');
		$(this).toggleClass('fa-plus fa-minus');
		return false;
	});

	if ($('.clip.active').length) {

		if (winW > 991) {

			$('.hide-content > .clip > .bg.bg-bg-chrome.act').hide();

		} else {
			$('.hide-content > .clip > .bg.bg-bg-chrome.act').show();
		}
	}

	function centering() {

		var body = $('body');

		if ( body.hasClass('single') ) return;
		if ( body.hasClass('blog') ) return;
		if ( body.hasClass('search') ) return;

		$('.home-slider').each(function(index, el) {
			
				var $el = $(el),
					_half_height = $el.outerHeight()/2,
					_half_width = ($el.outerWidth()/2);
					
				$el.css({
					'margin-top': - _half_height,
					'margin-left': - _half_width
				});
		});


	}
	$(window).resize(function() {
		/* Act on the event */
		centering();
	});
	$(window).load(function() {
		/* Act on the event */
		centering();
	});	

	//AJAX
	if (window.load_more_post !== undefined) {
	    var pageNum = parseInt(load_more_post.startPage) + 1;
	    
	    // The maximum number of pages the current query can return.
	    var max = parseInt(load_more_post.maxPages);
	    
	    // The link of the next page of posts.
	    var nextLink = load_more_post.nextLink;
		$('.load-more').on('click', function () {


		    if(pageNum <= max) {
		    
		        // Show that we're working.
		        $('.icon-load',this).addClass('load');
		        
		        $('<div>').load(nextLink + ' .news-slider',
		            function() {

		                $('.home-slider.fullheight .swiper-wrapper').append($(this).find('.swiper-wrapper').html());
		                // Update page number and nextLink.
		                pageNum++;
		                nextLink = nextLink.replace(/\/page\/[0-9]?/, '/page/'+ pageNum);

		                // Update the button message.
		                initSwiper();
		                if(pageNum >= max) {
		                    $('.load-more').html('NO MORE POSTS TO LOAD.');
		                }

		            }
		        );
		    } else {
		        $('.news-slider .swiper-wrapper').append('');
		    }

		    return false;
		});
	}

})(jQuery);