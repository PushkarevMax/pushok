
$(document).ready(function() {
	$(".js_scroll_to").click(function() {
		var link = $(this).data('link');
		var offsetTop = $('.'+link).offset().top;
		$('html, body').animate({
			scrollTop: offsetTop -=180
		}, 1000);
		return false;
	});

	$(document).on('scroll', function() {
		var scroll = $(document).scrollTop();
		var width = $(window).width();
		if (scroll >= 715 && width >= 960) {
			$('nav').addClass('fixed');
		} else {
			$('nav').removeClass('fixed')
		}
	});

	$('.js-pag').on('click', function() {
		$('.js-pag').removeClass('active');
		$(this).addClass('active');

		var pag = $(this).html();
		$('.js-portfolio').removeClass('fadein').addClass('fadeout');
		$('.js-portfolio[data-page = '+ pag +']').removeClass('fadeout').addClass('fadein');
	});

    $('#send').click(function(e){
        e.preventDefault();

        var error = false;
        var name = $('#name').val();
        var email = $('#email').val();
        var sub = $('#sub').val();
        var message = $('#message').val();

        if(name.length == 0) {
            var error = true;
            $('#name').addClass('error');
        } else {
            $('#name').removeClass('error');
        }
        if(email.length == 0 || email.indexOf('@') == '-1') {
            var error = true;
            $('#email').addClass('error');
        } else {
            $('#email').removeClass('error');
        }
        if(sub.length == 0) {
            var error = true;
            $('#sub').addClass('error');
        } else {
            $('#sub').removeClass('error');
        }
        if(message.length == 0) {
            var error = true;
            $('#message').addClass('error');
        } else {
            $('#message').removeClass('error');
        }

        if(error == false){

            $.post("sendmail.php", $("#contact_form").serialize(),function(result){
                if(result == 'sent') {
                    $('#send').remove();
                    $('.send_success').fadeIn(500);
                } else {
                    $('.send_fail').fadeIn(500);
                }
            });
        }
    });
});