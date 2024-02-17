<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Usher;

class UshersTable extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Usher::create([
            'department' => 'Ushering Department',
            'description' => 'The Ushering Department at Jesus Generation plays a pivotal role in enhancing the worship experience of our church community. Far beyond the traditional role of guiding congregants during services, our Ushering Department is a dynamic and welcoming force that fosters a connected and inviting church family atmosphere.

            Dedicated to creating an environment where everyone feels not only welcomed but also cherished, our ushers are the friendly faces that greet you at the door, helping to set the tone for a meaningful worship experience. Their warm smiles and genuine enthusiasm reflect the love of Christ, making each individual, from first-time visitors to long-time members, feel valued and appreciated.
            
            But our ushers are more than just guides—they are facilitators of fellowship and community building. Beyond the sanctuary, the Ushering Department hosts a variety of fellowship events that bring our church family together in joyous celebration. Whether it\'s a post-service coffee hour, a community picnic, or a special event to commemorate a significant milestone, our ushers work tirelessly to create opportunities for connection and camaraderie.',
            'leader' => 'Mr Jude Igiewe .O.',
            // ... other fields ...
        ]);
    }
}