
"use strict";

(function($){

	$.extend(verge);

	//*********** Sticky Menu Begin *********//	

	var stickyHeader={
		init:function(){
			this.$header=$('#header');
			this.$contentWrapper=$('#wrapper');
			this.headerHeight=this.$header.outerHeight();
			this.absFlag=(this.$header.css('position')!='absolute')?true:false;
			this.threshold=this.$header.data('sticky-threshold')?this.$header.data('sticky-threshold'):0;
			this.stickyFlg=false;
			this.$pageHead=$('.page-head');
			this.setHeadBottom();
			this.bindUIActions();

		},
		bindUIActions:function(){
			var self=this;
			$(document).on('scroll',function(){
				var scrollPos=$(this).scrollTop();
				if (scrollPos>self.headBottom+self.threshold){
					self.changeState('stick');
				}
				else if (scrollPos<self.headBottom){
					self.changeState('unstick');
				}
			});

			$(window).on('debouncedresize',function(){
				self.setHeadBottom();
				self.headerHeight=self.$header.outerHeight();
			});
		},
		changeState:function(state){
			var self=this;

			if ($.og.$window.width()<=768 || $.og.$header.hasClass('mobile-menu')) return;

			if(state=='stick' && !self.stickyFlg){
				self.$header.addClass('is-sticky');
				if (self.absFlag)
					self.$contentWrapper.css({marginTop:'+='+self.headerHeight});
				self.stickyFlg=true;
				$(document).trigger('sticky-change');
			}else if(state=='unstick' && self.stickyFlg){
				self.$header.removeClass('is-sticky');
				if (self.absFlag)
					self.$contentWrapper.css({marginTop:''});
				self.stickyFlg=false;
				$(document).trigger('sticky-change');

			}
		},
		setHeadBottom:function(){
			var self=this;

			if (self.$pageHead.length){
				if (self.$pageHead.outerHeight()>70){
					self.headBottom=self.$pageHead.outerHeight()+self.$pageHead.offset().top;
				}else{
					self.headBottom=$(window).height();
				}
			}else{
				self.headBottom=self.$header.height()+self.$header.offset().top;
			}
		}
	};
	//*********** Sticky Menu End *********//	

	
	//*********** Primary Menu Begin*********//	

	var olmenu = {
		init: function() {
			this.$menu = $('#primary-menu'); // Directly target #primary-menu
			this.setMobile(this.isMobileActive());
			this.bindUIActions();
		},
		bindUIActions: function() {
			var self = this;
	
			// Toggle primary menu on mobile trigger click
			$.og.$body.on('click', '.ol-mobile-trigger', function() {
				$(this).toggleClass("is-active");
				self.$menu.toggleClass('show'); // Toggle 'show' class on #primary-menu
			});
		},
		setMobile: function(mobileFlag) {
			if (mobileFlag) {
				$.og.$header.addClass('mobile-menu');
			} else {
				$.og.$header.removeClass('mobile-menu');
				this.$menu.removeClass('show'); // Reset the primary menu visibility
			}
		},
		isMobileActive: function() {
			return ($.browser.mobile || $.og.$window.width() <= 1200);
		},
		destroy: function() {
			$.og.$header.removeClass('mobile-menu');
			this.$menu.removeClass('show'); // Ensure menu is hidden on desktop
		}
	};
	
	// Document ready function to initialize the menu
	$(document).ready(function() {
		olmenu.init();
		console.log("Inserting header and footer...");
	});
	//*********** Primary Menu End *********//	

	
	//*********** Logo Handler Begin *********//

	var logoHandler={
		init:function(){
			this.$wrapper = $('.logo-wrapper');
			this.$imgs=this.$wrapper.find('img');

			if (this.$imgs.length<=1) return false;

			this.$logoLight=this.$imgs.filter('.logo-light');
			this.$logoDark=this.$imgs.filter('.logo-dark');

			this.bindUIActions();
			this.changeSrc(this.decision());
		},
		bindUIActions:function(){
			var self=this;
			$(document).on('sticky-change',function(){
				self.changeSrc(self.decision());
			})
		},
		decision:function(){
			var self=this;
			var mode=$.og.$header.hasClass('dark')?'dark':'light';

			if ($.og.$header.hasClass('is-sticky')){
				if ($.og.$header.hasClass('sticky-dark')){
					mode='dark';
				}else if ($.og.$header.hasClass('sticky-light')){
					mode='light';
				}
			}
			return mode;
			
		},
		changeSrc:function(mode){
			var self=this;
			if (mode=='light'){
				self.$logoDark.hide();
				self.$logoLight.css('display','inline-block');
			}else{
				self.$logoDark.css('display','inline-block');
				self.$logoLight.hide();
			}
		}

	};
	//*********** Logo Handler End *********//


	//*********** Set-bg Images Begin *********//
	var setBg = {
		init:function($elem){
			var imgUrl = this.getImageInside($elem);
			if ( imgUrl ){
				$elem.css('background-image', 'url(' + imgUrl + ')');
			}
			
		},
		destroy:function($elem){
			$elem.css('background-image','');
			$elem.find('img.set-me').show();
		},
		getImageInside:function($elem){
			//var $insideImage = $e.find('img.set-me').hide();
			var $dataImage = $elem.data('img-src');

			if ( $dataImage )
				return $dataImage;
			else {
				var $insideImage = $elem.find('img.set-me').first();
				$insideImage=($insideImage.length)?$insideImage:$elem.find('img').first();

				if (!$insideImage.length){
					return false
				}

				$insideImage.hide();
				return $insideImage.attr('src')
			}
		}
	};
	//*********** Set-bg Images End *********//

	//*********** Handle Particles End *******//
	

	//*********** Accordion Handler Begin *******//
	/* Simple Accordion 
	/* Toggle free style accordion
	/* Side navigation accordion & toggle style*/

	var accordion={
		init:function($elem,options){
			this.$elem=$elem;

			var defaultOptions={
				itemSelector:'.ac-item',
				headSelector:'.item-head',
				bodySelector:'.item-body',
				activeClass:'open',
				initActiveClass:'open',
				addToggleElem : true,
				toggleElemClass : '.item-head',
				toggleEl:'<i class="ol-toggle-icon">'
			};

			this.options=$.extend( {}, defaultOptions, options);

			this.$items=this.$elem.children(this.options.itemSelector);
			this.SingleToggleFlag=this.$elem.hasClass('toggle-free')?false:true;
			
			this.prepare();
			this.bindUIActions();

		},
		prepare:function(){
			var self=this;
			var op=this.options;
			var $openItems=self.$items.filter('.'+op.initActiveClass);

			if ($openItems.length){

				//Only one toggle can be open by default
				if (self.SingleToggleFlag && $openItems.length>1){
					$openItems.removeClass(op.initActiveClass);
					$openItems=$openItems.first().addClass(op.initActiveClass);
				}
				$openItems.addClass(op.activeClass);
				$openItems.children(op.bodySelector).show();
			}//else{
				//do we want to force open the first tab??
			//}

			if ( op.addToggleElem ){
				self.$elem.find(op.toggleElemClass).append($(op.toggleEl));
			}
			
		},
		bindUIActions:function(){
			var self=this,
				op=this.options;

			self.$elem.on('click',op.headSelector,function(e){

				var $this=$(this),
					$parent=$this.parent(),
					$itemBody=$this.next(op.bodySelector);

				if ($itemBody.length){
					e.preventDefault();
					//There is a content section that should be shown
					if (self.SingleToggleFlag && !$parent.hasClass(op.activeClass)){
						var $openItems=$parent.siblings('.'+op.activeClass).removeClass(op.activeClass);
						self.toggleElem($openItems.children(op.bodySelector));
					}

					self.toggleElem($itemBody);
					$parent.toggleClass(op.activeClass);
				}

			});
		},
		toggleElem:function($elem){
			$elem.slideToggle({ duration: 400, easing: "easeInOutQuart" });
		}

	};

	//*********** Accordion Handler End *******//
	

	//*********** Tabs Begin *******//
	var tabs={
		init : function($elem){

			this.$elem=$elem;
			this.$bodyItems=$elem.find('.tab-pane');
			this.$headItems=$elem.find('.tab-navigation').children('li');

			this.prepare();
			this.bindUIActions();
			
			
		},
		prepare:function(){
			var self=this;

			var $activeHead=self.$headItems.filter('.active').first();

			if ($activeHead.length<1){
				self.$bodyItems.removeClass('active').eq(0).addClass('active');
				self.$headItems.removeClass('active').eq(0).addClass('active');
			}

		},
		bindUIActions : function(){
			var self = this;

			self.$elem.on('click','.tab-navigation a', function(e){

				e.preventDefault();
				
				var $this=$(this),
					$parent = $(this).parent(),
					index = $parent.index();

				if ($parent.hasClass('active')) return false;

				self.$headItems.removeClass('active');
				$parent.addClass('active');
				self.$bodyItems.removeClass('active').eq(index).addClass('active');
			});
		}
	};
	//*********** Tabs End *******//


	//*********** Grid Handler Begin *******//
	var olGrid = {

		init: function($grid){
			this.$grid = $grid;
			this.$filtersWrapper = $('.ol-grid-filters');
			this.$defaultFilters=this.$filtersWrapper.find('.default-filters');
			this.$selectFiltersWrapper=this.$filtersWrapper.find('.select-filters');
			this.$selectFilters=this.$selectFiltersWrapper.find('select');
			this.$selectDummyValue=$('<span>').addClass('select-value').appendTo(this.$selectFiltersWrapper);
			this.gridFlg=this.$grid.hasClass('grid');
			
			this.prepare();
			this.prepareIsotope();
			this.bindUIActions();
		},
		bindUIActions:function(){
			var self=this,
				selector;
			 // click event in isotope filters
		    self.$defaultFilters.on('click', 'a',function(e){
				e.preventDefault();
				$(this).parent('li').addClass('active').siblings().removeClass('active');
				selector = $(this).attr('data-filter');
				self.filter(selector);
		    });

		    this.$selectFilters.on( 'change', function(){
		    	selector = this.value;
		    	self.$selectDummyValue.text(self.$defaultFiltersAnchors.filter(function(){
		    		return $(this).data('filter')==selector;
		    	}).text());
		    	self.filter(selector);
		    });
		    
		},
		filter: function(selector){
			var self=this;
			self.$grid.isotope({filter:selector})
		},
		prepareIsotope:function(){
			var self=this;

			if (self.gridFlg){
				self.isotopeGrid();
			}else{
				self.$grid.imagesLoaded( function() {
				  self.isotopeGrid();
				});
			}
		},
		isotopeGrid: function(){
			var widthClass=(this.$grid.find('.grid-sizer').length)?'.grid-sizer':'.grid-item';

			this.$grid.isotope({
				itemSelector: '.grid-item',
				percentPosition: true,
				masonry: {
				// use outer width of grid-sizer for columnWidth
					columnWidth: widthClass
				}
			})
		},
		prepare:function(){
			var self=this;
			var $filtersLi=self.$defaultFilters.children('li'),
				$activeLi=$filtersLi.filter('.active');

			$activeLi=($activeLi.length>0)?$activeLi:$filtersLi.first();
			self.$defaultFiltersAnchors=$filtersLi.find('a');
			self.$selectDummyValue.text($activeLi.text());
		}
	};
	//*********** Grid Handler End *******//
	

	//*********** Social Shares Begin *******//
	var socialShare = function(){
		var delayFactor = 60,
		deActivate = function($elem , direction){
			var $items = $elem.find(".items a");
			$elem.removeClass('active').addClass("in-active");
			if(direction== "bottom"){
				$items.each(function(indexInArray){
					$(this).animate({
						opacity: 0,
						bottom: "-=15"
					}, indexInArray*delayFactor, function(){
						$(this).fadeOut;
					});
				});
			}else{
				$items.each(function(indexInArray){
					$(this).animate({
						opacity: 0,
						top: "-=15"
					}, indexInArray*delayFactor, function(){
						$(this).fadeOut;
					});
				});
			}
		},
		activate = function($elem , direction){
			var $items = $elem.find(".items a");
			$elem.removeClass("in-active").addClass('active');
			if(direction== "bottom"){
				$items.each(function(indexInArray){
					$(this).fadeIn().animate({
						opacity: 1,
						bottom: 0
					}, indexInArray*delayFactor);
				});
			}else{
				$items.each(function(indexInArray){
					$(this).fadeIn().animate({
						opacity: 1,
						top: 0
					}, indexInArray*delayFactor);
				});
			}
		};
		$(".social-share").each(function(){
			var $elem = $(this),
				direction = "top";
			//deActive all the social-share items
			if ($elem.hasClass("bottom")){
				direction = "bottom";
				deActivate($elem, direction);
			}else{
				deActivate($elem, direction);
			}
			//handle clicks
			$elem.find(".trigger").click(function(){
				$elem = $(this).parent(".social-share");
				if ($elem.hasClass("in-active")){
					if ($elem.hasClass("bottom")){
						direction = "bottom";
						activate($elem, direction);
					}else{
						activate($elem, direction);
					}
				}else{
					if ($elem.hasClass("bottom")){
						direction = "bottom";
						deActivate($elem, direction);
					}else{
						deActivate($elem, direction);
					}
				};
			});
		});
	};
	//*********** Social Shares End *******//


	//*********** Sync columns height Begin *******//
	var syncHeight={
		init:function($refEl){
			this.$refEl=$refEl;
			this.fullWidthMargin=60;
			var $syncChilds=this.$refEl.find('.sync-me');

			if (!$syncChilds.length){
				$syncChilds=$refEl.children();
			}
			this.$elems=$syncChilds;

			if (!this.checkFullWidth()){
				this.sync();
			}
			this.bindUIActions();
		},
		sync:function(){
			this.$elems.outerHeight(this.$refEl.outerHeight());
		},
		destroy:function($elems){
			$elems.css('height','');
		},
		bindUIActions:function(){
			var self=this;

			$(window).on('debouncedresize',function(){
				self.destroy(self.$elems);
				if (!self.checkFullWidth()){
					self.sync();
				}
			});
		},
		checkFullWidth:function(){
			var self=this;
			return (self.$refEl.outerWidth()-self.$elems.first().outerWidth()<=self.fullWidthMargin);
		}
	};
	//*********** Sync columns height End *******//



	//*********** Extendable backgrounds Begin *******//
	var extendBg={
		init:function($wrapper){
			this.$wrapper=$wrapper;
			this.$extendableElem=$wrapper.find('.extend-left,.extend-right');
			this.$targetCols=this.$extendableElem.parent();
			this.$columns=$wrapper.children();
			this.fullWidthMargin=30;


			this.extendCore();
			this.bindUIActions();
		},
		extendCore:function(){
			
			if(this.checkFullWidth()){
				this.destroy();
			}else{
				syncHeight.init(this.$wrapper);
				this.extendWidth(this.$extendableElem);	
			}
		},
		extendWidth:function($el){
			var self=this,
				elWidth=$el.css('width','').width(),
				sideMargin;

			if ($el.hasClass('.extend-right')){
				//Extend it to the right side of window
				sideMargin=$(window).width()-($el.offset().left+elWidth);
			}else{
				//Extend it to the left side of window
				sideMargin=$el.offset().left;
			}

			$el.width(elWidth+sideMargin);

		},
		destroy:function(){
			syncHeight.destroy(this.$columns);
			setBg.destroy(this.$wrapper.find('.set-bg'));
			
			this.$extendableElem.css('width','');
			this.$wrapper.addClass('extend-destroy');
		},
		checkFullWidth:function(){
			var self=this;
			return (self.$wrapper.width()-self.$targetCols.first().width()<=self.fullWidthMargin);
		},
		bindUIActions:function(){
			var self=this;

			$(window).on('debouncedresize',function(){
		        if(self.checkFullWidth()){
					//extendable column is fullwidth so we should destroy the whole thing
					self.destroy();

				}else{

					//Redo the math
					self.$wrapper.removeClass('extend-destroy');
					self.extendCore();
					setBg.init(self.$wrapper.find('.set-bg'));
					//self.$wrapper.find('.owl-videobg').owlVideoBg('update');
				}
		    });
				
		}
	};
	//*********** Extendable backgrounds Begin *******//


	//*********** Retina Images Handler Begin *******//
	var retina={
		init:function($elem){
			this.$elem=$elem;
			this.retinaSuffix="@2x";
			
			if (!isRetinaDisplay()) return false;
			var self=this,
				imgSrc=$elem.attr('src');

			if (!imgSrc) return false;

			//Generate retina image path based on the suffix
			var retinaSrc=imgSrc.replace(/\.(?!.*\.)/, self.retinaSuffix +".");

			//check if there is any retina verison of the image 
			this.preload(retinaSrc,function(retinaImg){
				if(retinaImg){
					self.setRetina(retinaImg);
				}else{
					console.warn('Error loading the retina image');
					return false;
				}
			});
		},
		preload:function(imgSrc,callback){
			var img = new Image();
			img.src = imgSrc;
			img.onerror=function(){
				return callback(false);
			};
			img.onload = function() {
				return callback(img);
			};
		},
		setRetina:function(retinaImg){
			var self=this;

			self.$elem.attr('src',retinaImg.src);
			var noDimensionFlg=isNaN(parseInt(self.$elem.attr('width')))&&isNaN(parseInt(self.$elem.attr('height')));
			if (noDimensionFlg){
				self.$elem.attr('width',retinaImg.width/2);
				self.$elem.attr('height',retinaImg.height/2);
			}
		}
	};
	//*********** Retina Images Handler End *******//

	

	//*********** Cover Images in a Container Begin *******//
	var imageFill={
			
	  init:function($container,callback){
	    this.container=$container;
	    this.setCss(callback);
	    this.bindUIActions();

	  },
	  setCss:function(callback){
	    $container=this.container;
	    $container.imagesLoaded(function(){
	      var containerWidth=$container.width(),
	        containerHeight=$container.height(),
	        containerRatio=containerWidth/containerHeight,
	        imgRatio;

	      $container.find('img').each(function(){
	        var img=$(this);
	        imgRatio=img.width()/img.height();
	        
	        if (img.css('position')=='static'){
	        	img.css('position','relative');
	        };
	        if (containerRatio < imgRatio) {
	          // taller
	          img.css({
	              width: 'auto',
	              height: containerHeight,
	              top:0,
	              left:-(containerHeight*imgRatio-containerWidth)/2
	            });
	        } else {
	          // wider
	          img.css({
	              width: containerWidth,
	              height: 'auto',
	              top:-(containerWidth/imgRatio-containerHeight)/2,
	              left:0
	            });
	        };
	      });
	      if (typeof(callback) == 'function'){
	      	callback();
	      };
	    });
	  },
	  bindUIActions:function(){
	    var self=this;
	    $(window).on('debouncedresize',function(){
	        self.setCss();
	    });
	  }
	};
	//*********** Cover Images in a Container End *******//



	//*********** Search Handler Begin *******//
	var searchHandler={
		init:function($elem){
			this.$elem=$elem;
			this.$searchArea=$('.search-area');
			this.customAnimFlg=this.$searchArea.hasClass('fullscreen');

			this.bindUIActions();
			
		},
		bindUIActions:function(){
			var self=this;

			self.$elem.children('a').on('click', function(e){
				e.preventDefault();
				self.displayArea('show');
			});

			self.$searchArea.find('.close-btn').on('click',function(e){
				e.preventDefault();
				self.displayArea('hide');
			});

			$(document).keyup(function(e) {
				if (e.keyCode == 27) {
					if (self.$searchArea.hasClass("is-visible")) self.displayArea('hide');
				}
			});
		},
		displayArea:function(mode){
			var self=this;

			if (mode=='show'){
				self.$searchArea.toggleClass('is-visible');
			}else{
				self.$searchArea.removeClass('is-visible');
			}

			self.animateArea(mode);
		},
		animateArea:function(mode){
			var self=this;

			if (!self.customAnimFlg) return;

			if (mode=='show'){
				self.$searchArea.velocity({opacity:1,top:0},{display:"block",duration:200});
			}else{
				self.$searchArea.velocity({opacity:0,top:-150},{display:"none",duration:5});
			}
		}
	};
	//*********** Search Handler End *******//

	//*********** Slider Revolution manual ready event *******//

	//*********** Sticky Header Offset Begin *********//
	function setStickyOffset(){
		var offset=0;
		//calc offset top for fixing head items
		if ($("body").hasClass('sticky-header')){
			var $header=$('#header');


			$header = $header.addClass("is-sticky no-transition");
			offset+=$header.outerHeight();
			$header.removeClass('is-sticky no-transition');
		}
		
		window.olStickyOffset=offset;
	};
	//*********** Sticky Header Offset End *********//

	//check if all parallaxes are done
	function checkParallaxesState(){

		if (window.olParallaxController == undefined){
			window.olParallaxController={};
			window.olParallaxController.ready=false;
			window.olParallaxController.num=$('.parallax-layer').length;
			window.olParallaxController.progress=1;
		}
		window.olParallaxController.progress++;
		if ( window.olParallaxController.progress == window.olParallaxController.num){
			window.olParallaxController.ready=true;
			return true
		}
		return false;
	};
	
	
	//*********** Init Handler for all Functions *******//
	var initRequired={
		init:function(){
			$.og={
				$body:$('body'),
				$header:$('#header'),
				$window:$(window),
				isTouchDevice:olIsTouchDevice()
			};

			this.runMethods();
			this.runInlines();
		},
		runMethods:function(){
			//initialize all required functions here

			createObjInstance('#primary-menu',olmenu);
			searchHandler.init($('.ol-search-trigger'));
			setStickyOffset();
			logoHandler.init();
			socialShare();

			
			if ($.og.$body.hasClass("sticky-header"))
				stickyHeader.init();


			// Initialize plugins that can have multiple instance on same page	
			createObjInstance('img.ol-retina',retina);
			createObjInstance('.extend-bg-wrapper',extendBg);
			createObjInstance('.sync-cols-height',syncHeight);
			createObjInstance('.set-bg',setBg);
			createObjInstance('.ol-accordion',accordion);
			createObjInstance('.ol-side-navigation',accordion,{
				itemSelector:'li',
				headSelector:'a',
				bodySelector:'.sub-menu',
				activeClass:'active',
				initActiveClass:'current-menu-parent',
				toggleElemClass : ".menu-item-has-children",
				toggleEl:'<span class="ol-toggle">'
			});
			createObjInstance('.ol-tab',tabs);
			createObjInstance('.ol-grid',olGrid);

		},
		runInlines:function(){
			//Run Inline functions Here


			//*********** Remove title from nav links *********//
			$("#header #nav a").attr('title','');

			//*********** Tooltips *********//
			$('[data-toggle="tooltip"]').tooltip();


			//*********** Google Map *********//
			var $gmap = $("#gmap , .gmap"); 
			if ($gmap.length > 0){
				$gmap.each(function(){
					var $gmap=$(this);
					var address= $gmap.attr('data-address') || 'Footscray VIC 3011 Australia';

					$gmap.gmap3({
					  map: {
					      options: {
					          maxZoom:15,
					          disableDefaultUI: true
					      }
					  },
					  styledmaptype: {
					      id: "mystyle",
					      options: {
					          name: "Style 1"
					      },
					      styles: [
					          {
					              featureType: "all",
					              stylers: [
					                  {"saturation": -100}, {"gamma": 0.9}
					              ]
					          }
					      ]
					  },
					  overlay:{
					    //Edit following line and enter your own address
					    address: address,
					    options:{
					      content: '<div id="map-marker"></div>',
					      offset:{
					        y:-100,
					        x: -25
					      }
					    }
					    },//Following maxZoom option is for setting the initial zoom of google map
						  autofit:{maxZoom: 15}
						},"autofit");

					$gmap.gmap3('get').setMapTypeId("mystyle");
				});
			}

			//*********** Search Filter *********//
			$(".search-box").each(function(){
				var $this = $(this);
				var $filters=$this.children(".filters");
				var $toggle = $this.find(".toggle-filter").first();

				$toggle.on('click',function(e){

					e.preventDefault();
					$this.toggleClass('fill-it');
					$filters.slideToggle();
				});

			});

			
			//*********** Type Writter *********//
			$(".ol-text-rotate").each(function(){
				var $this = $(this);
				var sentences = $this.data('words') || {};
				var arrayOfSentences = $.map(sentences, function(value, index) {
					return [value];
				});
				
				$(this).typed({
					strings: arrayOfSentences,
					typeSpeed: 100,
					backDelay: 1000,
					loop: true,
				});

			});

			//*********** Selectize and Datepicker *********//
			
			var $selectized = $(".selectize").selectize();

			var $datepickers = $(".pickdate").pickadate();

			$('.clear-selectize').on('click',function(e){
				
				e.preventDefault();
				
				$datepickers.each(function(i){
					var picker = $(this).pickadate('picker').clear();
				});
				$selectized.each(function(i){
					$selectized[i].selectize.clear();
				});

				//clear all inputs 
				$('.filters').find(":input").val('');
				
			});

			//*********** carousel *********//
			$(".owl-carousel.items").each(function() {
				var $this = $(this);
				
				var $cols_xxs = $this.data('cols-xxs') 	|| 1;
				var $cols_xs  = $this.data('cols-xs')  	|| 1;
				var $cols_sm  = $this.data('cols-sm')  	|| 2;
				var $cols_md  = $this.data('cols-md')  	|| 3;
				var $cols_lg  = $this.data('cols') 	|| 4;
				var $cols_lg  = $this.data('cols-lg')  	|| $cols_lg;

				if( $this.data('cols-all') ){
					$cols_lg = $cols_md = $cols_sm = $cols_xs = $cols_xxs = $this.data('cols-all');
				}
				
				
				$this.owlCarousel({
				 	items : $cols_lg,
				 	responsive : {
				 	    0 : {
				 	        items: $cols_xxs
				 	    },
				 	    480 : {
				 	        items: $cols_xs
				 	    },
				 	    768 : {
				 	         items: $cols_sm
				 	     },
				 	    992 : {
				 	        items: $cols_md,
				 	    },
				 	    1200 : {
				 	    	items: $cols_lg
				 	    }
				 	},
					autoplay : true,
					dots : $this.data('dots') || false,
					nav : $this.data('nav') || false,
					mouseDrag : true,
				 	stopOnHover : true,
				 	slideSpeed : $this.data('slidespeed') || 2000,
				 	paginationSpeed : $this.data('paginationspeed') || 2000,
				 	rewindSpeed : $this.data('rewindspeed') || 1100,
				 	margin: $this.data('margin') || 0,
				 	callbacks: true,
				 	autoplayHoverPause: true,
				 	autoplayTimeout: $this.data('autoplaytime') || 3000,
				 	loop: $this.data('loop') || false,
				 });
			});

			//*********** countdown *********//
			$('.ol-countdown').each(function(){
				var $this = $(this),
				finalDate = $this.data('countdown');

				$this.countdown(finalDate, function(event) {
					var $this = $(this).html(event.strftime(''
					+ '<div>%w<span>weeks</span></div>'
					+ '<div>%d<span>days</span></div>'
					+ '<div>%H<span>hours</span></div>'
					+ '<div>%M<span>minuets</span></div>'
					+ '<div>%S<span>seconds</span></div>'));
				});
			});

		}
	};
	//*********** Init Handler for all Functions *******//


	//Run methods on DOM Ready
	$(document).ready(function(){
		initRequired.init();
	});

	
})(jQuery);



//*********** Utility Functions Begin *******//

//Object Create function
if ( typeof Object.create !== 'function'  ){ // browser dose not support Object.create
    Object.create = function (obj){
        function F(){};
        F.prototype = obj;
        return new F();
    };
};

//Create Object Instance
function createObjInstance(selector,objName,options){
	$(selector).each(function(){
		var obj = Object.create( objName ); 
        	obj.init($(this),options);
        	
	});	
}


//Check for Retina devices
function isRetinaDisplay() {
    if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        return (mq && mq.matches || (window.devicePixelRatio > 1)); 
    }
}

//Check for Touch devices
function olIsTouchDevice(){
	var agent = navigator.userAgent.toLowerCase(),
		isChromeDesktop = (agent.indexOf('chrome') > -1 && ((agent.indexOf('windows') > -1) || (agent.indexOf('macintosh') > -1) || (agent.indexOf('linux') > -1)) && agent.indexOf('mobile') < 0 && agent.indexOf('android') < 0);
	return ('ontouchstart' in window && !isChromeDesktop);
}



//*********** Utility Functions End *******//

function getAllMethods(object) {
    return Object.getOwnPropertyNames(object).filter(function(property) {
        return typeof object[property] == 'function';
    });
}

