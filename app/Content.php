<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    protected $table = 'contents';
    public $timestamps = false;
    protected $fillable = ['value'];
}
