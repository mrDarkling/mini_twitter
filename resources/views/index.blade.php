<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Mini-twitter</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('css/app.css')}}">

</head>
<body class="antialiased">
<div class="sm:items-center py-4 sm:pt-0">
    <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div class="col-md-12 mt-5">
            <h1 class="text-center"> Mini-twitter</h1>
            <hr style="height: 1px;color: black;background-color: black;">
        </div>
        <div>
            <form name="test" method="post" action="input1.php">
                <p><b>Ваш твит:</b><br>
                    <label>
                        <textarea name="text" id="text" cols="40" rows="3"></textarea>
                    </label></p>
                    <div>
                        <p><b>Изображение:</b><br>
                        <input name="image_file" id="image" type="file">
                    </div>
                <div class="buttons">
                    <div class="container">
                        <button type="button" id="submit" class="btn effect01" target="_blank">Сохранить</button>
                    </div>
                </div>


            </form>
        </div>
        <div id="messages">

        </div>

    </div>
</div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>window.api_token = '{{ auth()->user()->api_token }}'</script>
<script src="{{asset('js/ajaxFunc.js')}}"></script>

</body>
</html>
