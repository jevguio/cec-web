<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\url_link;

class LinkController extends Controller
{
    public function stores(Request $request)
    { 
        url_link::create([
            'url' => $request->url,
            'title' => $request->title,
            'subject' => $request->subject,
            'roomASsign' => $request->teacher,
            'teacher' => $request->teacher,
            'user_id' => $request->user_id,
        ]);

        return response()->json(['msg' => 'Link created successfully']);
    }

    public function getLinksUrl()
    {
        // Fetch the uploads based on user id and filters
        $uploads = url_link::all(); 

        // Transform the data to match Unity's expected format
       

        return response()->json(["uploads"=>$uploads]);
    }
    public function getUploads(Request $request)
    {
        // Fetch the uploads based on user id and filters
        $uploads = url_link::where("user_id",$request->user_id)->get(); 

        // Transform the data to match Unity's expected format
       

        return response()->json(["uploads"=>$uploads]);
    }

}
