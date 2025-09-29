<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Position::all(), 200);
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
            'departement_id' => 'required|exists:departements,id'
        ]);

        $position = Position::create($request->all());
        return response()->json($position, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Position $position)
    {
        return response()->json($position, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Position $position)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Position $position)
    {
        $request->validate([
            'name' => 'required',
            'departement_id' => 'required|exists:departements,id'
        ]);

        $position->update($request->all());
        return response()->json($position, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Position $position)
    {
        $position->delete();
        return response()->json(['message' => 'Position deleted successfully'], 200);
    }
}
