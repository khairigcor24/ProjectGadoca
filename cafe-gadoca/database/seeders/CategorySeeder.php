<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Coffee',
                'description' => 'Espresso, Americano, Latte, Cappuccino, dan kopi favorit lainnya'
            ],
            [
                'name' => 'Tea',
                'description' => 'Teh panas, teh dingin, dan minuman teh premium'
            ],
            [
                'name' => 'Pastries',
                'description' => 'Croissant, donut, dan kue-kue lezat lainnya'
            ],
            [
                'name' => 'Sandwiches',
                'description' => 'Sandwich roti hangat dan makanan ringan lainnya'
            ],
            [
                'name' => 'Desserts',
                'description' => 'Kue, pudding, dan hidangan penutup lainnya'
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
