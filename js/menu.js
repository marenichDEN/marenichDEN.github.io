

$(document).ready(function(){
$(window).scroll(function() {
var top = $(document).scrollTop();
if (top < 1005) $("#menu").css({top: '0', position: 'relative', width:'100%'});
else $("#menu").css({top: '0', position: 'fixed', width:'100%'});
});
});


