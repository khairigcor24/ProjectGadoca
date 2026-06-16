<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            // Coffee
            ['category_id' => 1, 'name' => 'Espresso', 'description' => 'Kopi espresso murni', 'price' => 25000, 'stock' => 50],
            ['category_id' => 1, 'name' => 'Americano', 'description' => 'Espresso dengan air panas', 'price' => 30000, 'stock' => 60],
            ['category_id' => 1, 'name' => 'Latte', 'description' => 'Espresso dengan susu', 'price' => 40000, 'stock' => 80],
            ['category_id' => 1, 'name' => 'Cappuccino', 'description' => 'Espresso dengan busa susu', 'price' => 45000, 'stock' => 70],
            // Tea
            ['category_id' => 2, 'name' => 'Green Tea', 'description' => 'Teh hijau organik', 'price' => 20000, 'stock' => 40],
            ['category_id' => 2, 'name' => 'Black Tea', 'description' => 'Teh hitam premium', 'price' => 25000, 'stock' => 35],
            // Pastries
            ['category_id' => 3, 'name' => 'Croissant', 'description' => 'Croissant mentega lezat', 'price' => 35000, 'stock' => 30],
            ['category_id' => 3, 'name' => 'Donut', 'description' => 'Donut glasir gula', 'price' => 20000, 'stock' => 50],
            // Sandwiches
            ['category_id' => 4, 'name' => 'Ham Sandwich', 'description' => 'Sandwich ham dan keju', 'price' => 45000, 'stock' => 25],
            ['category_id' => 4, 'name' => 'Chicken Sandwich', 'description' => 'Sandwich ayam panggang', 'price' => 50000, 'stock' => 20],
            // Desserts
            ['category_id' => 5, 'name' => 'Chocolate Cake', 'description' => 'Kue cokelat premium', 'price' => 60000, 'stock' => 15],
            ['category_id' => 5, 'name' => 'Tiramisu', 'description' => 'Tiramisu Italia autentik', 'price' => 55000, 'stock' => 20],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
