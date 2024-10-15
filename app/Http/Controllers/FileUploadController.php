<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\ImagesUpload; 
use App\Models\Announcement; // Assuming you have an Announcement model

class FileUploadController extends Controller
{
    public function upload(Request $request)
    { 

        // Validate the request
        $request->validate([
            'files.*' => 'required', // 20 MB max
            'announcement' => 'required|string|max:255',
        ]);
        
        // Initialize an array to hold paths 
        // Initialize an array to hold paths 
if ($request->hasFile('files')) {
    $allowedFileExtensions = ['jpeg', 'jpg', 'png', 'mp4'];
    $files = $request->file('files');
    
    // Create the announcement
    $announcement = new Announcement();
    $announcement->content = $request->announcement; // Store the content
 
    $announcement->save();
    $filePaths = []; // Array to hold file paths
    foreach ($files as $file) {
        $filename = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $check = in_array($extension, $allowedFileExtensions);
        
        if ($check) {
            $filePath =  $file->store('files'); // Store file and get the path
            $filePaths[] = $filePath; // Add path to array

            // Create a new file entry in the database
            ImagesUpload::create(['announcement_id' => $announcement->id, 'file_path' => $filePath]);
        }
    }

    echo "Upload Successfully";
}

        // Now you can save the announcement and file paths to your database
        // Assuming you have an Announcement model
        return response()->json(['message' => 'File uploaded successfully!', 'announcement' => $announcement], 201);
    }
}
