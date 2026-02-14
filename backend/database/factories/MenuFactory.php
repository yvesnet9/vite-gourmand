<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MenuFactory extends Factory
{
    public function definition(): array
    {
        return [
            'titre' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'theme' => fake()->randomElement(['végétarien', 'traditionnel', 'gastronomique', 'bio']),
            'regime' => fake()->randomElement(['normal', 'végétarien', 'vegan', 'sans gluten']),
            'nb_personne_min' => fake()->numberBetween(2, 10),
            'prix_base' => fake()->randomFloat(2, 15, 50),
            'stock' => fake()->numberBetween(10, 100),
            'conditions' => fake()->optional()->sentence(),
            'actif' => true,
        ];
    }
}
