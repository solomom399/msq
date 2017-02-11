// var path = "http://localhost:2000/one-music-server/"
var path = "http://www.everymantechnologies.com/one-music-server/"
var sobanjo = function () {
	var self = this


	self.ds = function (formId) {
		$("#"+formId+" button[type=submit]").attr('disabled', 'disabled')
	}

	self.es = function (formId) {
		$("#"+formId+" button[type=submit]").removeAttr('disabled')
	}

	self.makeUse = function (formData, callback, errorCallback = null) {
		$.ajax({
			url: path,
			type: "POST",
			data: formData,
			cache: false,
		    processData: false,
		    contentType: false,
		    dataType: "JSON",
			success: function(r) {
				callback(r)
			},
		    error: function(XMLHttpRequest, textStatus, errorThrown){
		        errorCallback()
		    }
		})
	}



}

var s = new sobanjo()


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
        var formData = new FormData(form)
        formData.append('key', 'signin')

        s.ds("login-form")

        s.makeUse(formData, function (resp) {
        	swal("Good job!", resp, "success");
        	localStorage.setItem("seeq", "logged_in")
        	localStorage.setItem("seeq-details", JSON.stringify(resp.user_details))
        	window.location = "data/home.html"
        	s.es("login-form")
        },
        function () {
        	swal("There was an Error...Please Try again")
		    s.es("login-form")
        })
        return false
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


$('.button-collapse').sideNav({
  		menuWidth: 300, // Default is 300
  		edge: 'left', // Choose the horizontal origin
  		closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
  		draggable: true // Choose whether you can drag to open on touch screens
	}
)

$('#tabs-swipe-demo').tabs({ 'swipeable': true });
