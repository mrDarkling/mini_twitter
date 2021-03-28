/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************************!*\
  !*** ./resources/js/ajaxFunc.js ***!
  \**********************************/
function fetch() {
  var data = [];
  $.ajax({
    headers: {
      'Authorization': 'Bearer ' + window.api_token
    },
    url: '/api/messages',
    type: 'GET',
    data: {
      offset: window.offset,
      limit: 5
    },
    success: function success(response) {
      console.log(window.offset, response.count);

      if (window.offset >= response.count) {
        return;
      }

      $('.add_like').unbind();
      $('.favorite').unbind();
      $('#messages').append();
      window.offset += 5;
      this.data = response;
      console.log(this.data.data);
      $.each(this.data.data, function (key, value) {
        $('#messages').append("\n                <div class=\"mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg\">\n                    <div class=\"message\">\n                        <div class=\"items-center\">\n                            <div class=\"ml-4 text-lg leading-7 font-semibold\">".concat(value.user.name, " ").concat(value.id, "</div>\n                        </div>\n\n                        <div class=\"ml-12\">\n                            <div class=\"mt-2 text-gray-600 dark:text-gray-400 text-sm\">").concat(value.text, "\n                                <div>\n                                    <img src=\"/").concat(value.image, "\" alt=\"\">\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"items-center\">\n                            <button class=\"add_like\" type=\"button\" data-id=\"").concat(value.id, "\">").concat(value.likes_count, "</button>\n                        </div>\n                        <div class=\"items-center\">\n                            <button class=\"favorite\" type=\"button\" data-id=\"").concat(value.id, "\">").concat(statusFavorite(value.id), "</button>\n                        </div>\n                    </div>\n                </div>\n                    "));
      });
      $('.add_like').on('click', function () {
        var message_id = $(this).data().id;
        addLike(message_id, $(this));
      });
      $('.favorite').on('click', function () {
        var message_id = $(this).data().id;
        console.log(message_id);
        addDelFavorite(message_id);
        $(this).html(statusFavorite(message_id));
      });
    }
  });
}

function submitForm() {
  var formData = new FormData();
  formData.append('text', $("#text").val());
  formData.append("image_file", $("#image")[0].files[0]);
  $.ajax({
    headers: {
      'Authorization': 'Bearer ' + window.api_token
    },
    url: "/api/messages",
    method: "post",
    data: formData,
    cache: false,
    processData: false,
    contentType: false,
    success: function success() {
      $("#text").val('');
      $("#image").val(null);
    }
  }).done(function (data) {
    fetch();
  });
  return false;
}

function addDelFavorite(message_id) {
  var keyName = 'is_msg_favorite_' + message_id;

  if (!localStorage[keyName]) {
    localStorage[keyName] = 1;
    return;
  }

  delete localStorage[keyName];
}

function statusFavorite(message_id) {
  var keyName = 'is_msg_favorite_' + message_id;
  return !!localStorage[keyName] ? 'Из избранного' : 'В избранное';
}

function addLike(message_id, button) {
  $.ajax({
    headers: {
      'Authorization': 'Bearer ' + window.api_token
    },
    url: "/api/messages/like/add",
    method: "post",
    data: JSON.stringify({
      message_id: message_id
    }),
    contentType: 'application/json',
    cache: false,
    processData: false,
    success: function success(response) {
      button.html(response.likes_count);
    }
  }).done(function (data) {});
}

$(document).ready(function ($) {
  window.offset = 0;
  $('#submit').click(function (e) {
    submitForm();
  });
  fetch();
  $(window).scroll(function () {
    if ($(window).scrollTop() === $(document).height() - $(window).height()) {
      console.log('scroll');
      fetch();
    }
  });
});
/******/ })()
;