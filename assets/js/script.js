$(document).ready(function () {
  // Menu toggle for responsive navigation
  $('#menu').click(function () {
      $(this).toggleClass('fa-times');
      $('.navbar').toggleClass('nav-toggle');
  });

  // Handle scroll events for navbar and sections
  $(window).on('scroll load', function () {
      $('#menu').removeClass('fa-times');
      $('.navbar').removeClass('nav-toggle');

      if (window.scrollY > 60) {
          document.querySelector('#scroll-top').classList.add('active');
      } else {
          document.querySelector('#scroll-top').classList.remove('active');
      }

      // Highlight active section in navbar
      $('section').each(function () {
          let height = $(this).height();
          let offset = $(this).offset().top - 200;
          let top = $(window).scrollTop();
          let id = $(this).attr('id');

          if (top > offset && top < offset + height) {
              $('.navbar ul li a').removeClass('active');
              $('.navbar').find(`[href="#${id}"]`).addClass('active');
          }
      });
  });

  // Smooth scrolling for internal links only
  $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      const target = $(this).attr('href');
      if (target && $(target).length) {
          $('html, body').animate({
              scrollTop: $(target).offset().top,
          }, 500, 'linear');
      }
  });

  // Allow external links (e.g., LinkedIn, GitHub) to work normally
  $('a[href^="http"]').on('click', function (e) {
      // Let the browser handle external links
      window.open($(this).attr('href'), '_blank');
  });

  // Form submission handler
  $("#contact-form").submit(function (event) {
      emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

      emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
          .then(function (response) {
              console.log('SUCCESS!', response.status, response.text);
              document.getElementById("contact-form").reset();
              alert("Form Submitted Successfully");
          }, function (error) {
              console.log('FAILED...', error);
              alert("Form Submission Failed! Try Again");
          });
      event.preventDefault();
  });
});
