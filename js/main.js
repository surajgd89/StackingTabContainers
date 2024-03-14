$(document).ready(function () {
    var tabs_Top = parseInt($('.tabs').css('top'), 10);
    var tabs_Height = $('.tabs').outerHeight(true) + tabs_Top;

    function highlightTab(scroll_Top) {
        $('.tab-content:not(.blank)').each(function (index, element) {
            var target_Top = $(this).offset().top - tabs_Height;
            var target_Bottom = target_Top + $(this).outerHeight(true);

            if (scroll_Top >= target_Top && scroll_Top < target_Bottom) {
                var id = $(this).attr('id');
                $('.tab-link').removeClass('active');
                $('.tab-link[href="#' + id + '"]').addClass('active');
                $(this).addClass('active');
                $(this).css({
                    top: tabs_Height,
                });
            }
        });
    }

    $(window).on('scroll', function () {
        var scroll_Top = $(window).scrollTop();
        highlightTab(scroll_Top);
    });

    $('.tab-link').on('click', function (e) {
        e.preventDefault();
        var target = $($(this).attr('href'));
        var scroll_Top = target.offset().top - tabs_Height;

        highlightTab(scroll_Top);

        $('html, body').animate(
            {
                scrollTop: scroll_Top,
            },
            500
        );
    });
});
