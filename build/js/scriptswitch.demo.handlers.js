(function($){

	// Make sure the two cols are the same height

		// function maxHeight(el) {
		// 	return Math.max.apply(null, $(el).map(function(){return $(this).height();
		// 	}).get());
		// }

		// $(".main-content-inner-col").css({
		// 	"height" : maxHeight(".main-content-col")
		// });

	// Expand the height of the columns to fit the vertical height

		// Left col = viewport - header - maincontent(margin) - tabs - view-select - pagination - base buttons

		function LeftColResize(){
			this.vH = window.innerHeight || $(window).height(); // Use DOM API if available, otherwise fallback to jQuery (IE8)
			this.hH = $("header#header").outerHeight(true);
			this.mCM = $("#main-content").outerHeight(true) -  $("#main-content").height();
			this.sTH = $("#sub-tabs").outerHeight();
			this.sTHH = $(".subtab-header").outerHeight();
			this.vSH = $(".view-select").outerHeight();
			this.sPH = $(".switch-pagination").outerHeight();
			this.bBH = $(".base-buttons").outerHeight();
			this.sColEl = $(".dynamic-left-col");
			this.tEH = $(".template-editor").outerHeight(true) + 2; // Border hack
			this.switchCol = function(){
				return this.vH - this.hH - this.sTH - this.sTHH - this.vSH - this.sPH - this.bBH - this.mCM - this.tEH;
			}
			this.resizeLeftCol = function() {
				this.sColEl.css({
					"height" : this.switchCol()
				});
				this.reinitializeScroll();
			}
			this.reinitializeScroll = function(){
				$(".scrollbar").jScrollPane({
					verticalGutter: 0
				});
			}
		}

		function RightColResize(){
			this.sFCH = $(".switch-form-controls").outerHeight(true);
			this.dFCH = $(".deploy-form-controls").outerHeight(true);
			this.sFEl = $(".dynamic-right-col");
			this.tSH = $(".tag-switch").height();
			this.pSH = $(".product-search").outerHeight(true);
			this.tHH = ($(".template-header").outerHeight(true) + 2); // Border hack
			this.oH = $(".options").outerHeight(true);
			this.tCH = $(".main-content-col.last .base-buttons").outerHeight(true);
			this.wysiwyg = $(".wysiwyg-placeholder");
			this.prototype = new LeftColResize();
		}

		RightColResize.prototype = new LeftColResize();

		// Add form resize method
		RightColResize.prototype.sFormColHeight = function(){
			return (this.vH- this.mCM - this.hH - this.sFCH - this.dFCH - this.tHH - this.tCH);
		}

		RightColResize.prototype.sFormResize = function(){
			this.sFEl.css({
				"height" : this.sFormColHeight()
			});
			this.wysiwygResize();
		}

		RightColResize.prototype.wysiwygResize = function(){
			this.wsyiwygH = this.sFormColHeight() - this.tSH - this.sFCH - this.pSH - this.oH + 30; // 30 for padding and margins
			this.wysiwyg.css({
				"height" : this.wsyiwygH
			});
		}

		var leftCol = new LeftColResize();
		// Resize and reinitialize scrollbar
		leftCol.resizeLeftCol();

		var rightCol = new RightColResize();
		rightCol.sFormResize();


	// Deal with onclick for custom dropdowns and initialise scrollbar

		$(".scriptswitch-select-selected-option").click(function(){
			// Toggle display
			$(this).parent().toggleClass("open");
			// See if we have to open the scroll
			$(".scriptswitch-select-multi .scriptswitch-select-options-inner").jScrollPane({
				verticalGutter: 0
			});
			$(".scriptswitch-select-single .scriptswitch-select-options").jScrollPane({
				verticalGutter: 0
			});
		});


		$(document).ready(function() {

			// Custom scrollbar

			$(".dynamic-left-col, .scrollbar").jScrollPane({
				verticalGutter: 0
			});

			// Button method status

			$("button, .button, .scriptswitch-checkbox").click(function(){
				$(this).toggleClass("active");
			});
		});

})(jQuery);