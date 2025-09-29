<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = User::where('role', 'Employee')->with(['departement','tasks'])->get();
        return response()->json($employees, 200);
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
            'departement_id' => 'required|exists:departements,id'
        ]);

        $employee = User::create(array_merge($request->all(), ['role' => 'Employee']));
        return response()->json($employee, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $employee = User::where('role', 'Employee')->where('id', $id)->with(['departement','tasks'])->firstOrFail();
        return response()->json($employee, 200);
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

        $employee = User::where('role', 'Employee')->where('id', $id)->firstOrFail();
        $employee->update($request->all());
        return response()->json($employee, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $employee = User::where('role', 'Employee')->where('id', $id)->firstOrFail();
        $employee->delete();
        return response()->json(['message' => 'Employee deleted successfully'], 200);
    }
}
