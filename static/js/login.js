$(document).ready(function(){

  $('#css-menu > ul > li ul').each(function(index, e){
    var count = $(e).find('li').length;
    var content = '<span class="cnt">' + count + '</span>';
    $(e).closest('li').children('a').append(content);
  });

  $('#css-menu ul ul li:odd').addClass('odd');
  $('#css-menu ul ul li:even').addClass('even');
  
  $('#css-menu > ul > li > a').click(function() {

    $('#css-menu li').removeClass('active');
    $(this).closest('li').addClass('active'); 

    var checkElement = $(this).next();

    if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
      $(this).closest('li').removeClass('active');
      checkElement.slideUp('normal');
    }

    if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
      $('#css-menu ul ul:visible').slideUp('normal');
      checkElement.slideDown('normal');
    }
    if($(this).closest('li').find('ul').children().length == 0) {
      return true;
    } else { return false;}   
  });
});
