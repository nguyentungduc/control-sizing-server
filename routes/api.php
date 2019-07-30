<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'control-size',  'middleware' => 'cors'], function(){
    Route::get('', 'ControlSizeController@index')->name('list-content');
    Route::post('create', 'ControlSizeController@create')->name('create-item');
    Route::post('down', 'ControlSizeController@down')->name('down-item');
    Route::get('detail/{id}', 'ControlSizeController@detail')->name('detail-item');
    Route::put('detail/{id}', 'ControlSizeController@update')->name('update-item');
    Route::delete('detail/{id}', 'ControlSizeController@delete')->name('delete-item');
});
