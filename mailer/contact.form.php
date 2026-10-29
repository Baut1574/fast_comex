<?php

// Mailer form data
$name = isset($_POST['name']) ? $_POST['name'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$mobile = isset($_POST['mobile']) ? $_POST['mobile'] : '';
$subject = isset($_POST['subject']) ? $_POST['subject'] : '';
$message = isset($_POST['message']) ? $_POST['message'] : '';
$company = isset($_POST['company']) ? $_POST['company'] : '';
$origin = isset($_POST['origin']) ? $_POST['origin'] : '';

// HTML email body
$htmlBody = "<p>Name: $name</p>";
$htmlBody .= "<p>Email: $email</p>";
($mobile !== "noMobile") ? $htmlBody .= "<p>Mobile: $mobile</p>" : "";
($company !== "") ? $htmlBody .= "<p>Company: $company</p>" : "";
($origin !== "") ? $htmlBody .= "<p>Origin / Destination: $origin</p>" : "";
$htmlBody .= "<p>Subject: $subject</p>";
$htmlBody .= "<p>Message: $message</p>";

// Plain text email body
$plainTextBody = "Name: $name\n";
$plainTextBody .= "Email: $email\n";
($mobile !== "noMobile") ? $plainTextBody .= "Mobile: $mobile\n" : "";
($company !== "") ? $plainTextBody .= "Company: $company\n" : "";
($origin !== "") ? $plainTextBody .= "Origin / Destination: $origin\n" : "";
$plainTextBody .= "Subject: $subject\n";
$plainTextBody .= $message;

// Recipient name. Change this name to your
$recipientName = "Fast Comex";

// Recipient email. Change this email to your
$recipientEmail = "contacto@fast-comex.com";

// Initiate PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

//Create an instance
$mail = new PHPMailer(true);

// Set mailer to use SMTP or PHP's mail() function
// If you use SMTP, it will be "true". Otherwise, it will be "false"
$useSMTP = false;

if ($useSMTP) {
    // Server settings for SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.example.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'user@example.com';
    $mail->Password = 'secret';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
} else {
    // Server settings for PHP's mail()
    $mail->isMail();
}

// Recipients info
$mail->setFrom($email, $name);
$mail->addAddress($recipientEmail, $recipientName);
$mail->addReplyTo($email, $name);
// $mail->addCC('cc@example.com');
// $mail->addBCC('bcc@example.com');

// Mail content
$mail->isHTML(true);
$mail->Subject = $subject;
$mail->Body = $htmlBody;
$mail->AltBody = $plainTextBody;

try {
    // Mail send
    $mail->send();
    
    // Passing success message with "success" status
    echo json_encode(array('status' => 'success', 'message' => 'Email has been sent successfully!'));
} catch (Exception $e) {
    // Passing error message with "error" status
    echo json_encode(array('status' => 'error', 'message' => 'Email could not be sent. ' . $mail->ErrorInfo));
}

?>