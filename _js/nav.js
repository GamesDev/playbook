$(function() {
  $('#navigation .body > ul:first-child > li:first-child a').addClass('active');

  $('#content .toggle').click(function () {
    if ($('body').hasClass('collapsed')) {
      $('body').removeClass('collapsed');
    }
    else {
      $('body').addClass('collapsed');
    }
  });
});
