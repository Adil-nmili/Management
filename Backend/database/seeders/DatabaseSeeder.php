<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // Ensure clean state for deterministic seeding
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('tasks')->truncate();
        DB::table('positions')->truncate();
        DB::table('departements')->truncate();
        DB::table('users')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $users = [
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
        ];

        foreach ($users as $user) {
            \App\Models\User::updateOrCreate(['email' => $user['email']], $user);
        }

        $this->runTasks();
    }
    public function runTasks()
    {
        \App\Models\Task::insert([
            ['title' => 'Task 1', 'description' => 'Task 1 description', 'employee_id' => 1, 'status' => 'pending', 'start_date' => '2025-01-01', 'end_date' => '2025-01-01', 'priority' => 'low', 'progress' => 0, 'notes' => 'Task 1 notes', 'attachments' => 'Task 1 attachments'],
            ['title' => 'Task 2', 'description' => 'Task 2 description', 'employee_id' => 2, 'status' => 'pending', 'start_date' => '2025-01-01', 'end_date' => '2025-01-01', 'priority' => 'low', 'progress' => 0, 'notes' => 'Task 2 notes', 'attachments' => 'Task 2 attachments'],
            ['title' => 'Task 3', 'description' => 'Task 3 description', 'employee_id' => 3, 'status' => 'pending', 'start_date' => '2025-01-01', 'end_date' => '2025-01-01', 'priority' => 'low', 'progress' => 0, 'notes' => 'Task 3 notes', 'attachments' => 'Task 3 attachments'],
        ]);
        \App\Models\Departement::insert([
            ['name' => 'Departement 1', 'manager_id' => 1],
            ['name' => 'Departement 2', 'manager_id' => 2],
            ['name' => 'Departement 3', 'manager_id' => 3],
        ]);
        \App\Models\Position::insert([
            ['name' => 'Position 1', 'description' => 'Position 1 description', 'departement_id' => 1],
            ['name' => 'Position 2', 'description' => 'Position 2 description', 'departement_id' => 2],
            ['name' => 'Position 3', 'description' => 'Position 3 description', 'departement_id' => 3],
        ]);
    }
}
