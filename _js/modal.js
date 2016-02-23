$(function() {
  $(document).keyup(function(e) {
    if (e.keyCode == 27) { hideModal(); }
  });

  $('#modal .close').click(hideModal);

  function showModal() {
    $('body').addClass('modal');
  }

  function hideModal() {
    $('body').removeClass('modal');
  }
});
