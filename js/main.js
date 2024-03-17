$(document).ready(function () {
    let tabsHeight =
        $('.tabs').outerHeight(true) + parseInt($('.tabs').css('top'), 10);

    $('.tab-content').each(function (index, element) {
        let tabContent = $(this);
        let targetTop = tabContent.offset().top;

        if (index !== 0) {
            tabsHeight += 15;
        }

        $(this).css({ top: tabsHeight });
        $(this).attr('target-top', targetTop);
        $(this).attr('sticky-top', tabsHeight);
    });

    let lastTabIndex = $('.tab-content').length - 1;
    const initialColor = [203, 227, 232];

    $(window).on('scroll', function () {
        let scrollTop = $(window).scrollTop();
        $('.tab-content').each(function (index) {
            let tabContent = $(this);
            let targetTop = tabContent.offset().top - tabsHeight;
            let targetBottom = targetTop + tabContent.outerHeight(true);
            let activeRange = tabContent.outerHeight(true) - tabsHeight;
            if (
                scrollTop >= targetTop - activeRange &&
                scrollTop < targetBottom
            ) {
                let id = tabContent.attr('id');
                $('.tab-link').removeClass('active');
                $('.tab-link[href="#' + id + '"]').addClass('active');
                tabContent.addClass('active');
                //SCALE
                var distance = Math.max(
                    0,
                    Math.min(scrollTop - targetTop, targetBottom - targetTop)
                );
                var scale = 1 - distance / tabContent.outerHeight(true);
                //BGCOLOR
                let [r, g, b] = initialColor;
                let intensity = Math.max(0, 255 - distance * 0.2);
                let bgColor =
                    'rgb(' +
                    (r * intensity) / 255 +
                    ', ' +
                    (g * intensity) / 255 +
                    ', ' +
                    (b * intensity) / 255 +
                    ')';

                if (lastTabIndex !== index) {
                    tabContent.css('transform', 'scale(' + scale + ')');
                    tabContent.css('background-color', bgColor);
                }
            } else {
                tabContent.removeClass('active');
            }
        });
    });

    $('.tab-link').on('click', function (e) {
        e.preventDefault();
        let tabLink = $(this);
        let tabContent = $(tabLink.attr('href'));
        let targetTop =
            tabContent.attr('target-top') - tabContent.attr('sticky-top');
        $('html, body').stop().animate(
            {
                scrollTop: targetTop,
            },
            500
        );
    });
});
