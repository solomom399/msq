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
		        errorCallback(XMLHttpRequest, textStatus, errorThrown)
		    }
		})
	}

	self.load = function () {
		swal({
			title : "",
			text : "",
			imageUrl : "img/load.gif",
			showConfirmButton : false
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
        s.load()

        s.makeUse(formData, function (resp) {
        	if (resp.ans == 'true') {
	        	localStorage.setItem("seeq", "logged_in")
	        	localStorage.setItem("seeq-details", JSON.stringify(resp.user_details))
	        	window.location = "data/home.html"
        	} else {
        		swal({
        			title : "",
	        		text : resp.ans,
	        		type : "warning",
	        		confirmButtonClass : 'waves-effect waves-light btn'
        		})
        	}
	        
	        s.es("login-form")
        },
        function (a, b, c) {
        	swal({
        		title : "",
        		text : " There was an Error...Please Try again",
        		type : "error",
        		confirmButtonClass : 'waves-effect waves-light btn'
        	})
		    s.es("login-form")
        })
        return false
    }
})


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
        $("a[point=next-option]").trigger('click')
        return false
    }
 })




$("#next-form").validate({
	rules : {
		org: {
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
    	var username = $("#signup-form").find("input[name=username]").val()
		var password = $("#signup-form").find("input[name=password]").val()
		var fullname = $("#signup-form").find("input[name=fullname]").val()
		var email = $("#signup-form").find("input[name=email]").val()
		var name_of_org = $("#next-form").find("input[name=name_of_org]").val()
		var designation = $("#next-form").find("select[name=designation]").val()

        var formData = new FormData()
        formData.append('key', 'signup')
        formData.append('username', username)
		formData.append('password', password)
		formData.append('fullname', fullname)
		formData.append('email', email)
		formData.append('name_of_org', name_of_org)
		formData.append('designation', designation)

        s.ds("next-form")
        s.load()

        s.makeUse(formData, function (resp) {
        	if (resp.success == 'inserted') {
        		$("a[point=login]").trigger('click')
        		swal({
        			title : 'Museeq',
        			text : 'Thank you for joining us...Click ok to Login',
        			type : 'success'
        		})
        		$("#signup-form").trigger('reset')
        		$("#next-form").trigger('reset')
        	} else {
        		swal({
        			title : "",
	        		text : resp.success,
	        		type : "warning",
	        		confirmButtonClass : 'waves-effect waves-light btn'
        		})
        		$("a[point=signup]").trigger('click')
        	}
        	
        	s.es("next-form")
        },
        function (a, b, c) {
        	// console.log(a+" "+b+" "+c)
        	swal({
        		title : "",
        		text : " There was an Error...Please Try again",
        		type : "error",
        		confirmButtonClass : 'waves-effect waves-light btn'
        	})
		    s.es("next-form")
        })
        return false
    }
})

$(".logout").click(function () {
	s.load()
	localStorage.removeItem('seeq')
	localStorage.removeItem('seeq-details')
	window.location = "../index.html"
})


$('select').material_select();


$('.button-collapse').sideNav({
  		menuWidth: 300, // Default is 300
  		edge: 'left', // Choose the horizontal origin
  		closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
  		draggable: true // Choose whether you can drag to open on touch screens
	}
)


$(".hnav").click(function () {
	$('.button-collapse').sideNav('hide')
})

/*$("p").on("swipeleft",function(){
  $(this).hide();
});
*/

$('.slides').slick({
	autoplay: true,
    autoplaySpeed: 5000,
	dots: true,
	infinite: true,
	speed: 300,
	mobileFirst: true,
    prevArrow: false,
    nextArrow: false
});

navigator.splashscreen.show();
window.setTimeout(function () {
    navigator.splashscreen.hide();
}, 10000);

// ============================================================================

var userobj = JSON.parse(localStorage.getItem('seeq-details'))
var userFullname = userobj.fullname
var userEmail = userobj.email


$(".name").html(userFullname)
$(".email").html(userEmail)
