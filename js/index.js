$("#login-form").validate({
	rules : {
		username: {
			required: true,
            minlength: 5
		},
        password: {
			required: true,
			minlength: 5
		}
	},
    errorClass: 'invalid',
    validClass: "valid",
    errorElement : 'div',
    errorPlacement: function(error, element) {
	    var placement = $(element).data('error');
	    if (placement) {
	       $(placement).append(error)
	    } else {
	       error.insertAfter(element);
	    }
    },
    submitHandler: function (form) {
        console.log($(form).attr('id')+'form ok');
    }
});


$("#signup-form").validate({
    rules: {
        fullname: {
            required: true,
            minlength: 5
        },
        email: {
            required: true,
            email:true
        },
        username_s: {
        	required: true
        },
        password_s: {
			required: true,
			minlength: 5
		},
		cpassword: {
			required: true,
			minlength: 5,
			equalTo : "#password_s"
		}
    },
    //For custom messages
    messages: {
        cpassword:{
            equalTo: "Password do not match"
        }
    },

    errorClass: 'invalid',
    validClass: "valid",
    errorElement : 'div',
    errorPlacement: function(error, element) {
	    var placement = $(element).data('error');
	    if (placement) {
	       $(placement).append(error)
	    } else {
	       error.insertAfter(element);
	    }
    },
    submitHandler: function (form) {
        console.log($(form).attr('id')+'form ok');
    }
 });


$('select').material_select();
