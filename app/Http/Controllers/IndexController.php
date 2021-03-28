<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\View\View;

class IndexController extends Controller
{
    public function index(Request $request)
    {
        if (!auth()->check()) {

            $sessionId = $request->session()->getId();
            $user = User::where('session_id', $sessionId)->first();

            if (!$user) {
                $user = new User();
                $user->fill(
                    [
                        'session_id' => $sessionId,
                        'name' => $user->random_name,
                        'api_token' => Str::random(60),
                    ]
                );
                $user->save();
                auth()->login($user);
            }
        }

        return View('index');
    }
}
