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
	if (codingBtn && drawingBtn && codingProjects && drawingProjects) {
		// start with none visible
		codingProjects.style.display = 'none';
		drawingProjects.style.display = 'none';

		codingBtn.addEventListener('click', function() {
			codingProjects.style.display = 'block';
			drawingProjects.style.display = 'none';
			codingBtn.classList.add('primary');
			drawingBtn.classList.remove('primary');
		});

		drawingBtn.addEventListener('click', function() {
			codingProjects.style.display = 'none';
			drawingProjects.style.display = 'block';
			drawingBtn.classList.add('primary');
			codingBtn.classList.remove('primary');
		});
	}

	// Cycle through words every 4 seconds
	var words = ['creative', 'driven', 'strategic', 'designer'];
	var currentWordIndex = 0;
	var wordElement = document.getElementById('changing-word');
	
	if (wordElement) {
		setInterval(function() {
			currentWordIndex = (currentWordIndex + 1) % words.length;
			wordElement.textContent = words[currentWordIndex];
		}, 4000);
	}

	// Add fade-in effect to sections on scroll
	var sections = document.querySelectorAll('section');
	var fadeInObserver = new IntersectionObserver(function(entries) {
		entries.forEach(function(entry) {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, { threshold: 0.1 });

	sections.forEach(function(section) {
		section.style.opacity = '0';
		section.style.transform = 'translateY(20px)';
		section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
		fadeInObserver.observe(section);
	});

	// Add smooth button hover scale effect
	var buttons = document.querySelectorAll('.button');
	buttons.forEach(function(btn) {
		btn.addEventListener('mouseenter', function() {
			this.style.transform = 'scale(1.05)';
			this.style.transition = 'transform 0.3s ease';
		});
		btn.addEventListener('mouseleave', function() {
			this.style.transform = 'scale(1)';
		});
	});

});