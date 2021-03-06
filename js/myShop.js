$(document).ready(function() {

  init();

});

$(window).load(function() {


});

function init() {
  $("#btnLogin").click(function() {
    btnLoginCall();
  });

  $("#btnRegister").click(function() {
    btnRegisterCall();
  });

  $("#btnPassword").click(function() {
    btnForgotPasswordCall();
  });

  $(".alert").hide()
  loadItems();
  loadCart();

  checkCookie();
}


//Param -- L = to visible loginPanel, R = to visisble Register Panel, P = to visible forgot password panel.
function loginPanelVisiblity(param) {
  $('#myLoginModal').modal('show');
  if (param == "R") {
    $("#forgotPasswordPanel").hide();
    $("#registerPanel").show();
    $("#loginPanel").hide();
  } else if (param == "P") {
    $("#forgotPasswordPanel").show();
    $("#registerPanel").hide();
    $("#loginPanel").hide();
  } else {
    //Default Login Panel
    $("#forgotPasswordPanel").hide();
    $("#registerPanel").hide();
    $("#loginPanel").show();
  }
}

function btnLoginCall() {
  $('#myLoginModal').modal('hide');
  var email = $("#txtLoginEmail").val();
  var pass = $("#txtLoginPassword").val();
  // alert('Your email :- ' + email + "   and pass is:-  " + pass);
  // curl -i -X GET -H "Content-Type: application/json" http://localhost:8888/v1/catalog/1?mock=true
  $.ajax({
    url: 'http://localhost:8886/v1/account/',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify({
      username: email,
      password: pass
    }),
    success: function(data) {
      // alert('Data: ' + JSON.stringify(data));
      $('#success-alert').html("<div class='alert alert-success'>" + JSON.stringify(data.username) + "</div>");
      $("#success-alert").alert();
      $("#success-alert").fadeTo(2000, 500).slideUp(500, function() {
        $("#success-alert").hide()
      });

      setCookie("username", email, 365);
      $('#userWelcome').html("Welcome " + email + "!");
    },
    error: function(request, error) {
      // alert("Request: " + JSON.stringify(request));
      $('#danger-alert').html("<div class='alert alert-error'>" + JSON.stringify(request) + "</div>");
      $("#danger-alert").alert();
      $("#danger-alert").fadeTo(2000, 500).slideUp(500, function() {
        $("#danger-alert").hide()
      });
    }
  });
}

function btnRegisterCall() {
  $('#myLoginModal').modal('hide');
  alert('Call service to data for Register user..');
}

function btnForgotPasswordCall() {
  $('#myLoginModal').modal('hide');
  alert('Call service to data for Forgot Password user..');
}

function btnForgotPasswordCall() {
  $('#myLoginModal').modal('hide');
  alert('Call service to data for Forgot Password user..');
}

function btnAddToCart(item_id) {
  // //ajax call .. to your get all iteams api
  // $ curl -i -X GET -H "Content-Type: application/json" http://localhost:8888/v1/catalog/1?mock=true
  $.ajax({
    url: 'http://localhost:8888/v1/cart/' + item_id + '?mock=true',
    type: 'POST',
    dataType: 'json',
    success: function(data) {
      // alert('Data: ' + JSON.stringify(data));
      $('#success-alert').html("<div class='alert alert-success'>" + JSON.stringify(data) + "</div>");
      $("#success-alert").alert();
      $("#success-alert").fadeTo(2000, 500).slideUp(500, function() {
        $("#success-alert").hide()
      });
    },
    error: function(request, error) {
      // alert("Request: " + JSON.stringify(request));
      $('#danger-alert').html("<div class='alert alert-error'>" + JSON.stringify(request) + "</div>");
      $("#danger-alert").alert();
      $("#danger-alert").fadeTo(2000, 500).slideUp(500, function() {
        $("#danger-alert").hide()
      });
    }
  });
}

