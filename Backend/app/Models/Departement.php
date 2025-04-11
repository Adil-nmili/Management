<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departement extends Model
{
    use HasFactory;

    protected $fillable= [
        'name',
        'manager_id'
    ];
/**
 * Get the user that manages the department.
 *
 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
 */

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    /**
     * Get all the employees of the department.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function employees()
    {
        return $this->hasMany(User::class)->where('role', 'employee');
    }
}
