(function($){
    jQuery.fn.Select = function(options){
        options = $.extend({
            autocomplete : true,
            placeholder : 'string',
            clear: false
        }, options);

        var make = function(){

            $(this).after("<div class='select-wrapper'><div class='select-label'></div><ul class='select-options'></ul></div>");
            var select = $(this),
                selectList = select.children(),
                selectWrapper = $('.select-wrapper'),
                selectOptions = $('.select-options'),
                label = $('.select-label');

            if(options.autocomplete) {
                selectOptions.append("<li><input type='text' class='select-search' placeholder='Search' /></li>");
                $('.select-options li:first-child').addClass('select-options-inp');
            }


            selectList.each(function(){
                selectOptions.append("<li>" + this.innerHTML + "</li>");
            });
            var children = selectOptions.children().not(":eq(0)");
            label.text(selectList[0].innerHTML);
            select.hide();

            selectWrapper.width(select.width()+'px');
            selectOptions.css({
                left: label.offset().left -2 +'px',
                top: (label.offset().top + 10 + label.outerHeight()) + 'px'
            });
            selectOptions.hide();

            label.text(options.placeholder);

            label.click(function(){ selectOptions.show() });
            children.click(function(){
                select.val(this.innerHTML);
                label.text($(this).text());
                selectOptions.hide();
                children.show();
                //console.log($(this));
            });
            $('.select-search').keyup(function(){
                var term = $(this).val().toLowerCase();
                children.each(function(){
                    if($(this).text().toLowerCase().indexOf(term) == -1) {
                        $(this).hide();
                    }else{
                        $(this).show();
                    }
                });
            });

            //управление клавиатурой все ок, но не знаю как реализовать прокрутку(
            //  + при поиске надо как-то исключать скрытые элементы из выборки
                var num = 0;

                $(document).on('keydown', function(event) {
                    $('.select-options li').removeClass('active');
                    var li = document.getElementsByClassName('select-options')[0].getElementsByTagName('li');
                    if(event.keyCode == 40 || event.keyCode == 38 || event.keyCode == 27) {
                        select.children('option').removeAttr('selected');
                    }

                    if(event.keyCode == 40){
                        num = num + 1;
                        if(num > 0 && num < li.length) {
                            li[num].classList.add('active');
                            select.children('option')[num - 1].setAttribute('selected', 'selected');
                        }else if(num >= li.length){
                            num = 0;
                        }
                    }
                    else if(event.keyCode == 38){
                        num = num - 1;
                        if(num > 0) {
                            li[num].classList.add('active');
                            select.children('option')[num - 1].setAttribute('selected', 'selected');
                        }else if(num <= 0){
                            num = li.length;
                        }
                    }else if(event.keyCode == 13){
                        console.log(select.children('option')[num - 1].value);
                        select.val(select.children('option')[num - 1].value);
                        label.text(select.val());
                        selectOptions.hide();
                    }else if(event.keyCode == 27){
                        select.val(NaN);
                        selectOptions.hide();
                    }
                });

        };

        return this.each(make);
    };
})(jQuery);


$('#my').Select({
    autocomplete : true,
    placeholder : 'Выберите город'

});



