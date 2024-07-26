<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'room' => 'required',
        ]);

        Subject::create([
            'title' => $request->title,
            'room' => $request->room,
            'teacher_id' => auth()->id(),
        ]);

        return response()->json(['message' => 'Subject created successfully']);
    }

    public function index()
    {
        $subjects = Subject::where('teacher_id', auth()->id())->get();
        return response()->json($subjects);
    }
}
