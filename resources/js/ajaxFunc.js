function fetch() {
    let data = [];
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + window.api_token,
        },
        url: '/api/messages',
        type: 'GET',
        data: {offset: window.offset, limit: 5},
        success: function (response) {
            if (window.offset >= response.count) {
                return;
            }
            $('.add_like').unbind();
            $('.favorite').unbind();
            $('#messages').append();
            window.offset += 5;
            this.data = response;
            $.each(this.data.data, function (key, value) {
                $('#messages').append(`
                <div class="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
                    <div class="message">
                        <div class="items-center">
                            <div class="ml-4 text-lg leading-7 font-semibold">${value.user.name}</div>
                        </div>

                        <div class="ml-12">
                            <div class="mt-2">${value.text}
                                <div>
                                    <img src="/${value.image}" alt="">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid-container">
                            <div class="grid-item">
                                <link href="https://fonts.googleapis.com/css2?family=Cookie&display=swap" rel="stylesheet">
                                <button id="btn" class="add_like" type="button" data-id="${value.id}">
                                <span class="noselect">${value.likes_count}</span>
                                <div id="circle"></div>
                                </button>
                            </div>
                            <div class="grid-item">
                                <link href="https://fonts.googleapis.com/css2?family=Cookie&display=swap" rel="stylesheet">
                                <button id="btn" class="favorite" type="button" data-id="${value.id}">
                                <span class="noselect">${statusFavorite(value.id)}</span>
                                <div id="circle"></div>
                                </button>
                            </div>
                        </div>
                </div>
                    `);
            });
            $('.add_like').on('click', function () {
                let message_id = $(this).data().id;
                addLike(message_id, $(this))
            });

            $('.favorite').on('click', function () {
                let message_id = $(this).data().id;
                addDelFavorite(message_id)
                $(this).html(statusFavorite(message_id))
            });
        }
    })
}

$('#addMessage').on('submit',function(e){
    e.preventDefault();
    form = $(this)[0];
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + window.api_token,
        },
        url: $(this).attr('action'),
        method: 'post',
        data: new FormData(form),
        cache: false,
        processData: false,
        contentType: false,
        success: function(){
            form.reset();
            fetch();
        }
    })
})

function addDelFavorite(message_id) {
    let keyName = 'is_msg_favorite_' + message_id;

    if (!localStorage[keyName]) {
        localStorage[keyName] = 1;
        return;
    }
    delete localStorage[keyName];
}

function statusFavorite(message_id) {
    let keyName = 'is_msg_favorite_' + message_id;

    return !!localStorage[keyName] ? 'Из избранного' : 'В избранное';
}


function addLike(message_id, button) {
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + window.api_token,
        },
        url: "/api/messages/like/add",
        method: "post",
        data: JSON.stringify({message_id: message_id}),
        contentType: 'application/json',
        cache: false,
        processData: false,
        success: function (response) {
            button.html(response.likes_count);
        }
    }).done(function (data) {
    });
}

$(document).ready(function ($) {
    window.offset = 0;

    fetch();
    $(window).scroll(function () {
        if ($(window).scrollTop() === $(document).height() - $(window).height()) {
            fetch();
        }
    });
});
