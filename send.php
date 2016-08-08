 ​<?php

    $email = $_POST['email'];
    $name = $_POST['name'];
    $message = $_POST['message'];

    $to = "example@mail.ru";
    $subject = "От поситителя сайта";
    $text =  "Написал(а): $name\n Контактный email - $email\n\n Текст письма: $message\n";

    $header = "Content-type: text/html; charset=utf-8\r\n";
    $header .= "MIME-Version: 1.0\r\n";
    
    $sending = mail($to, $subject, $text, $headers);

    if($sending) echo "Письмо отправлено.)";

    ?>