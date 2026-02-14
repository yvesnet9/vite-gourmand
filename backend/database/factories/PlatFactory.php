<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PlatFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nom' => fake()->words(3, true),
            'description' => fake()->sentence(),
            'type' => fake()->randomElement(['entree', 'plat', 'dessert']),
        ];
    }
}
