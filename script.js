/* ════════════════════════════════════════════
   FEATURE 1: NAVBAR SCROLL EFFECT
   PURPOSE: Makes the navbar add a shadow when
   the user scrolls down the page, making it
   look like it is floating above the content.
   ════════════════════════════════════════════ */

window.addEventListener('scroll', function () {
  var nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.boxShadow = '0 2px 12px rgba(0,0,0,0.35)';
    nav.style.transition = 'box-shadow 0.3s ease';
  } else {
    nav.style.boxShadow = 'none';
  }
});


/* ════════════════════════════════════════════
   FEATURE 3: SCROLL ANIMATIONS — FADE & SLIDE
   PURPOSE: As the user scrolls down the page,
   sections and cards smoothly fade in and slide
   in from the left or right. This makes the
   website feel modern and polished.
   ════════════════════════════════════════════ */

window.addEventListener('load', function () {

  /* Select all elements we want to animate */
  var targets = document.querySelectorAll(
    '.card, .dest-card, .pkg-card, .value-card, ' +
    '.two-col .col, .section-title, .dest-card-body, ' +
    '.partner-box, form'
  );

  /* Hide all target elements at start */
  targets.forEach(function (el) {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  /* Check which elements are visible on screen */
  function checkVisibility() {
    targets.forEach(function (el, i) {
      var rect      = el.getBoundingClientRect();
      var isVisible = rect.top < window.innerHeight - 80;

      if (isVisible && el.style.opacity === '0') {

        /* Delay each element slightly so they animate one after another */
        var delay = (i % 4) * 100;

        setTimeout(function () {
          /* Alternate — even elements slide from left, odd from right */
          if (i % 2 === 0) {
            el.style.transform = 'translateX(-30px)';
          } else {
            el.style.transform = 'translateX(30px)';
          }

          /* Small delay then fade in to final position */
          setTimeout(function () {
            el.style.opacity   = '1';
            el.style.transform = 'translate(0, 0)';
          }, 50);

        }, delay);
      }
    });
  }

  /* Run on scroll and also on page load */
  window.addEventListener('scroll', checkVisibility);
  checkVisibility();
});


/* ════════════════════════════════════════════
   FEATURE 4: CARD HOVER LIFT EFFECT
   PURPOSE: When the user hovers over any card
   on the website it lifts up slightly with a
   shadow. This gives visual feedback that the
   card is clickable and interactive.
   ════════════════════════════════════════════ */

window.addEventListener('load', function () {

  var cards = document.querySelectorAll(
    '.card, .pkg-card, .dest-card, .value-card'
  );

  cards.forEach(function (card) {

    card.addEventListener('mouseenter', function () {
      this.style.transform  = 'translateY(-8px)';
      this.style.boxShadow  = '0 12px 30px rgba(0,0,0,0.15)';
      this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });

  });
});


/* ════════════════════════════════════════════
   FEATURE 5: IMAGE SLIDESHOW / GALLERY
   PURPOSE: If your page has a slideshow
   element with class "slideshow", this code
   automatically cycles through the images
   every 4 seconds. Users can also click the
   arrows to go forwards or backwards.

   To use: wrap your images in a div with
   class="slideshow" and add this HTML:

   <div class="slideshow">
     <img src="image1.jpg" alt="Slide 1"/>
     <img src="image2.jpg" alt="Slide 2"/>
     <img src="image3.jpg" alt="Slide 3"/>
     <button class="slide-prev">&#8592;</button>
     <button class="slide-next">&#8594;</button>
   </div>
   ════════════════════════════════════════════ */

window.addEventListener('load', function () {

  var slideshow = document.querySelector('.slideshow');
  if (!slideshow) return;

  var slides  = slideshow.querySelectorAll('img');
  var current = 0;

  /* Hide all slides first */
  slides.forEach(function (slide) {
    slide.style.display = 'none';
  });

  /* Show the first slide */
  slides[current].style.display = 'block';

  /* Function to go to next slide */
  function nextSlide() {
    slides[current].style.display = 'none';
    current = (current + 1) % slides.length;
    slides[current].style.display = 'block';
  }

  /* Function to go to previous slide */
  function prevSlide() {
    slides[current].style.display = 'none';
    current = (current - 1 + slides.length) % slides.length;
    slides[current].style.display = 'block';
  }

  /* Auto-advance every 4 seconds */
  var autoPlay = setInterval(nextSlide, 4000);

  /* Next button */
  var nextBtn = slideshow.querySelector('.slide-next');
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      clearInterval(autoPlay);
      nextSlide();
      autoPlay = setInterval(nextSlide, 4000);
    });
  }

  /* Previous button */
  var prevBtn = slideshow.querySelector('.slide-prev');
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      clearInterval(autoPlay);
      prevSlide();
      autoPlay = setInterval(nextSlide, 4000);
    });
  }

});


/* ════════════════════════════════════════════
   FEATURE 6: SMOOTH SCROLL FOR ANCHOR LINKS
   PURPOSE: When a user clicks a link that
   goes to a section on the same page (e.g.
   href="#contact"), the page smoothly scrolls
   down to that section instead of jumping.
   ════════════════════════════════════════════ */

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


/* ════════════════════════════════════════════
   FEATURE 7: FORM VALIDATION
   PURPOSE: When the user clicks Submit on the
   booking form, JavaScript checks that:
   - All required fields are filled in
   - The email address is in the correct format
   If something is wrong it shows an alert.
   If everything is correct it confirms the
   submission and clears the form.
   ════════════════════════════════════════════ */

var bookingForm = document.getElementById('bookingForm');

if (bookingForm) {

  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    /* Get all field values */
    var name   = document.getElementById('fullname').value.trim();
    var email  = document.getElementById('email').value.trim();
    var phone  = document.getElementById('phone').value.trim();
    var dest   = document.getElementById('destination').value;
    var date   = document.getElementById('traveldate').value;
    var guests = document.getElementById('guests').value;

    /* Check all required fields are filled */
    if (!name || !email || !phone || !dest || !date || !guests) {
      alert('Please fill in all required fields marked with *');
      return;
    }

    /* Check email format is valid */
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address e.g. name@email.com');
      return;
    }

    /* Check travel date is in the future */
    var today     = new Date();
    var travelDay = new Date(date);
    if (travelDay <= today) {
      alert('Please select a travel date in the future.');
      return;
    }

    /* Check number of guests is valid */
    if (guests < 1 || guests > 50) {
      alert('Please enter a valid number of guests between 1 and 50.');
      return;
    }

    /* All checks passed — show success message */
    alert(
      'Thank you, ' + name + '!\n\n' +
      'Your booking enquiry has been submitted successfully.\n' +
      'We will contact you at ' + email + ' within 24 hours.'
    );

    /* Clear the form */
    bookingForm.reset();

  });

}
