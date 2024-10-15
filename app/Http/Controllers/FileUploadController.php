<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Announcement; // Assuming you have an Announcement model

class FileUploadController extends Controller
{
    public function upload(Request $request)
    {
        // Validate the request
        try {
            $request->validate([
                'files.*' => 'required|file|mimes:jpg,jpeg,png,mp4|max:2048', // Adjust as needed
                'announcement' => 'required|string|max:255',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Return the validation errors
            return response()->json(['errors' => $e->errors()], 422);
        }

        // Store the file and get the path
        $path = $request->file('file')->store('uploads'); // Save in 'storage/app/uploads'

        // Create an announcement in the database
        $announcement = Announcement::create([
            'file_path' => $path,
            'content' => $request->input('announcement'),
        ]);

        return response()->json(['message' => 'File uploaded successfully!', 'announcement' => $announcement], 201);
    }
}
