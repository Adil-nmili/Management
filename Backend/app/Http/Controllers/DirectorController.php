<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class DirectorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $directors = User::where('role', 'Director')->get();
        return response()->json($directors, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'address' => 'required',
            'position' => 'required',
        ]);

        $director = User::create(array_merge($request->all(), ['role' => 'Director']));
        return response()->json($director, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $director = User::where('role', 'Director')->where('id', $id)->firstOrFail();
        return response()->json($director, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$id,
            'address' => 'required',
            'position' => 'required',
        ]);

        $director = User::where('role', 'Director')->where('id', $id)->firstOrFail();
        $director->update($request->all());
        return response()->json($director, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $director = User::where('role', 'Director')->where('id', $id)->firstOrFail();
        $director->delete();
        return response()->json(['message' => 'Director deleted successfully'], 200);
    }
}
