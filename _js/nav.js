$(function() {
  $('#content .toggle').click(function () {
    if ($('body').hasClass('collapsed')) {
      $('body').removeClass('collapsed');
    }
    else {
      $('body').addClass('collapsed');
    }
  });
});
