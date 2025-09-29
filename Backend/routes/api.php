<?php

use App\Http\Controllers\DirectorController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ManagerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\DepartementController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/csrf-cookie', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Auth
Route::post('/login', [LoginController::class,'login']);
Route::post('/register', [LoginController::class,'register']);
Route::post('/logout', [LoginController::class,'logout'])->middleware('auth:sanctum');

// Resource
Route::resource('/managers', ManagerController::class);
Route::resource('/employees', EmployeeController::class);
Route::resource('/directors', DirectorController::class);

Route::resource('/services', ServiceController::class);
Route::resource('/tasks', TaskController::class);
Route::resource('/departements', DepartementController::class);
Route::resource('/positions', PositionController::class);