(function ($) {
    "use strict";

    $("#contactForm input, #contactForm textarea, #contactForm select").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {},
        submitSuccess: function ($form, event) {
            event.preventDefault();

            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("#subject").val();
            var message = $("textarea#message").val();
            var mobile = ($("input#mobile").length) ? $("input#mobile").val() : "noMobile";
            var company = ($("#company").length) ? $("#company").val() : "";
            var origin = ($("#origin-dest").length) ? $("#origin-dest").val() : "";

            var $button = $("#sendMessageButton");
            var $buttonText = $button.find("span");

            $button.prop("disabled", true);
            $buttonText.text("Enviando...");

            $.ajax({
                url: "mailer/contact.form.php",
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    mobile: mobile,
                    subject: subject,
                    message: message,
                    company: company,
                    origin: origin
                },
                dataType: "json",
                cache: false,
                success: function (response) {
                    var isSuccess = response.status === "success";
                    var alertClass = isSuccess ? "alert alert-success" : "alert alert-danger";
                    var alertIcon = isSuccess ? "fa-check-circle" : "fa-exclamation-circle";

                    $('#alertMessage').html(
                        '<div class="' + alertClass + ' d-flex align-items-start gap-2 mb-4" role="alert">' +
                            '<i class="fas ' + alertIcon + ' mt-1"></i>' +
                            '<strong class="fw-semibold">' + response.message + "</strong>" +
                        "</div>"
                    );

                    if (isSuccess) {
                        $('#contactForm').trigger("reset");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    $('#alertMessage').html(
                        '<div class="alert alert-danger d-flex align-items-start gap-2 mb-4" role="alert">' +
                            '<i class="fas fa-exclamation-circle mt-1"></i>' +
                            '<strong class="fw-semibold">No se pudo enviar el mensaje. Por favor intenta nuevamente.</strong>' +
                        "</div>"
                    );
                },
                complete: function () {
                    $button.prop("disabled", false);
                    $buttonText.text("Enviar Mensaje a Fast Comex");
                }
            });
        },
    });

    $('#name, #email, #mobile, #subject, #message').focus(function () {
        $('#alertMessage').html('');
    });

})(jQuery);
