$('* span').each(function () {
  var item = $(this).text();
  var num = Number(item).toLocaleString('en');

  $(this).text(num);
});
