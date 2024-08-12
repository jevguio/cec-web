<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\LoginBacklog;
class LoginController extends Controller
{ 
    public function login(Request $request)
    {
        $request->validate([
            'school_id' => 'required',
            'password' => 'required',
        ]);

        // Find the user by school_id
        $user = User::where('school_id', $request->school_id)->first();
         LoginBacklog::create([
            'school_id' =>  $request->school_id, 
            'login_time' =>  now(), 
        ]);
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Generate a token or session for the user
        // Example: Assuming you use a simple token
        $token = bin2hex(random_bytes(32)); // Generate a random token
        $user->remember_token = $token; // Save token to user record
        $user->save();

        return response()->json([
            'message' => 'Login successful',
            'user' => [
                'id' => $user->id,
                'fname' => $user->fname,
                'mname' => $user->mname,
                'lname' => $user->lname,
                'school_id' => $user->school_id,
                'type' => $user->type,
            ],
            'token' => $token,
        ]);
    }

}
