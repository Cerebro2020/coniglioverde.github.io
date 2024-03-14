<?php

// Configurazione delle impostazioni della posta elettronica
$mail_to = "coniglioverdeart@gmail.com";
$mail_subject = "Messaggio dal modulo di contatto";
$mail_body = "";

// Convalida dei dati
if (empty($_POST['firstname'])) {
    $error_message[] = "Il nome è obbligatorio";
}
if (empty($_POST['lastname'])) {
    $error_message[] = "Il cognome è obbligatorio";
}
if (empty($_POST['country'])) {
    $error_message[] = "Il paese è obbligatorio";
}
if (empty($_POST['subject'])) {
    $error_message[] = "L'oggetto è obbligatorio";
}
if (empty($_POST['message'])) {
    $error_message[] = "Il messaggio è obbligatorio";
}

// Pulitura dei dati
$firstname = filter_var($_POST['firstname'], FILTER_SANITIZE_STRING);
$lastname = filter_var($_POST['lastname'], FILTER_SANITIZE_STRING);
$country = filter_var($_POST['country'], FILTER_SANITIZE_STRING);
$subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
$message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

// Invio dell'e-mail
if (empty($error_message)) {
    $mail_body = "Nome: $firstname
Cognome: $lastname
Paese: $country
Oggetto: $subject
Messaggio: $message";
    mail($mail_to, $mail_subject, $mail_body);
    header("Location: success.php");
} else {
    // Visualizzazione degli errori
    $error_message_string = implode("<br>", $error_message);
    echo $error_message_string;
}

?>