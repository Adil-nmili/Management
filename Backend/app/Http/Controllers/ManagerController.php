<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $managers = User::where('role', 'Manager')->with('departement')->get();
        return response()->json($managers, 200);
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
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'address' => 'required',
            'position' => 'required',
            'departement_id' => 'required|exists:departements,id'
        ]);

        $manager = User::create(array_merge($request->all(), ['role' => 'Manager']));
        return response()->json($manager, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $manager = User::where('role', 'Manager')->where('id', $id)->with('departement')->firstOrFail();
        return response()->json($manager, 200);
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
            'departement_id' => 'required|exists:departements,id'
        ]);

        $manager = User::where('role', 'Manager')->where('id', $id)->firstOrFail();
        $manager->update($request->all());
        return response()->json($manager, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $manager = User::where('role', 'Manager')->where('id', $id)->firstOrFail();
        $manager->delete();
        return response()->json(['message' => 'Manager deleted successfully'], 200);
    }
}
