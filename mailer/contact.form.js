(function ($) {
    "use strict";

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
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
            var $buttonIcon = $button.find("i, svg");

            $button.prop("disabled", true).addClass("opacity-70 cursor-not-allowed");
            $buttonText.text("Enviando...");
            $buttonIcon.addClass("animate-pulse");

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
                    var alertStyles = isSuccess
                        ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                        : "border-red-200 bg-red-50 text-red-800";
                    var alertIcon = isSuccess ? "check-circle-2" : "alert-circle";

                    $('#alertMessage').html(
                        '<div class="mb-6 flex items-start gap-3 rounded-xl border p-4 text-sm ' + alertStyles + '">' +
                            '<i data-lucide="' + alertIcon + '" class="w-5 h-5 shrink-0"></i>' +
                            '<strong class="font-semibold">' + response.message + "</strong>" +
                        "</div>"
                    );

                    if (window.lucide) {
                        window.lucide.createIcons();
                    }

                    if (isSuccess) {
                        $('#contactForm').trigger("reset");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    $('#alertMessage').html(
                        '<div class="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">' +
                            '<i data-lucide="alert-circle" class="w-5 h-5 shrink-0"></i>' +
                            '<strong class="font-semibold">No se pudo enviar el mensaje. Por favor intenta nuevamente.</strong>' +
                        "</div>"
                    );

                    if (window.lucide) {
                        window.lucide.createIcons();
                    }
                },
                complete: function () {
                    $button.prop("disabled", false).removeClass("opacity-70 cursor-not-allowed");
                    $buttonText.text("Enviar Mensaje a Fast Comex");
                    $buttonIcon.removeClass("animate-pulse");
                }
            });
        },
    });

    $('#name, #email, #mobile, #subject, #message').focus(function () {
        $('#alertMessage').html('');
    });

})(jQuery);
