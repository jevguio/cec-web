<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoginBacklog;
class BacklogController extends Controller
{
    //
    public function getLoginBacklogs()
    {
        return response()->json(LoginBacklog::all());
    }

    public function getRoomBacklogs()
    {
        return response()->json(RoomBacklog::all());
    }
}