function btnRemoveCartItem(item_id) {
  // //ajax call .. to your get all iteams api
  // $ curl -i -X GET -H "Content-Type: application/json" http://localhost:8888/v1/catalog/1?mock=true
  $.ajax({
    url: 'http://localhost:8888/v1/cart/' + item_id + '?mock=true',
    type: 'DELETE',
    dataType: 'json',
    success: function(data) {
      // alert('Data: ' + JSON.stringify(data));
      location.reload();
      $('#success-alert').html("<div class='alert alert-success'>" + JSON.stringify(data) + "</div>");
      $("#success-alert").alert();
      $("#success-alert").fadeTo(2000, 500).slideUp(500, function() {
        $("#success-alert").hide()
      });
    },
    error: function(request, error) {
      // alert("Request: " + JSON.stringify(request));
      $('#danger-alert').html("<div class='alert alert-error'>" + JSON.stringify(request) + "</div>");
      $("#danger-alert").alert();
      $("#danger-alert").fadeTo(2000, 500).slideUp(500, function() {
        $("#danger-alert").hide()
      });
    }
  });
}


function btnCheckout() {
  // //ajax call .. to your get all iteams api
  $.ajax({
    url: 'http://localhost:8888/v1/order/',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      alert('Data: ' + JSON.stringify(data));
      $('#success-alert').html("<div class='alert alert-success'>" + JSON.stringify(data) + "</div>");
      $("#success-alert").alert();
      $("#success-alert").fadeTo(2000, 500).slideUp(500, function() {
        $("#success-alert").hide()
      });
      window.location.href = 'index.html';
    },
    error: function(request, error) {
      // alert("Request: " + JSON.stringify(request));
      $('#danger-alert').html("<div class='alert alert-error'>" + JSON.stringify(request) + "</div>");
      $("#danger-alert").alert();
      $("#danger-alert").fadeTo(2000, 500).slideUp(500, function() {
        $("#danger-alert").hide()
      });
    }
  });
}

function loadItems() {
  var htmlProductAPI = "";
  // //ajax call .. to your get all iteams api
  // $ curl -i -X GET -H "Content-Type: application/json" http://localhost:8888/v1/catalog/1?mock=true
  $.ajax({
    url: 'http://localhost:8889/v1/catalog/?mock=true',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      // Insert HTML
      for (var i = 0, l = data.items.length; i < l; i++) {
        htmlProductAPI += myProductHtmlTempl(data.items[i]);
      }
      $('#prodSection').html(htmlProductAPI);
    },
    error: function(request, error) {
      // alert("Error: " + JSON.stringify(request));
    }
  });
}

function loadCart() {
  var htmlCartAPI = "";
  var count = 0;
  var subtotal = 0;
  // //ajax call .. to your get all iteams api
  // $ curl -i -X GET -H "Content-Type: application/json" http://localhost:8888/v1/catalog/1?mock=true
  $.ajax({
    url: 'http://localhost:8888/v1/cart/?mock=true',
    type: 'GET',
    dataType: 'json',
    success: function(cartData) {
      // Insert HTML
      if (cartData.items.length == 0) {
        $('#shoppingCart').html("Cart Empty " + '<a href="index.html" type="button" class="btn btn-default">' +
          '<span class="glyphicon glyphicon-shopping-cart"></span> Continue Shopping' +
          '</a>');
      }
      for (var i = 0, l = cartData.items.length; i < l; i++) {
        var item = cartData.items;
        $.ajax({
          url: 'http://localhost:8889/v1/catalog/' + item[i].item_id + '?mock=true',
          type: 'GET',
          dataType: 'json',
          success: function(itemData) {
            // Insert HTML
            // alert(item[count].item_id);
            htmlCartAPI += cartHtmlTempl(itemData.name, itemData.image, itemData.price, item[count].quantity, item[count].item_id);
            subtotal += (itemData.price * item[count].quantity);
            // Check if last loop
            if (count == (l - 1)) {
              htmlCartAPI += '<tr><td>   </td><td>   </td><td>   </td><td><h5>Subtotal</h5></td><td class="text-right"><h5><strong>$' + subtotal + '</strong></h5></td></tr>' +
                '<tr><td>   </td><td>   </td><td>   </td><td><h5>Estimated shipping</h5></td><td class="text-right"><h5><strong>$6.94</strong></h5></td></tr>' +
                '<tr><td>   </td><td>   </td><td>   </td><td><h3>Total</h3></td><td class="text-right"><h3><strong>$' + (subtotal + 6.94) + '</strong></h3></td></tr>' +
                '<tr>    <td>   </td><td>   </td><td>   </td><td>' +
                '<a href="index.html" type="button" class="btn btn-default">' +
                '<span class="glyphicon glyphicon-shopping-cart"></span> Continue Shopping' +
                '</a></td><td><button type="button" class="btn btn-success">Checkout <span class="glyphicon glyphicon-play"></span></button></td></tr>';
              $('#shoppingCart').html(htmlCartAPI);
              $('#shoppingCart').on('click', '.btn-success', function() {
                btnCheckout();
              });
            }
            count++
          },
          error: function(request, error) {
            // alert("Error: " + JSON.stringify(request));
          },
        });
      }
    },
    error: function(request, error) {
      alert("Error: " + JSON.stringify(request));
    },
  });
}

