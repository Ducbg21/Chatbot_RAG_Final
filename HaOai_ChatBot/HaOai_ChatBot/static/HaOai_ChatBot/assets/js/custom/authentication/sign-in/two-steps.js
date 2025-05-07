"use strict";

// Class Definition
var KTSigninTwoSteps = function() {
    // Elements
    var form;
    var submitButton;

    // Handle form
    var handleForm = function() {
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();

            var validated = true;

            // Lấy giá trị OTP từ 6 ô input
            var otp = "";
            var inputs = [].slice.call(form.querySelectorAll('input[maxlength="1"]'));

            inputs.forEach(function(input) {
                if (input.value === '' || input.value.length === 0) {
                    validated = false;
                }
                otp += input.value; // Ghép các giá trị lại với nhau
            });

            if (validated === true) {
                // Show loading indication
                submitButton.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple clicks
                submitButton.disabled = true;

                // Lấy CSRF token từ thẻ input
                var csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]').value;

                // Gửi OTP lên server
                axios.post('/account/api/v1/verify-otp/', {
                    otp: otp // Gửi OTP dưới dạng JSON
                }, {
                    headers: {
                        'X-CSRFToken': csrfToken,
                        'Content-Type': 'application/json'
                    }
                }).then(function (response) {
                    if (response.data.success) {
                        // Hiển thị thông báo thành công
                        Swal.fire({
                            text: response.data.message,
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(() => {
                            const redirectUrl = form.getAttribute('data-kt-redirect-url');
                            if (redirectUrl) {
                                location.href = redirectUrl;
                            }
                        });
                    } else {
                        // Hiển thị thông báo lỗi nếu API trả về không thành công
                        Swal.fire({
                            text: response.data.message,
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(() => {
                            // Khi người dùng nhấn "Ok", kích hoạt lại nút submit và xóa các giá trị nhập
                            submitButton.disabled = false;
                            submitButton.removeAttribute('data-kt-indicator');

                            // Xóa các giá trị nhập
                            inputs.forEach(function(input) {
                                input.value = '';
                            });

                            // Đặt lại focus vào ô đầu tiên
                            inputs[0].focus();
                        });
                    }
                }).catch(function (error) {
                    const message = error.response?.data?.message || "An error occurred. Please try again.";
                    Swal.fire({
                        text: message,
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    }).then(() => {
                        // Kích hoạt lại nút submit sau khi có lỗi
                        submitButton.disabled = false;
                        submitButton.removeAttribute('data-kt-indicator');
                    });
                });
            } else {
                // Hiển thị lỗi nếu OTP không hợp lệ
                Swal.fire({
                    text: "Please enter valid security code and try again.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                }).then(() => {
                    // Kích hoạt lại nút submit và xóa các giá trị nhập
                    submitButton.disabled = false;
                    submitButton.removeAttribute('data-kt-indicator');

                    // Xóa các giá trị nhập
                    inputs.forEach(function(input) {
                        input.value = '';
                    });

                    // Đặt lại focus vào ô đầu tiên
                    inputs[0].focus();
                });
            }
        });
    }

    // Handle the OTP input focus behavior
    var handleType = function() {
        var input1 = form.querySelector("[name=code_1]");
        var input2 = form.querySelector("[name=code_2]");
        var input3 = form.querySelector("[name=code_3]");
        var input4 = form.querySelector("[name=code_4]");
        var input5 = form.querySelector("[name=code_5]");
        var input6 = form.querySelector("[name=code_6]");

        input1.focus();

        // Di chuyển focus giữa các ô nhập
        input1.addEventListener("keyup", function() {
            if (this.value.length === 1) {
                input2.focus();
            }
        });

        input2.addEventListener("keyup", function() {
            if (this.value.length === 1) {
                input3.focus();
            }
        });

        input3.addEventListener("keyup", function() {
            if (this.value.length === 1) {
                input4.focus();
            }
        });

        input4.addEventListener("keyup", function() {
            if (this.value.length === 1) {
                input5.focus();
            }
        });

        input5.addEventListener("keyup", function() {
            if (this.value.length === 1) {
                input6.focus();
            }
        });

        input6.addEventListener("keyup", function() {
            if (this.value.length === 1) {
                input6.blur(); // Khi nhập xong, bỏ focus
            }
        });
    }

    // Public functions
    return {
        // Initialization
        init: function() {
            form = document.querySelector('#kt_sing_in_two_steps_form');
            submitButton = document.querySelector('#kt_sing_in_two_steps_submit');

            handleForm();
            handleType();
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTSigninTwoSteps.init();
});
