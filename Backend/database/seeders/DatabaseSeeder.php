<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        \App\Models\User::factory()->createMany([
            ['name' => 'Adil Nmili',
            'email' => 'adil@email.com',
            'role' => 'Director',
            'password'=> Hash::make('adil2025'),
            'address' =>'Tamslouht',
            'position' => 'director'],
            ['name' => 'Oussama Nmili',
            'email' => 'oussama@email.com',
            'role' => 'Manager',
            'password'=> Hash::make('oussama2025'),
            'address' =>'Tamslouht',
            'position' => 'manager'],
            ['name' => 'Yassine Nmili',
            'email' => 'yassine@email.com',
            'role' => 'Employee',
            'password'=> Hash::make('yassine2025'),
            'address' =>'Tamslouht',
            'position' => 'employee']
        ]);
    }
}
