$(function() {
  var url = window.location.pathname.replace(/\/$/, '');
  $('#navigation a').each(function(){
    var href= $(this).attr('href');
    if (href != '/') {
      var match = new RegExp("^"+ href.replace(/\/$/, ''), 'i');
      if (match.test(url)) {
        $(this).addClass('active');
      }
    }
    else {
      if (url == '') $(this).addClass('active');
    }
  });
});
