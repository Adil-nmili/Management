<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class LoginController extends Controller
{

    public function login(Request $request)
    {
        $user = User::where('email',$request->email)->first();
        if(empty($user)) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json($user,200);
    }
    public function register(Request $request)
    {
        $user = User::create($request->all());
        return $user;
    }
    public function getManager()
    {
        $managers = User::where('role','Manager')->get();
        return response()->json($managers, 200);
    }
}
