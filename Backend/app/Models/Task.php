<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'employee_id',
        'status',
        'start_date',
        'end_date',
        'priority',
        'progress',
        'notes',
        'attachments',
    ];

    public function employee()
    {
        return $this->belongsTo(User::class, 'employee_id');
    }
}
