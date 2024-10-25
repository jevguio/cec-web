<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\activity;

class ActivityController extends Controller
{
    public function stores(Request $request)
    { 
        // Validate the incoming request
        $request->validate([
            'files.*' => 'required|file', // Validate each file
            'title' => 'required|string|max:255',
            'subject_id' => 'required', // Ensure the subject exists
        ]);

        if ($request->hasFile('files')) {
            $files = $request->file('files');
            $filePaths = []; // Array to hold file paths

            // Iterate through the uploaded files
            foreach ($files as $file) {
                $filePath = $file->store('uploads', 'public'); // Store file and get the path
                $filePaths[] = $filePath; // Add path to array 
            }

            // Create the record in the database
            activity::create([
                'url' => json_encode($filePaths), // Store file paths as a JSON string
                'title' => $request->title,
                'subject_id' => $request->subject_id,  
                'user_id' => Auth::user()->id, // Get authenticated user's ID
            ]);
            
            return response()->json(['msg' => 'Video Uploaded Successfully']);
        } 

        return response()->json(['msg' => 'Video upload Failed!'], 400); // Return error response if no files
    }

    public function getLinksUrlAll()
    {
        // Fetch the uploads based on user id and filters
        $uploads = activity::all(); 

        // Transform the data to match Unity's expected format
       

        return response()->json(["uploads"=>$uploads]);
    }   
    public function getLinksUrl()
    {
        // Fetch the uploads based on user id and filters
        $uploads = activity::where('user_id', Auth::user()->id)->get(); 
        // Transform the data to match Unity's expected format
       

        return response()->json(["uploads"=>$uploads]);
    }
    public function getUploads(Request $request)
    {
        // Fetch the uploads based on user id and filters
        $uploads = activity::where("user_id",$request->user_id)->get(); 

        // Transform the data to match Unity's expected format
       

        return response()->json(["uploads"=>$uploads]);
    }

}