function myProductHtmlTempl(item) {
  var html = '<div class="col-md-3 col-sm-6 hero-feature"><div class="thumbnail"><img src="' + item.image + '" alt="">' +
    '<div class="caption"><h3>' + item.name + '</h3><p>' + item.description + '</p><p>' +
    ' <a href="#" id="btnAddToCart' + item.item_id + '" class="btn btn-primary">Add to Cart!</a> <a href="#" class="btn btn-default">' + item.price + '</a></p>' +
    '</div> </div> </div>';

  // Register button
  // alert("btnAddToCart"+item.item_id);
  $('#prodSection').on('click', '#btnAddToCart' + item.item_id, function() {
    btnAddToCart(item.item_id);
  });
  return html;
}

function cartHtmlTempl(name, image, price, quantity, item_id) {

  var html = '<tr>' +
    '<td class="col-md-6">' +
    '<div class="media">' +
    '<a class="thumbnail pull-left" href="#"> <img class="media-object" src="' + image + '" style="width: 72px; height: 72px;"> </a>' +
    '<div class="media-body">' +
    '<h4 class="media-heading"><a href="#">' + name + '</a></h4>' +
    '<h5 class="media-heading"> by <a href="#">Brand name</a></h5>' +
    '<span>Status: </span><span class="text-success"><strong>In Stock</strong></span>' +
    '</div>' +
    '</div></td>' +
    '<td class="col-md-1" style="text-align: center">' +
    '<input type="email" class="form-control" id="exampleInputEmail1" value="' + quantity + '">' +
    '</td>' +
    '<td class="col-md-1 text-center"><strong>$' + price + '</strong></td>' +
    '<td class="col-md-1 text-center"><strong>$' + (price * quantity) + '</strong></td>' +
    '<td class="col-md-1">' +
    '<button id="btnRemoveCartItem' + item_id + '" type="button" class="btn btn-danger">' +
    '<span class="glyphicon glyphicon-remove"></span> Remove' +
    '</button></td>' +
    '</tr>';

  $('#shoppingCart').on('click', '#btnRemoveCartItem' + item_id, function() {
    btnRemoveCartItem(item_id);
  });

  return html
}

function setCookie(c_name, value, exdays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
  document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
  var c_value = document.cookie;
  var c_start = c_value.indexOf(" " + c_name + "=");
  if (c_start == -1) {
    c_start = c_value.indexOf(c_name + "=");
  }
  if (c_start == -1) {
    c_value = null;
  } else {
    c_start = c_value.indexOf("=", c_start) + 1;
    var c_end = c_value.indexOf(";", c_start);
    if (c_end == -1) {
      c_end = c_value.length;
    }
    c_value = unescape(c_value.substring(c_start, c_end));
  }
  return c_value;
}

function checkCookie() {
  var username = getCookie("username");
  if (username != null && username != "") {
    // alert("Welcome again " + username);
    $('#userWelcome').html("Welcome " + username + "!");

  } else {
    // username = prompt("Please enter your username:", "");
    // if (username != null && username != "") {
    //   setCookie("username", username, 365);
    // }
  }
}
