<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Vehiculo; 


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/v1/stock', function () {
    
    return response()->json(
        Vehiculo::with(['marca', 'modelo'])->where('isDeleted', false)->get()
    );
});