$(document).ready(function(){
         $('input#name, input#email, textarea#message').unbind().blur( function(){
             var id = $(this).attr('id');
             var val = $(this).val();

           switch(id)
           {
                 case 'name':
                    var rv_name = /^[a-zA-Zа-яА-Я]+$/; 

                    if(val.length > 2 && val != '' && rv_name.test(val))
                    {
                       $(this).addClass('not_error');
                       $(this).next('.error-box').text('Accepted')
                                                 .css('color','green')
                                                 .animate({'paddingLeft':'10px'},400)
                                                 .animate({'paddingLeft':'5px'},400);
                    }

                    else
                    {
                       $(this).removeClass('not_error').addClass('error');
                       $(this).next('.error-box').html('&bull; "Name" field is required')
                                                  .css('color','red')
                                                  .animate({'paddingLeft':'10px'},400)
                                                  .animate({'paddingLeft':'5px'},400);
                    }
                break;

               case 'email':
                   var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                   if(val != '' && rv_email.test(val))
                   {
                      $(this).addClass('not_error');
                      $(this).next('.error-box').text('Accepted')
                                                .css('color','green')
                                                .animate({'paddingLeft':'10px'},400)
                                                .animate({'paddingLeft':'5px'},400);
                   }
                   else
                   {
                      $(this).removeClass('not_error').addClass('error');
                      $(this).next('.error-box').html('&bull; "Email" field is required')
                                                 .css('color','red')
                                                 .animate({'paddingLeft':'10px'},400)
                                                 .animate({'paddingLeft':'5px'},400);
                   }
               break;

              case 'message':
                  if(val != '' && val.length < 5000)
                  {
                     $(this).addClass('not_error');
                     $(this).next('.error-box').text('Accepted')
                                               .css('color','green')
                                               .animate({'paddingLeft':'10px'},400)
                                               .animate({'paddingLeft':'5px'},400);
                  }
                  else
                  {
                     $(this).removeClass('not_error').addClass('error');
                     $(this).next('.error-box').html('&bull; "Text" field is required')
                                               .css('color','red')
                                               .animate({'paddingLeft':'10px'},400)
                                               .animate({'paddingLeft':'5px'},400);
                  }
              break;


           } // end switch(...)

         }); // end blur()

        
         // Теперь отправим наше письмо с помощью AJAX
         $('form#feedback-form').submit(function(e){

             // Запрещаем стандартное поведение для кнопки submit
             e.preventDefault();

             // После того, как мы нажали кнопку "Отправить", делаем проверку,
             // если кол-во полей с классов .not_error равно 3(так как у нас всего 3 поля), то есть все поля заполнены верно,
             // выполняем наш Ajax сценарий и отправляем письмо адресату

             if($('.not_error').length == 3)
             {  

                // Eще одним моментов является то, что в качестве указания данных для передачи обработчику send.php, мы обращаемся $(this) к нашей форме,
                // и вызываем метод .serialize().
                // Это очень удобно, т.к. он сразу возвращает сгенерированную строку с именами и значениями выбранных элементов формы.

                 $.ajax({
                        url: 'send.php',
                        type: 'post',
                        data: $(this).serialize(),

                        beforeSend: function(xhr, textStatus){ 
                             $('form#feedback-form :input').attr('disabled','disabled');
                        },

                       success: function(response){
                            $('form#feedback-form :input').removeAttr('disabled');
                            $('form#feedback-form :text, textarea').val('').removeClass().next('.error-box').text('');
                            alert(response);
                       }
                }); // end ajax({...})
            }
            else
            {
              return false;
            }
            // Иначе, если количество полей с данным классом не равно значению 3 мы возвращаем false,
            // останавливая отправку сообщения в невалидной форме
           

       }); // end submit()


      }); // end script
