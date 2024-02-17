<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Choir;

class ChoirsTable extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Choir::create([
            'department' => 'Choir Department',
            'description' => 'The Choir Department at our church is not just a musical ensemble; it is a harmonious force that adds a melodious touch to our worship experience, creating an atmosphere of spiritual elevation and inspiration. With a commitment to dedication and an abundance of musical talents, the choir members enrich our spiritual gatherings, transforming them into vibrant celebrations of faith.
            
            At the core of the Choir Department\'s mission is the powerful ability of music to convey the deepest expressions of worship. Through harmonizing voices and skillfully arranged melodies, the choir uplifts the hearts and minds of congregants, creating a sacred space where individuals can connect with the divine in a profound and emotive way.
            
            Dedication is a hallmark of the Choir Department. The commitment of its members to the art of musical worship is evident in every note they sing. Whether it\'s the ethereal strains of a hymn or the uplifting tempo of a gospel song, the choir\'s dedication resonates throughout our church, infusing each service with a sense of reverence and joy.',
            'leader' => 'Mr Jude Igiewe .O.',
            // ... other fields ...
        ]);
    }
}