<?php
$email_to =   'contact@pushok.me';
$name     =   $_POST['name'];
$email    =   $_POST['email'];
$sub  =   $_POST['sub'];
$message  =   $_POST['message'];

$headers  = "From: $email\r\n";

if(mail($email_to, $sub, $message, $headers)) {
    echo 'sent';
} else {
    echo 'failed';
}
?>