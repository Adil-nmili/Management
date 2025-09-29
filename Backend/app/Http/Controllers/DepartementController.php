<?php

namespace App\Http\Controllers;

use App\Models\Departement;
use Illuminate\Http\Request;

class DepartementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departments = Departement::with(relations: 'manager')
        ->withCount(['employees'])
        ->get();

        return response()->json($departments);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'manager_id' => 'required|exists:users,id'
        ]);

        $departement = Departement::create($request->all());
        return response()->json($departement, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Departement $departement)
    {
        $departement->load(relations: 'manager')->loadCount(['employees']);
        return response()->json($departement, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Departement $departement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Departement $departement)
    {
        $request->validate([
            'name' => 'required',
            'manager_id' => 'required|exists:users,id'
        ]);

        $departement->update($request->all());
        return response()->json($departement, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Departement $departement)
    {
        $departement->delete();
        return response()->json(['message' => 'Departement deleted successfully'], 200);
    }
}
