<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Product;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $products = Product::all();

        if ($users->isEmpty() || $products->isEmpty()) {
            return;
        }

        for ($i = 0; $i < 10; $i++) {
            Transaction::create([
                'user_id' => $users->random()->id,
                'product_id' => $products->random()->id,
                'quantity' => rand(1, 5),
                'total_price' => rand(50000, 300000),
                'status' => ['pending', 'completed', 'cancelled'][rand(0, 2)],
            ]);
        }
    }
}
