/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});

})(jQuery);

document.addEventListener('DOMContentLoaded', function() {
	var codingBtn = document.getElementById('show-coding');
	var drawingBtn = document.getElementById('show-drawing');
	var codingProjects = document.getElementById('coding-projects');
	var drawingProjects = document.getElementById('drawing-projects');
	var placeholder = document.getElementById('projects-placeholder');

	function showNone() {
		if (codingProjects) codingProjects.style.display = 'none';
		if (drawingProjects) drawingProjects.style.display = 'none';
		if (placeholder) placeholder.style.display = 'block';
	}

	function showCoding() {
		if (codingProjects) codingProjects.style.display = 'block';
		if (drawingProjects) drawingProjects.style.display = 'none';
		if (placeholder) placeholder.style.display = 'none';
		codingBtn.classList.add('primary');
		drawingBtn.classList.remove('primary');
	}

	function showDrawing() {
		if (codingProjects) codingProjects.style.display = 'none';
		if (drawingProjects) drawingProjects.style.display = 'block';
		if (placeholder) placeholder.style.display = 'none';
		drawingBtn.classList.add('primary');
		codingBtn.classList.remove('primary');
	}

	if (codingBtn && drawingBtn && codingProjects && drawingProjects) {
		// start with none visible
		showNone();

		codingBtn.addEventListener('click', showCoding);
		drawingBtn.addEventListener('click', showDrawing);
	}

	// Header-focused follower and avatar parallax
	var headerEl = document.getElementById('header');
	if (headerEl && !('ontouchstart' in window)) {
		var follower = document.createElement('div');
		follower.className = 'header-follower';
		headerEl.style.position = 'relative';
		headerEl.appendChild(follower);

		var mouseX = 0, mouseY = 0, posX = 0, posY = 0;

		headerEl.addEventListener('mousemove', function(e) {
			var r = headerEl.getBoundingClientRect();
			mouseX = e.clientX - r.left;
			mouseY = e.clientY - r.top;
			follower.style.left = mouseX + 'px';
			follower.style.top = mouseY + 'px';

			// Parallax avatar
			var img = headerEl.querySelector('.image.avatar img');
			if (img) {
				var cx = (mouseX / r.width - 0.5) * 12; // px
				var cy = (mouseY / r.height - 0.5) * 12;
				img.style.transform = 'translate(' + cx + 'px,' + cy + 'px) scale(1.02)';
			}
		});

		headerEl.addEventListener('mouseleave', function() {
			follower.style.opacity = '0';
			var img = headerEl.querySelector('.image.avatar img');
			if (img) img.style.transform = '';
		});

		headerEl.addEventListener('mouseenter', function() {
			follower.style.opacity = '0.95';
		});

		(function animate() {
			posX += (mouseX - posX) * 0.15;
			posY += (mouseY - posY) * 0.15;
			follower.style.transform = 'translate3d(' + (posX - mouseX) + 'px,' + (posY - mouseY) + 'px,0)';
			requestAnimationFrame(animate);
		})();
	}

});