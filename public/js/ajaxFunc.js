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
      if (window.offset >= response.count) {
        return;
      }

      $('.add_like').unbind();
      $('.favorite').unbind();
      $('#messages').append();
      window.offset += 5;
      this.data = response;
      $.each(this.data.data, function (key, value) {
        $('#messages').append("\n                <div class=\"mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg\">\n                    <div class=\"message\">\n                        <div class=\"items-center\">\n                            <div class=\"ml-4 text-lg leading-7 font-semibold\">".concat(value.user.name, "</div>\n                        </div>\n\n                        <div class=\"ml-12\">\n                            <div class=\"mt-2\">").concat(value.text, "\n                                <div>\n                                    <img src=\"/").concat(value.image, "\" alt=\"\">\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"grid-container\">\n                            <div class=\"grid-item\">\n                                <link href=\"https://fonts.googleapis.com/css2?family=Cookie&display=swap\" rel=\"stylesheet\">\n                                <button id=\"btn\" class=\"add_like\" type=\"button\" data-id=\"").concat(value.id, "\">\n                                <span class=\"noselect\">").concat(value.likes_count, "</span>\n                                <div id=\"circle\"></div>\n                                </button>\n                            </div>\n                            <div class=\"grid-item\">\n                                <link href=\"https://fonts.googleapis.com/css2?family=Cookie&display=swap\" rel=\"stylesheet\">\n                                <button id=\"btn\" class=\"favorite\" type=\"button\" data-id=\"").concat(value.id, "\">\n                                <span class=\"noselect\">").concat(statusFavorite(value.id), "</span>\n                                <div id=\"circle\"></div>\n                                </button>\n                            </div>\n                        </div>\n                </div>\n                    "));
      });
      $('.add_like').on('click', function () {
        var message_id = $(this).data().id;
        addLike(message_id, $(this));
      });
      $('.favorite').on('click', function () {
        var message_id = $(this).data().id;
        addDelFavorite(message_id);
        $(this).html(statusFavorite(message_id));
      });
    }
  });
}

function submitForm() {
  var _$$0$files$;

  var formData = new FormData();
  formData.append('text', $("#text").val());
  formData.append("image_file", (_$$0$files$ = $("#image")[0].files[0]) !== null && _$$0$files$ !== void 0 ? _$$0$files$ : '');
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
      fetch();
    }
  });
});
/******/ })()
;