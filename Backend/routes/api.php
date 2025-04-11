<?php

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


Route::post('/login', [LoginController::class,'login']);
Route::post('/register', [LoginController::class,'register']);
Route::get('/managers', [LoginController::class,'getManager']);
Route::get('/users', [LoginController::class,'index']);
Route::delete('users/{id}', [LoginController::class,'destroy']);
Route::put('users/{id}', [LoginController::class,'update']);



Route::resource('/service', ServiceController::class);
Route::resource('/tasks', TaskController::class);
Route::resource('/departements', DepartementController::class);